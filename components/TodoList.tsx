'use client';

import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { Todo, FilterType } from '@/lib/types';

interface TodoListProps {
    initialTodos: Todo[];
    filter: FilterType;
    onFilterChange?: (filter: FilterType) => void;
  }

export default function TodoList({ initialTodos, filter, onFilterChange }: TodoListProps) {
    const [todos, setTodos] = useState<Todo[]>(initialTodos);

    // Sync with parent's todos when they change
    useEffect(() => {
        setTodos(initialTodos);
    }, [initialTodos]);

    // Fetch todos on mount and when initialTodos changes
    useEffect(() => {
        // Filter initialTodos (full list from parent) immediately
        let filteredTodos = initialTodos;
        if (filter === 'active') {
            filteredTodos = initialTodos.filter(todo => !todo.completed);
        } else if (filter === 'completed') {
            filteredTodos = initialTodos.filter(todo => todo.completed);
        }
        setTodos(filteredTodos);

        const fetchTodos = async () => {
            try {
                const response = await fetch(`/api/todos?filter=${filter}`);
                const data = await response.json();
                setTodos(data);
            } catch (error) {
                console.error('Failed to fetch todos:', error);
            }
        };

        fetchTodos();
    }, [filter, initialTodos]);

    const handleToggle = async (id: string) => {
        try {
          const todo = todos.find(t => t.id === id);
          if (!todo) return;
    
          const response = await fetch('/api/todos', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, completed: !todo.completed }),
          });
    
          if (response.ok) {
            // Optimistic UI update
            setTodos(todos.map(t => 
              t.id === id ? { ...t, completed: !t.completed } : t
            ));
          }
        } catch (error) {
          console.error('Failed to toggle todo:', error);
        }
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

    const itemsLeft = todos.filter(todo => !todo.completed).length;

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

            <div className="px-5 py-4 flex justify-between items-center text-sm text-light-grayish-blue-dark dark:text-dark-grayish-blue-dark">
                <span>{itemsLeft} item{itemsLeft !== 1 ? 's' : ''} left</span>
                <div className="hidden md:flex space-x-4">
                <button
                    onClick={() => onFilterChange?.('all')}
                    className={`${filter === 'all' 
                        ? 'text-primary-blue font-bold' 
                        : 'text-light-grayish-blue-dark dark:text-dark-grayish-blue-dark hover:text-black dark:hover:text-white font-bold'
                    }`}
                >
                    All
                </button>
                <button
                    onClick={() => onFilterChange?.('active')}
                    className={`${filter === 'active' 
                        ? 'text-primary-blue font-bold' 
                        : 'text-light-grayish-blue-dark dark:text-dark-grayish-blue-dark hover:text-black dark:hover:text-white font-bold'
                    }`}
                >
                    Active
                </button>
                <button
                    onClick={() => onFilterChange?.('completed')}
                    className={`${filter === 'completed' 
                        ? 'text-primary-blue font-bold' 
                        : 'text-light-grayish-blue-dark dark:text-dark-grayish-blue-dark hover:text-black dark:hover:text-white font-bold'
                    }`}
                >
                    Completed
                </button>
                </div>
                <button
                onClick={async () => {
                    try {
                    const response = await fetch('/api/todos', {
                        method: 'DELETE',
                    });
                    if (response.ok) {
                        const remainingTodos = await response.json();
                        setTodos(remainingTodos);
                    }
                    } catch (error) {
                    console.error('Failed to clear completed:', error);
                    }
                }}
                className="hover:text-light-grayish-blue-very-dark dark:hover:text-dark-grayish-blue-light"
                >
                    Clear Completed
                </button>
            </div>
        </div>
    );
}