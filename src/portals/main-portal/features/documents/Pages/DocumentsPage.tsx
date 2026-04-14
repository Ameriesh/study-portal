import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../../../components/shared/Layout';
import ProtectedComponent from '../../../../../components/ProtectedComponent';
import DocumentList from '../components/DocumentList';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import type { Document } from '../../../../../contracts/api-contracts';
import { documentsMock } from '../../../../../services/mock/documents.mock';


export default function DocumentsPage() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDocuments(documentsMock);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout title="Documents">
      <div className="card h-full flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-primary">
              Mes documents
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">
              Consultez et gérez vos documents officiels
            </p>
          </div>

          {/* Upload button — document:upload only */}
          <ProtectedComponent permission="document:upload">
            <button
              onClick={() => navigate('/documents/upload')}
              className="btn-primary"
            >
              <ArrowUpTrayIcon className="w-4 h-4" />
              Joindre un fichier
            </button>
          </ProtectedComponent>
        </div>

        {/* Document list — document:read only */}
        <ProtectedComponent permission="document:read">
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-400">
                  Chargement des documents...
                </p>
              </div>
            </div>
          ) : (
            <DocumentList documents={documents} />
          )}
        </ProtectedComponent>

      </div>
    </Layout>
  );
}