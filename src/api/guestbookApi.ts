import axiosInstance from './axiosInstance';
import type { GuestbookItem } from '../types';

export const getGuestbook = async (): Promise<GuestbookItem[]> => {
    const { data } = await axiosInstance.get('/api/guestbook');
    return data;
};

export const createGuestbook = async (
    title: string,
    content: string
): Promise<GuestbookItem> => {
    const { data } = await axiosInstance.post('/api/guestbook', { title, content });
    return data;
};

export const deleteGuestbook = async (id: number): Promise<void> => {
    await axiosInstance.delete(`/api/guestbook/${id}`);
};