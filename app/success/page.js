"use client"
import Link from "next/link"

export default function PaymentSuccess() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">

            <div className="w-full max-w-lg rounded-2xl border border-green-500/20 bg-zinc-900 p-8 shadow-xl">

                <div className="flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-5xl">
                        ✅
                    </div>
                </div>

                <h1 className="mt-6 text-center text-3xl font-bold text-white">
                    Payment Successful
                </h1>

                <p className="mt-3 text-center text-zinc-400">
                    Thank you for your generous support! Your contribution has been
                    received successfully and is greatly appreciated.
                </p>

                <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-5">

                    <h2 className="text-lg font-semibold text-white">
                        Payment Completed
                    </h2>

                    <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                        <li>✔ Your payment has been processed successfully.</li>
                        <li>✔ Your support has been recorded.</li>
                        <li>✔ Thank you for helping the creator continue their work.</li>
                    </ul>

                </div>

                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">

                    <Link
                        href="/"
                        className="rounded-lg border cursor-pointer border-zinc-700 py-3 text-center font-semibold text-white transition hover:bg-zinc-800"
                    >
                        🏠 Home
                    </Link>

                    <button
                        onClick={() => window.print()}
                        className="rounded-lg cursor-pointer bg-zinc-800 py-3 font-semibold text-white transition hover:bg-zinc-700"
                    >
                        🖨️ Print
                    </button>

                    <Link
                        href="/YOUR_CREATOR_PAGE"
                        className="rounded-lg cursor-pointer bg-green-600 py-3 text-center font-semibold text-white transition hover:bg-green-700"
                    >
                        ❤️ Donate More
                    </Link>

                </div>

            </div>

        </div>
    )
}