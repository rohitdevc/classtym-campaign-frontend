"use client"

import Image from "next/image"

export default function Header() {

    return (
        <header className="container max-w-full flex justify-center items-center py-5 shadow-[0_0px_4px_0_rgba(0,0,0,0.25)]">
            <Image src="/images/logo.png" alt="ClassTym logo" width={150} height={55} className="w-30 md:w-40" />
        </header>
    )
}