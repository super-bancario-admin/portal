import React, { createContext, useState, useEffect } from 'react';
import type { User, Article, Event, Sponsor, LogEntry } from '../types';
import {
    users as seedUsers,
    news as seedNews,
    blog as seedBlog,
    events as seedEvents,
    sponsors as seedSponsors
} from '../data/seed';
import { ArticleType } from '../types';
import { useAuth } from '../hooks/useAuth';
import { fetchArticles, fetchEvents, fetchSponsors } from '../services/firestore';

interface DataContextType {
  loading: boolean;
  users: User[];
  news: Article[];
  blog: Article[];
  events: Event[];
  sponsors: Sponsor[];
  activityLog: LogEntry[];
  
  // User CRUD
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: number) => void;
  
  // Article CRUD
  addArticle: (article: Omit<Article, 'id'>) => void;
  updateArticle: (article: Article) => void;
  deleteArticle: (articleId: number, type: ArticleType) => void;

  // Event CRUD
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (eventId: number) => void;

  // Sponsor CRUD
  addSponsor: (sponsor: Omit<Sponsor, 'id'>) => void;
  updateSponsor: (sponsor: Sponsor) => void;
  deleteSponsor: (sponsorId: number) => void;

  // Event Reservation
  addEventAttendee: (eventId: number) => void;

  // Search
  searchContent: (query: string) => { news: Article[], blog: Article[], events: Event[] };
}

