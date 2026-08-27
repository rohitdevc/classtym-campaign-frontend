"use server";

import { apiFetch } from "./api";
import { MetaData, Banner } from "@/types/api";

const ONE_YEAR = 60 * 60 * 24 * 365;

export const getMetaData = async (page_name: string) => apiFetch<MetaData>("meta-data", {
    method: "POST",
    cache: "force-cache",
    next: {
        revalidate: ONE_YEAR,
    },
    body: JSON.stringify({ page_name })
});

export const getBanner = async (page_name: string) => apiFetch<Banner>("banner", {
    method: "POST",
    cache: "force-cache",
    next: {
        revalidate: ONE_YEAR,
    },
    body: JSON.stringify({ page_name })
});