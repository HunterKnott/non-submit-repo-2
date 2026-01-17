'use client';

import { useState } from 'react';
import { Todo } from '@/lib/types';
import Image from 'next/image';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {

    const handleDelete = async () => {
        try {
            await onDelete(todo.id);
        } catch (error) {
            console.error('Failed to delete todo:', error);
        }
    };

    return (
        <div className="group flex items-center gap-4 px-5 py-4 bg-light-gray-very-light dark:bg-dark-desaturated-blue-very-dark border-b border-light-grayish-blue-light dark:border-dark-grayish-blue-very-dark">
            {/* Checkbox circle */}
            <button
                onClick={() => onToggle(todo.id)}
                className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center relative ${
                todo.completed
                    ? 'gradient-check border-0'
                    : 'border-light-grayish-blue-light dark:border-dark-grayish-blue-very-dark gradient-border'
                }`}
                aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
                {todo.completed && (
                <Image
                    src="/images/icon-check.svg"
                    alt="Completed"
                    width={11}
                    height={9}
                    className="flex-shrink-0 relative z-10"
                />
                )}
            </button>

            <span
                className={`flex-grow text-lg cursor-pointer ${
                todo.completed
                    ? 'line-through text-light-grayish-blue-dark dark:text-dark-grayish-blue-dark'
                    : 'text-light-grayish-blue-very-dark dark:text-dark-grayish-blue-light'
                }`}
                onClick={() => onToggle(todo.id)}
            >
                {todo.text}
            </span>

            {/* Delete button*/}
            <button
                onClick={handleDelete}
                className="flex-shrink-0 text-light-grayish-blue-dark dark:text-dark-grayish-blue-dark" aria-label="Delete todo"
            >
                <Image
                src="/images/icon-cross.svg"
                alt="Delete"
                width={18}
                height={18}
                className="flex-shrink-0"
                />
            </button>
        </div>
    );
}