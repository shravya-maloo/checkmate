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
  Briefcase,
  LucideIcon
} from 'lucide-react';

export const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Trophy,
  Music,
  Dumbbell,
  Palette,
  Code,
  Star,
  Heart,
  Book,
  Briefcase,
};

// Map icons to pastel colors
export const iconColorMap: Record<string, string> = {
  GraduationCap: '#a78bfa', // purple-400
  Trophy: '#fbbf24', // amber-400
  Music: '#f472b6', // pink-400
  Dumbbell: '#fb7185', // rose-400
  Palette: '#c084fc', // purple-400
  Code: '#60a5fa', // blue-400
  Star: '#facc15', // yellow-400
  Heart: '#f87171', // red-400
  Book: '#34d399', // emerald-400
  Briefcase: '#818cf8', // indigo-400
};

export function getIconComponent(iconName: string): LucideIcon {
  return iconMap[iconName] || Star; // Default to Star if icon not found
}

export function getIconColor(iconName: string): string {
  return iconColorMap[iconName] || '#a78bfa'; // Default to purple if icon not found
}