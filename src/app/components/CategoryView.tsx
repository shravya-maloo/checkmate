import React, { useState } from 'react';
import { Category, Task, Deadline } from '../App';
import { TaskItem } from './TaskItem';
import { DeadlineItem } from './DeadlineItem';
import { TaskInput } from './TaskInput';
import { DeadlineInput } from './DeadlineInput';
import { CheckCircle2, Circle, Calendar as CalendarIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface CategoryViewProps {
  category: Category;
  tasks: Task[];
  deadlines: Deadline[];
  onAddTask: (name: string, details: string, priority: 'high' | 'medium' | 'low', effort: 'high' | 'medium' | 'low') => void;
  onAddDeadline: (name: string, details: string, date: string) => void;
  onToggleTask: (taskId: string) => void;
  onToggleDeadline: (deadlineId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onDeleteDeadline: (deadlineId: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onUpdateDeadline: (deadlineId: string, updates: Partial<Deadline>) => void;
}

export function CategoryView({
  category,
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
}: CategoryViewProps) {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tasks">Add Task</TabsTrigger>
          <TabsTrigger value="deadlines">Add Deadline</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks" className="mt-4">
          <TaskInput onAddTask={onAddTask} />
          
          <div className="mt-4 space-y-2">
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Circle className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No tasks yet. Add one above to get started!</p>
              </div>
            ) : (
              <>
                {tasks.filter(t => !t.completed).map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    categoryColor={category.color}
                    onToggle={() => onToggleTask(task.id)}
                    onDelete={() => onDeleteTask(task.id)}
                    onUpdate={(updates) => onUpdateTask(task.id, updates)}
                  />
                ))}
                {tasks.some(t => t.completed) && (
                  <div className="pt-4">
                    <div className="flex items-center gap-2 mb-3 text-gray-500">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-sm">Completed</span>
                    </div>
                    <div className="space-y-2">
                      {tasks.filter(t => t.completed).map(task => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          categoryColor={category.color}
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
        </TabsContent>
        
        <TabsContent value="deadlines" className="mt-4">
          <DeadlineInput onAddDeadline={onAddDeadline} />
          
          <div className="mt-4 space-y-2">
            {deadlines.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <CalendarIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No deadlines yet. Add one above to get started!</p>
              </div>
            ) : (
              <>
                {deadlines.filter(d => !d.completed).map(deadline => (
                  <DeadlineItem
                    key={deadline.id}
                    deadline={deadline}
                    categoryColor={category.color}
                    onToggle={() => onToggleDeadline(deadline.id)}
                    onDelete={() => onDeleteDeadline(deadline.id)}
                    onUpdate={(updates) => onUpdateDeadline(deadline.id, updates)}
                  />
                ))}
                {deadlines.some(d => d.completed) && (
                  <div className="pt-4">
                    <div className="flex items-center gap-2 mb-3 text-gray-500">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-sm">Completed</span>
                    </div>
                    <div className="space-y-2">
                      {deadlines.filter(d => d.completed).map(deadline => (
                        <DeadlineItem
                          key={deadline.id}
                          deadline={deadline}
                          categoryColor={category.color}
                          onToggle={() => onToggleDeadline(deadline.id)}
                          onDelete={() => onDeleteDeadline(deadline.id)}
                          onUpdate={(updates) => onUpdateDeadline(deadline.id, updates)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
