'use client'
import { clsx } from '@/lib/clsx';
import { useState } from 'react';

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    company: string;
    rating: number;
}

interface TestimonialSliderProps {
    testimonials: Testimonial[];
}

export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const goToPrevious = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setDirection(-1);
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
        setTimeout(() => setIsAnimating(false), 500);
    };

    const goToNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setDirection(1);
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
        setTimeout(() => setIsAnimating(false), 500);
    };

    const NavigationButton = ({ direction }: { direction: 'prev' | 'next' }) => (
        <button
            onClick={direction === 'prev' ? goToPrevious : goToNext}
            className={clsx(
                'w-12 h-12 rounded-full backdrop-blur-sm',
                'flex items-center justify-center',
                'border border-gray-200',
                ' hover:border-gray-300',
                'transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-gray-300',
                '-translate-y-1/2',
                direction === 'prev' ? 'left-4' : 'right-4'
            )}
            aria-label={direction === 'prev' ? 'Previous testimonial' : 'Next testimonial'}
        >
            {direction === 'prev' ? (
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            ) : (
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            )}
        </button>
    );

    return (
        <div className="h-auto absolute bottom-8 flex-shrink-0 
                        backdrop-filter backdrop-blur-lg w-full p-8 rounded-lg text-white rounded-2xl shadow-xl p-8 md:p-12 overflow-hidden">
            <div className="relative">
                <div
                    className={clsx(
                        "space-y-4 flex flex-col items-start transition-transform duration-500 ease-in-out",
                        isAnimating && direction > 0 && "animate-slide-left",
                        isAnimating && direction < 0 && "animate-slide-right"
                    )}
                >
                    <p className="text-5xl md:text-4xl font-medium text-gray-100 text-start leading-10">
                        {testimonials[currentIndex].quote}
                    </p>

                    <div className='flex justify-between w-full'>
                        <div className="space-y-1">
                            <h3 className="text-4xl md:text-3xl font-medium text-gray-100 text-start pb-2">
                                {testimonials[currentIndex].author}
                            </h3>
                            <p className="text-lg font-medium text-gray-200 text-start">
                                {testimonials[currentIndex].role}
                            </p>
                            <p className="text-md font-medium text-gray-200 text-start">
                                {testimonials[currentIndex].company}
                            </p>
                        </div>

                        <div className='flex flex-col justify-between'>
                            <div className="flex gap-1">
                                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        />
                                    </svg>
                                ))}
                            </div>
                            <div className="flex gap-1 justify-center gap-x-6">
                                <NavigationButton direction="prev" />
                                <NavigationButton direction="next" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}