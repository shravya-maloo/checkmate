import React from 'react';
import { Deadline, Category } from '../App';
import { DeadlineItem } from './DeadlineItem';
import { Calendar } from 'lucide-react';
import { getIconColor } from '../utils/iconMap';

interface AllDeadlinesViewProps {
  deadlines: Deadline[];
  categories: Category[];
  onToggleDeadline: (deadlineId: string) => void;
  onDeleteDeadline: (deadlineId: string) => void;
  onUpdateDeadline: (deadlineId: string, updates: Partial<Deadline>) => void;
}

export function AllDeadlinesView({
  deadlines,
  categories,
  onToggleDeadline,
  onDeleteDeadline,
  onUpdateDeadline,
}: AllDeadlinesViewProps) {
  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? getIconColor(category.icon) : '#6b7280';
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  // Sort by date (ascending)
  const sortedDeadlines = [...deadlines].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">All Deadlines</h2>
        <p className="text-gray-600">
          {deadlines.length} deadlines total
        </p>
      </div>

      {deadlines.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No deadlines yet. Create deadlines in your categories to see them here!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sortedDeadlines.map(deadline => (
            <DeadlineItem
              key={deadline.id}
              deadline={deadline}
              categoryColor={getCategoryColor(deadline.categoryId)}
              categoryName={getCategoryName(deadline.categoryId)}
              onToggle={() => onToggleDeadline(deadline.id)}
              onDelete={() => onDeleteDeadline(deadline.id)}
              onUpdate={(updates) => onUpdateDeadline(deadline.id, updates)}
            />
          ))}
        </div>
      )}
    </div>
  );
}