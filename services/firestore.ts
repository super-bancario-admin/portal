import { collection, getDocs, query, orderBy, DocumentData } from "firebase/firestore";
import { db } from "./firebase";
import type { Article, Event, Sponsor } from "../types";
import { ArticleType } from "../types";

const mapFirestoreArticle = (doc: DocumentData, type: ArticleType): Article => {
  const data = doc.data();
  return {
    id: parseInt(doc.id) || Date.now(),
    type,
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
    id: parseInt(doc.id) || Date.now(),
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
    id: parseInt(doc.id) || Date.now(),
    name: data.name || "",
    logo_url: data.logo_url || data.logoUrl || data.logo || "",
    url: data.url || data.website || "",
  };
};

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const articlesRef = collection(db, "articles");
    const q = query(articlesRef, orderBy("published_at", "desc"));
    const querySnapshot = await getDocs(q);

    const articles: Article[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const type = data.type === 'blog' ? ArticleType.Blog : ArticleType.News;
      articles.push(mapFirestoreArticle(doc, type));
    });

    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, orderBy("date", "desc"));
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
