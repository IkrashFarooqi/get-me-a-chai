"use client"

import { useSession, signOut } from "next-auth/react"
import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"

const Navbar = () => {
    const { data: session } = useSession()
    const [showdropdown, setShowdropdown] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowdropdown(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <nav className="bg-blue-950 text-white flex justify-between items-center px-4 h-16">
            <Link
                href="/"
                className="logo font-bold text-lg flex justify-center items-center"
            >
                <img className="pb-2.5" width={48} src="/tea.gif" alt="Logo" />
                <span>GetmeaChai</span>
            </Link>

            <div className="relative" ref={dropdownRef}>
                {session ? (
                    <>
                        <button
                            onClick={() => setShowdropdown(!showdropdown)}
                            className="inline-flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm px-4 py-2.5 mx-2"
                        >
                            Welcome {session.user.email}
                            <svg
                                className="w-4 h-4 ms-1.5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 9-7 7-7-7"
                                />
                            </svg>
                        </button>

                        <div
                            className={`absolute right-0 mt-2 w-44 bg-gray-700 rounded-lg shadow-lg z-50 ${
                                showdropdown ? "" : "hidden"
                            }`}
                        >
                            <ul className="py-2 text-sm">
                                <li>
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setShowdropdown(false)}
                                        className="block px-4 py-2 hover:bg-gray-600"
                                    >
                                        Dashboard
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href={`/${session.user.name}`}
                                        onClick={() => setShowdropdown(false)}
                                        className="block px-4 py-2 hover:bg-gray-600"
                                    >
                                        Your Page
                                    </Link>
                                </li>

                                <li>
                                    <button
                                        onClick={() => signOut()}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-600"
                                    >
                                        Sign Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <Link href="/login">
                        <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-4 py-2.5">
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar