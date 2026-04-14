import { usePermissions } from '../../../../../hooks/usePermissions';
import type { Document } from '../../../../../contracts/api-contracts';
import ActionMenu from '../../../../../components/shared/ActionMenu';

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface DocumentTableRowProps {
  doc: Document;
}

export default function DocumentTableRow({ doc }: DocumentTableRowProps) {
  const { hasPermission } = usePermissions();

  const menuItems = [
    {
      id: 'preview',
      label: 'Aperçu',
      onClick: () => window.open(doc.url, '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'download',
      label: 'Télécharger',
      onClick: () => {
        const anchor = document.createElement('a');
        anchor.href = doc.url;
        anchor.download = doc.name;
        anchor.click();
      },
      hidden: !hasPermission('document:download'),
    },
  ];

  return (
    <tr className="border-b border-border last:border-b-0">
      <td className="px-4 py-3 text-sm font-semibold text-foreground">{doc.name}</td>
      <td className="px-4 py-3 text-sm text-foreground">{doc.type}</td>
      <td className="px-4 py-3 text-sm text-foreground">{formatSize(doc.size)}</td>
      <td className="px-4 py-3 text-sm text-foreground">
        {new Date(doc.uploadedAt).toLocaleDateString('fr-FR')}
      </td>
      <td className="px-4 py-3">
        <ActionMenu items={menuItems} />
      </td>
    </tr>
  );
}
