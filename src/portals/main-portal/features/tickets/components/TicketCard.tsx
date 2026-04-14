import { useState } from 'react';
import ProtectedComponent from '../../../../../components/ProtectedComponent';
import type { Ticket } from '../../../../../contracts/api-contracts';
import {
  ChatBubbleLeftIcon,
  PencilSquareIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';


const STATUS_STYLES: Record<Ticket['status'], string> = {
  OPEN:        'bg-blue-100 text-blue-700',
  IN_PROGRESS: 'bg-amber-100 text-amber-700',
  RESOLVED:    'bg-green-100 text-green-700',
  CLOSED:      'bg-gray-100 text-gray-600',
};

const STATUS_LABELS: Record<Ticket['status'], string> = {
  OPEN:        'Ouvert',
  IN_PROGRESS: 'En cours',
  RESOLVED:    'Résolu',
  CLOSED:      'Fermé',
};

const PRIORITY_STYLES: Record<Ticket['priority'], string> = {
  LOW:    'bg-gray-100 text-gray-600',
  MEDIUM: 'bg-amber-100 text-amber-700',
  HIGH:   'bg-red-100 text-red-700',
};

const PRIORITY_LABELS: Record<Ticket['priority'], string> = {
  LOW:    'Faible',
  MEDIUM: 'Moyen',
  HIGH:   'Urgent',
};


interface TicketCardProps {
  ticket: Ticket;
  onStatusUpdate: (id: string, status: Ticket['status']) => void;
}


export default function TicketCard({ ticket, onStatusUpdate }: TicketCardProps) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);
  const [showComment, setShowComment] = useState(false);
  const [showStatusEdit, setShowStatusEdit] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  function handleCommentSubmit() {
    if (!comment.trim()) return;
    setComments((prev) => [comment.trim(), ...prev]);
    setComment('');
    setShowComment(false);
  }

  return (
    <div className="border border-border rounded-xl p-4 hover:shadow-sm transition-shadow duration-200">

      {/* Top row — title + badges */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground truncate">
            {ticket.title}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {new Date(ticket.createdAt).toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Status + priority badges */}
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${PRIORITY_STYLES[ticket.priority]}`}>
            {PRIORITY_LABELS[ticket.priority]}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${STATUS_STYLES[ticket.status]}`}>
            {STATUS_LABELS[ticket.status]}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500 mb-3 line-clamp-2">
        {ticket.description}
      </p>

      {/* Action buttons — permission based */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setShowDetails((prev) => !prev)}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-primary/5 hover:text-primary transition-colors"
        >
          {showDetails ? 'Masquer le détail' : 'Voir le détail'}
        </button>

        {/* Modify status — ticket:update */}
        <ProtectedComponent permission="ticket:update">
          <button
            onClick={() => setShowStatusEdit(!showStatusEdit)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-primary/5 hover:text-primary transition-colors"
          >
            <PencilSquareIcon className="w-3.5 h-3.5" />
            Modifier le statut
          </button>
        </ProtectedComponent>

        {/* Comment — ticket:comment */}
        <ProtectedComponent permission="ticket:comment">
          <button
            onClick={() => setShowComment(!showComment)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-primary/5 hover:text-primary transition-colors"
          >
            <ChatBubbleLeftIcon className="w-3.5 h-3.5" />
            Commenter
          </button>
        </ProtectedComponent>

      </div>

      {/* Details block — visible for ticket:read users */}
      {showDetails && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-border bg-background/60 px-3 py-2">
              <p className="text-gray-400">ID ticket</p>
              <p className="font-semibold text-foreground mt-0.5">{ticket.id}</p>
            </div>
            <div className="rounded-lg border border-border bg-background/60 px-3 py-2">
              <p className="text-gray-400">Créé par</p>
              <p className="font-semibold text-foreground mt-0.5">{ticket.createdBy}</p>
            </div>
          </div>
        </div>
      )}

      {/* Status editor — ticket:update */}
      {showStatusEdit && (
        <ProtectedComponent permission="ticket:update">
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs font-semibold text-foreground mb-2">
              Modifier le statut
            </p>
            <div className="flex gap-2 flex-wrap">
              {(Object.keys(STATUS_LABELS) as Ticket['status'][]).map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    onStatusUpdate(ticket.id, status);
                    setShowStatusEdit(false);
                  }}
                  className={`
                    text-xs px-3 py-1.5 rounded-full font-semibold transition-all
                    ${ticket.status === status
                      ? STATUS_STYLES[status] + ' ring-2 ring-offset-1 ring-primary'
                      : STATUS_STYLES[status] + ' opacity-60 hover:opacity-100'
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

      {/* Comment input — ticket:comment */}
      {showComment && (
        <ProtectedComponent permission="ticket:comment">
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs font-semibold text-foreground mb-2">
              Ajouter un commentaire
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Votre commentaire..."
                className="input text-xs py-2"
                onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
              />
              <button
                onClick={handleCommentSubmit}
                className="btn-primary px-3 py-2 shrink-0"
              >
                <PaperAirplaneIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ProtectedComponent>
      )}

      {comments.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs font-semibold text-foreground mb-2">
            Derniers commentaires
          </p>
          <div className="space-y-2">
            {comments.map((entry, index) => (
              <div
                key={`${ticket.id}-comment-${index}`}
                className="text-xs bg-background/70 border border-border rounded-lg px-3 py-2 text-foreground"
              >
                {entry}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}