import React from 'react';

export enum ArticleType {
  News = 'news',
  Blog = 'blog',
}

export interface Article {
  id: string | number;
  type: ArticleType;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  author: string;
  categories: string[];
  tags: string[];
  published_at: string;
  cover_image_url: string;
  is_featured?: boolean;
}

export interface Event {
  id: string | number;
  title: string;
  slug: string;
  date: string;
  time: string;
  location: string;
  description: string;
  is_past?: boolean;
  cover_image_url: string;
  gallery_images_urls: string[];
  capacity: number;
  attendees: number;
  banner_image_url?: string;
}

export interface Sponsor {
  id: string | number;
  name: string;
  logo_url: string;
  url: string;
}

export interface MissionCard {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
}

// Authentication & User Management Types

export type Role = 'Super Admin' | 'Admin' | 'Manager' | 'Blogger';

export interface Permissions {
  manageAdmins: boolean;
  manageManagers: boolean;
  manageBloggers: boolean;
  fullNewsCRUD: boolean;
  fullBlogCRUD: boolean;
  viewAllAnalytics: boolean;
  viewLimitedAnalytics: boolean;
  createContent: boolean;
  crudOwnContent: boolean;
}

export interface User {
  id: number;
  username: string;
  email?: string;
  passwordHash: string; // In a real app, this would be a hash
  role: Role;
  permissions: Permissions;
}

// Activity Log Type
export interface LogEntry {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  details: string;
}
