"use server";

import { apiFetch } from "./api";
import { TokenResponse } from "@/types/api";

export async function getAuthToken() {
    return apiFetch<TokenResponse>("auth/token", {
        method: "GET",
        headers: {
            'x-secret-key': process.env.FRONTEND_TOKEN_KEY as string
        }
    });
}