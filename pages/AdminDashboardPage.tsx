import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from '../components/admin/DashboardLayout';
import AnalyticsOverview from '../components/admin/AnalyticsOverview';
import UserManagement from '../components/admin/UserManagement';
import ContentManagement from '../components/admin/ContentManagement';
import EventsManagement from '../components/admin/EventsManagement';
import SponsorsManagement from '../components/admin/SponsorsManagement';
import BannersManagement from '../components/admin/BannersManagement';
import ActivityLog from '../components/admin/ActivityLog';
import PageTitle from '../components/common/PageTitle';
import Sidebar from '../components/admin/Sidebar';
import type { Permissions } from '../types';

export type AdminView = 'analytics' | 'users' | 'content-news' | 'content-blogs' | 'content-events' | 'content-sponsors' | 'banners' | 'activity-log';

const getInitialView = (permissions: Permissions): AdminView => {
    if (permissions.viewAllAnalytics || permissions.viewLimitedAnalytics) {
        return 'analytics';
    }
    if (permissions.manageAdmins || permissions.manageManagers || permissions.manageBloggers) {
        return 'users';
    }
    return 'content-news';
};


const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // Or a loading/error state, though ProtectedRoute should prevent this
  }

  const { permissions } = user;
  const [activeView, setActiveView] = useState<AdminView>(getInitialView(permissions));

  const renderActiveView = () => {
    switch (activeView) {
      case 'analytics':
        return (permissions.viewAllAnalytics || permissions.viewLimitedAnalytics) && <AnalyticsOverview permissions={permissions} />;
      case 'users':
        return (permissions.manageAdmins || permissions.manageManagers || permissions.manageBloggers) && <UserManagement permissions={permissions} />;
      case 'content-news':
        return <ContentManagement permissions={permissions} initialTab="news" />;
      case 'content-blogs':
        return <ContentManagement permissions={permissions} initialTab="blog" />;
      case 'content-events':
        return <EventsManagement />;
      case 'content-sponsors':
        return <SponsorsManagement />;
      case 'banners':
        return <BannersManagement />;
      case 'activity-log':
        return (permissions.viewAllAnalytics) && <ActivityLog />;
      default:
        return null;
    }
  }

  return (
    <div>
        <PageTitle 
            title="Painel de Administração"
            subtitle={`Bem-vindo, ${user.username}.`}
        />
        <DashboardLayout 
            sidebar={
                <Sidebar 
                    permissions={permissions} 
                    activeView={activeView} 
                    setActiveView={setActiveView} 
                />
            }
        >
            {renderActiveView()}
        </DashboardLayout>
    </div>
  );
};

export default AdminDashboardPage;
