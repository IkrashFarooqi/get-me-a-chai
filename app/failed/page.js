"use client"
import Link from "next/link"

export default function PaymentFailed() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">

            <div className="w-full max-w-lg rounded-2xl border border-red-500/20 bg-zinc-900 p-8 shadow-xl">

                <div className="flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-5xl">
                        ❌
                    </div>
                </div>

                <h1 className="mt-6 text-center text-3xl font-bold text-white">
                    Payment Failed
                </h1>

                <p className="mt-3 text-center text-zinc-400">
                    Unfortunately, we couldn't complete your payment.
                    No money has been charged, or your transaction could not be verified.
                </p>

                <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-5">

                    <h2 className="text-lg font-semibold text-white">
                        Possible Reasons
                    </h2>

                    <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                        <li>• Payment was cancelled.</li>
                        <li>• Card was declined.</li>
                        <li>• Network or connection issue.</li>
                        <li>• Payment verification failed.</li>
                    </ul>

                </div>

                <div className="mt-8 flex gap-4">

                    <Link
                        href="/"
                        className="flex-1 rounded-lg border cursor-pointer border-zinc-700 py-3 text-center font-semibold text-white transition hover:bg-zinc-800"
                    >
                        Go Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex-1 rounded-lg cursor-pointer bg-red-600 py-3 text-center font-semibold text-white transition hover:bg-red-700"
                    >
                        Try Again
                    </button>

                </div>

            </div>

        </div>
    )
}