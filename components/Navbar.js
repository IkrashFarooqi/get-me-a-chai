"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import React from 'react'
import Link from 'next/link'
import Github from "next-auth/providers/github"

const Navbar = () => {
    const { data: session } = useSession()
    if (session) {
        return <>
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
        </>
    }
    return (
        <nav className='bg-blue-950 text-white flex justify-between items-center px-4 h-16'>
            <div className="logo font-bold text-lg flex justify-center items-center">
                <img className='pb-2.5' width={48} src="tea.gif" alt="" />
                <span>GetmeaChai</span>
            </div>
            {/* <ul className='flex justify-between gap-4'>
                <li>Home</li>
                <li>About</li>
                <li>Projects</li>
                <li>Sign Up</li>
                <li>Login</li>
            </ul> */}
            <div>
                <Link href={"/login"}>
                    <button className='"text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5 cursor-pointer me-2 mb-2"'>Login</button></Link>
            </div>
        </nav>
    )
}

export default Navbar