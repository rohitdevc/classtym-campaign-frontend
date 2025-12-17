"use server";

import { buildHeaders, apiFetch } from "./api";
import {
    FeaturedExperts,
    StudentBenefits,
    StudentWhyJoinUs,
    StudentRegistration
} from "@/types/api";

export const getFeaturedExperts = async (headers: Record<string, string>) => apiFetch<FeaturedExperts[]>("student/featured-experts", {
    method: "GET",
    headers
});

export const getStudentBenefits = async (headers: Record<string, string>) => apiFetch<StudentBenefits[]>("student/benefits", {
    method: "GET",
    headers
});

export const getStudentWhyJoinUs = async (headers: Record<string, string>) => apiFetch<StudentWhyJoinUs[]>("student/why-join-us", {
    method: "GET",
    headers
});

export const submitStudentRegistration = async (formData: StudentRegistration) => apiFetch<StudentRegistration>("student/registration", {
    method: "POST",
    headers: await buildHeaders(),
    body: JSON.stringify(formData)
});