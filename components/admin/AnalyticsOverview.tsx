import React from 'react';
import type { Permissions } from '../../types';
import { useData } from '../../hooks/useData';

const StatCard: React.FC<{ title: string; value: string | number; description: string }> = ({ title, value, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-brand-teal-deep">
        <h3 className="text-sm font-semibold text-brand-grey-medium uppercase tracking-wider">{title}</h3>
        <p className="text-4xl font-bold text-brand-teal-dark mt-2">{value}</p>
        <p className="text-xs text-brand-grey-medium mt-1">{description}</p>
    </div>
);

const AnalyticsOverview: React.FC<{ permissions: Permissions }> = ({ permissions }) => {
  const { users, news, blog } = useData();
  
  return (
    <section>
        <h2 className="text-3xl font-serif font-bold text-brand-teal-dark mb-6">Visão Geral</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {permissions.viewAllAnalytics && (
                <StatCard 
                    title="Total de Utilizadores" 
                    value={users.length} 
                    description="Super Admin, Admin, Manager, Blogger"
                />
            )}
            <StatCard 
                title="Notícias Publicadas" 
                value={news.length} 
                description="Total de artigos de notícias"
            />
            <StatCard 
                title="Posts de Blog" 
                value={blog.length} 
                description="Total de análises e opiniões"
            />
            <StatCard 
                title="Tráfego (Exemplo)" 
                value="12.8k" 
                description="Visitas nos últimos 30 dias"
            />
        </div>
    </section>
  );
};

export default AnalyticsOverview;
