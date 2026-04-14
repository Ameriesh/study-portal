import { useRef, useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

interface UploadItem {
  id: string;
  name: string;
}

const INITIAL_ITEMS: UploadItem[] = [
  { id: 'upload-item-1', name: 'Document_1.pdf' },
  { id: 'upload-item-2', name: 'Document_2.pdf' },
];

export default function DocumentUploadWorkspace() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [items, setItems] = useState<UploadItem[]>(INITIAL_ITEMS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  function handleAddFile(file: File) {
    const newItem = { id: `upload-item-${Date.now()}`, name: file.name };
    setItems((prev) => [...prev, newItem]);
  }

  function startRename(id: string) {
    const current = items.find((item) => item.id === id);
    if (!current) return;
    setEditingId(id);
    setEditingName(current.name);
  }

  function confirmRename() {
    if (!editingId) return;
    const nextName = editingName.trim();
    if (nextName) {
      setItems((prev) =>
        prev.map((item) => (item.id === editingId ? { ...item, name: nextName } : item))
      );
    }
    setEditingId(null);
    setEditingName('');
  }

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="w-full flex flex-col items-center">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleAddFile(file);
          e.currentTarget.value = '';
        }}
      />

      {/* Bouton d'ajout - Utilise la nouvelle couleur success (#2EAF63) */}
      <div className="mb-10">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="bg-success text-white px-10 py-3 rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-sm cursor-pointer border-none"
        >
          Ajouter un justificatif
        </button>
      </div>

      <div className="w-full space-y-4 max-w-3xl">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-stretch rounded-xl border border-secondary bg-surface overflow-hidden h-14 shadow-sm"
          >
            {/* Zone Nom (Orange - utilise --color-secondary) */}
            <div className="w-1/3 min-w-[180px] bg-secondary flex items-center justify-center px-4">
              {editingId === item.id ? (
                <input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onBlur={confirmRename}
                  onKeyDown={(e) => e.key === 'Enter' && confirmRename()}
                  autoFocus
                  className="w-full bg-transparent text-white text-center font-bold outline-none border-b border-white"
                />
              ) : (
                <span className="text-white font-bold truncate text-base md:text-lg">
                  {item.name}
                </span>
              )}
            </div>

            {/* Vide central (Blanc surface) */}
            <div className="flex-1 bg-surface" />

            {/* Bouton Éditer (Orange - secondary) */}
            <button
              type="button"
              onClick={() => startRename(item.id)}
              className="w-14 md:w-16 bg-secondary text-white flex items-center justify-center hover:brightness-95 transition-all border-l border-white/30 cursor-pointer border-none"
            >
              <PencilIcon className="size-6" />
            </button>

            {/* Bouton Supprimer (Rouge - danger) */}
            <button
              type="button"
              onClick={() => handleDelete(item.id)}
              className="w-14 md:w-16 bg-danger text-white flex items-center justify-center hover:brightness-95 transition-all cursor-pointer border-none"
            >
              <TrashIcon className="size-6" />
            </button>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-10 border-2 border-dashed border-border rounded-xl">
            <p className="text-gray-400">Aucun fichier sélectionné</p>
          </div>
        )}
      </div>
    </div>
  );
}