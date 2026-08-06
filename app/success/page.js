import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchPaymentByTracker } from "@/actions/useractions";

export default async function PaymentSuccess({ searchParams }) {

    const { tracker } = await searchParams;

    if (!tracker) {
        notFound();
    }

    const payment = await fetchPaymentByTracker(tracker);

    if (!payment || payment.status !== "success") {
        notFound();
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

            <div className="w-full max-w-xl bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8">

                <div className="text-center">

                    <div className="text-6xl mb-4">
                        🎉
                    </div>

                    <h1 className="text-3xl font-bold text-green-500">
                        Payment Successful
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Thank you for your support!
                    </p>

                </div>

                <div className="mt-8 space-y-4">

                    <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Name</span>
                        <span className="font-semibold">{payment.name}</span>
                    </div>

                    <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Recipient</span>
                        <span className="font-semibold">@{payment.to_user}</span>
                    </div>

                    <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Amount</span>
                        <span className="font-semibold text-green-400">
                            Rs. {payment.amount}
                        </span>
                    </div>

                    <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Message</span>
                        <span className="font-semibold text-right max-w-[60%]">
                            {payment.message || "No message"}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-slate-400">Date</span>
                        <span className="font-semibold">
                            {new Date(payment.createdAt).toLocaleString()}
                        </span>
                    </div>

                </div>

                <div className="grid grid-cols-3 gap-3 mt-10">

                    <Link
                        href="/"
                        className="text-center cursor-pointer bg-slate-800 hover:bg-slate-700 transition rounded-lg py-3 font-semibold"
                    >
                        🏠 Home
                    </Link>

                    <button
                        className="bg-blue-600 cursor-pointer hover:bg-blue-700 transition rounded-lg py-3 font-semibold"
                    >
                        🖨️ Print
                    </button>

                    <Link
                        href={`/${payment.to_user}`}
                        className="text-center cursor-pointer bg-green-600 hover:bg-green-700 transition rounded-lg py-3 font-semibold"
                    >
                        💝 Donate More
                    </Link>

                </div>

            </div>

        </div>
    );
}

export const metadata = {
    title: "Payment Success - Get Me A Chai",
  }
   