import PaymentPage from '@/components/PaymentPage'
import React from 'react'
import { notFound } from "next/navigation"
import { fetchUser } from '@/actions/useractions'

const Username = async ({ params }) => {
    const { username } = await params
    // If the user is not found in db show 404 page
    let u = await fetchUser(username)
    if (!u) {
        notFound()
    }
    return (
        <>
            <PaymentPage username={username} />
        </>
    )
}

export default Username

export const metadata = {
    title: "User Profile - Get Me A Chai",
  }
   