export const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>(seedUsers);
  const [news, setNews] = useState<Article[]>(seedNews);
  const [blog, setBlog] = useState<Article[]>(seedBlog);
  const [events, setEvents] = useState<Event[]>(seedEvents);
  const [sponsors, setSponsors] = useState<Sponsor[]>(seedSponsors);
  const [activityLog, setActivityLog] = useState<LogEntry[]>([]);

  useEffect(() => {
    const loadFirestoreData = async () => {
      setLoading(true);
      try {
        const [articlesData, eventsData, sponsorsData] = await Promise.all([
          fetchArticles(),
          fetchEvents(),
          fetchSponsors()
        ]);

        const newsArticles = articlesData.filter(a => a.type === ArticleType.News);
        const blogArticles = articlesData.filter(a => a.type === ArticleType.Blog);

        if (newsArticles.length > 0) setNews(newsArticles);
        if (blogArticles.length > 0) setBlog(blogArticles);
        if (eventsData.length > 0) setEvents(eventsData);
        if (sponsorsData.length > 0) setSponsors(sponsorsData);
      } catch (error) {
        console.error('Error loading Firestore data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFirestoreData();
  }, []);

  const addLogEntry = (action: string, details: string) => {
    if (!currentUser) return; // Don't log if no user is performing the action
    const newLogEntry: LogEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      user: currentUser.username,
      action,
      details,
    };
    setActivityLog(prev => [newLogEntry, ...prev]);
  };

  // --- User CRUD ---
  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: Date.now() };
    addLogEntry('CREATE_USER', `Utilizador "${newUser.username}" foi criado com a função "${newUser.role}".`);
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (updatedUser: User) => {
    addLogEntry('UPDATE_USER', `Utilizador "${updatedUser.username}" (ID: ${updatedUser.id}) foi atualizado.`);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  };
  
  const deleteUser = (userId: number) => {
    const userToDelete = users.find(u => u.id === userId);
    if (userToDelete) {
        addLogEntry('DELETE_USER', `Utilizador "${userToDelete.username}" (ID: ${userId}) foi apagado.`);
        setUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  // --- Article CRUD ---
  const addArticle = (article: Omit<Article, 'id'>) => {
    const newArticle = { ...article, id: Date.now() };
    addLogEntry('CREATE_ARTICLE', `Artigo "${newArticle.title}" (${article.type}) foi criado.`);
    if (article.type === ArticleType.News) {
      setNews(prev => [newArticle, ...prev]);
    } else {
      setBlog(prev => [newArticle, ...prev]);
    }
  };

  const updateArticle = (updatedArticle: Article) => {
    addLogEntry('UPDATE_ARTICLE', `Artigo "${updatedArticle.title}" (ID: ${updatedArticle.id}) foi atualizado.`);
     if (updatedArticle.type === ArticleType.News) {
      setNews(prev => prev.map(a => a.id === updatedArticle.id ? updatedArticle : a));
    } else {
      setBlog(prev => prev.map(a => a.id === updatedArticle.id ? updatedArticle : a));
    }
  };

  const deleteArticle = (articleId: number, type: ArticleType) => {
    const articleSource = type === ArticleType.News ? news : blog;
    const articleToDelete = articleSource.find(a => a.id === articleId);
    if (articleToDelete) {
      addLogEntry('DELETE_ARTICLE', `Artigo "${articleToDelete.title}" (ID: ${articleId}) foi apagado.`);
      if (type === ArticleType.News) {
        setNews(prev => prev.filter(a => a.id !== articleId));
      } else {
        setBlog(prev => prev.filter(a => a.id !== articleId));
      }
    }
  };

  // --- Event CRUD ---
   const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: Date.now() };
    addLogEntry('CREATE_EVENT', `Evento "${newEvent.title}" foi criado.`);
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (updatedEvent: Event) => {
    addLogEntry('UPDATE_EVENT', `Evento "${updatedEvent.title}" (ID: ${updatedEvent.id}) foi atualizado.`);
    setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };
  
  const deleteEvent = (eventId: number) => {
    const eventToDelete = events.find(e => e.id === eventId);
    if (eventToDelete) {
      addLogEntry('DELETE_EVENT', `Evento "${eventToDelete.title}" (ID: ${eventId}) foi apagado.`);
      setEvents(prev => prev.filter(e => e.id !== eventId));
    }
  };

  // --- Sponsor CRUD ---
  const addSponsor = (sponsor: Omit<Sponsor, 'id'>) => {
    const newSponsor = { ...sponsor, id: Date.now() };
    addLogEntry('CREATE_SPONSOR', `Parceiro "${newSponsor.name}" foi adicionado.`);
    setSponsors(prev => [...prev, newSponsor]);
  };

  const updateSponsor = (updatedSponsor: Sponsor) => {
    addLogEntry('UPDATE_SPONSOR', `Parceiro "${updatedSponsor.name}" (ID: ${updatedSponsor.id}) foi atualizado.`);
    setSponsors(prev => prev.map(s => s.id === updatedSponsor.id ? updatedSponsor : s));
  };

  const deleteSponsor = (sponsorId: number) => {
    const sponsorToDelete = sponsors.find(s => s.id === sponsorId);
    if (sponsorToDelete) {
      addLogEntry('DELETE_SPONSOR', `Parceiro "${sponsorToDelete.name}" (ID: ${sponsorId}) foi apagado.`);
      setSponsors(prev => prev.filter(s => s.id !== sponsorId));
    }
  };

  // --- Event Reservation ---
  const addEventAttendee = (eventId: number) => {
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, attendees: e.attendees + 1} : e));
  };
  
  // --- Search ---
  const searchContent = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    
    const newsResults = news.filter(article =>
        article.title.toLowerCase().includes(lowerCaseQuery) ||
        article.excerpt.toLowerCase().includes(lowerCaseQuery) ||
        article.body.toLowerCase().includes(lowerCaseQuery) ||
        article.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
    );

    const blogResults = blog.filter(article =>
        article.title.toLowerCase().includes(lowerCaseQuery) ||
        article.excerpt.toLowerCase().includes(lowerCaseQuery) ||
        article.body.toLowerCase().includes(lowerCaseQuery) ||
        article.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
    );
    
    const eventResults = events.filter(event =>
        event.title.toLowerCase().includes(lowerCaseQuery) ||
        event.description.toLowerCase().includes(lowerCaseQuery) ||
        event.location.toLowerCase().includes(lowerCaseQuery)
    );
    
    return { news: newsResults, blog: blogResults, events: eventResults };
  };


  const value = {
    loading,
    users,
    news,
    blog,
    events,
    sponsors,
    activityLog,
    addUser,
    updateUser,
    deleteUser,
    addArticle,
    updateArticle,
    deleteArticle,
    addEvent,
    updateEvent,
    deleteEvent,
    addSponsor,
    updateSponsor,
    deleteSponsor,
    addEventAttendee,
    searchContent
  };

  return (
    <DataContext.Provider value={value}>
      {!loading && children}
    </DataContext.Provider>
  );
};
