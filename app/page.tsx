'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TodoList from '@/components/TodoList';
import ThemeToggle from '@/components/ThemeToggle';

function TodoAppContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    return (
        <div className="min-h-screen bg-light-gray-very-light dark:bg-dark-blue-very-dark">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-80">
                <img
                    src="/images/bg-desktop-light.jpg"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover dark:opacity-0 dark:pointer-events-none"
                />
                <img
                    src="/images/bg-desktop-dark.jpg"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 dark:opacity-100 dark:pointer-events-auto pointer-events-none"
                />
            </div>

            <div className="relative container mx-auto px-4 pt-12 md:pt-20 max-w-lg">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-widest">
                        TODO
                    </h1>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <TodoAppContent />
    );
}