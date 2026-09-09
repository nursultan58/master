import React from 'react';
import {
  Wrench,
  Zap,
  Home,
  Sparkles,
  Wind,
  Tv,
  Armchair,
  Paintbrush,
  Flame,
  Car,
  Camera,
  Laptop,
  HelpCircle
} from 'lucide-react';

interface CategoryIconProps {
  name: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Wrench':
      return <Wrench className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'Home':
      return <Home className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Wind':
      return <Wind className={className} />;
    case 'Tv':
      return <Tv className={className} />;
    case 'Armchair':
      return <Armchair className={className} />;
    case 'Paintbrush':
      return <Paintbrush className={className} />;
    case 'Flame':
      return <Flame className={className} />;
    case 'Car':
      return <Car className={className} />;
    case 'Camera':
      return <Camera className={className} />;
    case 'Laptop':
      return <Laptop className={className} />;
    default:
      return <HelpCircle className={className} />;
  }
};
