import { NextRequest, NextResponse } from 'next/server';
import { Todo } from '@/lib/types';
import fs from 'fs';
import path from 'path';

// File-based storage for todos (JSON file in data directory)
const DATA_FILE = path.join(process.cwd(), 'data', 'todos.json');

// Helper functions for file operations
function getTodos(): Todo[] {
  const dataDir = path.dirname(DATA_FILE);
  // Ensure data directory exists before reading
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    const todos = JSON.parse(data);
    // Convert createdAt string back to Date object after JSON parse
    return todos.map((todo: any) => ({
      ...todo,
      createdAt: new Date(todo.createdAt),
    }));
  } catch {
    // Return empty array if file is inaccessible
    return [];
  }
}

function saveTodos(todos: Todo[]): void {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

// API Route Handlers
export async function GET(request: NextRequest) {
  try {
    const todos = getTodos();
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }
    
    const todos = getTodos();
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date()
    };
    
    const updatedTodos = [...todos, newTodo];
    saveTodos(updatedTodos);
    
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Todo ID is required' },
        { status: 400 }
      );
    }
    
    const todos = getTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    
    if (filteredTodos.length === todos.length) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }
    
    saveTodos(filteredTodos);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}