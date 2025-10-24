import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Modal from '../common/Modal';
import Button from '../common/Button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(identifier, password);
    
    setIsLoading(false);

    if (success) {
      onClose();
      navigate('/admin-dashboard');
    } else {
      setError('Credenciais inválidas. Por favor, tente novamente.');
    }
  };

  const handleClose = () => {
    // Reset state on close
    setIdentifier('');
    setPassword('');
    setError('');
    setIsLoading(false);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Acesso Restrito">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="identifier" className="block text-sm font-medium text-gray-300">
            Utilizador ou E-mail
          </label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="mt-1 block w-full bg-brand-teal-deep border-gray-500 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
            placeholder="O seu utilizador ou e-mail"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Palavra-passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full bg-brand-teal-deep border-gray-500 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
            placeholder="A sua palavra-passe"
          />
        </div>
        
        {error && (
            <div className="bg-brand-alert/20 border border-brand-alert text-brand-alert px-4 py-2 rounded-md text-sm">
                {error}
            </div>
        )}

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'A autenticar...' : 'Login'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;
