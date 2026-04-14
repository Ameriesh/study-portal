import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { Ticket } from '../../../../../contracts/api-contracts';


interface TicketCreateModalProps {
  onClose: () => void;
  onCreated: (ticket: Ticket) => void;
}

export default function TicketCreateModal({ onClose, onCreated }: TicketCreateModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Ticket['priority']>('MEDIUM');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Create new ticket with mock data
    const newTicket: Ticket = {
      id: `ticket-${Date.now()}`,
      title,
      description,
      priority,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
      createdBy: 'admin-uuid-0001',
    };

    onCreated(newTicket);
    setIsLoading(false);
  }

  return (
    // Backdrop
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

      {/* Modal */}
      <div className="bg-surface rounded-2xl w-full max-w-lg shadow-xl">

        {/* Modal header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="font-bold text-primary text-lg">
            Créer un ticket
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Title */}
          <div>
            <label className="label">Titre</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Décrivez brièvement votre problème"
              required
              className="input"
            />
          </div>

          {/* Description */}
          <div>
            <label className="label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Détaillez votre demande..."
              required
              rows={4}
              className="input resize-none"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="label">Priorité</label>
            <div className="flex gap-3">
              {(['LOW', 'MEDIUM', 'HIGH'] as Ticket['priority'][]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`
                    flex-1 py-2 rounded-lg text-xs font-semibold border-2 transition-all
                    ${priority === p
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-gray-500 hover:border-primary/50'
                    }
                  `}
                >
                  {p === 'LOW' ? 'Faible' : p === 'MEDIUM' ? 'Moyen' : 'Urgent'}
                </button>
              ))}
            </div>
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
              disabled={isLoading}
              className="btn-primary flex-1"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Création...
                </>
              ) : (
                'Créer le ticket'
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}