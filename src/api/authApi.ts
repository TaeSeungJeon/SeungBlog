import axiosInstance from './axiosInstance';
import type { AuthToken } from '../types';

export const githubLogin = async (code: string): Promise<AuthToken> => {
    const { data } = await axiosInstance.post(`/api/auth/github?code=${code}`);
    return data;
};

export const getMe = async (): Promise<string> => {
    const { data } = await axiosInstance.get('/api/auth/me');
    return data;
};