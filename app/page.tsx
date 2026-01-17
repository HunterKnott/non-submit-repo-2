'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function TodoAppContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    return (
        <div className="min-h-screen">

        </div>
    );
}

export default function Home() {
    return (
        <TodoAppContent />
    );
}