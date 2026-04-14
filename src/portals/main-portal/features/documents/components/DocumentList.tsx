import type { Document } from '../../../../../contracts/api-contracts';
import DocumentTableRow from './DocumentTableRow';


interface DocumentListProps {
  documents: Document[];
}

export default function DocumentList({ documents }: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-16">
        <p className="text-sm text-gray-400">Aucun document disponible.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border overflow-hidden bg-surface">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-background/70 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                Document
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                Taille
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <DocumentTableRow key={doc.id} doc={doc} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}