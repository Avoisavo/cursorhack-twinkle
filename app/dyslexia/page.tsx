'use client';

import { useState, Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { BookScene } from './components/BookScene';
import { BookPageLayout } from './components/BookPageLayout';
import LearnWordNavbar from './components/LearnWordNavbar';
import ColoredOverlay from './components/ColoredOverlay';
import VisualTrackingMagnifier, { WordWrapper } from './components/VisualTrackingMagnifier';
import Button from './components/Button';

export default function DyslexiaPage() {
    const [flippedIndex, setFlippedIndex] = useState(0);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [dyslexiaModeEnabled, setDyslexiaModeEnabled] = useState(true);
    const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

    // Text to display on page 2
    const text = "Here is apple. I like apple.";
    const words = text.split(' ');

    // Reset word index when page changes
    useEffect(() => {
        if (flippedIndex >= 1) {
            setCurrentWordIndex(0);
            // Reset word refs array
            wordRefs.current = new Array(words.length).fill(null);
        }
    }, [flippedIndex, words.length]);

    const handleNextWord = () => {
        if (currentWordIndex < words.length - 1) {
            setCurrentWordIndex(prev => prev + 1);
        }
    };

    const handleWordRef = (ref: HTMLSpanElement | null, index: number) => {
        wordRefs.current[index] = ref;
    };

    // Simple pages for the book - no learning functions
    const pages = [
        {
            left: (
                <group position={[0, 0, 0]}>
                    {/* Empty left page */}
                </group>
            ),
            right: (
                <BookPageLayout pageNumber={1}>
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <h2 className="text-4xl font-bold text-gray-800">Welcome</h2>
                    </div>
                </BookPageLayout>
            )
        },
        {
            left: (
                <group position={[0, 0, 0]}>
                    {/* Empty left page */}
                </group>
            ),
            right: (
                <BookPageLayout pageNumber={2}>
                    <div className="w-full h-full flex flex-col justify-center items-center gap-6 px-8 relative">
                        {/* Visual Tracking Magnifier - Word highlighting only, no circle */}
                        {flippedIndex >= 1 && dyslexiaModeEnabled && (
                            <VisualTrackingMagnifier />
                        )}

                        {/* Text with word-by-word highlighting */}
                        <div className="text-center space-y-4 relative z-10">
                            <div className="text-3xl font-bold leading-relaxed flex flex-wrap justify-center items-center gap-2">
                                {words.map((word, index) => (
                                    <WordWrapper
                                        key={index}
                                        word={word}
                                        index={index}
                                        isCurrent={index === currentWordIndex}
                                        onRef={handleWordRef}
                                        dyslexiaModeEnabled={dyslexiaModeEnabled}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Controls */}
                        {flippedIndex >= 1 && (
                            <div className="flex flex-col gap-4 items-center mt-4 z-10">
                                {/* Dyslexia Mode Toggle */}
                                <Button
                                    onClick={() => setDyslexiaModeEnabled(!dyslexiaModeEnabled)}
                                    variant={dyslexiaModeEnabled ? 'primary' : 'secondary'}
                                >
                                    {dyslexiaModeEnabled ? '✓ Dyslexia Mode On' : 'Dyslexia Mode Off'}
                                </Button>

                                {/* Next Word Button */}
                                {currentWordIndex < words.length - 1 ? (
                                    <Button
                                        onClick={handleNextWord}
                                        variant="primary"
                                        className="mt-2"
                                    >
                                        Next Word →
                                    </Button>
                                ) : (
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="text-green-600 font-bold text-xl">
                                            ✓ Finished Reading!
                                        </div>
                                        <Button
                                            onClick={() => setCurrentWordIndex(0)}
                                            variant="secondary"
                                            className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full flex items-center gap-1"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12" />
                                                <path d="M3 5v7h7" />
                                            </svg>
                                            Restart
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </BookPageLayout>
            )
        }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center p-4 font-sans relative overflow-hidden" style={{
            backgroundImage: 'url(/bg_book_room.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            {/* Navbar */}
            <LearnWordNavbar />

            {/* Colored Overlay - Only show on page 2 when dyslexia mode is enabled */}
            <ColoredOverlay enabled={dyslexiaModeEnabled && flippedIndex >= 1} />

            {/* 3D Book */}
            <div
                className="fixed inset-0 z-0"
                onClick={(e) => {
                    // Only flip page if clicking on the book area, not on buttons or text
                    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('.z-10')) {
                        return;
                    }
                    // Increment flippedIndex when clicked, but don't exceed the number of pages
                    setFlippedIndex(prev => Math.min(prev + 1, pages.length));
                }}
            >
                <Canvas shadows camera={{
                    position: [-0.5, 1, 4],
                    fov: 45,
                }}>
                    <group position-y={0}>
                        <Suspense fallback={null}>
                            <BookScene
                                pages={pages}
                                flippedIndex={flippedIndex}
                                isLevelComplete={false}
                            />
                        </Suspense>
                    </group>
                </Canvas>
                <Loader />
            </div>
        </div>
    );
}
