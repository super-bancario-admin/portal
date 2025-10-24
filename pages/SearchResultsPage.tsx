import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import type { Article, Event } from '../types';
import { useData } from '../hooks/useData';
import PageTitle from '../components/common/PageTitle';
import ArticleCard from '../components/common/ArticleCard';

const EventResultCard: React.FC<{ event: Event }> = ({ event }) => (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 border-l-4 border-brand-gold">
         <div className="bg-brand-gold text-white text-center rounded-md p-3 flex-shrink-0">
            <span className="block text-2xl font-bold leading-none">{event.date.split(' ')[0]}</span>
            <span className="block text-sm uppercase leading-none">{event.date.split(' ')[1]}</span>
        </div>
        <div>
            <h3 className="text-lg font-bold font-serif text-brand-grey-dark">
                <Link to={`/eventos/${event.slug}`} className="hover:text-brand-gold transition-colors duration-300">{event.title}</Link>
            </h3>
            <p className="text-sm text-brand-grey-medium">{event.time} • {event.location}</p>
        </div>
    </div>
);


const SearchResultsPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const { searchContent, loading: dataLoading } = useData();

    const [newsResults, setNewsResults] = useState<Article[]>([]);
    const [blogResults, setBlogResults] = useState<Article[]>([]);
    const [eventResults, setEventResults] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        if (query) {
            setLoading(true);
            const results = searchContent(query);
            setNewsResults(results.news);
            setBlogResults(results.blog);
            setEventResults(results.events);
            setTotalResults(results.news.length + results.blog.length + results.events.length);
            setLoading(false);
        } else {
            setLoading(false);
            setNewsResults([]);
            setBlogResults([]);
            setEventResults([]);
            setTotalResults(0);
        }
    }, [query, searchContent]);
    
    const isLoading = dataLoading || loading;

    return (
        <div>
            <PageTitle
                title="Resultados da Pesquisa"
                subtitle={query ? `A mostrar ${totalResults} resultados para "${query}"` : "Por favor, introduza um termo de pesquisa."}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {isLoading ? (
                    <div className="text-center text-brand-grey-medium">A pesquisar...</div>
                ) : totalResults > 0 ? (
                    <div className="space-y-16">
                        {newsResults.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-serif font-bold text-brand-teal-dark mb-8">Notícias Encontradas</h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {newsResults.map(article => <ArticleCard key={article.id} article={article} />)}
                                </div>
                            </section>
                        )}
                        {blogResults.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-serif font-bold text-brand-teal-dark mb-8">Artigos de Blog Encontrados</h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {blogResults.map(article => <ArticleCard key={article.id} article={article} />)}
                                </div>
                            </section>
                        )}
                        {eventResults.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-serif font-bold text-brand-teal-dark mb-8">Eventos Encontrados</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {eventResults.map(event => <EventResultCard key={event.id} event={event} />)}
                                </div>
                            </section>
                        )}
                    </div>
                ) : query && (
                    <div className="text-center text-brand-grey-medium">
                        <p>Nenhum resultado encontrado para a sua pesquisa.</p>
                        <p className="mt-2 text-sm">Tente usar termos diferentes ou mais gerais.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResultsPage;
