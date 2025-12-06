import React from 'react';
import WordsLearned from './components/WordsLearned';
import PlayFrequency from './components/PlayFrequency';
import PerformanceOverview from './components/PerformanceOverview';
import Insights from './components/Insights';
import Image from 'next/image';
import dashboardImg from './components/dashboard.png';

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-[#FDF6E3]/50 p-4 font-['Comic_Sans_MS','Chalkboard_SE','sans-serif'] flex items-center justify-center backdrop-blur-sm">
            <div className="max-w-5xl w-full h-[75vh] bg-[#FFF9E5] border-[6px] border-[#5D4037] rounded-[2.5rem] p-6 shadow-2xl relative flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-center mb-4 relative shrink-0 gap-4">
                    <div className="relative w-12 h-12">
                        <Image
                            src={dashboardImg}
                            alt="Dashboard Icon"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-center tracking-wide text-[#5D4037]">
                        Dashboard
                    </h1>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
                    {/* Top Row */}
                    <WordsLearned />
                    <PlayFrequency />

                    {/* Bottom Row */}
                    <PerformanceOverview />
                    <Insights />
                </div>
            </div>
        </div>
    );
}
