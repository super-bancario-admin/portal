import React, { useState } from 'react';
import type { Permissions, User } from '../../types';
import { useData } from '../../hooks/useData';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import ConfirmationModal from '../common/ConfirmationModal';
// A new modal for the form will be created, let's call it UserFormModal
// import UserFormModal from './UserFormModal';

const RoleBadge: React.FC<{ role: User['role'] }> = ({ role }) => {
    const roleColors = {
        'Super Admin': 'bg-red-200 text-red-800',
        'Admin': 'bg-brand-gold-light text-brand-teal-dark',
        'Manager': 'bg-blue-200 text-blue-800',
        'Blogger': 'bg-green-200 text-green-800',
    };
    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${roleColors[role]}`}>
            {role}
        </span>
    );
};


const UserManagement: React.FC<{ permissions: Permissions }> = ({ permissions }) => {
  const { user: currentUser } = useAuth();
  const { users, deleteUser } = useData();
  
  // State for modals
  // const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  // const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleOpenDeleteModal = (user: User) => {
    setDeletingUser(user);
    setIsConfirmModalOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    if (deletingUser) {
        deleteUser(deletingUser.id);
    }
  };

  const canEditOrDelete = (targetUser: User): boolean => {
    if (!currentUser) return false;
    // Super admin can edit anyone except themselves
    if (currentUser.role === 'Super Admin') {
        return currentUser.id !== targetUser.id;
    }
    // Admin can edit managers and bloggers
    if (currentUser.role === 'Admin') {
        return targetUser.role === 'Manager' || targetUser.role === 'Blogger';
    }
    return false;
  };
  
  const canAddUser = permissions.manageManagers || permissions.manageAdmins;

  return (
    <>
        <section>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-serif font-bold text-brand-teal-dark">Gestão de Utilizadores</h2>
                {canAddUser && (
                     <Button size="sm" onClick={() => alert('Funcionalidade de Adicionar Utilizador a ser implementada.')}>Adicionar Utilizador</Button>
                )}
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-brand-grey-dark">
                        <thead className="text-xs text-brand-grey-medium uppercase bg-brand-grey-warm">
                            <tr>
                                <th scope="col" className="px-6 py-3">Utilizador</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Função</th>
                                <th scope="col" className="px-6 py-3 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="bg-white border-b hover:bg-brand-grey-warm">
                                    <td className="px-6 py-4 font-semibold">{user.username}</td>
                                    <td className="px-6 py-4">{user.email || 'N/A'}</td>
                                    <td className="px-6 py-4">
                                        <RoleBadge role={user.role} />
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button 
                                            className="font-medium text-brand-teal-deep hover:underline disabled:text-gray-400 disabled:no-underline"
                                            disabled={!canEditOrDelete(user)}
                                            onClick={() => alert('Funcionalidade de Editar Utilizador a ser implementada.')}
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            className="font-medium text-brand-alert hover:underline disabled:text-gray-400 disabled:no-underline"
                                            disabled={!canEditOrDelete(user)}
                                            onClick={() => handleOpenDeleteModal(user)}
                                        >
                                            Apagar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        
        {deletingUser && (
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Apagar Utilizador"
                message={`Tem a certeza que deseja apagar o utilizador "${deletingUser.username}"? Esta ação não pode ser revertida.`}
            />
        )}
    </>
  );
};

export default UserManagement;
