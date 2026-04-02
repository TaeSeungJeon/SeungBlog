export interface Post {
    title: string;
    date: string;
    description: string;
    filename: string;
}

export interface PostDetail extends Post {
    content: string;
}

export interface GuestbookItem {
    id: number;
    title: string;
    content: string;
    author: string;
    avatarUrl: string;
    createdAt: string;
}

export interface AuthToken {
    accessToken: string;
    username: string;
    avatarUrl: string;
}