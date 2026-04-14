import { useRef, useState } from 'react';
import { ArrowUpTrayIcon, DocumentIcon } from '@heroicons/react/24/outline';
import type { Document } from '../../../../../contracts/api-contracts';

interface DocumentUploadPanelProps {
  onUploaded: (doc: Document) => void;
}

export default function DocumentUploadPanel({ onUploaded }: DocumentUploadPanelProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpload() {
    if (!selectedFile) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));

    const extension = selectedFile.name.split('.').pop()?.toLowerCase();
    const inferredType: Document['type'] =
      selectedFile.type.startsWith('image/')
        ? 'IMAGE'
        : extension === 'doc' || extension === 'docx'
          ? 'WORD'
          : extension === 'pdf'
            ? 'PDF'
            : 'OTHER';

    onUploaded({
      id: `doc-${Date.now()}`,
      name: selectedFile.name,
      type: inferredType,
      size: selectedFile.size,
      uploadedAt: new Date().toISOString(),
      uploadedBy: 'admin-uuid-0001',
      url: URL.createObjectURL(selectedFile),
    });

    setSelectedFile(null);
    setIsLoading(false);
  }

  return (
    <section className="rounded-3xl border border-border bg-[#050505] text-white p-6 md:p-8">
      <div className="max-w-2xl">
        <p className="text-xl font-bold">Uploader un document</p>
        <p className="mt-1 text-sm text-white/70">
          Zone admin - ajoutez un document qui sera visible dans la liste.
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-white/20 bg-white/5 p-4 md:p-5">
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
        />

        {!selectedFile ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-4 py-2.5 text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            <ArrowUpTrayIcon className="h-4 w-4" />
            Sélectionner un fichier
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="inline-flex items-center gap-2">
              <DocumentIcon className="h-5 w-5 text-white/80" />
              <span className="text-sm">{selectedFile.name}</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="rounded-lg border border-white/25 px-3 py-2 text-xs font-semibold hover:bg-white/10 transition-colors"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleUpload}
                disabled={isLoading}
                className="rounded-lg bg-white text-black px-3 py-2 text-xs font-bold disabled:opacity-60"
              >
                {isLoading ? 'Envoi...' : 'Envoyer'}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
