import React from 'react';
import ArticleCard from '../components/common/ArticleCard';
import PageTitle from '../components/common/PageTitle';
import { useData } from '../hooks/useData';

const BlogPage: React.FC = () => {
  const { blog, loading } = useData();
  const sortedPosts = [...blog].sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

  return (
    <div>
      <PageTitle 
        title="Blog & Análises"
        subtitle="Insights, opiniões e análises aprofundadas sobre o setor bancário angolano"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center">A carregar artigos...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
