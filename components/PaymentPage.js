"use client"
import { initiate } from "@/actions/useractions"
import { useState } from "react"
import { useSession } from "next-auth/react"

const PaymentPage = ({ username }) => {
    const { data: session } = useSession()

    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }
    const pay = async (amount) => {
        try {

            const response = await initiate(
                amount,
                username,
                paymentform
            )

            if (!response?.checkoutUrl) {
                alert("Unable to start payment.")
                return
            }

            // Redirect to Safepay Checkout
            window.location.href = response.checkoutUrl

        } catch (err) {

            console.error(err)

            alert("Something went wrong while creating payment.")

        }
    }
    return (
        <>
            <div className='cover w-full bg-amber-50 relative'>
                <img className='object-cover w-full h-62.5' src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4794108/8e256b2f7f064d8d9605ff1de7973541/eyJ3IjoxMjAwLCJ3ZSI6MX0%3D/12.JPG?token-hash=4b85uokJ5yVjsKVQmkmwxQ0Ow6Gp5uW7a85l4zsMZrQ%3D&token-time=1785801600" alt="faaa" />

            </div>
            <div className='w-28 h-28 left-[46%] absolute -translate-y-1/2 border-white border-2 rounded-full'>
                <img className='rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp8DP1Vtjqz-E4WFT7fNe9sJAsKf2JRr1eaSa3eeETAQ&s=10" alt="faaa" />
            </div>
            <div className="info flex flex-col justify-center gap-2 items-center my-16">
                <div className="bold text-2xl">
                    @{username}
                </div>
                <div className='text-slate-400'>
                    Guitar and music educational content // juandarango.com
                </div>
                <div className='text-slate-400'>
                    72 posts
                </div>
                <div className="payment flex gap-3 w-[80%] mt-5">
                    <div className="supporters w-1/2 bg-slate-900 rounded-lg p-8">
                        {/* Show list of all the supporters as a leaderboard */}
                        <h2 className='text-2xl font-bold'>Supporters</h2>
                        <ul>
                            <li className='my-4 mx-4 flex items-center gap-2'>
                                <img width={33} src="avatar.gif" alt="user avatar" />
                                <span>
                                    Ahad donated <span className='font-bold'>Rs.20</span> with a message "I support you. Lots of ❤️"
                                </span>
                            </li>
                            <li className='my-4 mx-4 flex items-center gap-2'>
                                <img width={33} src="avatar.gif" alt="user avatar" />
                                <span>
                                    Ahad donated <span className='font-bold'>Rs.20</span> with a message "I support you. Lots of ❤️"
                                </span>
                            </li>
                            <li className='my-4 mx-4 flex items-center gap-2'>
                                <img width={33} src="avatar.gif" alt="user avatar" />
                                <span>
                                    Ahad donated <span className='font-bold'>Rs.20</span> with a message "I support you. Lots of ❤️"
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="makePayment flex flex-col gap-2 w-1/2 bg-slate-900 rounded-lg p-8">
                        <h2 className='text-2xl font-bold mb-4'>Make a payment</h2>

                        <input onChange={handleChange} value={paymentform.name || ""} name="name" className='w-full p-3 rounded-lg bg-slate-800' type="text" placeholder='Enter Name' />
                        <input onChange={handleChange} value={paymentform.message || ""} name="message" className='w-full p-3 rounded-lg bg-slate-800' type="text" placeholder='Enter message' />
                        <div className="flex gap-2">
                            <input onChange={handleChange} value={paymentform.amount || ""} name="amount" className='w-full p-3 rounded-lg bg-slate-800' type="number" placeholder='Enter amount' />
                            <button className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center leading-5 cursor-pointer me-2 mb-2" onClick={() => pay(Number(paymentform.amount))}>Pay</button>
                        </div>
                        <div>
                            {/* Or chose from these amount */}

                            <div className="flex gap-2 mt-5">
                                <button className='rounded-lg bg-slate-800 cursor-pointer hover:bg-slate-600 p-3' onClick={() => { pay(100) }}>Rs 100</button>
                                <button className='rounded-lg bg-slate-800 cursor-pointer hover:bg-slate-600 p-3' onClick={() => { pay(200) }}>Rs 200</button>
                                <button className='rounded-lg bg-slate-800 cursor-pointer hover:bg-slate-600 p-3' onClick={() => { pay(300) }}>Rs 300</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default PaymentPage
