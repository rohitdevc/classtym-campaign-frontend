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
    FeaturedExperts,
    StudentBenefits,
    StudentWhyJoinUs,
    StudentRegistration
} from "@/types/api";
import { StudentRegistrationFormErrors } from "@/types/form";

interface StudentComponentProps {
  FeaturedExperts: FeaturedExperts[],
  studentBenefits: StudentBenefits[],
  studentWhyJoinUs: StudentWhyJoinUs[ ]
}

export default function StudentComponent({
  FeaturedExperts,
  studentBenefits,
  studentWhyJoinUs
}: StudentComponentProps) {
  const basePath = process.env.NEXT_PUBLIC_PATH;
  
  const [ip, setIp] = useState("");

  const [showLoader, updateLoader] = useState(false);

  const [studentRegistrationForm, setStudentRegistrationForm] = useState<StudentRegistration>({
    student_full_name: '',
    student_mobile_number: '',
    student_email_id: '',
    student_learning_subjects: '',
    ip_address: ''
  });
  
  const [errors, setErrors] = useState<StudentRegistrationFormErrors>({});

  useEffect(() => {
    async function getIp() {
      const res = await fetch(basePath + "api/ip");
      const data = await res.json();
      setIp(data.ip);
    }

    getIp();
  }, []);

  const studentFullNameRef = useRef<HTMLInputElement | null>(null);
  const studentMobileNumberRef = useRef<HTMLInputElement | null>(null);
  const studentEmailIDRef = useRef<HTMLInputElement | null>(null);
  const studentTeachingSubjectsRef = useRef<HTMLInputElement | null>(null);

  const refMap: Record<string, React.RefObject<HTMLInputElement | null>> = {
    student_full_name: studentFullNameRef,
    student_mobile_number: studentMobileNumberRef,
    student_email_id: studentEmailIDRef,
    student_learning_subjects: studentTeachingSubjectsRef
  };

  const StudentBenefitsRef = useRef<HTMLDivElement | null>(null);

  const handleStudentRegistrationFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setStudentRegistrationForm(prev => ({ ...prev, [name]: value}));
      
      setErrors(prev => ({ ...prev, [name]: undefined}));
  }

  const studentRegistrationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(isEmpty(studentRegistrationForm.student_full_name)) {
            setErrors({student_full_name: 'Please enter your name'});
            studentFullNameRef.current?.focus();
            return;
        }

        if(isEmpty(studentRegistrationForm.student_mobile_number)) {
            setErrors({student_mobile_number: 'Please enter your phone number'});
            studentMobileNumberRef.current?.focus();
            return;
        } else if(!isMobilePhone(studentRegistrationForm.student_mobile_number, 'any', {strictMode: true})) {
            setErrors({student_mobile_number: 'Please enter a valid phone number'});
            studentMobileNumberRef.current?.focus();
            return;
        }

        if(isEmpty(studentRegistrationForm.student_email_id)) {
            setErrors({student_email_id: 'Please enter your email address'});
            studentEmailIDRef.current?.focus();
            return;
        } else if(!isEmail(studentRegistrationForm.student_email_id)) {
            setErrors({student_email_id: 'Please enter a valid email address'});
            studentEmailIDRef.current?.focus();
            return;
        }

        if(isEmpty(studentRegistrationForm.student_learning_subjects)) {
            setErrors({student_learning_subjects: 'Please enter the subjects you want to learn'});
            studentTeachingSubjectsRef.current?.focus();
            return;
        }

        updateLoader(true);

        studentRegistrationForm.ip_address = ip;

        const response = await fetch(basePath + "api/student/registration", {
          method: "POST",
          body: JSON.stringify(studentRegistrationForm),
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (!response.ok) {
          updateLoader(false);

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
          window.location.href = "https://app.classtym.com/";
        }

        setStudentRegistrationForm({
            student_full_name: '',
            student_email_id: '',
            student_mobile_number: '+91',
            student_learning_subjects: '',
            ip_address: ''
        })
  }

  const scrollWithOffset = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (!ref.current) return;
      
      const offset = 0;
      
      const top = ref.current.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({ top, behavior: "smooth" });
  };

  let leftFeaturedExperts: FeaturedExperts[] = [];
  let rightFeaturedExperts: FeaturedExperts[] = [];
  
  if (Array.isArray(FeaturedExperts) && FeaturedExperts.length > 0) {
    const total = FeaturedExperts.length;
    const midpoint = Math.ceil(total / 2);
    
    leftFeaturedExperts = FeaturedExperts.slice(0, midpoint);
    rightFeaturedExperts = FeaturedExperts.slice(midpoint);
  }

  return (
    <>
    <Header showLoader={showLoader} />
    <section className="container max-w-full flex flex-col lg:flex-row gap-10 lg:gap-5 py-25 lg:py-20 px-5 md:px-5 top-20 relative overflow-hidden">
      <div className="absolute w-[90%] lg:w-[46%] xl:w-[45%] top-10 translate-x-1/2 lg:translate-x-0 right-1/2 lg:right-5 xl:right-20 flex flex-col gap-2 md:gap-5 rounded-3xl px-5 pt-5 md:pt-8 pb-5 lg:pb-5 xl:pb-15 border-2 border-[#EFEFEF] z-0">
          <h1 className="text-4xl md:text-6xl lg:text-4xl xl:text-7xl font-bold flex gap-5">Online <span className="flex flex-col gap-1">Tuitions <Image src={`${basePath}images/icons/underline-stroke.svg`} alt="Underline Stroke" width={300} height={5} className="px-5 w-55" /></span></h1>
          <h2 className="text-2xl xl:text-5xl leading-tight pr-15 md:pr-0">From <span className="text-[#507FCB]">India's Best</span> Tutors, Right at Home!</h2>
      </div>
      <div className="w-full lg:w-1/2 relative mt-35 sm:mt-40 md:mt-50 lg:mt-0">
          <span className="absolute -top-8 left-[16%]">
            <Image src={`${basePath}images/icons/sparkle-one.png`} alt="Sparkle" width={50} height={50} className="w-5" />
          </span>

          <span className="absolute bottom-[20%] left-[5%]">
            <Image src={`${basePath}images/icons/sparkle-three.png`} alt="Sparkle" width={50} height={50} className="w-7" />
          </span>

          <span className="absolute top-[35%] right-10">
            <Image src={`${basePath}images/icons/star.png`} alt="Star" width={50} height={50} className="w-4" />
          </span>

          <span className="absolute top-15 left-[51%]">
            <Image src={`${basePath}images/icons/sparkle-four.png`} alt="Sparkle" width={50} height={50} className="w-5" />
          </span>
        
          <span className="absolute bottom-[10%] left-[0%] sm:left-[48%]">
            <Image src={`${basePath}images/icons/plus.png`} alt="Plus" width={50} height={50} className="w-3" />
          </span>

          <span className="absolute bottom-15 sm:bottom-[43%] right-25 sm:right-5">
            <Image src={`${basePath}images/icons/5-star.png`} alt="5 Star" width={50} height={50} className="w-45" />
          </span>
          {
            
          FeaturedExperts && FeaturedExperts.length > 0 && (
            <div className="flex gap-3 sm:gap-5 md:px-10 lg:px-5 xl:px-[7.5%] justify-center z-1 relative">
              {
                leftFeaturedExperts.length > 0 && (
                <div className="flex flex-col gap-3 sm:gap-5">
                  {
                    leftFeaturedExperts.map((expert, key) => (

                    <div className="rounded-3xl shadow-[0_0_4px_rgba(0,0,0,0.25)] border-2 border-[#F4F4F4] p-[0.05rem] relative" key={key}>
                      {
                        key === 0 && (
                          <span className="absolute -top-2 -left-2 h-20 w-25 sm:h-25 sm:w-40 border-t-3 border-l-3 lg:border-t-4 lg:border-l-4 border-[#D3344D] rounded-tl-4xl"></span>
                        )
                      }
                      
                      <div className="rounded-3xl overflow-hidden relative">
                        <Image src={expert.expert_thumbnail} alt={expert.expert_name} width={300} height={400} className="scale-105" />
                        <div className='w-full absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent'></div>
                        <div className="absolute left-0 bottom-0 z-10 text-white flex flex-col gap-0 px-3 py-3">
                          <div className="flex gap-2 items-center">
                            <h2 className="text-lg">{expert.expert_name}</h2>
                            <Image src={`${basePath}images/icons/profile-green-tick.png`} alt="Profile Green Tick" width={50} height={50} className="w-4 h-4" />
                          </div>
                          <p className="text-[#AECDFF] text-xs md:text-sm">{expert.expert_education}</p>
                        </div>
                      </div>
                    </div>

                  ))
                  }
                </div>
              )
              }
              {
                rightFeaturedExperts.length > 0 && (
                <div className="flex flex-col gap-3 sm:gap-5 pt-25 pb-10">
                  {
                    rightFeaturedExperts.map((expert, key) => (
                    <div className="rounded-3xl shadow-[0_0_4px_rgba(0,0,0,0.25)] border-2 border-[#F4F4F4] p-[0.05rem] relative" key={key}>
                      <div className="rounded-3xl overflow-hidden relative">
                        <Image src={expert.expert_thumbnail} alt={expert.expert_name} width={300} height={400} className="scale-105" />
                        <div className='w-full absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent'></div>
                        <div className="absolute left-0 bottom-0 z-10 text-white flex flex-col gap-0 px-3 py-3">
                          <div className="flex gap-2 items-center">
                            <h2 className="text-lg">{expert.expert_name}</h2>
                            <Image src={`${basePath}images/icons/profile-green-tick.png`} alt="Profile Green Tick" width={50} height={50} className="w-4 h-4" />
                          </div>
                          <p className="text-[#AECDFF] text-xs md:text-sm">{expert.expert_education}</p>
                        </div>
                      </div>
                      {
                        (key + 1) === rightFeaturedExperts.length && (
                          <span className="absolute -bottom-2 -right-2 h-25 w-20 sm:h-40 sm:w-25 border-b-3 border-r-3 lg:border-b-4 lg:border-r-4 border-[#D3344D] rounded-br-4xl"></span>
                        )
                      }
                    </div>
                  ))
                  }
                </div>
              )
              }
            </div>
          )
          }
      </div>
      {
        studentBenefits && studentBenefits.length > 0 && (
        <div className="absolute left-0 bottom-145 lg:bottom-10 w-full lg:w-1/2">
          <ul className="flex flex-col font-medium gap-2 md:gap-[1rem] px-15 md:px-30 lg:px-0 sm:justify-center items-end sm:items-center text-lg font-medium z-1">
              {
                studentBenefits.map((benefit, key) => (
                <li className="relative flex items-center gap-2 rounded-4xl w-fit px-3 py-2 shadow-[0_0_8px_rgba(112,112,112,0.35)] before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:right-full before:w-[100vw] before:border-t before:border-dashed before:border-2 before:border-[#D7D7D7]" key={key}>
                    <Image src={`${basePath}images/icons/green-check.png`} alt="Green Check" width={88} height={88} className="w-6 md:w-5" />
                    {benefit.benefit_caption}
                </li>
                ))
              }
          </ul>
        </div>
      )
      }

      <div className="w-full lg:w-1/2 md:px-5">
        <div className="flex flex-col gap-5 p-5 rounded-3xl border-2 border-[#EFEFEF] relative z-1 mt-5 lg:mt-38 xl:mt-65 md:mx-5 lg:mx-0 lg:w-sm xl:w-2/3 bg-white">
          <h2 className="text-[#D3344D] text-2xl font-semibold">Fill the details below!</h2>
          <form className="flex flex-col text-[#1B3867]" autoComplete="off" onSubmit={studentRegistrationSubmit}>
            <div className="flex flex-col">
              <div className="relative">
                <input type="text" name="student_full_name" id="student_full_name" className="peer w-full pt-5 pb-1 rounded-lg px-3 border-2 border-[#C7C7C7] focus:outline-none focus:border-[#1B3867]" placeholder=" " onChange={handleStudentRegistrationFormChange} value={studentRegistrationForm.student_full_name} ref={studentFullNameRef} />
                <label htmlFor="student_full_name" className="absolute top-1/2 left-3 -translate-y-1/2 text-md md:text-sm transition-all duration-200 text-[#91989F] peer-focus:top-3 peer-focus:text-xs peer-not-placeholder-shown:top-3 peer-not-placeholder-shown:text-xs">Full Name</label>
              </div>
              <div className="text-red-700 -mt-1 mb-1 h-5">
                <span className={`text-xs transition-all duration-200 ${errors.student_full_name ? "opacity-100" : "opacity-0"}`}>{errors.student_full_name}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="relative">
                <PhoneInput country={"in"} disableCountryCode={false} countryCodeEditable={false} value={studentRegistrationForm.student_mobile_number} onChange={(student_mobile_number) => setStudentRegistrationForm((prev) => ({...prev, student_mobile_number: `+${student_mobile_number}`}))} inputProps={{
                  name: "student_mobile_number",
                  id: "student_mobile_number",
                  ref: studentMobileNumberRef,
                  placeholder: ""
                }} containerClass="w-full [&_.selected-flag]:hover:!bg-transparent" inputClass="peer !w-full !h-14 !pr-3 !pt-5 !pb-1 !rounded-lg !border-2 !border-[#C7C7C7] focus:!border-[#1B3867] focus:!outline-none" buttonClass="!border-2 !border-[#C7C7C7] peer-hover:!border-[#C7C7C7] peer-focus:!border-[#1B3867] !bg-transparent !rounded-l-lg" />
                <label htmlFor="student_mobile_number" className={`absolute left-20 text-[#91989F] transition-all duration-200 ${studentRegistrationForm.student_mobile_number ? 'top-3 text-xs' : 'top-2/3 -translate-y-2/3 text-md md:text-sm' }`}>Phone Number</label>
              </div>
              <div className="text-red-700 -mt-1 mb-1 h-5">
                <span className={`text-xs transition-all duration-200 ${errors.student_mobile_number ? "opacity-100" : "opacity-0"}`}>{errors.student_mobile_number}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="relative">
                <input type="email" name="student_email_id" id="student_email_id" className="peer w-full pt-5 pb-1 rounded-lg px-3 border-2 border-[#C7C7C7] focus:outline-none focus:border-[#1B3867]" placeholder=" " onChange={handleStudentRegistrationFormChange} value={studentRegistrationForm.student_email_id} ref={studentEmailIDRef} />
                <label htmlFor="student_email_id" className="absolute top-1/2 left-3 -translate-y-1/2 text-md md:text-sm transition-all duration-200 text-[#91989F] peer-focus:top-3 peer-focus:text-xs peer-not-placeholder-shown:top-3 peer-not-placeholder-shown:text-xs">Email Address</label>
              </div>
              <div className="text-red-700 -mt-1 mb-1 h-5">
                <span className={`text-xs transition-all duration-200 ${errors.student_email_id ? "opacity-100" : "opacity-0"}`}>{errors.student_email_id}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="relative">
                <input type="text" name="student_learning_subjects" id="student_learning_subjects" className="peer w-full pt-5 pb-1 rounded-lg px-3 border-2 border-[#C7C7C7] focus:outline-none focus:border-[#1B3867]" placeholder=" " onChange={handleStudentRegistrationFormChange} value={studentRegistrationForm.student_learning_subjects} ref={studentTeachingSubjectsRef} />
                <label htmlFor="student_learning_subjects" className="absolute top-1/2 left-3 -translate-y-1/2 text-md md:text-sm transition-all duration-200 text-[#91989F] peer-focus:top-3 peer-focus:text-xs peer-not-placeholder-shown:top-3 peer-not-placeholder-shown:text-xs">Subject You Want To Learn</label>
              </div>
              <div className="text-red-700 -mt-1 mb-1 h-5">
                <span className={`text-xs transition-all duration-200 ${errors.student_learning_subjects ? "opacity-100" : "opacity-0"}`}>{errors.student_learning_subjects}</span>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="rounded-xl p-[0.20rem] border-[1.3px] border-[#E43955] text-white transition duration-200 hover:shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]">
                <button type="submit" className="rounded-lg default-bg px-8 py-3 text-xl md:text-lg flex items-center justify-center gap-5 cursor-pointer">
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

      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 cursor-pointer" onClick={() => scrollWithOffset(StudentBenefitsRef)}>
        <Image src={`${basePath}images/icons/circle-arrow.png`} alt="Circle Arrow" width={100} height={100} className="w-13" />
      </span>

      <span className="absolute -right-10 md:-right-15 bottom-[60%] lg:bottom-[35%]">
        <Image src={`${basePath}images/icons/pie-chart.png`} alt="Pie Chart" width={300} height={300} className="w-25 md:w-40"/>
      </span>

      <span className="absolute right-25 md:right-40 bottom-[61%] lg:bottom-[35%] hidden lg:block">
        <Image src={`${basePath}images/icons/chat.png`} alt="Chat" width={54} height={43} className="w-7 md:w-10"/>
      </span>
    </section>
    {
      studentWhyJoinUs && studentWhyJoinUs.length > 0 && (
      <section className="container max-w-full bg-[#f9fbff] flex flex-col justify-center items-center py-10 px-3 xl:px-15 gap-15 font-semibold" ref={StudentBenefitsRef}>
        <h2 className="text-3xl md:text-4xl">Why Join ClassTym ?</h2>
        <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-stretch gap-5">
          {
            studentWhyJoinUs.map((why_join_us, key) => (
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