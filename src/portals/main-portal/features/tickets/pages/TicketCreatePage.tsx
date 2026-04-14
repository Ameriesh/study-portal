import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../../../components/shared/Layout';
import TicketCreateForm from '../components/TicketCreateForm';
import { usePermissions } from '../../../../../hooks/usePermissions';
import type { Ticket } from '../../../../../contracts/api-contracts';

export default function TicketCreatePage() {
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();

  useEffect(() => {
    if (!hasPermission('ticket:create')) {
      navigate('/tickets', { replace: true });
    }
  }, [hasPermission, navigate]);

  function handleTicketCreated(newTicket: Ticket) {
    navigate('/tickets', {
      replace: true,
      state: { createdTicket: newTicket },
    });
  }

  return (
    <Layout title="Créer un ticket">
      <div className="flex flex-1 items-start justify-center pt-4">
        <div className="w-full max-w-3xl">
          <TicketCreateForm
            onCancel={() => navigate('/tickets')}
            onCreated={handleTicketCreated}
          />
        </div>
      </div>
    </Layout>
  );
}
