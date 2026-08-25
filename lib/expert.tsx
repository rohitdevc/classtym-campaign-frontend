"use server";

import { buildHeaders, apiFetch } from "./api";

import {
    ExpertConversation,
    ExpertBenefits,
    ExpertWhyJoinUs,
    ExpertRegistration,
} from "@/types/api";

export const getExpertConversation = async () => apiFetch<ExpertConversation[]>("expert/conversation", {
    method: "GET"
});

export const getExpertBenefits = async () => apiFetch<ExpertBenefits[]>("expert/benefits", {
    method: "GET"
});

export const getExpertWhyJoinUs = async () => apiFetch<ExpertWhyJoinUs[]>("expert/why-join-us", {
    method: "GET"
});

export const submitExpertRegistration = async (formData: ExpertRegistration) => apiFetch<ExpertRegistration>("expert/registration", {
    method: "POST",
    headers: await buildHeaders(),
    body: JSON.stringify(formData)
});