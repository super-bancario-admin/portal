import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NewsPage from './pages/NewsPage';
import BlogPage from './pages/BlogPage';
import EventsPage from './pages/EventsPage';
import ArticlePage from './pages/ArticlePage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import SearchResultsPage from './pages/SearchResultsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <HashRouter>
          <div className="bg-white text-brand-grey-dark font-sans flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/noticias" element={<NewsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/eventos" element={<EventsPage />} />
                <Route path="/eventos/:slug" element={<EventDetailsPage />} />
                <Route path="/sobre-nos" element={<AboutPage />} />
                <Route path="/contacto" element={<ContactPage />} />
                <Route path="/artigo/:slug" element={<ArticlePage />} />
                <Route path="/pesquisa" element={<SearchResultsPage />} />
                <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
                <Route path="/termos-e-condicoes" element={<TermsAndConditionsPage />} />

                {/* Admin Route */}
                <Route 
                  path="/admin-dashboard" 
                  element={
                    <ProtectedRoute>
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
