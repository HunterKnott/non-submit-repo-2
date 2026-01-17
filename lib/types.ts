export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
  }

export interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
  }