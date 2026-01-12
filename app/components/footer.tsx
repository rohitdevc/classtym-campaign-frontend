import Image from "next/image";
import Link from "next/link";
import { GoDash } from "react-icons/go";
import { FaRegCopyright } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io";

const DoubleGradientArrows = ({ size = 24 }) => (
    <svg width={size * 1.7} height={size} viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="arrowGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E43955" />
                <stop offset="100%" stopColor="#507FCB" />
            </linearGradient>
        </defs>
        
        <polyline points="2 4, 10 12, 2 20" stroke="url(#arrowGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.2" />
        
        <polyline points="14 4, 22 12, 14 20" stroke="url(#arrowGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="1" />
    </svg>
);

export default function Footer() {
    const basePath = process.env.NEXT_PUBLIC_PATH;

    return (
        <>
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center py-5 sm:py-15">
            <Link href="https://wa.me/917065060222" target="_blank" className="flex gap-3 items-center bg-[#F5F5F5] px-3 py-2 rounded-full border border-[#E2E2E2]">
                <IoLogoWhatsapp size={30} fill="#25D366" />
                <span className="flex gap-2 items-center">
                    +91 70650 60222
                    <svg width={18 * 1.7} height={18} viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="14 4, 22 12, 14 20" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="1" />
                    </svg>
                </span>
            </Link>
            <Link href="mailto:info@classtym.com" className="flex gap-3 items-center bg-[#F5F5F5] px-3 py-2 rounded-full border border-[#E2E2E2]">
                <IoMdMail size={30} />
                <span className="flex gap-2 items-center">
                    info@classtym.com
                    <svg width={18 * 1.7} height={18} viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="14 4, 22 12, 14 20" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="1" />
                    </svg>
                </span>
            </Link>
        </div>
        <footer className="container max-w-full flex flex-col md:flex-row gap-8 md:gap-10 xl:gap-0 items-center py-10 px-5 md:px-20 bg-[#F9F9F9]">
            <div className="w-full md:w-[40%] xl:w-[70%] flex flex-col md:flex-row gap-10 md:gap-30 md:items-center lg:justify-center xl:justify-start font-semibold">
                <div className="flex flex-col gap-5">
                    <span className="flex items-center gap-2 text-xl md:text-lg">
                        <span className="bg-gradient-to-r from-[#E43955] to-[#507FCB] bg-clip-text text-transparent">Follow us on </span>
                        <DoubleGradientArrows size={18} />
                    </span>
                    <ul className="flex gap-5">
                        <li>
                            <Link href="https://www.linkedin.com/company/classtym/" target="_blank">
                                <Image src={`${basePath}images/icons/linkedin.png`} alt="Linked In" width={35} height={35} className="w-12 md:w-10" />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.instagram.com/classtym_/" target="_blank">
                                <Image src={`${basePath}images/icons/instagram.png`} alt="Instagram" width={35} height={35} className="w-12 md:w-10" />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.facebook.com/profile.php?id=61568508999980" target="_blank">
                                <Image src={`${basePath}images/icons/facebook.png`} alt="Facebook" width={35} height={35} className="w-12 md:w-10" />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.youtube.com/channel/UCHTvDrarwY0Eh-MMxmtcV7Q/featured" target="_blank">
                                <Image src={`${basePath}images/icons/youtube.png`} alt="YouTube" width={35} height={35} className="w-12 md:w-10" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full md:w-[60%] xl:w-[30%] flex lg:items-center lg:justify-center xl:justify-start xl:items-end text-md md:text-lg">
                <span className="flex items-center gap-1 text-[#5D6475]"><FaRegCopyright size={12} className="mt-[3px]" /> {new Date().getFullYear()} <GoDash /> Warwick Technologies Pvt. Ltd.</span>
            </div>
        </footer>
        </>
    )
}