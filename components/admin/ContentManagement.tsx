import React, { useState, useEffect } from 'react';
import type { Permissions, Article } from '../../types';
import { useData } from '../../hooks/useData';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import ArticleCard from '../common/ArticleCard';
import ConfirmationModal from '../common/ConfirmationModal';
import { ArticleType } from '../../types';

interface ContentManagementProps {
    permissions: Permissions;
    initialTab?: 'news' | 'blog';
}

const ContentManagement: React.FC<ContentManagementProps> = ({ permissions, initialTab = 'news' }) => {
    const { user: currentUser } = useAuth();
    const { news, blog, deleteArticle } = useData();
    const [contentType, setContentType] = useState<'news' | 'blog'>(initialTab);
    
    // Modal State
    const [deletingArticle, setDeletingArticle] = useState<Article | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    
    useEffect(() => {
        setContentType(initialTab);
    }, [initialTab]);
    
    const handleOpenDeleteModal = (article: Article) => {
        setDeletingArticle(article);
        setIsConfirmModalOpen(true);
    };
    
    const handleDeleteConfirm = () => {
        if (deletingArticle) {
            deleteArticle(deletingArticle.id, deletingArticle.type);
        }
    };
    
    const canManageArticle = (article: Article): boolean => {
        if (!currentUser) return false;
        if (permissions.fullBlogCRUD || permissions.fullNewsCRUD) return true;
        if (permissions.crudOwnContent && article.author === currentUser.username) return true;
        return false;
    };

    // Filter content based on user role
    let contentToDisplay: Article[];
    const allContent = contentType === 'news' ? news : blog;
    
    if (permissions.fullNewsCRUD || permissions.fullBlogCRUD) {
        contentToDisplay = allContent;
    } else if (permissions.crudOwnContent && currentUser) {
        contentToDisplay = allContent.filter(article => article.author === currentUser.username);
    } else {
        contentToDisplay = [];
    }

    return (
        <>
            <section>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                    <h2 className="text-3xl font-serif font-bold text-brand-teal-dark">
                        Gestão de {contentType === 'news' ? 'Notícias' : 'Blog'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center p-1 bg-brand-grey-warm rounded-lg">
                            <button 
                                onClick={() => setContentType('news')}
                                className={`px-4 py-1 text-sm font-semibold rounded-md transition-colors ${contentType === 'news' ? 'bg-white shadow' : 'text-brand-grey-medium'}`}
                            >
                                Notícias
                            </button>
                            <button 
                                 onClick={() => setContentType('blog')}
                                className={`px-4 py-1 text-sm font-semibold rounded-md transition-colors ${contentType === 'blog' ? 'bg-white shadow' : 'text-brand-grey-medium'}`}
                            >
                                Blog
                            </button>
                        </div>
                        {permissions.createContent && (
                            <Button size="sm" onClick={() => alert('Funcionalidade de Criar Novo a ser implementada.')}>Criar Novo</Button>
                        )}
                    </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {contentToDisplay.map(article => (
                        <div key={article.id} className="relative group">
                            <ArticleCard article={article} />
                            <div className="absolute top-0 left-0 w-full h-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button 
                                    size="sm" 
                                    variant="secondary"
                                    disabled={!canManageArticle(article)}
                                    onClick={() => alert('Funcionalidade de Editar a ser implementada.')}
                                >
                                    Editar
                                </Button>
                                <Button
                                    size="sm"
                                    className="bg-brand-alert hover:bg-red-700 focus:ring-red-500"
                                    disabled={!canManageArticle(article)}
                                    onClick={() => handleOpenDeleteModal(article)}
                                >
                                    Apagar
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            
            {deletingArticle && (
                <ConfirmationModal
                    isOpen={isConfirmModalOpen}
                    onClose={() => setIsConfirmModalOpen(false)}
                    onConfirm={handleDeleteConfirm}
                    title={`Apagar ${deletingArticle.type === ArticleType.News ? 'Notícia' : 'Artigo de Blog'}`}
                    message={`Tem a certeza que deseja apagar "${deletingArticle.title}"? Esta ação não pode ser revertida.`}
                />
            )}
        </>
    );
};

export default ContentManagement;
