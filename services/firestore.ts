import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  limit,
  Timestamp,
  DocumentData
} from "firebase/firestore";
import { db } from "./firebase";
import type { Article, Event, Sponsor, User, Role, Permissions } from "../types";
import { ArticleType } from "../types";

const mapFirestoreArticle = (doc: DocumentData): Article => {
  const data = doc.data();
  const articleType = (data.type === 'blog' || data.type === ArticleType.Blog)
    ? ArticleType.Blog
    : ArticleType.News;

  return {
    id: doc.id,
    type: articleType,
    title: data.title || "",
    slug: data.slug || "",
    excerpt: data.excerpt || "",
    body: data.body || data.content || "",
    author: data.author || "",
    categories: data.categories || [],
    tags: data.tags || [],
    published_at: data.published_at || data.publishedAt || new Date().toISOString(),
    cover_image_url: data.cover_image_url || data.coverImage || data.imageUrl || "",
    is_featured: data.is_featured || data.featured || false,
  };
};

const mapFirestoreEvent = (doc: DocumentData): Event => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title || "",
    slug: data.slug || "",
    date: data.date || "",
    time: data.time || "",
    location: data.location || "",
    description: data.description || "",
    is_past: data.is_past || data.isPast || false,
    cover_image_url: data.cover_image_url || data.coverImage || data.imageUrl || "",
    gallery_images_urls: data.gallery_images_urls || data.galleryImages || [],
    capacity: data.capacity || 0,
    attendees: data.attendees || 0,
    banner_image_url: data.banner_image_url || data.bannerImage || "",
  };
};

const mapFirestoreSponsor = (doc: DocumentData): Sponsor => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name || "",
    logo_url: data.logo_url || data.logoUrl || data.logo || "",
    url: data.url || data.website || "",
  };
};

