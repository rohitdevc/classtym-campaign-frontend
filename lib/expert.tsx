"use server";

import { buildHeaders, apiFetch } from "./api";

const ONE_YEAR = 60 * 60 * 24 * 365;

import {
    ExpertConversation,
    ExpertBenefits,
    ExpertWhyJoinUs,
    ExpertRegistration,
} from "@/types/api";

export const getExpertConversation = async () => apiFetch<ExpertConversation[]>("expert/conversation", {
    method: "GET",
    cache: "force-cache",
    next: {
        revalidate: ONE_YEAR,
    },
});

export const getExpertBenefits = async () => apiFetch<ExpertBenefits[]>("expert/benefits", {
    method: "GET",
    cache: "force-cache",
    next: {
        revalidate: ONE_YEAR,
    },
});

export const getExpertWhyJoinUs = async () => apiFetch<ExpertWhyJoinUs[]>("expert/why-join-us", {
    method: "GET",
    cache: "force-cache",
    next: {
        revalidate: ONE_YEAR,
    },
});

export const submitExpertRegistration = async (formData: ExpertRegistration) => apiFetch<ExpertRegistration>("expert/registration", {
    method: "POST",
    headers: await buildHeaders(),
    body: JSON.stringify(formData)
});