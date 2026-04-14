import Layout from '../../../components/shared/Layout';
import {
  HomeIcon,
  HandThumbUpIcon,
  CircleStackIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';
import card1 from '../../../assets/card1.svg';
import card2 from '../../../assets/card2.svg';
import card3 from '../../../assets/card3.svg';
import card4 from '../../../assets/card4.svg';

// ------------------------------------------------------------
// Service card data — no permissions here, dashboard is public
// Permissions are applied on Tickets, Documents, Notifications
// ------------------------------------------------------------
interface ServiceCard {
  id: string;
  title: string;
  image: string;
  icon: React.ReactNode;
}

const SERVICE_CARDS: ServiceCard[] = [
  {
    id: 'attestation-virement',
    title: 'Attestation de virement irrévocable',
    image: card1,
    icon: <DocumentDuplicateIcon className="w-6 h-6 text-white" />,
  },
  {
    id: 'attestation-logement',
    title: 'Attestation de logement',
    image: card2,
    icon: <HomeIcon className="w-8 h-8 text-white" />,
  },
  {
    id: 'assurance',
    title: 'Assurance',
    image: card3,
    icon: <HandThumbUpIcon className="w-8 h-8 text-white" />,
  },
  {
    id: 'financement',
    title: 'Demande de financement',
    image: card4,
    icon: <CircleStackIcon className="w-8 h-8 text-white" />,
  },
];

// ------------------------------------------------------------
// DashboardPage — main portal home
// All services visible to everyone — permissions apply on
// dedicated feature pages (tickets, documents, notifications)
// ------------------------------------------------------------
export default function DashboardPage() {
  return (
    <Layout title="Accueil">
     <div className="card h-full flex flex-col">
        <h2 className="text-2xl font-bold text-primary mb-8">
          Les services Boaz
        </h2>

       <div className="flex justify-center items-center h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-14 w-full max-w-2xl">
            {SERVICE_CARDS.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
              >
                {/* Card image + overlay + icon + title */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/45" />

                  {/* Icon + title centered on top of overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-4">
                    {service.icon}
                    <p className="text-white font-bold text-center text-xl leading-snug px-8">
                      {service.title}
                    </p>
                  </div>
                </div>

                {/* Subscribe button */}
                <button className="bg-secondary w-full rounded-none rounded-b-4xl py-4 text-xl text-white font-bold">
                  Souscrire
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}