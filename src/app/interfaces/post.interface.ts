export interface IPost {
  id: number;
  title: string;
  communityId: number;
  content: string;
  author: {
    id: number;
    username: string;
    avatarUrl: string;
    subscribersAmount: number;
    firstName: string;
    lastName: string;
    isActive: boolean;
    stack: string[];
    city: string;
    description: string;
  };
  images: string[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  likesUsers: string[];
  comments: string[];
}

export interface ICreatePost {
  title?: string;
  content: string;
  authorId: number;
  communityId?: number;
}
