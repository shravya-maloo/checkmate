"use client";

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { CategoriesView } from './components/CategoriesView';
import { AllTasksView } from './components/AllTasksView';
import { AllDeadlinesView } from './components/AllDeadlinesView';
import { Plus } from 'lucide-react';
import { Button } from './components/ui/button';

export interface Task {
  id: string;
  name: string;
  details: string;
  priority: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  completed: boolean;
  categoryId: string;
}

export interface Deadline {
  id: string;
  name: string;
  details: string;
  date: string;
  completed: boolean;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

const defaultCategories: Category[] = [
  { id: '1', name: 'School', icon: 'GraduationCap' },
  { id: '2', name: 'Extracurricular', icon: 'Trophy' },
];

export default function App() {
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('categories');
      return saved ? JSON.parse(saved) : defaultCategories;
    } catch {
      return defaultCategories;
    }
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [deadlines, setDeadlines] = useState<Deadline[]>(() => {
    try {
      const saved = localStorage.getItem('deadlines');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState('all-tasks');

  useEffect(() => {
    try {
      localStorage.setItem('categories', JSON.stringify(categories));
    } catch {}
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem('deadlines', JSON.stringify(deadlines));
    } catch {}
  }, [deadlines]);

  const addTask = (categoryId: string, name: string, details: string, priority: 'high' | 'medium' | 'low', effort: 'high' | 'medium' | 'low') => {
    const newTask: Task = {
      id: Date.now().toString(),
      name,
      details,
      priority,
      effort,
      completed: false,
      categoryId,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const addDeadline = (categoryId: string, name: string, details: string, date: string) => {
    const newDeadline: Deadline = {
      id: Date.now().toString(),
      name,
      details,
      date,
      completed: false,
      categoryId,
    };
    setDeadlines(prev => [...prev, newDeadline]);
  };

  const addCategory = (name: string, icon: string = 'GraduationCap') => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      icon,
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCategory = (id: string) => {
    // remove the category and any tasks/deadlines belonging to it
    setCategories(prev => prev.filter(c => c.id !== id));
    setTasks(prev => prev.filter(t => t.categoryId !== id));
    setDeadlines(prev => prev.filter(d => d.categoryId !== id));
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleDeadline = (deadlineId: string) => {
    setDeadlines(prev => prev.map(deadline =>
      deadline.id === deadlineId ? { ...deadline, completed: !deadline.completed } : deadline
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const deleteDeadline = (deadlineId: string) => {
    setDeadlines(prev => prev.filter(deadline => deadline.id !== deadlineId));
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const updateDeadline = (deadlineId: string, updates: Partial<Deadline>) => {
    setDeadlines(prev => prev.map(deadline =>
      deadline.id === deadlineId ? { ...deadline, ...updates } : deadline
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-white p-6">
            <h1 className="mb-2">CheckMate</h1>
            <p className="text-purple-50">A categorized to-do list to keep everything neat and tidy</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 px-4">
              <TabsList className="bg-transparent border-0 h-auto p-0">
                <TabsTrigger 
                  value="all-tasks" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-400"
                >
                  All Tasks
                </TabsTrigger>
                <TabsTrigger 
                  value="all-deadlines"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-t-lg border-b-2 border-transparent data-[state=active]:border-green-400"
                >
                  All Deadlines
                </TabsTrigger>
                <TabsTrigger 
                  value="categories"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-t-lg border-b-2 border-transparent data-[state=active]:border-purple-400"
                >
                  Categories
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="all-tasks" className="mt-0">
                <AllTasksView
                  tasks={tasks}
                  categories={categories}
                  onToggleTask={toggleTask}
                  onDeleteTask={deleteTask}
                  onUpdateTask={updateTask}
                />
              </TabsContent>

              <TabsContent value="all-deadlines" className="mt-0">
                <AllDeadlinesView
                  deadlines={deadlines}
                  categories={categories}
                  onToggleDeadline={toggleDeadline}
                  onDeleteDeadline={deleteDeadline}
                  onUpdateDeadline={updateDeadline}
                />
              </TabsContent>

              <TabsContent value="categories" className="mt-0">
                <CategoriesView
                  categories={categories}
                  tasks={tasks}
                  deadlines={deadlines}
                  onAddTask={addTask}
                  onAddDeadline={addDeadline}
                  onToggleTask={toggleTask}
                  onToggleDeadline={toggleDeadline}
                  onDeleteTask={deleteTask}
                  onDeleteDeadline={deleteDeadline}
                  onUpdateTask={updateTask}
                  onUpdateDeadline={updateDeadline}
                  onAddCategory={addCategory}
                  onUpdateCategory={updateCategory}
                  onDeleteCategory={deleteCategory}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}