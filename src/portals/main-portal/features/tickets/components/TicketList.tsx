import type { Ticket } from '../../../../../contracts/api-contracts';
import TicketCard from './TicketCard';

// ------------------------------------------------------------
// TicketList — renders the list of tickets
// ------------------------------------------------------------
interface TicketListProps {
  tickets: Ticket[];
  onTicketsChange: (tickets: Ticket[]) => void;
}

export default function TicketList({ tickets, onTicketsChange }: TicketListProps) {

  function handleStatusUpdate(id: string, newStatus: Ticket['status']) {
    const updated = tickets.map((t) =>
      t.id === id ? { ...t, status: newStatus } : t
    );
    onTicketsChange(updated);
  }

  if (tickets.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-16">
        <p className="text-sm text-gray-400">Aucun ticket pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onStatusUpdate={handleStatusUpdate}
        />
      ))}
    </div>
  );
}