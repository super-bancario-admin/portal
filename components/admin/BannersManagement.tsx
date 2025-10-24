import React from 'react';
import Button from '../common/Button';

const BannersManagement: React.FC = () => {
  return (
    <section>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-serif font-bold text-brand-teal-dark">Gestão de Banners</h2>
            <Button size="sm">Adicionar Banner</Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-brand-grey-medium">A área de gestão de banners será implementada aqui.</p>
        </div>
    </section>
  );
};

export default BannersManagement;
