import React, { useState } from 'react';
import { Task, Category } from '../App';
import { TaskItem } from './TaskItem';
import { ListTodo, CheckCircle2, Filter } from 'lucide-react';
import { getIconColor } from '../utils/iconMap';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';

interface AllTasksViewProps {
  tasks: Task[];
  categories: Category[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
}

export function AllTasksView({
  tasks,
  categories,
  onToggleTask,
  onDeleteTask,
  onUpdateTask,
}: AllTasksViewProps) {
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [effortFilter, setEffortFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? getIconColor(category.icon) : '#6b7280';
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  const filteredTasks = tasks.filter(t => {
    if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false;
    if (effortFilter !== 'all' && t.effort !== effortFilter) return false;
    return true;
  });

  const activeTasks = filteredTasks.filter(t => !t.completed);
  const completedTasks = filteredTasks.filter(t => t.completed);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">All Tasks</h2>
        <p className="text-gray-600">
          {tasks.filter(t => t.completed).length} of {tasks.length} tasks completed
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-500" />
          <Label className="text-sm text-blue-700">Filter:</Label>
        </div>

        <div className="flex gap-2 flex-col sm:flex-row flex-1">
          <div className="flex-1">
            <Select value={priorityFilter} onValueChange={(value: any) => setPriorityFilter(value)}>
              <SelectTrigger className="bg-white h-9 border-blue-200 w-full">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Select value={effortFilter} onValueChange={(value: any) => setEffortFilter(value)}>
              <SelectTrigger className="bg-white h-9 border-blue-200 w-full">
                <SelectValue placeholder="Effort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Efforts</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {tasks.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <ListTodo className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No tasks yet. Create tasks in your categories to see them here!</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Filter className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No tasks match the selected filters</p>
          </div>
        ) : (
          <>
            {activeTasks.length > 0 && (
              <div className="space-y-2">
                {activeTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    categoryColor={getCategoryColor(task.categoryId)}
                    categoryName={getCategoryName(task.categoryId)}
                    onToggle={() => onToggleTask(task.id)}
                    onDelete={() => onDeleteTask(task.id)}
                    onUpdate={(updates) => onUpdateTask(task.id, updates)}
                  />
                ))}
              </div>
            )}

            {completedTasks.length > 0 && (
              <div className="pt-4">
                <div className="flex items-center gap-2 mb-3 text-gray-500">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm">Completed</span>
                </div>
                <div className="space-y-2">
                  {completedTasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      categoryColor={getCategoryColor(task.categoryId)}
                      categoryName={getCategoryName(task.categoryId)}
                      onToggle={() => onToggleTask(task.id)}
                      onDelete={() => onDeleteTask(task.id)}
                      onUpdate={(updates) => onUpdateTask(task.id, updates)}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}