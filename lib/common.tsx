"use server";

import { apiFetch } from "./api";
import { MetaData, Banner } from "@/types/api";

export const getMetaData = async (headers: Record<string, string>, page_name: string) => apiFetch<MetaData>("meta-data", {
    method: "POST",
    headers,
    body: JSON.stringify({ page_name })
});

export const getBanner = async (headers: Record<string, string>, page_name: string) => apiFetch<Banner>("banner", {
    method: "POST",
    headers,
    body: JSON.stringify({ page_name })
});