"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import React, { useState } from 'react'
import Link from 'next/link'

const Navbar = () => {
    const { data: session } = useSession()
    const [showdropdown, setShowdropdown] = useState(false)
    return (
        <nav className='bg-blue-950 text-white flex justify-between items-center px-4 h-16'>
            <Link href={"/"} className="logo font-bold text-lg flex justify-center items-center">
                <img className='pb-2.5' width={48} src="tea.gif" alt="" />
                <span>GetmeaChai</span>
            </Link>
            {/* <ul className='flex justify-between gap-4'>
                <li>Home</li>
                <li>About</li>
                <li>Projects</li>
                <li>Sign Up</li>
                <li>Login</li>
            </ul> */}
            <div className="relative">
                {session && <><button onClick={() => { setShowdropdown(!showdropdown) }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="inline-flex items-center justify-center text-white bg-blue-600 box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 cursor-pointer rounded-lg text-sm px-4 py-2.5 focus:outline-none mx-2" type="button">
                    Welcom {session.user.email}
                    <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" /></svg>
                </button>

                    <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} absolute left-[55] bg-gray-600 border border-default-medium rounded-base shadow-lg w-44`}>
                        <ul className="p-2 text-sm text-body font-medium" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <Link href="/dashboard" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Dashboard</Link>
                            </li>
                            <li>
                                <Link href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Your Page</Link>
                            </li>
                            <li>
                                <Link onClick={() => signOut()} href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Sign out</Link>
                            </li>
                        </ul>
                    </div>
                </>}
                {session &&
                    <button className='"text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5 cursor-pointer me-2 mb-2"' onClick={() => { signOut() }}>Logout</button>}
                {!session && <Link href={"/login"}>
                    <button className='"text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5 cursor-pointer me-2 mb-2"'>Login</button></Link>}
            </div>
        </nav>
    )
}

export default Navbar