'use client';

import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { Todo } from '@/lib/types';

interface TodoListProps {
    initialTodos: Todo[];
}

export default function TodoList({ initialTodos }: TodoListProps) {
    const [todos, setTodos] = useState<Todo[]>(initialTodos);

    // Fetch todos on mount and when initialTodos changes
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('/api/todos');
                const data = await response.json();
                setTodos(data);
            } catch (error) {
                console.error('Failed to fetch todos:', error);
            }
        };

        fetchTodos();
    }, [initialTodos]);

    const handleToggle = async (id: string) => {
        // Optimistic update
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/todos?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove todo from local state
                setTodos(todos.filter(todo => todo.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete todo:', error);
        }
    };

    return (
        <div className="bg-light-gray-very-light dark:bg-dark-desaturated-blue-very-dark rounded-lg shadow-lg overflow-hidden">
            {todos.length > 0 ? (
                <div className="divide-y divide-light-grayish-blue-light dark:divide-dark-grayish-blue-very-dark">
                    {todos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={handleToggle}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="px-5 py-8 text-center text-light-grayish-blue-dark dark:text-dark-grayish-blue-dark">
                    No todos found
                </div>
            )}
        </div>
    );
}