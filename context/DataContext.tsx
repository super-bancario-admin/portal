import React, { createContext, useState, useEffect } from 'react';
import type { User, Article, Event, Sponsor, LogEntry } from '../types';
import { users as seedUsers } from '../data/seed';
import { ArticleType } from '../types';
import { useAuth } from '../hooks/useAuth';
import {
  fetchArticles,
  fetchEvents,
  fetchSponsors,
  createArticle as firestoreCreateArticle,
  updateArticle as firestoreUpdateArticle,
  deleteArticle as firestoreDeleteArticle,
  createEvent as firestoreCreateEvent,
  updateEvent as firestoreUpdateEvent,
  deleteEvent as firestoreDeleteEvent,
  createSponsor as firestoreCreateSponsor,
  updateSponsor as firestoreUpdateSponsor,
  deleteSponsor as firestoreDeleteSponsor,
  updateEventAttendees as firestoreUpdateEventAttendees
} from '../services/firestore';

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
  addArticle: (article: Omit<Article, 'id'>) => Promise<void>;
  updateArticle: (article: Article) => Promise<void>;
  deleteArticle: (articleId: string | number, type: ArticleType) => Promise<void>;

  // Event CRUD
  addEvent: (event: Omit<Event, 'id'>) => Promise<void>;
  updateEvent: (event: Event) => Promise<void>;
  deleteEvent: (eventId: string | number) => Promise<void>;

  // Sponsor CRUD
  addSponsor: (sponsor: Omit<Sponsor, 'id'>) => Promise<void>;
  updateSponsor: (sponsor: Sponsor) => Promise<void>;
  deleteSponsor: (sponsorId: string | number) => Promise<void>;

  // Event Reservation
  addEventAttendee: (eventId: string | number) => Promise<void>;

  // Refresh data
  refreshData: () => Promise<void>;

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

  const refreshData = async () => {
    setLoading(true);
    try {
      const [articlesData, eventsData, sponsorsData] = await Promise.all([
        fetchArticles(),
        fetchEvents(),
        fetchSponsors()
      ]);

      const newsArticles = articlesData.filter(a => a.type === ArticleType.News);
      const blogArticles = articlesData.filter(a => a.type === ArticleType.Blog);

      setNews(newsArticles);
      setBlog(blogArticles);
      setEvents(eventsData);
      setSponsors(sponsorsData);
    } catch (error) {
      console.error('Error loading Firestore data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
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
  const addArticle = async (article: Omit<Article, 'id'>) => {
    const docId = await firestoreCreateArticle(article);
    if (docId) {
      addLogEntry('CREATE_ARTICLE', `Artigo "${article.title}" (${article.type}) foi criado.`);
      await refreshData();
    }
  };

  const updateArticle = async (updatedArticle: Article) => {
    const success = await firestoreUpdateArticle(updatedArticle);
    if (success) {
      addLogEntry('UPDATE_ARTICLE', `Artigo "${updatedArticle.title}" (ID: ${updatedArticle.id}) foi atualizado.`);
      await refreshData();
    }
  };

  const deleteArticle = async (articleId: string | number, type: ArticleType) => {
    const articleSource = type === ArticleType.News ? news : blog;
    const articleToDelete = articleSource.find(a => a.id === articleId);
    if (articleToDelete) {
      const success = await firestoreDeleteArticle(articleId);
      if (success) {
        addLogEntry('DELETE_ARTICLE', `Artigo "${articleToDelete.title}" (ID: ${articleId}) foi apagado.`);
        await refreshData();
      }
    }
  };

  // --- Event CRUD ---
  const addEvent = async (event: Omit<Event, 'id'>) => {
    const docId = await firestoreCreateEvent(event);
    if (docId) {
      addLogEntry('CREATE_EVENT', `Evento "${event.title}" foi criado.`);
      await refreshData();
    }
  };

  const updateEvent = async (updatedEvent: Event) => {
    const success = await firestoreUpdateEvent(updatedEvent);
    if (success) {
      addLogEntry('UPDATE_EVENT', `Evento "${updatedEvent.title}" (ID: ${updatedEvent.id}) foi atualizado.`);
      await refreshData();
    }
  };

  const deleteEvent = async (eventId: string | number) => {
    const eventToDelete = events.find(e => e.id === eventId);
    if (eventToDelete) {
      const success = await firestoreDeleteEvent(eventId);
      if (success) {
        addLogEntry('DELETE_EVENT', `Evento "${eventToDelete.title}" (ID: ${eventId}) foi apagado.`);
        await refreshData();
      }
    }
  };

  // --- Sponsor CRUD ---
  const addSponsor = async (sponsor: Omit<Sponsor, 'id'>) => {
    const docId = await firestoreCreateSponsor(sponsor);
    if (docId) {
      addLogEntry('CREATE_SPONSOR', `Parceiro "${sponsor.name}" foi adicionado.`);
      await refreshData();
    }
  };

  const updateSponsor = async (updatedSponsor: Sponsor) => {
    const success = await firestoreUpdateSponsor(updatedSponsor);
    if (success) {
      addLogEntry('UPDATE_SPONSOR', `Parceiro "${updatedSponsor.name}" (ID: ${updatedSponsor.id}) foi atualizado.`);
      await refreshData();
    }
  };

  const deleteSponsor = async (sponsorId: string | number) => {
    const sponsorToDelete = sponsors.find(s => s.id === sponsorId);
    if (sponsorToDelete) {
      const success = await firestoreDeleteSponsor(sponsorId);
      if (success) {
        addLogEntry('DELETE_SPONSOR', `Parceiro "${sponsorToDelete.name}" (ID: ${sponsorId}) foi apagado.`);
        await refreshData();
      }
    }
  };

  // --- Event Reservation ---
  const addEventAttendee = async (eventId: string | number) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      const success = await firestoreUpdateEventAttendees(eventId, event.attendees + 1);
      if (success) {
        await refreshData();
      }
    }
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
    searchContent,
    refreshData
  };

  return (
    <DataContext.Provider value={value}>
      {!loading && children}
    </DataContext.Provider>
  );
};
