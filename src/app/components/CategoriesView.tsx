import React, { useState } from 'react';
import { Category, Task, Deadline } from '../App';
import { CategoryView } from './CategoryView';
import { FolderKanban, ChevronRight, Search } from 'lucide-react';
import { Input } from './ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface CategoriesViewProps {
  categories: Category[];
  tasks: Task[];
  deadlines: Deadline[];
  onAddTask: (categoryId: string, name: string, details: string, priority: 'high' | 'medium' | 'low', effort: 'high' | 'medium' | 'low') => void;
  onAddDeadline: (categoryId: string, name: string, details: string, date: string) => void;
  onToggleTask: (taskId: string) => void;
  onToggleDeadline: (deadlineId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onDeleteDeadline: (deadlineId: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onUpdateDeadline: (deadlineId: string, updates: Partial<Deadline>) => void;
}

export function CategoriesView({
  categories,
  tasks,
  deadlines,
  onAddTask,
  onAddDeadline,
  onToggleTask,
  onToggleDeadline,
  onDeleteTask,
  onDeleteDeadline,
  onUpdateTask,
  onUpdateDeadline,
}: CategoriesViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    const newOpen = new Set(openCategories);
    if (newOpen.has(categoryId)) {
      newOpen.delete(categoryId);
    } else {
      newOpen.add(categoryId);
    }
    setOpenCategories(newOpen);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getItemCounts = (categoryId: string) => {
    const categoryTasks = tasks.filter(t => t.categoryId === categoryId);
    const categoryDeadlines = deadlines.filter(d => d.categoryId === categoryId);
    const total = categoryTasks.length + categoryDeadlines.length;
    const completed = categoryTasks.filter(t => t.completed).length + categoryDeadlines.filter(d => d.completed).length;
    return { total, completed, tasks: categoryTasks.length, deadlines: categoryDeadlines.length };
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="mb-2">Categories</h2>
        <p className="text-gray-600">
          Select a category to view and manage its tasks and deadlines
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search categories..."
          className="pl-10"
        />
      </div>

      {filteredCategories.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <FolderKanban className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>{searchQuery ? 'No categories found.' : 'No categories yet.'}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredCategories.map((category) => {
            const { total, completed, tasks: taskCount, deadlines: deadlineCount } = getItemCounts(category.id);
            const isOpen = openCategories.has(category.id);

            return (
              <Collapsible
                key={category.id}
                open={isOpen}
                onOpenChange={() => toggleCategory(category.id)}
              >
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:border-gray-300 transition-colors">
                  <CollapsibleTrigger asChild>
                    <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 transition-colors">
                      <div
                        className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: category.color + '20' }}
                      >
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="mb-1">{category.name}</h3>
                        <p className="text-sm text-gray-500">
                          {total === 0
                            ? 'No items yet'
                            : `${taskCount} task${taskCount === 1 ? '' : 's'}, ${deadlineCount} deadline${deadlineCount === 1 ? '' : 's'}`}
                        </p>
                      </div>

                      <ChevronRight
                        className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                          isOpen ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                      <CategoryView
                        category={category}
                        tasks={tasks.filter(task => task.categoryId === category.id)}
                        deadlines={deadlines.filter(deadline => deadline.categoryId === category.id)}
                        onAddTask={(name, details, priority, effort) => onAddTask(category.id, name, details, priority, effort)}
                        onAddDeadline={(name, details, date) => onAddDeadline(category.id, name, details, date)}
                        onToggleTask={onToggleTask}
                        onToggleDeadline={onToggleDeadline}
                        onDeleteTask={onDeleteTask}
                        onDeleteDeadline={onDeleteDeadline}
                        onUpdateTask={onUpdateTask}
                        onUpdateDeadline={onUpdateDeadline}
                      />
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
        </div>
      )}
    </div>
  );
}
