
import React from 'react';
import { Link } from 'react-router-dom';
import { SerBancarioLogo } from '../icons/SerBancarioLogo';
import { AlioAnalyticsLogo } from '../icons/AlioAnalyticsLogo';
import { InstagramIcon, LinkedInIcon } from '../icons/SocialIcons';
import { MailIcon, PhoneIcon, LocationIcon } from '../icons/ContactIcons';
import { SOCIAL_LINKS, CONTACT_INFO } from '../../constants';

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-grey-warm text-brand-grey-medium border-t border-brand-grey-light">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Column 1: Logo and About */}
                    <div className="space-y-4">
                        <SerBancarioLogo className="h-10 text-brand-grey-dark" />
                        <p className="text-sm">
                            O principal portal de notícias e análises do setor bancário angolano. Informação de qualidade para profissionais do mercado financeiro.
                        </p>
                        <div className="flex space-x-4">
                             <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal-deep">
                                <LinkedInIcon className="h-5 w-5" />
                            </a>
                            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal-deep">
                                <InstagramIcon className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Navigation */}
                    <div>
                        <h3 className="font-semibold text-brand-grey-dark mb-4">Navegação</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-brand-teal-deep">Início</Link></li>
                            <li><Link to="/noticias" className="hover:text-brand-teal-deep">Notícias</Link></li>
                            <li><Link to="/blog" className="hover:text-brand-teal-deep">Blog</Link></li>
                            <li><Link to="/eventos" className="hover:text-brand-teal-deep">Eventos</Link></li>
                            <li><Link to="/sobre-nos" className="hover:text-brand-teal-deep">Sobre Nós</Link></li>
                            <li><Link to="/contacto" className="hover:text-brand-teal-deep">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h3 className="font-semibold text-brand-grey-dark mb-4">Contacto</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start">
                                <MailIcon className="h-4 w-4 mr-3 mt-1 flex-shrink-0" />
                                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-brand-teal-deep">{CONTACT_INFO.email}</a>
                            </li>
                            <li className="flex items-start">
                                <PhoneIcon className="h-4 w-4 mr-3 mt-1 flex-shrink-0" />
                                <span>{CONTACT_INFO.phone}</span>
                            </li>
                            <li className="flex items-start">
                                <LocationIcon className="h-4 w-4 mr-3 mt-1 flex-shrink-0" />
                                <span>{CONTACT_INFO.address}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Legal */}
                    <div>
                        <h3 className="font-semibold text-brand-grey-dark mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/politica-de-privacidade" className="hover:text-brand-teal-deep">Política de Privacidade</Link></li>
                            <li><Link to="/termos-e-condicoes" className="hover:text-brand-teal-deep">Termos e Condições</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-brand-grey-light flex flex-col sm:flex-row justify-between items-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Ser Bancário. Todos os direitos reservados.</p>
                    <div className="flex items-center mt-4 sm:mt-0">
                        <span className="mr-2">Desenvolvido por</span>
                        <a href="https://www.alio.ao" target="_blank" rel="noopener noreferrer">
                            <AlioAnalyticsLogo className="h-6" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;