"use client"

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import parse from 'html-react-parser';
import nl2br from "nl2br";

import Header from "./header";
import Footer from "./footer";

import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { isEmail, isEmpty, isMobilePhone } from 'validator';

import {
    ExpertConversation,
    ExpertBenefits,
    ExpertWhyJoinUs,
    ExpertRegistration
} from "@/types/api";

import { ExpertRegistrationFormErrors } from "@/types/form";

interface ExpertComponentProps {
  expertConversation: ExpertConversation[],
  expertBenefits: ExpertBenefits[],
  expertWhyJoinUs: ExpertWhyJoinUs[]
}

export default function ExpertComponent({
  expertConversation,
  expertBenefits,
  expertWhyJoinUs
}: ExpertComponentProps) {
  const basePath = process.env.NEXT_PUBLIC_PATH;
  
  const [ip, setIp] = useState("");
  const [showLoader, updateLoader] = useState(true);

  const [expertRegistrationForm, setExpertRegistrationForm] = useState<ExpertRegistration>({
    expert_full_name: '',
    expert_mobile_number: '',
    expert_email_id: '',
    expert_teaching_subjects: '',
    ip_address: ip
  });
  
  const [errors, setErrors] = useState<ExpertRegistrationFormErrors>({});

  useEffect(() => {
    async function getIp() {
      const res = await fetch(basePath + "api/ip");
      const data = await res.json();
      setIp(data.ip);
    }

    getIp();
  }, []);

  const expertFullNameRef = useRef<HTMLInputElement | null>(null);
  const expertMobileNumberRef = useRef<HTMLInputElement | null>(null);
  const expertEmailIDRef = useRef<HTMLInputElement | null>(null);
  const expertTeachingSubjectsRef = useRef<HTMLInputElement | null>(null);

  const refMap: Record<string, React.RefObject<HTMLInputElement | null>> = {
    expert_full_name: expertFullNameRef,
    expert_mobile_number: expertMobileNumberRef,
    expert_email_id: expertEmailIDRef,
    expert_teaching_subjects: expertTeachingSubjectsRef
  };

  const ExpertBenefitsRef = useRef<HTMLDivElement | null>(null);

  const handleExpertRegistrationFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setExpertRegistrationForm(prev => ({ ...prev, [name]: value}));
      
      setErrors(prev => ({ ...prev, [name]: undefined}));
  }

  const expertRegistrationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(isEmpty(expertRegistrationForm.expert_full_name)) {
            setErrors({expert_full_name: 'Please enter your name'});
            expertFullNameRef.current?.focus();
            return;
        }

        if(isEmpty(expertRegistrationForm.expert_mobile_number)) {
            setErrors({expert_mobile_number: 'Please enter your phone number'});
            expertMobileNumberRef.current?.focus();
            return;
        } else if(!isMobilePhone(expertRegistrationForm.expert_mobile_number, 'any', {strictMode: true})) {
            setErrors({expert_mobile_number: 'Please enter a valid phone number'});
            expertMobileNumberRef.current?.focus();
            return;
        }

        if(isEmpty(expertRegistrationForm.expert_email_id)) {
            setErrors({expert_email_id: 'Please enter your email address'});
            expertEmailIDRef.current?.focus();
            return;
        } else if(!isEmail(expertRegistrationForm.expert_email_id)) {
            setErrors({expert_email_id: 'Please enter a valid email address'});
            expertEmailIDRef.current?.focus();
            return;
        }
        
        if(isEmpty(expertRegistrationForm.expert_teaching_subjects)) {
            setErrors({expert_teaching_subjects: 'Please enter the subjects you teach'});
            expertTeachingSubjectsRef.current?.focus();
            return;
        }

        updateLoader(true);

        expertRegistrationForm.ip_address = ip;

        const response = await fetch(basePath + "api/expert/registration", {
          method: "POST",
          body: JSON.stringify(expertRegistrationForm),
          headers: {
            "Content-Type": "application/json"
          }
        })

        updateLoader(false);

        if (!response.ok) {
          const err = await response.json();

          if(err.error) {
            let error_response = JSON.parse(err.error);

            if(typeof error_response === "object" && error_response !== null && !Array.isArray(error_response)) {
              error_response = Object.values(error_response);

              const { path, msg } = error_response[0][0];

              const error_message = msg;
              const error_path = path;

              if(refMap[error_path]?.current) {
                
                refMap[error_path]?.current.focus();
              }
              setErrors({[error_path]: error_message});
            }

            return false;
          }
        }

        const data = await response.json();

        if(data.success) {
          const display_message = data.result.display_message;

          alert(display_message);
        }
        
        setExpertRegistrationForm({
            expert_full_name: '',
            expert_email_id: '',
            expert_mobile_number: '+91',
            expert_teaching_subjects: '',
            ip_address: ''
        })
  }

  const scrollWithOffset = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (!ref.current) return;
      
      const offset = 0;
      
      const top = ref.current.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
    <Header showLoader={showLoader} />
    <section className="container max-w-full flex flex-col lg:flex-row gap-10 lg:gap-5 py-25 lg:py-10 px-5 md:px-5 relative overflow-hidden">
      <div className="absolute w-[90%] lg:w-[46%] xl:w-[48%] top-10 translate-x-1/2 lg:translate-x-0 right-1/2 lg:right-5 xl:right-5 flex flex-col gap-2 md:gap-5 rounded-3xl px-5 pt-5 md:pt-8 pb-5 lg:pb-5 xl:pb-15 border-2 border-[#EFEFEF] z-0">
          <h1 className="text-4xl md:text-6xl lg:text-4xl xl:text-7xl font-bold flex gap-5">Teach <span className="flex flex-col gap-1">Online <Image src={`${basePath}images/icons/underline-stroke.svg`} alt="Underline Stroke" width={300} height={5} className="px-5 w-55" /></span></h1>
          <h2 className="text-xl md:text-2xl xl:text-4xl">Increase your income by <span className="text-[#507FCB]">2x</span></h2>
      </div>
      {
        expertConversation && expertConversation.length === 2 && (
        <div className="w-full lg:w-1/2 flex flex-col gap-8 md:px-15 lg:px-5 py-5 relative mt-20 md:mt-40 lg:mt-0">
          <span className="absolute left-0 md:left-[98%] lg:left-[97%] xl:left-[90%] top-[20%] md:top-0">
            <Image src={`${basePath}images/icons/star.png`} alt="Star" width={50} height={50} className="w-[0.9rem]" />
          </span>
          <span className="absolute top-[25%] left-[60%] md:left-[50%]">
            <Image src={`${basePath}images/icons/conversation-string.png`} alt="Conversation String" width={504} height={643} className="w-30 md:w-35" />
          </span>
          <div className="flex gap-1 md:gap-3 relative justify-end">
            <span className="absolute bottom-10 left-1/2 md:left-[55%]">
              <Image src={`${basePath}images/icons/plus.png`} alt="Plus" width={50} height={50} className="w-3" />
            </span>
            <p className="text-sm xl:text-lg flex items-center px-4 border border-[#DEEAFF] rounded-t-2xl rounded-bl-2xl rounded-br-sm h-12 shadow-[0_5px_4px_0_rgba(13,153,255,0.15) font-bold lg:font-normal">{expertConversation[0].conversation_speech}</p>
            <div className="rounded-xl p-1 relative inline-block w-50 xl:w-65">
              <span className="absolute top-0 left-0 h-10 w-10 md:h-13 md:w-13 border-t-3 border-l-3 border-[#D3344D] rounded-tl-xl" />
              <span className="absolute bottom-0 right-0 h-10 w-10 md:h-13 md:w-13 border-b-3 border-r-3 border-[#D3344D] rounded-br-xl" />
              <Image src={expertConversation[0].conversation_image} alt="ClassTym Expert" width={758} height={504} className="rounded-lg w-full"  />
            </div>
          </div>
          <div className="flex flex-col gap-3 relative w-1/2">
            <span className="absolute left-12 top-8">
              <Image src={`${basePath}images/icons/sparkle-one.png`} alt="Sparkle" width={50} height={50} className="w-5" />
            </span>
            <span className="absolute left-2 bottom-0">
              <Image src={`${basePath}images/icons/sparkle-two.png`} alt="Sparkle" width={50} height={50} className="w-5" />
            </span>
            <span className="absolute right-0 bottom-15">
              <Image src={`${basePath}images/icons/sparkle-three.png`} alt="Sparkle" width={50} height={50} className="w-8" />
            </span>
            <div className="flex justify-end md:justify-start lg:justify-end sm:mx-auto lg:mx-0">
              <p className="text-sm xl:text-lg flex items-center px-4 bg-[#507fcb] text-white rounded-t-2xl rounded-br-2xl rounded-bl-sm w-fit h-12">{expertConversation[1].conversation_speech}</p>
            </div>
            <div className="w-45 h-45 xl:w-60 xl:h-60 overflow-hidden rounded-full border-[#D3344D] border-b-4">
              <Image src={expertConversation[1].conversation_image} alt="ClassTym Student" width={948} height={864} className="scale-135 object-cover"  />
            </div>
          </div>
          {
            expertBenefits && expertBenefits.length > 0 && (
            <ul className="flex flex-col font-medium gap-2 md:gap-[1rem] md:px-30 lg:px-0 xl:mx-auto text-lg font-medium">
              {
                expertBenefits.map((benefit, key) => (
                <li className="flex items-center gap-2 rounded-l-4xl rounded-r-xl w-fit p-3 shadow-[0_0_8px_rgba(112,112,112,0.35)]" key={key}>
                  <Image src={`${basePath}images/icons/green-check.png`} alt="Green Check" width={88} height={88} className="w-6 md:w-5" />
                  {benefit.benefit_caption}
                </li>
              ))
              }
            </ul>
          ) 
          }
        </div>
        )
      }

      <div className="w-full lg:w-1/2 px-5">
        <div className="flex flex-col gap-5 p-5 rounded-3xl border-2 border-[#EFEFEF] relative z-1 lg:mt-38 xl:mt-55 md:mx-5 lg:mx-0 lg:w-2/3 bg-white">
          <h2 className="text-[#D3344D] text-2xl font-semibold">Fill the details below!</h2>
          <form className="flex flex-col text-[#1B3867]" autoComplete="off" onSubmit={expertRegistrationSubmit}>
            <div className="flex flex-col">
              <div className="relative">
                <input type="text" name="expert_full_name" id="expert_full_name" className="peer w-full pt-5 pb-1 rounded-lg px-3 border-2 border-[#C7C7C7] focus:outline-none focus:border-[#1B3867]" placeholder=" " onChange={handleExpertRegistrationFormChange} value={expertRegistrationForm.expert_full_name} ref={expertFullNameRef} />
                <label htmlFor="expert_full_name" className="absolute top-1/2 left-3 -translate-y-1/2 text-md md:text-sm transition-all duration-200 text-[#91989F] peer-focus:top-3 peer-focus:text-xs peer-not-placeholder-shown:top-3 peer-not-placeholder-shown:text-xs">Full Name</label>
              </div>
              <div className="text-red-700 -mt-1 mb-1 h-5">
                <span className={`text-xs transition-all duration-200 ${errors.expert_full_name ? "opacity-100" : "opacity-0"}`}>{errors.expert_full_name}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="relative">
                <PhoneInput country={"in"} disableCountryCode={false} countryCodeEditable={false} value={expertRegistrationForm.expert_mobile_number} onChange={(expert_mobile_number) => setExpertRegistrationForm((prev) => ({...prev, expert_mobile_number: `+${expert_mobile_number}`}))} inputProps={{
                  name: "expert_mobile_number",
                  id: "expert_mobile_number",
                  ref: expertMobileNumberRef,
                  placeholder: ""
                }} containerClass="w-full [&_.selected-flag]:hover:!bg-transparent" inputClass="peer !w-full !h-14 !pr-3 !pt-5 !pb-1 !rounded-lg !border-2 !border-[#C7C7C7] focus:!border-[#1B3867] focus:!outline-none" buttonClass="!border-2 !border-[#C7C7C7] peer-hover:!border-[#C7C7C7] peer-focus:!border-[#1B3867] !bg-transparent !rounded-l-lg" />
                <label htmlFor="expert_mobile_number" className={`absolute left-20 text-[#91989F] transition-all duration-200 ${expertRegistrationForm.expert_mobile_number ? 'top-3 text-xs' : 'top-2/3 -translate-y-2/3 text-md md:text-sm' }`}>Phone Number</label>
              </div>
              <div className="text-red-700 -mt-1 mb-1 h-5">
                <span className={`text-xs transition-all duration-200 ${errors.expert_mobile_number ? "opacity-100" : "opacity-0"}`}>{errors.expert_mobile_number}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="relative">
                <input type="email" name="expert_email_id" id="expert_email_id" className="peer w-full pt-5 pb-1 rounded-lg px-3 border-2 border-[#C7C7C7] focus:outline-none focus:border-[#1B3867]" placeholder=" " onChange={handleExpertRegistrationFormChange} value={expertRegistrationForm.expert_email_id} ref={expertEmailIDRef} />
                <label htmlFor="expert_email_id" className="absolute top-1/2 left-3 -translate-y-1/2 text-md md:text-sm transition-all duration-200 text-[#91989F] peer-focus:top-3 peer-focus:text-xs peer-not-placeholder-shown:top-3 peer-not-placeholder-shown:text-xs">Email Address</label>
              </div>
              <div className="text-red-700 -mt-1 mb-1 h-5">
                <span className={`text-xs transition-all duration-200 ${errors.expert_email_id ? "opacity-100" : "opacity-0"}`}>{errors.expert_email_id}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="relative">
                <input type="text" name="expert_teaching_subjects" id="expert_teaching_subjects" className="peer w-full pt-5 pb-1 rounded-lg px-3 border-2 border-[#C7C7C7] focus:outline-none focus:border-[#1B3867]" placeholder=" " onChange={handleExpertRegistrationFormChange} value={expertRegistrationForm.expert_teaching_subjects} ref={expertTeachingSubjectsRef} />
                <label htmlFor="expert_teaching_subjects" className="absolute top-1/2 left-3 -translate-y-1/2 text-md md:text-sm transition-all duration-200 text-[#91989F] peer-focus:top-3 peer-focus:text-xs peer-not-placeholder-shown:top-3 peer-not-placeholder-shown:text-xs">Subject You Teach</label>
              </div>
              <div className="text-red-700 -mt-1 mb-1 h-5">
                <span className={`text-xs transition-all duration-200 ${errors.expert_teaching_subjects ? "opacity-100" : "opacity-0"}`}>{errors.expert_teaching_subjects}</span>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="rounded-xl p-[0.20rem] border-[1.3px] border-[#E43955] text-white shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]">
                <button type="submit" className="rounded-lg default-bg px-8 py-4 text-xl md:text-lg flex items-center justify-center gap-5 cursor-pointer">
                  Register
                  <svg width={18 * 1.7} height={18} viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="14 4, 22 12, 14 20" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="1" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 cursor-pointer" onClick={() => scrollWithOffset(ExpertBenefitsRef)}>
        <Image src={`${basePath}images/icons/circle-arrow.png`} alt="Circle Arrow" width={100} height={100} className="w-13" />
      </span>

      <span className="absolute -right-10 md:-right-15 bottom-[60%] lg:bottom-[35%]">
        <Image src={`${basePath}images/icons/pie-chart.png`} alt="Pie Chart" width={300} height={300} className="w-25 md:w-40"/>
      </span>

      <span className="absolute right-25 md:right-40 bottom-[61%] lg:bottom-[35%]">
        <Image src={`${basePath}images/icons/chat.png`} alt="Chat" width={54} height={43} className="w-7 md:w-10"/>
      </span>
    </section>
    {
      expertWhyJoinUs && expertWhyJoinUs.length > 0 && (
      <section className="container max-w-full bg-[#f9fbff] flex flex-col justify-center items-center py-10 px-3 xl:px-15 gap-15 font-semibold" ref={ExpertBenefitsRef}>
        <h2 className="text-3xl md:text-4xl">Why Join ClassTym ?</h2>
        <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-stretch gap-5">
          {
            expertWhyJoinUs.map((why_join_us, key) => (
            <div className="flex flex-col items-center justify-center text-center gap-1 md:gap-0 bg-[#f3f7ff] w-full md:w-[48%] xl:w-[32%] px-5 py-4 border border-[#0d99ff]/40 rounded-xl" key={key}>
              <Image src={why_join_us.why_join_us_icon} alt={why_join_us.why_join_us_caption} width={100} height={100} className="w-18 lg:w-20" />
              <p className="text-2xl lg:text-[2rem] text-[#507fcb]">{why_join_us.why_join_us_caption}</p>
              <p className="text-xl">{parse(nl2br(why_join_us.why_join_us_description))}</p>
            </div>
          ))
          }

        </div>
      </section>
      )
    }
    <Footer />
    </>
  );
}