import React, { useState } from 'react';
import { Deadline } from '../App';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Trash2, Edit2, Check, X, Calendar } from 'lucide-react';
import { format, parseISO, isPast, isToday } from 'date-fns';

interface DeadlineItemProps {
  deadline: Deadline;
  categoryColor: string;
  categoryName?: string;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: (updates: Partial<Deadline>) => void;
}

export function DeadlineItem({
  deadline,
  categoryColor,
  categoryName,
  onToggle,
  onDelete,
  onUpdate,
}: DeadlineItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(deadline.name);
  const [editDetails, setEditDetails] = useState(deadline.details);
  const [editDate, setEditDate] = useState(deadline.date);

  const handleSave = () => {
    onUpdate({
      name: editName,
      details: editDetails,
      date: editDate,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(deadline.name);
    setEditDetails(deadline.details);
    setEditDate(deadline.date);
    setIsEditing(false);
  };

  const getDateColor = () => {
    const date = parseISO(deadline.date);
    if (isPast(date) && !isToday(date)) return 'text-red-500';
    if (isToday(date)) return 'text-orange-500';
    return 'text-gray-500';
  };

  if (isEditing) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
        <div className="space-y-2">
          <Label>Deadline Name</Label>
          <Input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Deadline name"
            className="bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label>Deadline Details</Label>
          <Textarea
            value={editDetails}
            onChange={(e) => setEditDetails(e.target.value)}
            placeholder="Deadline details"
            className="bg-white"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Date</Label>
          <Input
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            className="bg-white"
          />
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
    <div className="group flex flex-col sm:flex-row items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100/50 border-2 border-green-200 rounded-xl hover:border-green-300 hover:shadow-md transition-all">
      <div className="flex-shrink-0">
        <Checkbox
          checked={deadline.completed}
          onCheckedChange={onToggle}
          className="mt-0.5 border-green-400"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className={`mb-1 ${deadline.completed ? 'line-through text-gray-400' : 'text-green-900'}`}>
          {deadline.name}
        </div>

        {deadline.details && (
          <p className={`text-sm mb-2 ${deadline.completed ? 'text-gray-400' : 'text-green-700'}`}>
            {deadline.details}
          </p>
        )}

        <div className="flex items-center gap-3 flex-wrap">
          {categoryName && (
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: categoryColor }}
              />
              <span className="text-sm text-gray-500">{categoryName}</span>
            </div>
          )}

          <div className={`flex items-center gap-1.5 text-sm ${getDateColor()}`}>
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {format(parseISO(deadline.date), 'MMM d, yyyy')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-1 mt-3 sm:mt-0 sm:ml-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(true)}
          className="text-green-600 hover:text-green-700 hover:bg-green-100"
        >
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 hover:bg-red-100"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}