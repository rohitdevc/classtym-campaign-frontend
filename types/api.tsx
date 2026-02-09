export interface MetaData {
    meta_title: string;
    meta_description: string;
    canonical_tag: string;
}

export interface Banner {
    banner_image: string;
}

export interface ExpertConversation {
    conversation_speech: string;
    conversation_image: string;
}

export interface ExpertBenefits {
    benefit_caption: string;
}

export interface ExpertWhyJoinUs {
    why_join_us_caption: string;
    why_join_us_description: string;
    why_join_us_icon: string;
}

export interface ExpertRegistration {
    expert_full_name: string;
    expert_mobile_number: string;
    expert_email_id: string;
    expert_teaching_subjects: string;
    ip_address: string;
    utm_source?: string;
    utm_campaign?: string;
    utm_medium?: string;
}

export interface FeaturedExperts {
    expert_name: string;
    expert_education: string;
    expert_thumbnail: string;
    expert_ratings: string;
    expert_reviews: string;
    expert_students: string;
    expert_sessions: string;
}

export interface StudentBenefits {
    benefit_caption: string;
}

export interface StudentWhyJoinUs {
    why_join_us_caption: string;
    why_join_us_description: string;
    why_join_us_icon: string;
}

export interface StudentRegistration {
    student_full_name: string;
    student_mobile_number: string;
    student_email_id: string;
    student_learning_subjects: string;
    ip_address: string;
    utm_source?: string;
    utm_campaign?: string;
    utm_medium?: string;
}

export interface TokenResponse {
  token: string;
}
