import React from 'react';

interface DashboardCardProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
}

export default function DashboardCard({ title, subtitle, children, className = '' }: DashboardCardProps) {
    return (
        <div className={`bg-[#FFFDF5] rounded-2xl border-4 border-[#E0C097] p-4 shadow-sm relative overflow-hidden flex flex-col ${className}`}>
            {/* Title Area */}
            <div className="text-center mb-2 relative z-10">
                <h2 className="text-lg font-bold text-[#5D4037] font-['Comic_Sans_MS','Chalkboard_SE','sans-serif']">{title}</h2>
                {subtitle && <p className="text-xs font-medium text-[#8D6E63] mt-0.5 font-['Comic_Sans_MS','Chalkboard_SE','sans-serif']">{subtitle}</p>}
                {/* Underline decoration */}
                <div className="h-1 w-16 bg-[#E0C097]/50 mx-auto mt-1 rounded-full"></div>
            </div>
            <div className="relative z-10 flex-1">
                {children}
            </div>
        </div>
    );
}
