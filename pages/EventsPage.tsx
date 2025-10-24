import React, { useState, useEffect } from 'react';
import type { Event } from '../types';
import PageTitle from '../components/common/PageTitle';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { Link } from 'react-router-dom';
import { fetchEvents, updateEventAttendees } from '../services/firestore';

const EventCard: React.FC<{ event: Event; onReserve: (event: Event) => void }> = ({ event, onReserve }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-brand-gold">
        <div className="flex items-center text-center md:text-left w-full md:w-auto">
            <div className="bg-brand-gold text-white text-center rounded-md p-4 mr-6 flex-shrink-0">
                <span className="block text-3xl font-bold leading-none">{event.date.split(' ')[0]}</span>
                <span className="block text-md uppercase tracking-wider leading-none">{event.date.split(' ')[1]}</span>
            </div>
            <div className="flex-grow">
                <h3 className="text-xl font-bold font-serif text-brand-grey-dark">
                    <Link to={`/eventos/${event.slug}`} className="hover:text-brand-gold transition-colors duration-300">
                        {event.title}
                    </Link>
                </h3>
                <p className="text-sm text-brand-grey-medium mt-1">{event.time} • {event.location}</p>
                <p className="text-sm text-brand-grey-dark mt-2 hidden md:block">
                    {event.description.substring(0, 100)}...
                </p>
            </div>
        </div>
        <div className="mt-4 md:mt-0 flex-shrink-0">
            {!event.is_past && (
                <Button onClick={() => onReserve(event)}>Reservar Vaga</Button>
            )}
        </div>
    </div>
);

const EventsPage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Form state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [contactMethod, setContactMethod] = useState('email');

    useEffect(() => {
        const loadEvents = async () => {
            setLoading(true);
            const eventsData = await fetchEvents(3);
            setEvents(eventsData);
            setLoading(false);
        };
        loadEvents();
    }, []);

    const handleReserveClick = (event: Event) => {
        setSelectedEvent(event);
        setIsSubmitted(false);
        // Reset form fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setCompanyName('');
        setContactMethod('email');
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            eventId: selectedEvent?.id,
            firstName,
            lastName,
            email,
            phone,
            companyName,
            contactMethod
        });
        setIsSubmitted(true);
        if (selectedEvent) {
            await updateEventAttendees(selectedEvent.id, selectedEvent.attendees + 1);
            const updatedEvents = await fetchEvents(3);
            setEvents(updatedEvents);
        }
    };

    const upcomingEvents = events.filter(e => !e.is_past);
    const pastEvents = events.filter(e => e.is_past);

    return (
        <div>
            <PageTitle
                title="Eventos"
                subtitle="Participe dos principais eventos do setor bancário angolano"
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {loading ? (
                    <div className="text-center">A carregar eventos...</div>
                ) : (
                    <>
                        <h2 className="text-3xl font-serif font-bold text-brand-teal-dark mb-8">Próximos Eventos</h2>
                        <div className="space-y-6">
                            {upcomingEvents.map(event => (
                                <EventCard key={event.id} event={event} onReserve={handleReserveClick} />
                            ))}
                        </div>

                        {pastEvents.length > 0 && (
                            <>
                                <h2 className="text-3xl font-serif font-bold text-brand-teal-dark mt-16 mb-8">Eventos Passados</h2>
                                <div className="space-y-6 opacity-70">
                                    {pastEvents.map(event => (
                                        <EventCard key={event.id} event={event} onReserve={() => {}} />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Reserva de Evento">
                {selectedEvent && (
                    <>
                        <p className="text-brand-gold-light mb-1">{selectedEvent.title}</p>
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

export default EventsPage;
