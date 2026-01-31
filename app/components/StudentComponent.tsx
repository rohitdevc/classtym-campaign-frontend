"use client"

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import parse from 'html-react-parser';
import nl2br from "nl2br";

import Header from "./header";
import Footer from "./footer";

import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import { LuGraduationCap } from "react-icons/lu";
import { IoIosStar } from "react-icons/io";
import { FaRupeeSign, FaPlay } from "react-icons/fa";

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

  const [isPhoneFocused, setIsPhoneFocused] = useState(false);

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

  useEffect(() => {
    const input = studentMobileNumberRef.current;
    if (!input) return;
    const iti = intlTelInput(input, {
      initialCountry: "in",
      separateDialCode: true,
      nationalMode: true,
    });
    
    const handleChange = () => {
      const dialCode = iti.getSelectedCountryData().dialCode;
      const nationalNumber = input.value;
      
      const fullNumber = `+${dialCode}${nationalNumber}`;

      setStudentRegistrationForm((prev) => ({...prev, student_mobile_number: fullNumber,}));
    };
    
    input.addEventListener("input", handleChange);
    
    return () => {
      input.removeEventListener("input", handleChange);
      iti.destroy();
    };
  }, []);

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
      
      const offset = 75;
      
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
      <div className="absolute w-[90%] lg:w-[46%] xl:w-[45%] top-10 translate-x-1/2 lg:translate-x-0 right-1/2 lg:right-5 xl:right-20 flex flex-col gap-2 md:gap-5 rounded-3xl px-3 md:px-5 pt-5 md:pt-8 pb-5 lg:pb-5 xl:pb-15 border-2 border-[#EFEFEF] z-0">
          <h1 className="text-4xl md:text-6xl lg:text-4xl xl:text-7xl font-bold flex gap-2">Online <span className="relative"><span>Tuitions</span> <Image src={`${basePath}images/icons/underline-stroke.svg`} alt="Underline Stroke" width={300} height={5} className="absolute left-0 h-2 md:h-4" /></span></h1>
          <h2 className="text-xl xl:text-5xl leading-snug md:leading-tight pr-15 md:pr-0">From <span className="text-[#507FCB]">India's Best</span> Tutors, Right at Home!</h2>
      </div>
      <div className="w-full lg:w-1/2 relative">
          {
            studentBenefits && studentBenefits.length > 0 && (
            <div className="w-full hidden lg:block">
              <ul className="flex flex-col font-medium gap-2 md:gap-[1rem] px-15 md:px-30 lg:px-0 sm:justify-center items-end sm:items-center text-lg font-medium z-1">
                  {
                    studentBenefits.map((benefit, key) => (
                    <li className="relative flex items-center gap-2 rounded-4xl w-fit px-3 py-2 shadow-[0_0_8px_rgba(112,112,112,0.35)] before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:right-full before:w-[100vw] before:border-t before:border-dashed before:border-2 before:border-[#D7D7D7] bg-[#14CA74] text-white" key={key}>
                        <Image src={`${basePath}images/icons/green-check.png`} alt="Green Check" width={88} height={88} className="w-6 md:w-5" />
                        {benefit.benefit_caption}
                    </li>
                    ))
                  }
              </ul>
            </div>
          )
          }
          <span className="absolute top-[30%] left-0">
            <Image src={`${basePath}images/icons/sparkle-one.png`} alt="Sparkle" width={50} height={50} className="w-5" />
          </span>

          <span className="absolute top-[60%] left-0">
            <FaPlay className="text-[#E43A56]" />
          </span>

          <span className="absolute bottom-[10%] right-0">
            <FaPlay className="text-[#E43A56] scale-x-[-1]" />
          </span>

          <span className="absolute bottom-[20%] left-[5%] hidden">
            <Image src={`${basePath}images/icons/sparkle-three.png`} alt="Sparkle" width={50} height={50} className="w-7" />
          </span>

          <span className="absolute top-[25%] right-35">
            <Image src={`${basePath}images/icons/star.png`} alt="Star" width={50} height={50} className="w-4" />
          </span>

          <span className="absolute top-15 left-[51%] hidden">
            <Image src={`${basePath}images/icons/sparkle-four.png`} alt="Sparkle" width={50} height={50} className="w-5" />
          </span>
        
          <span className="absolute bottom-[10%] left-[0%] sm:left-[48%] hidden">
            <Image src={`${basePath}images/icons/plus.png`} alt="Plus" width={50} height={50} className="w-3" />
          </span>
          {
            
          FeaturedExperts && FeaturedExperts.length > 0 && (
            <>
            <div className="flex flex-col gap-3 sm:gap-5 md:px-10 lg:px-8 justify-center z-1 relative mt-30 md:mt-30">
              {
                FeaturedExperts.map((expert, key) => (
                  <div className={`w-full flex lg:-mt-8 ${(key % 2) ? 'justify-end' : ''}`} style={{zIndex: key}}>
                    <div className={`w-94 h-full bg-white border-3 border-[#EFEFEF] rounded-lg flex gap-2 p-1`}>
                      <Image src={expert.expert_thumbnail} width="300" height="200" alt={expert.expert_name} className="w-30 h-max-full rounded-xl" />
                      <div className="py-1 flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                          <h2 className="text-lg lg:text-xl font-bold">{expert.expert_name}</h2>
                          <Image src={`${basePath}images/student/green-tick.svg`} width="20" height="20" alt="Verified" className="w-4" />
                        </div>
                        <div className="flex gap-1">
                          <LuGraduationCap size={20} />
                          <span className="text-sm lg:text-md">{expert.expert_education}</span>
                        </div>
                        <ul className="flex gap-3 mt-1">
                          <li className="flex flex-col gap-0 text-xs md:text-sm">
                            <span className="flex items-center gap-1 font-bold">{expert.expert_ratings} <IoIosStar className="text-[#EE9322]" /></span>
                            <span>{expert.expert_reviews} Reviews</span>
                          </li>
                          <li className="flex flex-col gap-0 text-xs md:text-sm">
                            <span className="flex items-center gap-1 font-bold">{expert.expert_students}</span>
                            <span>Students</span>
                          </li>
                          <li className="flex flex-col gap-0 text-xs md:text-sm">
                            <span className="flex items-center gap-1 font-bold">{expert.expert_sessions}</span>
                            <span>Sessions</span>
                          </li>
                        </ul>
                        <span className="flex items-center mt-3 gap-1 text-xs md:text-sm">
                          <FaRupeeSign size={25} />
                          <span className="select-none pointer-events-none font-bold blur-sm" aria-hidden="true">999.00</span> per hour</span>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>

            <div className="flex gap-3 sm:gap-5 md:px-10 lg:px-5 xl:px-[7.5%] justify-center z-1 relative mt-30 md:mt-20 hidden">
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
            </>
          )
          }
      </div>

      <div className="w-full lg:w-1/2 md:px-5">
        <div className="flex flex-col gap-5 p-5 rounded-3xl border-2 border-[#EFEFEF] relative z-1 mt-5 lg:mt-38 xl:mt-60 md:mx-5 lg:mx-0 lg:w-sm xl:w-2/3 bg-white">
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
                <input type="tel" id="student_mobile_number" name="student_mobile_number" inputMode="numeric" ref={studentMobileNumberRef} onFocus={() => setIsPhoneFocused(true)} onBlur={(e) => setIsPhoneFocused(!!e.target.value)} className="peer !w-full !h-14 !pl-20 !pr-3 !pt-1 !pb-1 !rounded-lg !border-2 !border-[#C7C7C7] focus:!border-[#1B3867] focus:!outline-none" />

                <label htmlFor="student_mobile_number" className={`absolute left-20 text-[#91989F] transition-all duration-200 ${isPhoneFocused || studentRegistrationForm.student_mobile_number ? "top-1 text-xs": "top-1/2 -translate-y-1/2 text-md md:text-sm"}`}>Phone Number</label>
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

      <span className="absolute -right-10 md:-right-15 bottom-[60%] lg:bottom-[35%]">
        <Image src={`${basePath}images/icons/pie-chart.png`} alt="Pie Chart" width={300} height={300} className="w-25 md:w-40"/>
      </span>

      <span className="absolute right-25 md:right-40 bottom-[61%] lg:bottom-[35%] hidden lg:block">
        <Image src={`${basePath}images/icons/chat.png`} alt="Chat" width={54} height={43} className="w-7 md:w-10"/>
      </span>
    </section>
    {
      studentWhyJoinUs && studentWhyJoinUs.length > 0 && (
      <section className="container max-w-full bg-[#f9fbff] flex flex-col justify-center items-center py-10 mt-20 px-3 xl:px-15 gap-15 font-semibold relative" ref={StudentBenefitsRef}>
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer" onClick={() => scrollWithOffset(StudentBenefitsRef)}>
          <Image src={`${basePath}images/icons/circle-arrow.png`} alt="Circle Arrow" width={100} height={100} className="w-10" />
        </span>
        <h2 className="text-3xl md:text-4xl">Why Join ClassTym ?</h2>
        <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-stretch gap-5">
          {
            studentWhyJoinUs.map((why_join_us, key) => (
            <div className="flex flex-col items-center justify-center text-center gap-1 md:gap-0 bg-[#f3f7ff] w-full md:w-[48%] xl:w-[32%] px-5 py-4 border border-[#0d99ff]/40 rounded-xl" key={key}>
              <Image src={why_join_us.why_join_us_icon} alt={why_join_us.why_join_us_caption} width={100} height={100} className="w-18 lg:w-20" />
              <p className="text-2xl lg:text-[2rem] text-[#507fcb]">{why_join_us.why_join_us_caption}</p>
              <p className="text-xl font-medium">{parse(nl2br(why_join_us.why_join_us_description))}</p>
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