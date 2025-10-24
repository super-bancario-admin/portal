import React from 'react';

interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ sidebar, children }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <aside className="lg:w-1/4 xl:w-1/5">
                {sidebar}
            </aside>
            
            <main className="w-full lg:w-3/4 xl:w-4/5">
                {children}
            </main>
        </div>
    </div>
  );
};

export default DashboardLayout;