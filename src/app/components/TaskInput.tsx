import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus } from 'lucide-react';

interface TaskInputProps {
  onAddTask: (name: string, details: string, priority: 'high' | 'medium' | 'low', effort: 'high' | 'medium' | 'low') => void;
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [effort, setEffort] = useState<'high' | 'medium' | 'low'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddTask(name.trim(), details.trim(), priority, effort);
      setName('');
      setDetails('');
      setPriority('medium');
      setEffort('medium');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="space-y-2">
        <Label>Task Name *</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter task name..."
          className="bg-white"
        />
      </div>

      <div className="space-y-2">
        <Label>Task Details</Label>
        <Textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Add details about this task..."
          className="bg-white"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label>Priority</Label>
          <Select value={priority} onValueChange={(value: any) => setPriority(value)}>
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
          <Select value={effort} onValueChange={(value: any) => setEffort(value)}>
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

      <Button type="submit" disabled={!name.trim()} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Task
      </Button>
    </form>
  );
}
