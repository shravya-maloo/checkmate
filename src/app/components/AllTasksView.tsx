import React from 'react';
import { Task, Category } from '../App';
import { TaskItem } from './TaskItem';
import { ListTodo, CheckCircle2 } from 'lucide-react';

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
  const getCategoryColor = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.color || '#6b7280';
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">All Tasks</h2>
        <p className="text-gray-600">
          {completedTasks.length} of {tasks.length} tasks completed
        </p>
      </div>

      <div className="space-y-2">
        {tasks.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <ListTodo className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No tasks yet. Create tasks in your categories to see them here!</p>
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
