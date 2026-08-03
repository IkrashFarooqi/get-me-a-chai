import PaymentPage from '@/components/PaymentPage'
import React from 'react'

const Username = async ({ params }) => {
    const { username } = await params
    return (
        <>
            <PaymentPage username={username} />
        </>
    )
}

export default Username
