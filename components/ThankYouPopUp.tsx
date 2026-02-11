"use client"

interface ThankYouPopUpProps {
    showPopUp: boolean;
    emailID: string;
}

export default function ThankYouPopUp({showPopUp, emailID}: ThankYouPopUpProps) {
    const basePath = process.env.NEXT_PUBLIC_PATH;

    return (
        <>
        <div className={`w-full h-full fixed top-20 left-0 z-10 bg-white flex justify-center opacity-100 px-3 lg:px-10 transition-all duration-300 ${showPopUp === false ? 'hidden': ''}`}>
            <div className="border-2 border-[#E9E9E9] shadow-[0_0_1px_0_rgba(0,0,0,0.15)] rounded-xl flex flex-col gap-4 justify-center items-center text-center w-sm h-65 lg:h-55 mt-[10%] p-5">
                <h2 className="text-[#E43955] text-xl lg:text-2xl">Thank you for registering!</h2>
                <span className="text-lg lg:text-xl rounded-3xl bg-[#1B38671A] px-2 py-1">{emailID}</span>
                <p>Please check your <b>registered email</b> and open the link to continue.</p>
                <p>For full  access, use a laptop or desktop</p>
            </div>
        </div>
        </>
    )
}