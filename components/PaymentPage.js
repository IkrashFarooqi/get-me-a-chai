"use client"
import { initiate } from "@/actions/useractions"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { fetchPayments } from "@/actions/useractions"

const PaymentPage = ({ username }) => {
    const [amountError, setAmountError] = useState("");
    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [payments, setPayments] = useState([])

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let dbPayments = await fetchPayments(username)
        setPayments(dbPayments)
    }
    useEffect(() => {
        getData();
    }, []);

    const pay = async (amount) => {
        if (amount <= 0) {
            setAmountError("Amount must be greater than 0.");
            return;
        }

        setAmountError("");

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
            <div className="cover w-full relative">
                <img
                    className="object-cover w-full h-40 sm:h-52 md:h-64"
                    src="https://img.magnific.com/free-vector/stylish-glowing-digital-red-lines-banner_1017-23964.jpg?semt=ais_test_b&w=740&q=80"
                    alt=""
                />
            </div>
            <div className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 border-2 border-white rounded-full overflow-hidden'>
                <img className='rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp8DP1Vtjqz-E4WFT7fNe9sJAsKf2JRr1eaSa3eeETAQ&s=10" alt="faaa" />
            </div>
            <div className="info flex flex-col justify-center items-center gap-2 my-12 px-4">
                <div className="font-bold text-xl sm:text-2xl">
                    @{username}
                </div>
                <div className='text-slate-400'>
                    Lets help <b className="text-white">{username}</b>  to get a chai
                </div>
                <div className='text-slate-400'>
                    {payments.length} Payments Rs.{payments.reduce((sum, payment) => sum + payment.amount, 0)} raised
                </div>
                <div className="payment flex flex-col-reverse md:flex-row gap-5 w-full max-w-7xl mx-auto px-4 mt-5">
                    <div className="supporters w-full lg:w-1/2 bg-slate-900 rounded-lg p-5 sm:p-8">
                        {/* Show list of all the supporters as a leaderboard */}
                        <h2 className='text-2xl font-bold'>Supporters</h2>
                        <ul>
                            {payments?.length > 0 ? (
                                payments.map((payment, index) => (
                                    <li key={index} className="my-4 mx-4 flex items-center gap-2">
                                        <img width={33} src="/avatar.gif" alt="user avatar" />
                                        <span>
                                            <span className="font-bold">{payment.name}</span> donated{" "}
                                            <span className="font-bold">Rs. {payment.amount}</span>
                                            {payment.message && <> with a message "{payment.message}"</>}
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <li className="my-4 text-slate-400">
                                    🌟 Be the first supporter to donate!
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="makePayment flex flex-col gap-3 w-full lg:w-1/2 bg-slate-900 rounded-lg p-5 sm:p-8">
                        <h2 className='text-2xl font-bold mb-4'>Make a payment</h2>

                        <input onChange={handleChange} value={paymentform.name || ""} name="name" className='w-full p-3 rounded-lg bg-slate-800' type="text" placeholder='Enter Name' />
                        <input onChange={handleChange} value={paymentform.message || ""} name="message" className='w-full p-3 rounded-lg bg-slate-800' type="text" placeholder='Enter message' />
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input onChange={handleChange} value={paymentform.amount || ""} name="amount" className='w-full p-3 rounded-lg bg-slate-800' type="number" placeholder='Enter amount' min="1" step="1" />
                            {amountError && (
                                <p className="text-red-500 text-sm mt-1">
                                    {amountError}
                                </p>
                            )}
                            <button className="w-full sm:w-auto text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl rounded-lg px-5 py-3 disabled:opacity-50" disabled={paymentform.name?.length < 3 || !paymentform.amount} onClick={() => pay(Number(paymentform.amount))}>Pay</button>
                        </div>
                        <div>
                            {/* Or chose from these amount */}

                            <div className="flex flex-wrap gap-2 mt-5">
                                <button className='flex-1 min-w-22.5 rounded-lg bg-slate-800 hover:bg-slate-600 p-3' disabled={paymentform.name?.length < 3} onClick={() => { pay(100) }}>Rs 100</button>
                                <button className='flex-1 min-w-22.5 rounded-lg bg-slate-800 hover:bg-slate-600 p-3' disabled={paymentform.name?.length < 3} onClick={() => { pay(200) }}>Rs 200</button>
                                <button className='flex-1 min-w-22.5 rounded-lg bg-slate-800 hover:bg-slate-600 p-3' disabled={paymentform.name?.length < 3} onClick={() => { pay(300) }}>Rs 300</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default PaymentPage
