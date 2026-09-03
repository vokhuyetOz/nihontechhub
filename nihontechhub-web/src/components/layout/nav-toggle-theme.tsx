'use client';

import { toggleThemeAction } from '@/modules/actions';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '../ui/button';

export function NavToggleTheme() {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toggleThemeAction(newTheme);
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={handleToggleTheme} size="icon">
        {theme === 'dark' ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
}
