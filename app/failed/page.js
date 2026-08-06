import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchPaymentByTracker } from "@/actions/useractions";

export default async function PaymentFailed({ searchParams }) {

    const { tracker } = await searchParams;

    if (!tracker) {
        notFound();
    }

    const payment = await fetchPaymentByTracker(tracker);

    if (!payment || payment.status !== "failed") {
        notFound();
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

            <div className="w-full max-w-xl bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8">

                <div className="text-center">

                    <div className="text-6xl mb-4">
                        ❌
                    </div>

                    <h1 className="text-3xl font-bold text-red-500">
                        Payment Failed
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Your payment could not be completed.
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
                        <span className="font-semibold text-red-400">
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
                        className="text-center bg-slate-800 hover:bg-slate-700 transition rounded-lg py-3 font-semibold"
                    >
                        🏠 Home
                    </Link>

                    <Link
                        href={`/${payment.to_user}`}
                        className="text-center bg-yellow-600 hover:bg-yellow-700 transition rounded-lg py-3 font-semibold"
                    >
                        🔄 Try Again
                    </Link>

                    <Link
                        href="/contact"
                        className="text-center bg-red-600 hover:bg-red-700 transition rounded-lg py-3 font-semibold"
                    >
                        🆘 Support
                    </Link>

                </div>

            </div>

        </div>
    );
}
export const metadata = {
    title: "Payment Failed - Get Me A Chai",
  }
   