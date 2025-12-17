"use server";

import { buildHeaders, apiFetch } from "./api";

import {
    ExpertConversation,
    ExpertBenefits,
    ExpertWhyJoinUs,
    ExpertRegistration,
} from "@/types/api";

export const getExpertConversation = async (headers: Record<string, string>) => apiFetch<ExpertConversation[]>("expert/conversation", {
    method: "GET",
    headers
});

export const getExpertBenefits = async (headers: Record<string, string>) => apiFetch<ExpertBenefits[]>("expert/benefits", {
    method: "GET",
    headers
});

export const getExpertWhyJoinUs = async (headers: Record<string, string>) => apiFetch<ExpertWhyJoinUs[]>("expert/why-join-us", {
    method: "GET",
    headers
});

export const submitExpertRegistration = async (formData: ExpertRegistration) => apiFetch<ExpertRegistration>("expert/registration", {
    method: "POST",
    headers: await buildHeaders(),
    body: JSON.stringify(formData)
});