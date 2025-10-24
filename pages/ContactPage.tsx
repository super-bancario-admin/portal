
import React from 'react';
import PageTitle from '../components/common/PageTitle';
import Button from '../components/common/Button';
import { MailIcon, PhoneIcon, LocationIcon } from '../components/icons/ContactIcons';
import { CONTACT_INFO } from '../constants';


const ContactInfoCard: React.FC<{ icon: React.ReactNode; title: string; content: string; href?: string }> = ({ icon, title, content, href }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-brand-gold-light text-brand-gold">
            {icon}
        </div>
        <div className="ml-4">
            <h4 className="text-lg font-semibold text-brand-grey-dark">{title}</h4>
            {href ? (
                <a href={href} className="text-brand-teal-deep hover:text-brand-gold">{content}</a>
            ) : (
                <p className="text-brand-grey-medium">{content}</p>
            )}
        </div>
    </div>
);

const ContactPage: React.FC = () => {
    return (
        <div>
            <PageTitle
                title="Entre em Contacto"
                subtitle="Tem alguma questão ou sugestão? A nossa equipa está pronta para ajudar."
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-serif font-bold text-brand-teal-dark mb-6">Envie-nos uma mensagem</h3>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo *</label>
                                <input type="text" id="name" placeholder="O seu nome completo" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail *</label>
                                <input type="email" id="email" placeholder="O seu endereço de e-mail" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone (opcional)</label>
                                <input type="tel" id="phone" placeholder="O seu número de telefone" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensagem *</label>
                                <textarea id="message" rows={5} placeholder="A sua mensagem" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"></textarea>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Button type="submit">Submeter</Button>
                                <Button type="reset" variant="outline">Limpar</Button>
                            </div>
                        </form>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-6">
                       <ContactInfoCard 
                            icon={<MailIcon className="h-6 w-6"/>}
                            title="E-mail"
                            content={CONTACT_INFO.email}
                            href={`mailto:${CONTACT_INFO.email}`}
                       />
                       <ContactInfoCard 
                            icon={<PhoneIcon className="h-6 w-6"/>}
                            title="Telefone"
                            content={CONTACT_INFO.phone}
                            href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                       />
                       <ContactInfoCard 
                            icon={<LocationIcon className="h-6 w-6"/>}
                            title="Endereço"
                            content={CONTACT_INFO.address}
                       />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
