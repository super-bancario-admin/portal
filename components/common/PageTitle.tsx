
import React from 'react';

interface PageTitleProps {
  title: string;
  subtitle: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-brand-grey-warm py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-teal-dark">{title}</h1>
        <div className="w-24 h-1 bg-brand-gold mx-auto my-4"></div>
        <p className="mt-4 text-lg text-brand-grey-medium max-w-2xl mx-auto">{subtitle}</p>
      </div>
    </div>
  );
};

export default PageTitle;
