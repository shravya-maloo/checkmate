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
  color: string;
}

const defaultCategories: Category[] = [
  { id: '1', name: 'School', color: '#3b82f6' },
  { id: '2', name: 'Extracurricular', color: '#10b981' },
];

export default function App() {
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [deadlines, setDeadlines] = useState<Deadline[]>(() => {
    const saved = localStorage.getItem('deadlines');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState('all-tasks');

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('deadlines', JSON.stringify(deadlines));
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
    setTasks([...tasks, newTask]);
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
    setDeadlines([...deadlines, newDeadline]);
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleDeadline = (deadlineId: string) => {
    setDeadlines(deadlines.map(deadline =>
      deadline.id === deadlineId ? { ...deadline, completed: !deadline.completed } : deadline
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const deleteDeadline = (deadlineId: string) => {
    setDeadlines(deadlines.filter(deadline => deadline.id !== deadlineId));
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const updateDeadline = (deadlineId: string, updates: Partial<Deadline>) => {
    setDeadlines(deadlines.map(deadline =>
      deadline.id === deadlineId ? { ...deadline, ...updates } : deadline
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <h1 className="mb-2">Task Manager</h1>
            <p className="text-blue-100">Organize your tasks and deadlines by category</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-gray-200 bg-gray-50 px-4">
              <TabsList className="bg-transparent border-0 h-auto p-0">
                <TabsTrigger 
                  value="all-tasks" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600"
                >
                  All Tasks
                </TabsTrigger>
                <TabsTrigger 
                  value="all-deadlines"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600"
                >
                  All Deadlines
                </TabsTrigger>
                <TabsTrigger 
                  value="categories"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600"
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
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}