import EmailTemplateComponent from "@/components/EmailTemplateComponent";
import "./email-template.css";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default async function EmailTemplate() {
  return (
    <EmailTemplateComponent />
  )
}
