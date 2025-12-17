"use server";

import { getAuthToken } from './auth';

export async function buildHeaders() {
    const { token } = await getAuthToken();
    
    return {
        Authorization: `Bearer ${token}`
    };
}

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const baseUrl = process.env.API_DOMAIN_NAME;

    if (!baseUrl) {
        throw new Error("API_DOMAIN_NAME is undefined — check your .env.local");
    }

    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string>),
    };

    headers["Content-Type"] = "application/json";
    
    const res = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers,
        cache: "no-store",
    });
    
    if (!res.ok) {
        const message = await res.text();
        
        throw new Error(JSON.stringify({ status: res.status, message }));
    }
    
    return res.json() as Promise<T>;
}