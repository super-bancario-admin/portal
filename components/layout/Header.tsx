import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { SerBancarioLogo } from '../icons/SerBancarioLogo';
import { InstagramIcon, LinkedInIcon, SearchIcon, UserIcon } from '../icons/SocialIcons';
import { SOCIAL_LINKS } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import LoginModal from '../auth/LoginModal';
import Button from '../common/Button';

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-sm font-semibold tracking-wider uppercase transition-colors duration-300 ${
          isActive ? 'text-brand-gold' : 'text-brand-grey-dark hover:text-brand-gold'
        }`
      }
    >
      {children}
    </NavLink>
  );
};

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/pesquisa?q=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm('');
            setIsMenuOpen(false); // Close mobile menu on search
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            <header className="bg-white sticky top-0 z-50 shadow-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex-shrink-0">
                            <Link to="/" className="flex items-center">
                                <SerBancarioLogo className="h-10 w-auto" />
                            </Link>
                        </div>
                        
                        <nav className="hidden md:flex md:items-center md:space-x-8">
                            <NavItem to="/">Início</NavItem>
                            <NavItem to="/noticias">Notícias</NavItem>
                            <NavItem to="/blog">Blog</NavItem>
                            <NavItem to="/eventos">Eventos</NavItem>
                            <NavItem to="/sobre-nos">Sobre Nós</NavItem>
                            <NavItem to="/contacto">Contacto</NavItem>
                        </nav>

                        <div className="hidden md:flex items-center space-x-4">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    placeholder="Pesquisar..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-brand-grey-warm border border-brand-grey-light rounded-full py-1 pl-4 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold-light"
                                />
                                <button type="submit" aria-label="Pesquisar" className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-grey-medium hover:text-brand-teal-deep">
                                    <SearchIcon className="h-4 w-4" />
                                </button>
                            </form>
                            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-grey-medium hover:text-brand-teal-deep">
                                <LinkedInIcon className="h-5 w-5" />
                            </a>
                            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-brand-grey-medium hover:text-brand-teal-deep">
                                <InstagramIcon className="h-5 w-5" />
                            </a>
                            {user ? (
                                <div className="relative group">
                                    <Link to="/admin-dashboard" className="text-brand-grey-medium hover:text-brand-teal-deep">
                                        <UserIcon className="h-6 w-6" />
                                    </Link>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                                        <div className="px-4 py-2 text-sm text-brand-grey-dark border-b">
                                            <p className="font-bold">{user.username}</p>
                                            <p className="text-xs text-brand-grey-medium">{user.role}</p>
                                        </div>
                                        <Link to="/admin-dashboard" className="block px-4 py-2 text-sm text-brand-grey-dark hover:bg-brand-grey-warm">Dashboard</Link>
                                        <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-brand-alert hover:bg-brand-grey-warm">
                                            Terminar Sessão
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button onClick={() => setIsLoginModalOpen(true)} className="text-brand-grey-medium hover:text-brand-teal-deep">
                                    <UserIcon className="h-6 w-6" />
                                </button>
                            )}
                        </div>
                        
                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-brand-grey-dark focus:outline-none">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                {isMenuOpen && (
                    <div className="md:hidden bg-white py-4">
                        <nav className="flex flex-col items-center space-y-4">
                            <NavItem to="/">Início</NavItem>
                            <NavItem to="/noticias">Notícias</NavItem>
                            <NavItem to="/blog">Blog</NavItem>
                            <NavItem to="/eventos">Eventos</NavItem>
                            <NavItem to="/sobre-nos">Sobre Nós</NavItem>
                            <NavItem to="/contacto">Contacto</NavItem>
                            
                            {user && <NavItem to="/admin-dashboard">Dashboard</NavItem>}

                            <div className="mt-6 w-full px-8">
                               <form onSubmit={handleSearch} className="relative">
                                    <input
                                        type="text"
                                        placeholder="Pesquisar..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-brand-grey-warm border border-brand-grey-light rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold-light"
                                    />
                                    <button type="submit" aria-label="Pesquisar" className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-grey-medium">
                                        <SearchIcon className="h-5 w-5" />
                                    </button>
                                </form>
                            </div>
                            <div className="flex space-x-4 mt-4">
                                 <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-grey-medium hover:text-brand-teal-deep">
                                    <LinkedInIcon className="h-6 w-6" />
                                </a>
                                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-brand-grey-medium hover:text-brand-teal-deep">
                                    <InstagramIcon className="h-6 w-6" />
                                </a>
                            </div>

                            <div className="mt-6 border-t w-full text-center pt-4">
                                {user ? (
                                     <Button onClick={handleLogout} variant="outline" size="sm">Terminar Sessão</Button>
                                ) : (
                                    <Button onClick={() => { setIsLoginModalOpen(true); setIsMenuOpen(false); }} variant="secondary" size="sm">
                                        Login
                                    </Button>
                                )}
                            </div>
                        </nav>
                    </div>
                )}
            </header>
            <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => setIsLoginModalOpen(false)} 
            />
        </>
    );
};

export default Header;