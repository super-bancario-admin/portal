import React, { useState } from 'react';
import type { Permissions } from '../../types';
import type { AdminView } from '../../pages/AdminDashboardPage';
import { 
    AnalyticsIcon, 
    UsersIcon, 
    ContentIcon,
    NewsIcon,
    BlogIcon,
    EventIcon,
    SponsorIcon,
    BannerIcon,
    ChevronDownIcon,
    ActivityLogIcon
} from '../icons/AdminDashboardIcons';

interface SidebarProps {
  permissions: Permissions;
  activeView: AdminView;
  setActiveView: (view: AdminView) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isSubItem?: boolean;
}> = ({ icon, label, isActive, onClick, isSubItem = false }) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`w-full flex items-center py-3 text-sm font-semibold rounded-lg transition-colors duration-200 ${ isSubItem ? 'px-4' : 'px-4' } ${
          isActive
            ? 'bg-brand-teal-deep text-white'
            : `text-brand-grey-dark hover:bg-brand-grey-warm ${isSubItem ? 'hover:bg-brand-gold-light' : ''}`
        }`}
      >
        {icon}
        <span className="ml-3">{label}</span>
      </button>
    </li>
  );
};


const Sidebar: React.FC<SidebarProps> = ({ permissions, activeView, setActiveView }) => {
    const [isContentMenuOpen, setIsContentMenuOpen] = useState(activeView.startsWith('content-'));
    
    const isContentActive = activeView.startsWith('content-');

  return (
    <div className="bg-white p-4 rounded-lg shadow-md sticky top-28">
      <nav>
        <ul className="space-y-1">
          {(permissions.viewAllAnalytics || permissions.viewLimitedAnalytics) && (
            <NavItem
              icon={<AnalyticsIcon className="h-5 w-5" />}
              label="Visão Geral"
              isActive={activeView === 'analytics'}
              onClick={() => setActiveView('analytics')}
            />
          )}
          {(permissions.manageAdmins || permissions.manageManagers || permissions.manageBloggers) && (
            <NavItem
              icon={<UsersIcon className="h-5 w-5" />}
              label="Gestão de Utilizadores"
              isActive={activeView === 'users'}
              onClick={() => setActiveView('users')}
            />
          )}
          
          {/* Collapsible Content Management Menu */}
          <li>
            <button
                onClick={() => setIsContentMenuOpen(!isContentMenuOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-lg transition-colors duration-200 ${
                    isContentActive ? 'bg-brand-gold-light text-brand-teal-dark' : 'text-brand-grey-dark hover:bg-brand-grey-warm'
                }`}
            >
                <div className="flex items-center">
                    <ContentIcon className="h-5 w-5" />
                    <span className="ml-3">Gestão de Conteúdo</span>
                </div>
                <ChevronDownIcon className={`h-5 w-5 transition-transform ${isContentMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            {isContentMenuOpen && (
                <ul className="pl-6 pt-2 space-y-1">
                    <NavItem 
                        icon={<NewsIcon className="h-5 w-5" />}
                        label="Notícias"
                        isActive={activeView === 'content-news'}
                        onClick={() => setActiveView('content-news')}
                        isSubItem
                    />
                     <NavItem 
                        icon={<BlogIcon className="h-5 w-5" />}
                        label="Blogs"
                        isActive={activeView === 'content-blogs'}
                        onClick={() => setActiveView('content-blogs')}
                        isSubItem
                    />
                    <NavItem 
                        icon={<EventIcon className="h-5 w-5" />}
                        label="Eventos"
                        isActive={activeView === 'content-events'}
                        onClick={() => setActiveView('content-events')}
                        isSubItem
                    />
                     <NavItem 
                        icon={<SponsorIcon className="h-5 w-5" />}
                        label="Parceiros"
                        isActive={activeView === 'content-sponsors'}
                        onClick={() => setActiveView('content-sponsors')}
                        isSubItem
                    />
                </ul>
            )}
          </li>

          {/* Banners Menu Item */}
          <NavItem
            icon={<BannerIcon className="h-5 w-5" />}
            label="Banners"
            isActive={activeView === 'banners'}
            onClick={() => setActiveView('banners')}
          />
          
          {/* Activity Log Menu Item */}
          {permissions.viewAllAnalytics && (
             <NavItem
                icon={<ActivityLogIcon className="h-5 w-5" />}
                label="Log de Atividades"
                isActive={activeView === 'activity-log'}
                onClick={() => setActiveView('activity-log')}
            />
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
