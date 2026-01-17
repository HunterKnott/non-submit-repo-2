'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import FilterButtons from '@/components/FilterButtons';
import ThemeToggle from '@/components/ThemeToggle';
import { Todo, FilterType } from '@/lib/types';

function TodoAppContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const filter = (searchParams.get('filter') as FilterType) || 'all';
    
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        fetchTodos();
    }, [filter]);

    const fetchTodos = async () => {
        try {
            const response = await fetch(`/api/todos?filter=${filter}`);
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Failed to fetch todos:', error);
        }
    };
    
    const handleAddTodo = async (text: string) => {
        try {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });
      
            if (response.ok) {
                await fetchTodos();
            }
        } catch (error) {
            console.error('Failed to add todo:', error);
            throw error;
        }
    };

    const handleFilterChange = (newFilter: FilterType) => {
        // Update URL query params to maintain filter state on page refresh
        const params = new URLSearchParams(searchParams.toString());
        params.set('filter', newFilter);
        router.push(`?${params.toString()}`);
    };

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

                {/* Add Todo Input */}
                <div className="mb-6">
                    <TodoInput onAddTodo={handleAddTodo} />
                </div>

                {/* Todo List */}
                <div className="mb-6 rounded-lg shadow-2xl">
                    <TodoList 
                        initialTodos={todos} 
                        filter={filter}
                        onFilterChange={handleFilterChange}
                    />
                </div>

                {/* Filter Buttons for Mobile */}
                <div className="md:hidden">
                    <div className="bg-light-gray-very-light dark:bg-dark-desaturated-blue-very-dark rounded-lg shadow-lg px-5 py-4 transition-colors duration-300">
                        <FilterButtons
                        currentFilter={filter}
                        onFilterChange={handleFilterChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Home() {
    // Wrap in Suspense to handle async useSearchParams in Next.js App Router
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-light-gray-very-light dark:bg-dark-blue-very-dark flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
            </div>
        }>
            <TodoAppContent />
        </Suspense>
    );
}