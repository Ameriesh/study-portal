import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../../../../components/shared/Layout';
import { ProtectedComponent } from '../../../../../components/ProtectedComponent';
import TicketList from '../components/TicketList';
import { PlusIcon } from '@heroicons/react/24/outline';
import type { Ticket } from '../../../../../contracts/api-contracts';
import { ticketsMock } from '../../../../../services/mock/tickets.mock';

export default function TicketsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTickets(ticketsMock);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const createdTicket = (location.state as { createdTicket?: Ticket } | null)
      ?.createdTicket;
    if (!createdTicket) return;

    setTickets((prev) => [createdTicket, ...prev]);
    navigate('/tickets', { replace: true, state: null });
  }, [location.state, navigate]);

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
              onClick={() => navigate('/tickets/create')}
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
    </Layout>
  );
}