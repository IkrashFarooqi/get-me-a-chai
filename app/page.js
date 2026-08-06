"use client"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <div className="mb-10">
        <div className="text-white flex flex-col justify-center gap-4 items-center h-[44vh]">
          <div className="font-bold text-3xl sm:text-5xl flex justify-center items-center gap-2">Get me a chai <span><img className="w-16 pb-4" src="tea.gif" alt="Tea-gif" /></span></div>
          <p className="text-center px-4">
            A crowd funding platform for creators. Get funded by your fans and followers. Start now!
          </p>
          <div className="gap-3 flex">
            <Link href="/login"> <button type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5 cursor-pointer me-2 mb-2">Start here</button></Link>
            <Link href="/about"><button type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5 cursor-pointer me-2 mb-2">Read more</button></Link>
          </div>
        </div>

        <div className="bg-white h-1 opacity-10"></div>

        <div className="text-white container mx-auto py-20">
          <h2 className="font-bold text-3xl mx-4 sm:text-5xl flex justify-center text-center gap-2 my-2" >Your fans can buy you a chai</h2>
          <div className="flex flex-row max-[600px]:flex-col gap-5 justify-around">
            <div className="item space-y-3 flex flex-col justify-center items-center">
              <img width={88} className="bg-slate-400 rounded-full p-2" src="man.gif" alt="" />
              <p className="font-bold">Fans want to help</p>
              <p className="text-center">Your fans are avaliable for you to help you</p>
            </div>
            <div className="item space-y-3 flex flex-col justify-center items-center">
              <img width={88} className="bg-slate-400 rounded-full p-2" src="coin.gif" alt="" />
              <p className="font-bold">Fans want to help</p>
              <p className="text-center">Your fans are avaliable for you to help you</p>
            </div>
            <div className="item space-y-3 flex flex-col justify-center items-center">
              <img width={88} className="bg-slate-400 rounded-full p-2" src="group.gif" alt="" />
              <p className="font-bold">Fans want to help</p>
              <p className="text-center">Your fans are avaliable for you to help you</p>
            </div>
          </div>
        </div>
        <div className="bg-white h-1 opacity-10"></div>

        <div className="w-full max-w-4xl mx-auto">
          <div className="aspect-video">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/4YlTuM5ucd8?si=-bLnj5tfgOTjsd6b"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
