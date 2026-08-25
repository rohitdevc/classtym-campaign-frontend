"use server";

import { buildHeaders, apiFetch } from "./api";
import {
    FeaturedExperts,
    StudentBenefits,
    StudentWhyJoinUs,
    StudentRegistration
} from "@/types/api";

export const getFeaturedExperts = async () => apiFetch<FeaturedExperts[]>("student/featured-experts", {
    method: "GET"
});

export const getStudentBenefits = async () => apiFetch<StudentBenefits[]>("student/benefits", {
    method: "GET"
});

export const getStudentWhyJoinUs = async () => apiFetch<StudentWhyJoinUs[]>("student/why-join-us", {
    method: "GET"
});

export const submitStudentRegistration = async (formData: StudentRegistration) => apiFetch<StudentRegistration>("student/registration", {
    method: "POST",
    headers: await buildHeaders(),
    body: JSON.stringify(formData)
});