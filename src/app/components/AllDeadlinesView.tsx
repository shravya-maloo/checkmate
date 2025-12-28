import React from 'react';
import { Deadline, Category } from '../App';
import { DeadlineItem } from './DeadlineItem';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { parseISO, isPast, isToday, isTomorrow, isWithinInterval, addDays } from 'date-fns';

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
    return categories.find(c => c.id === categoryId)?.color || '#6b7280';
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  // Sort by date
  const sortedDeadlines = [...deadlines].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const overdueDeadlines = sortedDeadlines.filter(d => {
    const date = parseISO(d.date);
    return isPast(date) && !isToday(date) && !d.completed;
  });

  const todayDeadlines = sortedDeadlines.filter(d => {
    const date = parseISO(d.date);
    return isToday(date) && !d.completed;
  });

  const tomorrowDeadlines = sortedDeadlines.filter(d => {
    const date = parseISO(d.date);
    return isTomorrow(date) && !d.completed;
  });

  const upcomingDeadlines = sortedDeadlines.filter(d => {
    if (d.completed) return false;
    const date = parseISO(d.date);
    const now = new Date();
    const weekFromNow = addDays(now, 7);
    return isWithinInterval(date, { start: addDays(now, 2), end: weekFromNow });
  });

  const laterDeadlines = sortedDeadlines.filter(d => {
    if (d.completed) return false;
    const date = parseISO(d.date);
    const weekFromNow = addDays(new Date(), 7);
    return date > weekFromNow;
  });

  const completedDeadlines = sortedDeadlines.filter(d => d.completed);

  const DeadlineSection = ({ title, deadlines: sectionDeadlines, color }: { 
    title: string; 
    deadlines: Deadline[]; 
    color?: string;
  }) => {
    if (sectionDeadlines.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className={`mb-3 ${color || 'text-gray-700'}`}>
          {title} <span className="text-sm text-gray-500">({sectionDeadlines.length})</span>
        </h3>
        <div className="space-y-2">
          {sectionDeadlines.map(deadline => (
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
      </div>
    );
  };

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
        <div>
          <DeadlineSection 
            title="Overdue" 
            deadlines={overdueDeadlines}
            color="text-red-600"
          />
          
          <DeadlineSection 
            title="Today" 
            deadlines={todayDeadlines}
            color="text-orange-600"
          />
          
          <DeadlineSection 
            title="Tomorrow" 
            deadlines={tomorrowDeadlines}
            color="text-yellow-600"
          />
          
          <DeadlineSection 
            title="This Week" 
            deadlines={upcomingDeadlines}
            color="text-blue-600"
          />
          
          <DeadlineSection 
            title="Later" 
            deadlines={laterDeadlines}
          />
          
          <DeadlineSection 
            title="Completed" 
            deadlines={completedDeadlines}
            color="text-green-600"
          />
        </div>
      )}
    </div>
  );
}
