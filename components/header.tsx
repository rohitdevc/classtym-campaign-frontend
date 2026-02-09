"use client"

import Image from "next/image"

interface HeaderProps {
    showLoader: boolean;
}

export default function Header({showLoader}: HeaderProps) {
    const basePath = process.env.NEXT_PUBLIC_PATH;

    return (
        <>
        <div className={`h-full w-full fixed top-0 left-0 z-10 cursor-wait bg-center bg-no-repeat bg-white opacity-50 ${showLoader === false ? 'hidden': ''}`} style={{backgroundImage: `url(${basePath}images/img_loader.gif)`}}></div>
        <header className="container max-w-full flex justify-center items-center py-5 shadow-[0_0px_4px_0_rgba(0,0,0,0.25)] fixed top-0 bg-white z-10">
            <Image src={`${basePath}images/logo.png`} alt="ClassTym logo" width={150} height={55} className="w-30 md:w-40" />
        </header>
        </>
    )
}