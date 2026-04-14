import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../../../components/shared/Layout';
import { usePermissions } from '../../../../../hooks/usePermissions';
import DocumentUploadWorkspace from '../components/DocumentUploadWorkspace';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function DocumentUploadPage() {
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();

  // Sécurité basée sur les autorités (exigence du test)
  useEffect(() => {
    if (!hasPermission('document:upload')) {
      navigate('/documents', { replace: true });
    }
  }, [hasPermission, navigate]);

  return (
    <Layout title="Upload de documents">
      {/* Conteneur principal (Blanc) */}
      <div className="card min-h-[calc(100vh-200px)] flex flex-col">
        
        {/* Header de la page */}
        <div className="flex items-center justify-between gap-3 mb-8 px-2">
          <div>
            <h2 className="text-2xl font-bold text-primary">Justificatifs</h2>
            <p className="text-sm text-gray-400 mt-1">
              Ajoutez et gérez vos pièces justificatives en toute sécurité.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/documents')}
            className="btn-cancel flex items-center gap-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Retour
          </button>
        </div>

        {/* Zone de travail (Fond grisé pour créer le contraste) */}
        <div className="flex-1 rounded-3xl p-6 md:p-12 border border-border/50">
          <DocumentUploadWorkspace />
        </div>
        
      </div>
    </Layout>
  );
}