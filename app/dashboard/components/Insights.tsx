import React from 'react';
import DashboardCard from './DashboardCard';

export default function Insights() {
    return (
        <DashboardCard title="Insights">
            <div className="flex flex-col justify-center h-full space-y-6 px-4 relative py-4">
                <div className="space-y-2 text-center mt-2">
                    <p className="text-lg font-bold text-[#5D4037] font-['Comic_Sans_MS','Chalkboard_SE','sans-serif']">
                        Needs Focus: <span className="text-[#E57373]">Consonant Blends</span>
                    </p>
                    <p className="text-lg font-bold text-[#5D4037] font-['Comic_Sans_MS','Chalkboard_SE','sans-serif']">
                        Next Steps: <span className="text-[#4DB6AC]">Advanced Vocabulary</span>
                    </p>
                </div>

                {/* Decorative ABCs */}
                <div className="absolute bottom-1 right-3 flex flex-col items-end opacity-60 pointer-events-none scale-75 origin-bottom-right">
                    <span className="text-4xl font-black text-[#9575CD] transform rotate-12 font-['Comic_Sans_MS','Chalkboard_SE','sans-serif']">C</span>
                    <span className="text-4xl font-black text-[#FFD54F] transform -rotate-12 mr-4 font-['Comic_Sans_MS','Chalkboard_SE','sans-serif']">B</span>
                    <span className="text-5xl font-black text-[#E57373] transform rotate-6 font-['Comic_Sans_MS','Chalkboard_SE','sans-serif']">A</span>
                </div>
            </div>
        </DashboardCard>
    );
}
