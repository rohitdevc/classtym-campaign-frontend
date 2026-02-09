import type { Metadata } from "next";
import ExpertComponent from "@/components/ExpertComponent";
import { buildHeaders } from "@/lib/api";
import { getMetaData, getBanner } from "@/lib/common";
import { getExpertConversation, getExpertBenefits, getExpertWhyJoinUs } from "@/lib/expert";

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#ffffff" },
  ],
};

const headers = await buildHeaders();
const page_name = "Expert";

const [ meta_data, banner_data ] = await Promise.all([ getMetaData(headers, page_name), getBanner(headers, page_name) ]);

export const revalidate = 600;

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

export default async function Expert() {
  const [ expertConversation, expertBenefits, expertWhyJoinUs ] = await Promise.all([ getExpertConversation(headers), getExpertBenefits(headers), getExpertWhyJoinUs(headers) ]);

  return (
    <ExpertComponent
    expertConversation={expertConversation}
    expertBenefits={expertBenefits}
    expertWhyJoinUs={expertWhyJoinUs}  />
  )
}
