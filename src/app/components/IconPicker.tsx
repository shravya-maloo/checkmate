import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { 
  GraduationCap, 
  Trophy, 
  Music, 
  Dumbbell, 
  Palette, 
  Code, 
  Star, 
  Heart, 
  Book, 
  Briefcase
} from 'lucide-react';
import { getIconColor } from '../utils/iconMap';

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  trigger?: React.ReactNode;
}

const AVAILABLE_ICONS = [
  'GraduationCap',
  'Trophy',
  'Music',
  'Dumbbell',
  'Palette',
  'Code',
  'Star',
  'Heart',
  'Book',
  'Briefcase',
];

const iconComponentMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-6 h-6" />,
  Trophy: <Trophy className="w-6 h-6" />,
  Music: <Music className="w-6 h-6" />,
  Dumbbell: <Dumbbell className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Code: <Code className="w-6 h-6" />,
  Star: <Star className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  Book: <Book className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
};

export function IconPicker({ value, onChange, trigger }: IconPickerProps) {
  const [open, setOpen] = React.useState(false);

  const selectedColor = getIconColor(value);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full justify-start">
            <div 
              className="w-6 h-6 rounded-md flex items-center justify-center mr-2"
              style={{ backgroundColor: selectedColor + '30' }}
            >
              {iconComponentMap[value]}
            </div>
            Choose Icon
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Select an Icon</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-3">
          {AVAILABLE_ICONS.map((iconName) => {
            const color = getIconColor(iconName);
            const isSelected = value === iconName;
            return (
              <button
                key={iconName}
                onClick={() => {
                  onChange(iconName);
                  setOpen(false);
                }}
                className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                  isSelected
                    ? 'ring-2 ring-offset-2'
                    : 'hover:bg-gray-100'
                }`}
                style={isSelected ? { backgroundColor: color + '30', ringColor: color } : { backgroundColor: color + '10' }}
              >
                <div style={{ color }}>
                  {iconComponentMap[iconName]}
                </div>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
