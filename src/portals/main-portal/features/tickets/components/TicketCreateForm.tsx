import { useState } from 'react';
import type { Ticket } from '../../../../../contracts/api-contracts';

interface TicketCreateFormProps {
  onCancel: () => void;
  onCreated: (ticket: Ticket) => void;
}

export default function TicketCreateForm({
  onCancel,
  onCreated,
}: TicketCreateFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Ticket['priority']>('MEDIUM');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 600));

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
    setTitle('');
    setDescription('');
    setPriority('MEDIUM');
    setIsLoading(false);
  }

  return (
    <section className="card">
      <div className="mb-5">
        <h3 className="text-lg font-bold text-primary">Créer un ticket</h3>
        <p className="text-sm text-gray-400 mt-1">
          Formulaire centré pour créer une nouvelle demande.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <label className="label">Priorité</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(['LOW', 'MEDIUM', 'HIGH'] as Ticket['priority'][]).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setPriority(level)}
                className={`
                  py-2 rounded-lg text-xs font-semibold border-2 transition-all
                  ${
                    priority === level
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-gray-500 hover:border-primary/50'
                  }
                `}
              >
                {level === 'LOW'
                  ? 'Faible'
                  : level === 'MEDIUM'
                    ? 'Moyen'
                    : 'Urgent'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button type="button" onClick={onCancel} className="btn-cancel sm:flex-1">
            Annuler
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary sm:flex-1"
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
    </section>
  );
}
