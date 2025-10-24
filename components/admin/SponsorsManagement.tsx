import React, { useState } from 'react';
import Button from '../common/Button';
import { useData } from '../../hooks/useData';
import type { Sponsor } from '../../types';
import ConfirmationModal from '../common/ConfirmationModal';

const SponsorsManagement: React.FC = () => {
  const { sponsors, deleteSponsor, loading } = useData();
  const [deletingSponsor, setDeletingSponsor] = useState<Sponsor | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleOpenDeleteModal = (sponsor: Sponsor) => {
    setDeletingSponsor(sponsor);
    setIsConfirmModalOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    if (deletingSponsor) {
        deleteSponsor(deletingSponsor.id);
    }
  };

  return (
    <>
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-serif font-bold text-brand-teal-dark">Gestão de Parceiros</h2>
          <Button size="sm" onClick={() => alert('Funcionalidade de Adicionar Parceiro a ser implementada.')}>Adicionar Parceiro</Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
              <div className="p-6 text-center text-brand-grey-medium">A carregar parceiros...</div>
          ) : (
              <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-brand-grey-dark">
                      <thead className="text-xs text-brand-grey-medium uppercase bg-brand-grey-warm">
                          <tr>
                              <th scope="col" className="px-6 py-3">Logo</th>
                              <th scope="col" className="px-6 py-3">Nome</th>
                              <th scope="col" className="px-6 py-3">URL</th>
                              <th scope="col" className="px-6 py-3 text-right">Ações</th>
                          </tr>
                      </thead>
                      <tbody>
                          {sponsors.map(sponsor => (
                              <tr key={sponsor.id} className="bg-white border-b hover:bg-brand-grey-warm">
                                  <td className="px-6 py-4">
                                      <img src={sponsor.logo_url} alt={sponsor.name} className="h-10 object-contain"/>
                                  </td>
                                  <td className="px-6 py-4 font-semibold">{sponsor.name}</td>
                                  <td className="px-6 py-4">
                                      <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className="text-brand-teal-deep hover:underline">
                                          {sponsor.url}
                                      </a>
                                  </td>
                                  <td className="px-6 py-4 text-right space-x-2">
                                      <button 
                                        className="font-medium text-brand-teal-deep hover:underline"
                                        onClick={() => alert('Funcionalidade de Editar a ser implementada.')}
                                      >
                                        Editar
                                      </button>
                                      <button 
                                        className="font-medium text-brand-alert hover:underline"
                                        onClick={() => handleOpenDeleteModal(sponsor)}
                                      >
                                        Apagar
                                      </button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          )}
        </div>
      </section>

      {deletingSponsor && (
        <ConfirmationModal
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            onConfirm={handleDeleteConfirm}
            title="Apagar Parceiro"
            message={`Tem a certeza que deseja apagar o parceiro "${deletingSponsor.name}"?`}
        />
      )}
    </>
  );
};

export default SponsorsManagement;