export const fetchArticles = async (articleLimit?: number): Promise<Article[]> => {
  try {
    const articlesRef = collection(db, "articles");
    const constraints = [orderBy("published_at", "desc")];
    if (articleLimit) {
      constraints.push(limit(articleLimit));
    }
    const q = query(articlesRef, ...constraints);
    const querySnapshot = await getDocs(q);

    const articles: Article[] = [];
    querySnapshot.forEach((doc) => {
      articles.push(mapFirestoreArticle(doc));
    });

    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

export const fetchArticlesByType = async (type: ArticleType, articleLimit?: number): Promise<Article[]> => {
  try {
    const articlesRef = collection(db, "articles");
    const typeValue = type === ArticleType.Blog ? 'blog' : 'news';
    const constraints = [
      where("type", "in", [typeValue, type]),
      orderBy("published_at", "desc")
    ];
    if (articleLimit) {
      constraints.push(limit(articleLimit));
    }
    const q = query(articlesRef, ...constraints);
    const querySnapshot = await getDocs(q);

    const articles: Article[] = [];
    querySnapshot.forEach((doc) => {
      articles.push(mapFirestoreArticle(doc));
    });

    return articles;
  } catch (error) {
    console.error("Error fetching articles by type:", error);
    return [];
  }
};

export const fetchEvents = async (eventLimit?: number): Promise<Event[]> => {
  try {
    const eventsRef = collection(db, "events");
    const constraints = [orderBy("date", "desc")];
    if (eventLimit) {
      constraints.push(limit(eventLimit));
    }
    const q = query(eventsRef, ...constraints);
    const querySnapshot = await getDocs(q);

    const events: Event[] = [];
    querySnapshot.forEach((doc) => {
      events.push(mapFirestoreEvent(doc));
    });

    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const fetchUpcomingEvents = async (eventLimit?: number): Promise<Event[]> => {
  try {
    const eventsRef = collection(db, "events");
    const today = new Date().toISOString().split('T')[0];
    const constraints = [
      where("date", ">=", today),
      orderBy("date", "asc")
    ];
    if (eventLimit) {
      constraints.push(limit(eventLimit));
    }
    const q = query(eventsRef, ...constraints);
    const querySnapshot = await getDocs(q);

    const events: Event[] = [];
    querySnapshot.forEach((doc) => {
      events.push(mapFirestoreEvent(doc));
    });

    return events;
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    return [];
  }
};

export const fetchSponsors = async (): Promise<Sponsor[]> => {
  try {
    const sponsorsRef = collection(db, "sponsors");
    const querySnapshot = await getDocs(sponsorsRef);

    const sponsors: Sponsor[] = [];
    querySnapshot.forEach((doc) => {
      sponsors.push(mapFirestoreSponsor(doc));
    });

    return sponsors;
  } catch (error) {
    console.error("Error fetching sponsors:", error);
    return [];
  }
};

const mapFirestoreUser = (doc: DocumentData): User => {
  const data = doc.data();

  const defaultPermissions: Permissions = {
    manageAdmins: false,
    manageManagers: false,
    manageBloggers: false,
    fullNewsCRUD: false,
    fullBlogCRUD: false,
    viewAllAnalytics: false,
    viewLimitedAnalytics: false,
    createContent: false,
    crudOwnContent: false,
  };

  return {
    id: parseInt(doc.id) || Date.now(),
    username: data.username || data.email || "",
    email: data.email || "",
    passwordHash: data.password || data.passwordHash || "",
    role: data.role as Role || 'Blogger',
    permissions: data.permissions || defaultPermissions,
  };
};

export const authenticateUserFromFirestore = async (identifier: string, password: string): Promise<User | null> => {
  try {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);

    let authenticatedUser: User | null = null;

    querySnapshot.forEach((doc) => {
      const user = mapFirestoreUser(doc);
      const emailMatch = user.email && user.email.toLowerCase() === identifier.toLowerCase();
      const usernameMatch = user.username.toLowerCase() === identifier.toLowerCase();
      const passwordMatch = user.passwordHash === password;

      if ((emailMatch || usernameMatch) && passwordMatch) {
        authenticatedUser = user;
      }
    });

    return authenticatedUser;
  } catch (error) {
    console.error("Error authenticating user from Firestore:", error);
    return null;
  }
};

export const createArticle = async (article: Omit<Article, 'id'>): Promise<string | null> => {
  try {
    const articlesRef = collection(db, "articles");
    const docRef = await addDoc(articlesRef, {
      type: article.type,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      body: article.body,
      author: article.author,
      categories: article.categories,
      tags: article.tags,
      published_at: article.published_at,
      cover_image_url: article.cover_image_url,
      is_featured: article.is_featured || false,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating article:", error);
    return null;
  }
};

export const updateArticle = async (article: Article): Promise<boolean> => {
  try {
    const articleRef = doc(db, "articles", String(article.id));
    await updateDoc(articleRef, {
      type: article.type,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      body: article.body,
      author: article.author,
      categories: article.categories,
      tags: article.tags,
      published_at: article.published_at,
      cover_image_url: article.cover_image_url,
      is_featured: article.is_featured || false,
    });
    return true;
  } catch (error) {
    console.error("Error updating article:", error);
    return false;
  }
};

export const deleteArticle = async (articleId: string | number): Promise<boolean> => {
  try {
    const articleRef = doc(db, "articles", String(articleId));
    await deleteDoc(articleRef);
    return true;
  } catch (error) {
    console.error("Error deleting article:", error);
    return false;
  }
};

export const createEvent = async (event: Omit<Event, 'id'>): Promise<string | null> => {
  try {
    const eventsRef = collection(db, "events");
    const docRef = await addDoc(eventsRef, {
      title: event.title,
      slug: event.slug,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      is_past: event.is_past || false,
      cover_image_url: event.cover_image_url,
      gallery_images_urls: event.gallery_images_urls || [],
      capacity: event.capacity || 0,
      attendees: event.attendees || 0,
      banner_image_url: event.banner_image_url || "",
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating event:", error);
    return null;
  }
};

export const updateEvent = async (event: Event): Promise<boolean> => {
  try {
    const eventRef = doc(db, "events", String(event.id));
    await updateDoc(eventRef, {
      title: event.title,
      slug: event.slug,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      is_past: event.is_past || false,
      cover_image_url: event.cover_image_url,
      gallery_images_urls: event.gallery_images_urls || [],
      capacity: event.capacity || 0,
      attendees: event.attendees || 0,
      banner_image_url: event.banner_image_url || "",
    });
    return true;
  } catch (error) {
    console.error("Error updating event:", error);
    return false;
  }
};

export const deleteEvent = async (eventId: string | number): Promise<boolean> => {
  try {
    const eventRef = doc(db, "events", String(eventId));
    await deleteDoc(eventRef);
    return true;
  } catch (error) {
    console.error("Error deleting event:", error);
    return false;
  }
};

export const createSponsor = async (sponsor: Omit<Sponsor, 'id'>): Promise<string | null> => {
  try {
    const sponsorsRef = collection(db, "sponsors");
    const docRef = await addDoc(sponsorsRef, {
      name: sponsor.name,
      logo_url: sponsor.logo_url,
      url: sponsor.url,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating sponsor:", error);
    return null;
  }
};

export const updateSponsor = async (sponsor: Sponsor): Promise<boolean> => {
  try {
    const sponsorRef = doc(db, "sponsors", String(sponsor.id));
    await updateDoc(sponsorRef, {
      name: sponsor.name,
      logo_url: sponsor.logo_url,
      url: sponsor.url,
    });
    return true;
  } catch (error) {
    console.error("Error updating sponsor:", error);
    return false;
  }
};

export const deleteSponsor = async (sponsorId: string | number): Promise<boolean> => {
  try {
    const sponsorRef = doc(db, "sponsors", String(sponsorId));
    await deleteDoc(sponsorRef);
    return true;
  } catch (error) {
    console.error("Error deleting sponsor:", error);
    return false;
  }
};

export const updateEventAttendees = async (eventId: string | number, attendees: number): Promise<boolean> => {
  try {
    const eventRef = doc(db, "events", String(eventId));
    await updateDoc(eventRef, { attendees });
    return true;
  } catch (error) {
    console.error("Error updating event attendees:", error);
    return false;
  }
};
