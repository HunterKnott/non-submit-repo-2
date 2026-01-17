'use client';

import { useState, FormEvent } from 'react';

interface TodoInputProps {
    onAddTodo: (text: string) => Promise<void>;
}

export default function TodoInput({ onAddTodo }: TodoInputProps) {
    const [input, setInput] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
    
        try {
          await onAddTodo(input.trim());
          setInput(''); // Clear input after successful submission
        } catch (error) {
          console.error('Failed to add todo:', error);
        }
    };

    return (
        <form 
        onSubmit={handleSubmit}
        className="w-full"
      >
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Create a new todo..."
            className="w-full pl-14 pr-4 py-4 rounded-lg bg-light-gray-very-light dark:bg-dark-desaturated-blue-very-dark text-light-grayish-blue-very-dark dark:text-dark-grayish-blue-light placeholder:text-light-grayish-blue-dark dark:placeholder:text-dark-grayish-blue-dark focus:outline-none caret-primary-blue"
          />
        </div>
      </form>
    );
}