import React, { useState } from 'react';
import Image from 'next/image';
import DashboardCard from './DashboardCard';
import bookImg from './book.png';

export default function WordsLearned() {
    const [showVideo, setShowVideo] = useState(false);

    return (
        <DashboardCard title="Words Learned">
            {showVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setShowVideo(false)}>
                    <div className="relative w-[80vw] max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                        <video
                            src="/audios/quiz.mp4"
                            controls
                            autoPlay
                            className="w-full h-full"
                        />
                        <button
                            onClick={() => setShowVideo(false)}
                            className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
            <div className="flex flex-col items-center justify-center h-full pb-2">
                <div className="relative flex flex-col items-center">
                    {/* Cloud Background (CSS shape) */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-28 bg-[#E3F2FD] rounded-full opacity-80 blur-sm -z-10"></div>

                    <div className="text-center z-10 -mt-2">
                        <span className="text-5xl font-black text-[#5D4037] block leading-none font-['Comic_Sans_MS','Chalkboard_SE','sans-serif']">
                            12
                            <span
                                onClick={() => setShowVideo(true)}
                                className="cursor-pointer hover:text-[#8D6E63] transition-colors active:scale-95 inline-block"
                                title="Click for a surprise!"
                            >
                                5
                            </span>
                        </span>
                        <span className="text-lg font-bold text-[#8D6E63] font-['Comic_Sans_MS','Chalkboard_SE','sans-serif']">Words</span>
                    </div>

                    <div className="relative w-20 h-20 -mt-2">
                        <Image
                            src={bookImg}
                            alt="Stack of books"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
}
