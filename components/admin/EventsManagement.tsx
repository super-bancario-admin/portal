import React, { useState } from 'react';
import Button from '../common/Button';
import { useData } from '../../hooks/useData';
import type { Event } from '../../types';
import ConfirmationModal from '../common/ConfirmationModal';
import { useAuth } from '../../hooks/useAuth';

const EventsManagement: React.FC = () => {
  const { events, deleteEvent } = useData();
  const { user } = useAuth();
  
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleOpenDeleteModal = (event: Event) => {
    setDeletingEvent(event);
    setIsConfirmModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingEvent) {
        deleteEvent(deletingEvent.id);
    }
  };
  
  // Assuming all authenticated users with content creation rights can manage events
  const canManageEvents = user?.permissions.createContent;

  return (
    <>
      <section>
          <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-serif font-bold text-brand-teal-dark">Gestão de Eventos</h2>
              {canManageEvents && (
                <Button size="sm" onClick={() => alert('Funcionalidade de Criar Novo Evento a ser implementada.')}>Criar Novo Evento</Button>
              )}
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-brand-grey-dark">
                    <thead className="text-xs text-brand-grey-medium uppercase bg-brand-grey-warm">
                        <tr>
                            <th scope="col" className="px-6 py-3">Título do Evento</th>
                            <th scope="col" className="px-6 py-3">Data</th>
                            <th scope="col" className="px-6 py-3">Local</th>
                            <th scope="col" className="px-6 py-3">Vagas</th>
                            <th scope="col" className="px-6 py-3 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                            <tr key={event.id} className="bg-white border-b hover:bg-brand-grey-warm">
                                <td className="px-6 py-4 font-semibold">{event.title}</td>
                                <td className="px-6 py-4">{event.date}</td>
                                <td className="px-6 py-4">{event.location}</td>
                                <td className="px-6 py-4">{event.attendees} / {event.capacity}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                  {canManageEvents && (
                                    <>
                                      <button 
                                          className="font-medium text-brand-teal-deep hover:underline"
                                          onClick={() => alert('Funcionalidade de Editar Evento a ser implementada.')}
                                      >
                                          Editar
                                      </button>
                                      <button 
                                          className="font-medium text-brand-alert hover:underline"
                                          onClick={() => handleOpenDeleteModal(event)}
                                      >
                                          Apagar
                                      </button>
                                    </>
                                  )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
      </section>

      {deletingEvent && (
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Apagar Evento"
                message={`Tem a certeza que deseja apagar o evento "${deletingEvent.title}"? Esta ação não pode ser revertida.`}
            />
        )}
    </>
  );
};

export default EventsManagement;
