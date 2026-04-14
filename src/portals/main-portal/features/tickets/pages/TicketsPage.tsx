import { useState, useEffect } from 'react';
import Layout from '../../../../../components/shared/Layout';
import { ProtectedComponent } from '../../../../../components/ProtectedComponent';
import TicketList from '../components/TicketList';
import TicketCreateModal from '../components/TicketCreateModatl';
import { PlusIcon } from '@heroicons/react/24/outline';
import type { Ticket } from '../../../../../contracts/api-contracts';
import { ticketsMock } from '../../../../../services/mock/tickets.mock';

// ------------------------------------------------------------
// TicketsPage — main tickets feature page
// Displays ticket list and conditionally shows action buttons
// based on user permissions
// ------------------------------------------------------------
export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setTickets(ticketsMock);
    setIsLoading(false);
  }, 800);

  // Cleanup — cancel the timer if the component unmounts before it fires
  return () => clearTimeout(timer);
}, []);

  function handleTicketCreated(newTicket: Ticket) {
    setTickets((prev) => [newTicket, ...prev]);
    setIsModalOpen(false);
  }

  return (
    <Layout title="Tickets">
      <div className="card h-full flex flex-col gap-6">

        {/* Header — title + create button */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-primary">
              Mes tickets
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">
              Suivez vos demandes et réclamations
            </p>
          </div>

          {/* Create button — only visible with ticket:create */}
          <ProtectedComponent permission="ticket:create">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary"
            >
              <PlusIcon className="w-4 h-4" />
              Créer un ticket
            </button>
          </ProtectedComponent>
        </div>

        {/* Ticket list — only visible with ticket:read */}
        <ProtectedComponent permission="ticket:read">
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-400">
                  Chargement des tickets...
                </p>
              </div>
            </div>
          ) : (
            <TicketList
              tickets={tickets}
              onTicketsChange={setTickets}
            />
          )}
        </ProtectedComponent>

      </div>

      {/* Create modal — only renders if modal is open */}
      {isModalOpen && (
        <TicketCreateModal
          onClose={() => setIsModalOpen(false)}
          onCreated={handleTicketCreated}
        />
      )}

    </Layout>
  );
}