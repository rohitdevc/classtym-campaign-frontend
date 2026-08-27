"use server";

import { buildHeaders, apiFetch } from "./api";

const ONE_YEAR = 60 * 60 * 24 * 365;

import {
    FeaturedExperts,
    StudentBenefits,
    StudentWhyJoinUs,
    StudentRegistration
} from "@/types/api";

export const getFeaturedExperts = async () => apiFetch<FeaturedExperts[]>("student/featured-experts", {
    method: "GET",
    cache: "force-cache",
    next: {
        revalidate: ONE_YEAR,
    },
});

export const getStudentBenefits = async () => apiFetch<StudentBenefits[]>("student/benefits", {
    method: "GET",
    cache: "force-cache",
    next: {
        revalidate: ONE_YEAR,
    },
});

export const getStudentWhyJoinUs = async () => apiFetch<StudentWhyJoinUs[]>("student/why-join-us", {
    method: "GET",
    cache: "force-cache",
    next: {
        revalidate: ONE_YEAR,
    },
});

export const submitStudentRegistration = async (formData: StudentRegistration) => apiFetch<StudentRegistration>("student/registration", {
    method: "POST",
    headers: await buildHeaders(),
    body: JSON.stringify(formData)
});