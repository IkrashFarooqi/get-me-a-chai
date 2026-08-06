"use client"

import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { updateProfile, fetchUser } from "@/actions/useractions"

const Dashboard = () => {
    const { data: session, update, status } = useSession()
    const [form, setform] = useState({})
    const router = useRouter()


    const getData = async (username) => {
        const u = await fetchUser(username)
        setform(u)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!session?.user) return

        await updateProfile(new FormData(e.target), session.user.name)
        await update()

        alert("Profile updated successfully!")
    }

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            getData(session.user.name)
        } else if (status === "unauthenticated") {
            router.replace("/login")
        }
    }, [status, session])

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
            <form onSubmit={handleSubmit} className="w-full sm:w-[80%] md:w-[65%] lg:w-[50%] mx-auto pb-10">
                <div className="text-center mt-10">
                    <span className="text-3xl font-bold"> Welcome to your Dashboard</span>
                </div>
                <div className="flex gap-1 m-2 flex-col">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" className='w-full p-2 rounded-lg bg-slate-800' type="text" value={form.name || ""} onChange={(e) => setform({ ...form, name: e.target.value })} />
                </div>
                <div className="flex gap-1 m-2 flex-col">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" className='w-full p-2 rounded-lg bg-slate-800' type="email" value={form.email || ""} onChange={(e) => setform({ ...form, email: e.target.value })} />
                </div>
                <div className="flex gap-1 m-2 flex-col">
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" className='w-full p-2 rounded-lg bg-slate-800' type="text" value={form.username || ""} onChange={(e) => setform({ ...form, username: e.target.value })} />
                </div>
                <div className="flex gap-1 m-2 flex-col">
                    <label htmlFor="Ppic">Profile Picture</label>
                    <input id="Ppic" name="profilePic" className='w-full p-2 rounded-lg bg-slate-800' type="text" value={form.profilePic || ""} onChange={(e) => setform({ ...form, profilePic: e.target.value })} />
                </div>
                <div className="flex gap-1 m-2 flex-col">
                    <label htmlFor="Cpic">Cover Picture</label>
                    <input id="Cpic" name="coverPic" className='w-full p-2 rounded-lg bg-slate-800' type="text" value={form.coverPic || ""} onChange={(e) => setform({ ...form, coverPic: e.target.value })} />
                </div>
                <div className="flex gap-1 m-2 flex-col">
                    <label htmlFor="bankId">Safepay ID</label>
                    <input id="bankId" name="bankId" className='w-full p-2 rounded-lg bg-slate-800' type="text" value={form.bankId || ""} onChange={(e) => setform({ ...form, bankId: e.target.value })} />
                </div>
                <div className="flex gap-1 m-2 flex-col">
                    <label htmlFor="bankSecret">Safepay Secret</label>
                    <input id="bankSecret" name="bankSecret" className='w-full p-2 rounded-lg bg-slate-800' type="text" value={form.bankSecret || ""} onChange={(e) => setform({ ...form, bankSecret: e.target.value })} />
                </div>
                <div className="flex gap-1 mx-2 my-4 flex-col">
                    <button className="w-full items-center justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 cursor-pointer rounded-lg text-sm focus:outline-none p-2" >Save</button>
                </div>
            </form>
        </>
    )
}

export default Dashboard