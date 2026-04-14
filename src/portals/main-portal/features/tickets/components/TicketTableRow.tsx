import { useState } from 'react';
import {
  PaperAirplaneIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import ProtectedComponent from '../../../../../components/ProtectedComponent';
import { usePermissions } from '../../../../../hooks/usePermissions';
import type { Ticket } from '../../../../../contracts/api-contracts';
import ActionMenu from '../../../../../components/shared/ActionMenu';

const STATUS_STYLES: Record<Ticket['status'], string> = {
  OPEN: 'bg-blue-100 text-blue-700',
  IN_PROGRESS: 'bg-amber-100 text-amber-700',
  RESOLVED: 'bg-green-100 text-green-700',
  CLOSED: 'bg-gray-100 text-gray-600',
};

const STATUS_LABELS: Record<Ticket['status'], string> = {
  OPEN: 'Ouvert',
  IN_PROGRESS: 'En cours',
  RESOLVED: 'Résolu',
  CLOSED: 'Fermé',
};

const PRIORITY_STYLES: Record<Ticket['priority'], string> = {
  LOW: 'bg-gray-100 text-gray-600',
  MEDIUM: 'bg-amber-100 text-amber-700',
  HIGH: 'bg-red-100 text-red-700',
};

const PRIORITY_LABELS: Record<Ticket['priority'], string> = {
  LOW: 'Faible',
  MEDIUM: 'Moyen',
  HIGH: 'Urgent',
};

interface TicketTableRowProps {
  ticket: Ticket;
  onStatusUpdate: (id: string, status: Ticket['status']) => void;
}

export default function TicketTableRow({
  ticket,
  onStatusUpdate,
}: TicketTableRowProps) {
  const { hasPermission } = usePermissions();
  const [showDetails, setShowDetails] = useState(false);
  const [showStatusEdit, setShowStatusEdit] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);

  function handleCommentSubmit() {
    if (!comment.trim()) return;
    setComments((prev) => [comment.trim(), ...prev]);
    setComment('');
    setShowCommentInput(false);
    setShowDetails(true);
  }

  const menuItems = [
    {
      id: 'details',
      label: showDetails ? 'Masquer le détail' : 'Voir le détail',
      onClick: () => setShowDetails((prev) => !prev),
    },
    {
      id: 'status',
      label: showStatusEdit ? 'Masquer le statut' : 'Modifier le statut',
      onClick: () => setShowStatusEdit((prev) => !prev),
      hidden: !hasPermission('ticket:update'),
    },
    {
      id: 'comment',
      label: showCommentInput ? 'Masquer commentaire' : 'Ajouter un commentaire',
      onClick: () => setShowCommentInput((prev) => !prev),
      hidden: !hasPermission('ticket:comment'),
    },
  ];

  return (
    <>
      <tr className="border-b border-border last:border-b-0">
        <td className="px-4 py-3 text-sm font-semibold text-foreground">{ticket.title}</td>
        <td className="px-4 py-3 text-sm text-foreground">
          {new Date(ticket.createdAt).toLocaleDateString('fr-FR')}
        </td>
        <td className="px-4 py-3">
          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${PRIORITY_STYLES[ticket.priority]}`}
          >
            {PRIORITY_LABELS[ticket.priority]}
          </span>
        </td>
        <td className="px-4 py-3">
          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${STATUS_STYLES[ticket.status]}`}
          >
            {STATUS_LABELS[ticket.status]}
          </span>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            {(showDetails || showStatusEdit || showCommentInput) && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[11px] font-semibold text-primary">
                {showDetails ? (
                  <ChevronUpIcon className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDownIcon className="h-3.5 w-3.5" />
                )}
                Actif
              </span>
            )}
            <ActionMenu items={menuItems} />
          </div>
        </td>
      </tr>

      {(showDetails || showStatusEdit || showCommentInput) && (
        <tr className="border-b border-border bg-background/40">
          <td colSpan={5} className="px-4 py-3">
            <div className="space-y-3">
              {showDetails && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg border border-border bg-surface px-3 py-2">
                    <p className="text-gray-400">Description</p>
                    <p className="mt-0.5 text-foreground">{ticket.description}</p>
                  </div>
                  <div className="rounded-lg border border-border bg-surface px-3 py-2">
                    <p className="text-gray-400">Créé par</p>
                    <p className="mt-0.5 text-foreground">{ticket.createdBy}</p>
                  </div>
                  {comments.length > 0 && (
                    <div className="sm:col-span-2 rounded-lg border border-border bg-surface px-3 py-2">
                      <p className="text-gray-400 mb-1">Commentaires</p>
                      <div className="space-y-1.5">
                        {comments.map((entry, index) => (
                          <p key={`${ticket.id}-comment-${index}`} className="text-foreground">
                            - {entry}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {showStatusEdit && (
                <ProtectedComponent permission="ticket:update">
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-2">
                      Modifier le statut
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(Object.keys(STATUS_LABELS) as Ticket['status'][]).map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => {
                            onStatusUpdate(ticket.id, status);
                            setShowStatusEdit(false);
                          }}
                          className={`
                            text-xs px-3 py-1.5 rounded-full font-semibold transition-all
                            ${
                              ticket.status === status
                                ? STATUS_STYLES[status] + ' ring-2 ring-offset-1 ring-primary'
                                : STATUS_STYLES[status] + ' opacity-70 hover:opacity-100'
                            }
                          `}
                        >
                          {STATUS_LABELS[status]}
                        </button>
                      ))}
                    </div>
                  </div>
                </ProtectedComponent>
              )}

              {showCommentInput && (
                <ProtectedComponent permission="ticket:comment">
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-2">
                      Ajouter un commentaire
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
                        placeholder="Votre commentaire..."
                        className="input text-xs py-2"
                      />
                      <button
                        type="button"
                        onClick={handleCommentSubmit}
                        className="btn-primary px-3 py-2"
                      >
                        <PaperAirplaneIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </ProtectedComponent>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
