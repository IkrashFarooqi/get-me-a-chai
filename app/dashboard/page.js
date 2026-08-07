"use client"

import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { updateProfile, fetchUser } from "@/actions/useractions"
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Dashboard = () => {
    const { data: session, update, status } = useSession()
    const [form, setform] = useState({})
    const [showBankId, setShowBankId] = useState(false);
    const [showBankSecret, setShowBankSecret] = useState(false);
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

                    <div className="relative">
                        <input
                            id="bankId"
                            name="bankId"
                            type={showBankId ? "text" : "password"}
                            className="w-full p-2 pr-10 rounded-lg bg-slate-800"
                            value={form.bankId || ""}
                            onChange={(e) => setform({ ...form, bankId: e.target.value })}
                        />

                        <span
                            onClick={() => setShowBankId(!showBankId)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                        >
                            {showBankId ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
                <div className="flex gap-1 m-2 flex-col">
                    <label htmlFor="bankSecret">Safepay Secret</label>

                    <div className="relative">
                        <input
                            id="bankSecret"
                            name="bankSecret"
                            type={showBankSecret ? "text" : "password"}
                            className="w-full p-2 pr-10 rounded-lg bg-slate-800"
                            value={form.bankSecret || ""}
                            onChange={(e) => setform({ ...form, bankSecret: e.target.value })}
                        />

                        <span
                            onClick={() => setShowBankSecret(!showBankSecret)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                        >
                            {showBankSecret ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
                <div className="flex gap-1 mx-2 my-4 flex-col">
                    <button className="w-full items-center justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 cursor-pointer rounded-lg text-sm focus:outline-none p-2" >Save</button>
                </div>
            </form>
        </>
    )
}

export default Dashboard