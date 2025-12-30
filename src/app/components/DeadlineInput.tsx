import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Plus } from 'lucide-react';

interface DeadlineInputProps {
  onAddDeadline: (name: string, details: string, date: string) => void;
}

export function DeadlineInput({ onAddDeadline }: DeadlineInputProps) {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && date) {
      onAddDeadline(name.trim(), details.trim(), date);
      setName('');
      setDetails('');
      setDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-2">
        <Label>Deadline Name *</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter deadline name..."
        />
      </div>

      <div className="space-y-2">
        <Label>Deadline Details</Label>
        <Textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Add details about this deadline..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Date *</Label>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Select a date"
        />
      </div>

      <Button type="submit" disabled={!name.trim() || !date} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Deadline
      </Button>
    </form>
  );
}