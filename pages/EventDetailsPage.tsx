import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Event } from '../types';
import { useData } from '../hooks/useData';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

const EventDetailsPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { events, loading, addEventAttendee } = useData();
    const [event, setEvent] = useState<Event | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    // Form state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [contactMethod, setContactMethod] = useState('email');

    useEffect(() => {
        if (slug && !loading) {
            const foundEvent = events.find(e => e.slug === slug);
            setEvent(foundEvent || null);
        }
    }, [slug, events, loading]);

    const handleReserveClick = () => {
        setIsSubmitted(false);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setCompanyName('');
        setContactMethod('email');
        setIsModalOpen(true);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ eventId: event?.id, firstName, lastName, email, phone, companyName, contactMethod });
        setIsSubmitted(true);
        if (event) {
            addEventAttendee(event.id);
        }
    };

    if (loading) {
        return <div className="text-center py-20">A carregar evento...</div>;
    }

    if (!event) {
        return <div className="text-center py-20">Evento não encontrado.</div>;
    }
    
    const spotsRemaining = event.capacity - event.attendees;

    return (
        <div>
            {/* Hero Section */}
            <div className="relative h-[50vh] bg-gray-800">
                <img src={event.cover_image_url} alt={event.title} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-brand-teal-dark/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 container mx-auto text-white">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-6xl font-serif font-bold">{event.title}</h1>
                        <p className="mt-4 text-lg text-gray-200">{event.date} • {event.time} • {event.location}</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Optional Banner Image */}
                {event.banner_image_url && (
                    <div className="mb-12">
                        <img 
                            src={event.banner_image_url} 
                            alt={`${event.title} banner`} 
                            className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-lg"
                        />
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column: Description & Gallery */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-serif font-bold text-brand-teal-dark mb-4">Sobre o Evento</h2>
                        <div className="prose lg:prose-lg max-w-none text-brand-grey-dark">
                           <p>{event.description}</p>
                        </div>

                        {event.gallery_images_urls.length > 0 && (
                             <div className="mt-12">
                                <h3 className="text-2xl font-serif font-bold text-brand-teal-dark mb-4">Galeria</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {event.gallery_images_urls.map((url, index) => (
                                        <img key={index} src={url} alt={`Gallery image ${index + 1}`} className="rounded-lg shadow-md w-full h-full object-cover" />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Details & CTA */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 bg-brand-grey-warm p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-serif font-bold text-brand-teal-dark mb-4">Detalhes</h3>
                            <ul className="space-y-3 text-brand-grey-medium">
                                <li className="flex items-center"><strong className="w-20 font-semibold text-brand-grey-dark">Data:</strong> {event.date}</li>
                                <li className="flex items-center"><strong className="w-20 font-semibold text-brand-grey-dark">Hora:</strong> {event.time}</li>
                                <li className="flex items-center"><strong className="w-20 font-semibold text-brand-grey-dark">Local:</strong> {event.location}</li>
                                <li className="flex items-center"><strong className="w-20 font-semibold text-brand-grey-dark">Vagas:</strong> 
                                    {spotsRemaining > 0 ? `${spotsRemaining} de ${event.capacity} disponíveis` : 'Esgotado'}
                                </li>
                            </ul>
                            <div className="mt-6 border-t pt-6">
                                {spotsRemaining > 0 ? (
                                    <Button onClick={handleReserveClick} className="w-full" size="lg">Reservar Vaga</Button>
                                ) : (
                                    <Button className="w-full" size="lg" disabled>Vagas Esgotadas</Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Reserva de Evento">
                {event && (
                    <>
                        <p className="text-brand-gold-light mb-1">{event.title}</p>
                        <p className="text-sm text-gray-300 mb-6">Preencha os seus dados para reservar a sua vaga.</p>
                        
                        {isSubmitted ? (
                            <div className="text-center p-4 bg-brand-success rounded-md">
                                <h3 className="font-bold text-lg">Reserva Confirmada!</h3>
                                <p className="text-sm mt-2">Obrigado por se inscrever, {firstName}. Receberá um e-mail com os detalhes da sua reserva em breve.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">Primeiro Nome *</label>
                                        <input type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required className="mt-1 block w-full bg-brand-teal-deep border border-brand-teal-light rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold" />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">Último Nome *</label>
                                        <input type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} required className="mt-1 block w-full bg-brand-teal-deep border border-brand-teal-light rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">E-mail *</label>
                                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full bg-brand-teal-deep border border-brand-teal-light rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold" />
                                </div>
                                <div>
                                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-300">Nome da Empresa (opcional)</label>
                                    <input type="text" id="companyName" value={companyName} onChange={e => setCompanyName(e.target.value)} className="mt-1 block w-full bg-brand-teal-deep border border-brand-teal-light rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Telefone</label>
                                    <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full bg-brand-teal-deep border border-brand-teal-light rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">Método de Contacto Preferencial</label>
                                    <div className="mt-2 flex space-x-4">
                                        <label className="flex items-center">
                                            <input type="radio" name="contactMethod" value="email" checked={contactMethod === 'email'} onChange={() => setContactMethod('email')} className="focus:ring-brand-gold h-4 w-4 text-brand-gold border-gray-300" />
                                            <span className="ml-2 text-gray-300">E-mail</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="radio" name="contactMethod" value="phone" checked={contactMethod === 'phone'} onChange={() => setContactMethod('phone')} className="focus:ring-brand-gold h-4 w-4 text-brand-gold border-gray-300" />
                                            <span className="ml-2 text-gray-300">Telefone</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-4 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                                    <Button type="submit">Submeter Reserva</Button>
                                </div>
                            </form>
                        )}
                    </>
                )}
            </Modal>
        </div>
    );
};

export default EventDetailsPage;
