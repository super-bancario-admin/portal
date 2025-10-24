
import React from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../../types';
import { ArticleType } from '../../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const formattedDate = new Date(article.published_at).toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col h-full">
      <Link to={`/artigo/${article.slug}`}>
        <img className="w-full h-48 object-cover" src={article.cover_image_url} alt={article.title} />
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          {article.type === ArticleType.Blog && (
            <span className="inline-block bg-brand-teal-deep text-white text-xs font-semibold px-2 py-1 rounded-full uppercase mb-2">Blog</span>
          )}
          <p className="text-sm text-brand-grey-medium">{formattedDate} • {article.author}</p>
          <h3 className="text-xl font-serif text-brand-grey-dark font-bold mt-1">
            <Link to={`/artigo/${article.slug}`} className="hover:text-brand-gold transition-colors duration-300">
              {article.title}
            </Link>
          </h3>
        </div>
        <p className="text-brand-grey-medium text-sm flex-grow">{article.excerpt}</p>
        <div className="mt-4">
          {article.tags.map((tag) => (
            <span key={tag} className="inline-block bg-brand-gold-light text-brand-teal-dark text-xs font-medium mr-2 mb-2 px-2.5 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-4">
          <Link to={`/artigo/${article.slug}`} className="font-semibold text-brand-teal-deep hover:text-brand-gold transition-colors duration-300">
            Ler Artigo Completo &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
