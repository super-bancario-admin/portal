import React from 'react';
import { Link } from 'react-router-dom';
import type { Sponsor } from '../types';
import { useData } from '../hooks/useData';
import Button from '../components/common/Button';
import ArticleCard from '../components/common/ArticleCard';


// Icons for the new feature cards
const NewsIcon: React.FC = () => (
    <svg className="w-12 h-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
);

const AnalysisIcon: React.FC = () => (
    <svg className="w-12 h-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
);

const EventsIcon: React.FC = () => (
    <svg className="w-12 h-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center">
    <div className="mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-yellow-100 max-w-xs opacity-90">{description}</p>
  </div>
);


const SectionTitle: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-brand-teal-dark">{title}</h2>
        <div className="w-20 h-1 bg-brand-gold mx-auto my-3"></div>
        <p className="text-brand-grey-medium">{subtitle}</p>
    </div>
);

const HomePage: React.FC = () => {
    const { news, blog, events, sponsors } = useData();

    const latestNews = [...news].sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()).slice(0, 3);
    const latestBlog = [...blog].sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()).slice(0, 3);
    const upcomingEvents = [...events].filter(e => !e.is_past).slice(0, 2);

    return (
        <div>
            <section
              className="relative bg-cover bg-center text-center py-20 lg:py-24"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
            >
                <div className="absolute inset-0 bg-brand-teal-dark opacity-90"></div>
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider !leading-tight font-sans">
                        <span className="text-yellow-300">O</span> Portal do <span className="text-yellow-300">Setor</span>
                        <br />
                        Bancário Angolano
                    </h1>
                    <p className="mt-6 text-lg text-yellow-100 max-w-3xl mx-auto opacity-90">
                        Informação de qualidade, análises aprofundadas e as últimas novidades do mercado financeiro em Angola
                    </p>
                    <div className="mt-10">
                        <Link to="/sobre-nos" className="inline-block bg-yellow-300 text-brand-grey-dark font-bold py-4 px-10 rounded-lg text-lg hover:bg-yellow-400 transition-colors duration-300">
                            Ler Mais &gt;
                        </Link>
                    </div>

                    <div className="mt-24 grid md:grid-cols-3 gap-y-12 gap-x-8">
                        <FeatureCard 
                            icon={<NewsIcon />} 
                            title="Notícias Exclusivas" 
                            description="Cobertura completa das principais mudanças no setor bancário" 
                        />
                        <FeatureCard 
                            icon={<AnalysisIcon />} 
                            title="Análises Profundas" 
                            description="Insights e opinião de especialistas do mercado financeiro" 
                        />
                        <FeatureCard 
                            icon={<EventsIcon />} 
                            title="Eventos Premium" 
                            description="Networking e conhecimento nos principais eventos do setor" 
                        />
                    </div>
                </div>
            </section>
            
            <section className="py-20 bg-brand-grey-warm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle title="Últimas Notícias" subtitle="Mantenha-se informado sobre as principais novidades do setor." />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestNews.map(article => <ArticleCard key={article.id} article={article} />)}
                    </div>
                    <div className="text-center mt-12">
                        <Link to="/noticias">
                            <Button variant="secondary">Ver Todas as Notícias</Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle title="Próximos Eventos" subtitle="Participe nos principais eventos do setor bancário angolano." />
                    <div className="space-y-6 max-w-4xl mx-auto">
                        {upcomingEvents.map(event => (
                            <div key={event.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-4 border-l-4 border-brand-gold">
                                <div className="flex items-center text-center md:text-left">
                                    <div className="bg-brand-gold text-white text-center rounded-md p-3 mr-6 flex-shrink-0">
                                        <span className="block text-2xl font-bold leading-none">{event.date.split(' ')[0]}</span>
                                        <span className="block text-sm uppercase leading-none">{event.date.split(' ')[1]}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold font-serif text-brand-grey-dark">
                                            <Link to={`/eventos/${event.slug}`} className="hover:text-brand-gold transition-colors duration-300">{event.title}</Link>
                                        </h3>
                                        <p className="text-sm text-brand-grey-medium">{event.time} • {event.location}</p>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <Link to={`/eventos/${event.slug}`}>
                                        <Button variant="outline" size="sm">Ver Detalhes</Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                     <div className="text-center mt-12">
                        <Link to="/eventos">
                            <Button variant="secondary">Ver Todos os Eventos</Button>
                        </Link>
                    </div>
                </div>
            </section>
            
            <section className="py-20 bg-brand-grey-warm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle title="Blog & Análises" subtitle="Insights, opiniões e análises aprofundadas sobre o setor." />
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestBlog.map(article => <ArticleCard key={article.id} article={article} />)}
                    </div>
                     <div className="text-center mt-12">
                        <Link to="/blog">
                            <Button variant="secondary">Ver Todos os Artigos</Button>
                        </Link>
                    </div>
                </div>
            </section>

             <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <SectionTitle title="Parceiros & Patrocinadores" subtitle="Em parceria com as principais instituições financeiras de Angola." />
                    <div className="relative w-full overflow-hidden group [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]">
                        <div className="flex animate-scroll whitespace-nowrap">
                            {[...sponsors, ...sponsors].map((sponsor, index) => (
                                <a 
                                    key={`${sponsor.id}-${index}`} 
                                    href={sponsor.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="inline-block mx-8 flex-shrink-0"
                                >
                                    <img 
                                        src={sponsor.logo_url} 
                                        alt={sponsor.name} 
                                        className="h-16 max-w-none opacity-70 hover:opacity-100 transition-opacity" 
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;
