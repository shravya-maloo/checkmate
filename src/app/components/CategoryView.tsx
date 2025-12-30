import React, { useState } from 'react';
import { Category, Task, Deadline } from '../App';
import { TaskItem } from './TaskItem';
import { DeadlineItem } from './DeadlineItem';
import { TaskInput } from './TaskInput';
import { DeadlineInput } from './DeadlineInput';
import { CheckCircle2, Circle, Calendar as CalendarIcon, Plus, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { getIconComponent, getIconColor } from '../utils/iconMap';

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
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [deadlineDialogOpen, setDeadlineDialogOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [effortFilter, setEffortFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const handleAddTask = (name: string, details: string, priority: 'high' | 'medium' | 'low', effort: 'high' | 'medium' | 'low') => {
    onAddTask(name, details, priority, effort);
    setTaskDialogOpen(false);
  };

  const handleAddDeadline = (name: string, details: string, date: string) => {
    onAddDeadline(name, details, date);
    setDeadlineDialogOpen(false);
  };

  // Filter tasks based on priority and effort
  const filteredTasks = tasks.filter(task => {
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    if (effortFilter !== 'all' && task.effort !== effortFilter) return false;
    return true;
  });

  const activeDeadlines = deadlines.filter(d => !d.completed);
  const completedDeadlines = deadlines.filter(d => d.completed);

  const activeTasks = filteredTasks.filter(t => !t.completed);
  const completedTasks = filteredTasks.filter(t => t.completed);

  const categoryColor = getIconColor(category.icon);

  return (
    <div className="space-y-6 w-full">
      {/* Action Buttons */}
      <div className="flex gap-3">
        <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex-1 bg-blue-400 hover:bg-blue-500 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <TaskInput onAddTask={handleAddTask} />
          </DialogContent>
        </Dialog>

        <Dialog open={deadlineDialogOpen} onOpenChange={setDeadlineDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex-1 bg-green-400 hover:bg-green-500 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Deadline
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Deadline</DialogTitle>
            </DialogHeader>
            <DeadlineInput onAddDeadline={handleAddDeadline} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Deadlines Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-green-400 rounded-full"></div>
          <h3 className="text-green-700">
            Deadlines
            <span className="ml-2 text-sm text-gray-500">({deadlines.length})</span>
          </h3>
        </div>

        <div className="space-y-2">
          {deadlines.length === 0 ? (
            <div className="text-center py-8 bg-green-50 rounded-xl border-2 border-dashed border-green-200 text-green-300">
              <CalendarIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No deadlines yet</p>
            </div>
          ) : (
            <>
              {activeDeadlines.length > 0 && (
                <div className="space-y-2">
                  {activeDeadlines.map(deadline => (
                    <DeadlineItem
                      key={deadline.id}
                      deadline={deadline}
                      categoryColor={categoryColor}
                      onToggle={() => onToggleDeadline(deadline.id)}
                      onDelete={() => onDeleteDeadline(deadline.id)}
                      onUpdate={(updates) => onUpdateDeadline(deadline.id, updates)}
                    />
                  ))}
                </div>
              )}

              {completedDeadlines.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-2 text-gray-500">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm">Completed</span>
                  </div>
                  <div className="space-y-2">
                    {completedDeadlines.map(deadline => (
                      <DeadlineItem
                        key={deadline.id}
                        deadline={deadline}
                        categoryColor={categoryColor}
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
      </div>

      {/* Tasks Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-400 rounded-full"></div>
          <h3 className="text-blue-700">
            Tasks
            <span className="ml-2 text-sm text-gray-500">({tasks.length})</span>
          </h3>
        </div>

        {/* Task Filters */}
        <div className="flex flex-col sm:flex-row gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200 w-full overflow-visible">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-500" />
            <Label className="text-sm text-blue-700">Filter:</Label>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 flex-1 w-full">
            <div className="flex-1 min-w-0">
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

            <div className="flex-1 min-w-0">
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
            <div className="text-center py-8 bg-blue-50 rounded-xl border-2 border-dashed border-blue-200 text-blue-300">
              <Circle className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No tasks yet</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-8 bg-blue-50 rounded-xl border-2 border-dashed border-blue-200 text-blue-300">
              <Filter className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No tasks match the selected filters</p>
            </div>
          ) : (
            <>
              {activeTasks.length > 0 && (
                <div className="space-y-2">
                  {activeTasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      categoryColor={categoryColor}
                      onToggle={() => onToggleTask(task.id)}
                      onDelete={() => onDeleteTask(task.id)}
                      onUpdate={(updates) => onUpdateTask(task.id, updates)}
                    />
                  ))}
                </div>
              )}

              {completedTasks.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-2 text-gray-500">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm">Completed</span>
                  </div>
                  <div className="space-y-2">
                    {completedTasks.map(task => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        categoryColor={categoryColor}
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
    </div>
  );
}