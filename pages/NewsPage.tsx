import React from 'react';
import ArticleCard from '../components/common/ArticleCard';
import PageTitle from '../components/common/PageTitle';
import { useData } from '../hooks/useData';

const NewsPage: React.FC = () => {
  const { news, loading } = useData();
  const sortedNews = [...news].sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

  return (
    <div>
      <PageTitle 
        title="Notícias"
        subtitle="Mantenha-se informado sobre as principais novidades e desenvolvimentos do setor bancário angolano"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center">A carregar notícias...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedNews.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
