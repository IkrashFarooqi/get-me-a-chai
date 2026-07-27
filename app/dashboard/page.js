"use client"

import React, { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const Dashboard = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login")
        }
    }, [status, router])

    if (status === "loading") {
        return <div className="flex min-h-screen items-center justify-center">
            <p>Loading...</p>
        </div>
    }

    if (status === "unauthenticated") {
        return null
    }

    return (
        <>
            <form className="w-full sm:w-[80%] md:w-[65%] lg:w-[50%] mx-auto pb-10">
                <div className="text-center mt-10">
                    <span className="text-3xl font-bold"> Welcome to your Dashboard</span>
                </div>
                <div className="flex gap-1 m-2 flex-col">
                    <label htmlFor="name">Name</label>
                    <input id="name" className='w-full p-2 rounded-lg bg-slate-800' type="text" />
                </div>
                <div className="flex gap-1 m-2 flex-col">
                    <label htmlFor="email">Email</label>
                    <input id="email" className='w-full p-2 rounded-lg bg-slate-800' type="email" />
                </div>
                <div className="flex gap-1 m-2 flex-col">
                    <label htmlFor="username">Username</label>
                    <input id="username" className='w-full p-2 rounded-lg bg-slate-800' type="text" />
                </div>
                <div className="flex gap-1 m-2 flex-col">
                    <label htmlFor="Ppic">Profile Picture</label>
                    <input id="Ppic" className='w-full p-2 rounded-lg bg-slate-800' type="text" />
                </div>
                <div className="flex gap-1 m-2 flex-col">
                    <label htmlFor="Cpic">Cover Picture</label>
                    <input id="Cpic" className='w-full p-2 rounded-lg bg-slate-800' type="text" />
                </div>
                <div className="flex gap-1 m-2 flex-col">
                    <label htmlFor="bank">JazzCash Credientials</label>
                    <input id="bank" className='w-full p-2 rounded-lg bg-slate-800' type="text" />
                </div>
                <div className="flex gap-1 mx-2 my-4 flex-col">
                    <button className="w-full items-center justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 cursor-pointer rounded-lg text-sm focus:outline-none p-2" >Save</button>
                </div>
            </form>
        </>
    )
}

export default Dashboard