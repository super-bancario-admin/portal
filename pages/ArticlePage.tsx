import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Article } from '../types';
import { useData } from '../hooks/useData';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { news, blog, loading } = useData();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (!loading && slug) {
      const allArticles = [...news, ...blog];
      const foundArticle = allArticles.find(a => a.slug === slug);
      setArticle(foundArticle || null);
    }
  }, [slug, news, blog, loading]);

  if (loading) {
    return <div className="text-center py-20">A carregar artigo...</div>;
  }

  if (!article) {
    return <div className="text-center py-20">Artigo não encontrado.</div>;
  }

  const formattedDate = new Date(article.published_at).toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div>
      <div className="relative h-96 bg-gray-800">
        <img src={article.cover_image_url} alt={article.title} className="w-full h-full object-cover opacity-50"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 container mx-auto text-white">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 text-sm mb-2">
                {article.categories.map(cat => <span key={cat} className="font-semibold">{cat}</span>)}
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold">{article.title}</h1>
            <div className="flex items-center space-x-4 mt-4 text-gray-300">
                <span>{article.author}</span>
                <span>•</span>
                <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <article 
            className="prose lg:prose-xl max-w-none text-brand-grey-dark"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags</h3>
            <div>
              {article.tags.map((tag) => (
                <span key={tag} className="inline-block bg-brand-gold-light text-brand-teal-dark text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
