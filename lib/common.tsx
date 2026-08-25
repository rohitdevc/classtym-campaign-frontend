"use server";

import { apiFetch } from "./api";
import { MetaData, Banner } from "@/types/api";

export const getMetaData = async (page_name: string) => apiFetch<MetaData>("meta-data", {
    method: "POST",
    body: JSON.stringify({ page_name })
});

export const getBanner = async (page_name: string) => apiFetch<Banner>("banner", {
    method: "POST",
    body: JSON.stringify({ page_name })
});