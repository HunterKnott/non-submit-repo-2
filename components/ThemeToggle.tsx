'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ThemeToggle() {
  // Initialize from localStorage immediately to avoid flash of wrong theme
  // Falls back to system preference if no saved theme exists
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (savedTheme) {
        return savedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Apply theme class on initial mount to prevent flash
  useEffect(() => {
    // Ensure the class is applied on mount
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Sync theme changes with DOM and localStorage
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-dark-grayish-blue-very-dark"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <Image
          src="/images/icon-moon.svg"
          alt="Switch to dark mode"
          width={26}
          height={26}
        />
      ) : (
        <Image
          src="/images/icon-sun.svg"
          alt="Switch to light mode"
          width={26}
          height={26}
        />
      )}
    </button>
  );
}