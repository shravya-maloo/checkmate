import React, { useState } from 'react';
import { Task } from '../App';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Trash2, Edit2, Check, X, AlertCircle, Zap } from 'lucide-react';
import { Badge } from './ui/badge';

interface TaskItemProps {
  task: Task;
  categoryColor: string;
  categoryName?: string;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: (updates: Partial<Task>) => void;
}

const priorityConfig = {
  high: { label: 'High', color: 'bg-red-100 text-red-700 border-red-200' },
  medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  low: { label: 'Low', color: 'bg-green-100 text-green-700 border-green-200' },
};

const effortConfig = {
  high: { label: 'High', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  medium: { label: 'Medium', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  low: { label: 'Low', color: 'bg-gray-100 text-gray-700 border-gray-200' },
};

export function TaskItem({
  task,
  categoryColor,
  categoryName,
  onToggle,
  onDelete,
  onUpdate,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(task.name);
  const [editDetails, setEditDetails] = useState(task.details);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editEffort, setEditEffort] = useState(task.effort);

  const handleSave = () => {
    onUpdate({
      name: editName,
      details: editDetails,
      priority: editPriority,
      effort: editEffort,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(task.name);
    setEditDetails(task.details);
    setEditPriority(task.priority);
    setEditEffort(task.effort);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
        <div className="space-y-2">
          <Label>Task Name</Label>
          <Input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Task name"
            className="bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label>Task Details</Label>
          <Textarea
            value={editDetails}
            onChange={(e) => setEditDetails(e.target.value)}
            placeholder="Task details"
            className="bg-white"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Priority</Label>
            <Select value={editPriority} onValueChange={(value: any) => setEditPriority(value)}>
              <SelectTrigger className="bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Effort</Label>
            <Select value={editEffort} onValueChange={(value: any) => setEditEffort(value)}>
              <SelectTrigger className="bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancel}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
          >
            <Check className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
      <Checkbox
        checked={task.completed}
        onCheckedChange={onToggle}
        className="mt-0.5"
        style={
          task.completed
            ? {}
            : {
                borderColor: categoryColor,
              }
        }
      />
      
      <div className="flex-1 min-w-0">
        <div className={`mb-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
          {task.name}
        </div>
        
        {task.details && (
          <p className={`text-sm mb-2 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
            {task.details}
          </p>
        )}
        
        <div className="flex items-center gap-2 flex-wrap">
          {categoryName && (
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: categoryColor }}
              />
              <span className="text-sm text-gray-500">{categoryName}</span>
            </div>
          )}
          
          <Badge variant="outline" className={priorityConfig[task.priority].color}>
            <AlertCircle className="w-3 h-3 mr-1" />
            {priorityConfig[task.priority].label}
          </Badge>
          
          <Badge variant="outline" className={effortConfig[task.effort].color}>
            <Zap className="w-3 h-3 mr-1" />
            {effortConfig[task.effort].label}
          </Badge>
        </div>
      </div>

      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(true)}
          className="text-gray-600 hover:text-blue-600"
        >
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-gray-600 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
