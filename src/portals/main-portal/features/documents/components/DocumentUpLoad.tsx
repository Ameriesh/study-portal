import { useState, useRef } from 'react';
import { XMarkIcon, ArrowUpTrayIcon, DocumentIcon } from '@heroicons/react/24/outline';
import type { Document } from '../../../../../contracts/api-contracts';


interface DocumentUploadModalProps {
  onClose: () => void;
  onUploaded: (doc: Document) => void;
}

export default function DocumentUploadModal({
  onClose,
  onUploaded,
}: DocumentUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(file: File) {
    setSelectedFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Create mock document from uploaded file
    const newDoc: Document = {
      id: `doc-${Date.now()}`,
      name: selectedFile.name,
      type: selectedFile.type.startsWith('image/') ? 'IMAGE' : 'PDF',
      size: selectedFile.size,
      uploadedAt: new Date().toISOString(),
      uploadedBy: 'admin-uuid-0001',
      url: URL.createObjectURL(selectedFile),
    };

    onUploaded(newDoc);
    setIsLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-surface rounded-2xl w-full max-w-lg shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="font-bold text-primary text-lg">
            Joindre un fichier
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Drop zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
              transition-colors duration-200
              ${isDragging
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 hover:bg-primary/5'
              }
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
            />

            {selectedFile ? (
              <div className="flex flex-col items-center gap-2">
                <DocumentIcon className="w-10 h-10 text-primary" />
                <p className="font-semibold text-sm text-primary">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-400">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <ArrowUpTrayIcon className="w-10 h-10 text-gray-400" />
                <p className="font-semibold text-sm text-foreground">
                  Glissez un fichier ici
                </p>
                <p className="text-xs text-gray-400">
                  ou cliquez pour parcourir
                </p>
                <p className="text-xs text-gray-300 mt-1">
                  PDF, JPG, PNG, DOC — max 10 MB
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-cancel flex-1"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!selectedFile || isLoading}
              className="btn-primary flex-1"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <ArrowUpTrayIcon className="w-4 h-4" />
                  Envoyer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}