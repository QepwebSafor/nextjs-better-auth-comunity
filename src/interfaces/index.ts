export interface ITodo {
  id: string;
  description: string | null;
  complete: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IEditArticle {
  id: string;
  title: string;
  category: string;
  featuredImage: string;
  content: string;
}

export type UserRole = "USER" | "ADMIN";
export interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;
  role: UserRole;
  emailVerified?: Date | null;
  banned?: boolean;
  banReason?: string | null;
  banExpires?: Date | null;
  sessions?: ISession[];
  accounts?: IAccount[];
  articles?: IArticle[]; // Optional, as it may not always be provided
  comments?: IComment[]; // Optional, as it may not always be provided
  likes?: ILike[]; // Optional, as it may not always be provided
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IAuthor {
  id: string;
  name: string;
  email: string;
  image: string;
  role: UserRole;
}

export interface IAccount {
  id: string;
  userId: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  user?: IUser; // Optional, as it may not always be provided
}

export interface ISession {
  id: string;
  userId: string;
  sessionToken: string;
  expires: Date;
  user?: IUser; // Optional, as it may not always be provided
}
export interface IContact {
  id: string;
  postername: string;
  message: string;
  email: string;
  phone: string;
  createdAt: Date;
}
export interface IArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  featuredImage: string;
  author: IUser | null;
  authorId: string | null;
  comments: IComment[] | null;
  likes: ILike[] | null;
  createdAt: Date;
  updatedAt: Date | null;
}
export interface IArticleCard {
  id: string;
  title: string;
  content: string;
  category: string;
  featuredImage: string;
  authorId: string;
  comments: IComment[] | null;
  likes: ILike[] | null;
  createdAt: Date;
  updatedAt: Date | null;
  author: IUser | null;
}
export interface IComment {
  id: string;
  content: string;
  authorId: string;
  articleId: string;
  author?: IUser; // Optional, as it may not always be provided
  createdAt?: Date;
}
export interface ILike {
  id: string;
  userId: string;
  articleId: string;
  user?: IUser; // Optional, as it may not always be provided
  createdAt?: Date;
}

export interface IPostForm {
  title: string;
  content: string;
  file?: File | null; // Optional, as it may not always be provided
}
