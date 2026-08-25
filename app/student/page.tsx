import type { Metadata } from "next";
import StudentComponent from "@/components/StudentComponent";
import { getMetaData, getBanner } from "@/lib/common";
import { getFeaturedExperts, getStudentBenefits, getStudentWhyJoinUs } from '@/lib/student';

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#ffffff" },
  ],
};

const page_name = "Student";

const [ meta_data, banner_data ] = await Promise.all([ getMetaData(page_name), getBanner(page_name) ]);

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export const metadata: Metadata = {
  title: meta_data.meta_title,
  description: meta_data.meta_description,
  alternates: {
    canonical: meta_data.canonical_tag
  },
  openGraph: {
      title: meta_data.meta_title,
      description: meta_data.meta_description,
      type: "website",
      url: meta_data.canonical_tag,
      siteName: "ClassTym Campaign",
      images: [
        {
          url: banner_data.banner_image,
          width: 1200,
          height: 630,
          alt: meta_data.meta_title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta_data.meta_title,
      description: meta_data.meta_description,
      images: [banner_data.banner_image],
    },
};

export default async function Student() {
  const [ FeaturedExperts, studentBenefits, studentWhyJoinUs ] = await Promise.all([ getFeaturedExperts(), getStudentBenefits(), getStudentWhyJoinUs() ]);

  return (
    <StudentComponent 
    FeaturedExperts={FeaturedExperts}
    studentBenefits={studentBenefits}
    studentWhyJoinUs={studentWhyJoinUs}
     />
  )
}
