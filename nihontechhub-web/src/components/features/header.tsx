'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NewssourceAPI } from '@/modules/api/newssource';
import { useAppLanguage } from '@/modules/hooks/use-app-language';
import { QUERY_KEYS } from '@/modules/queries';
import { useQuery } from '@tanstack/react-query';
import { Search, Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const { Strings } = useAppLanguage();
  const router = useRouter();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { theme, setTheme } = useTheme();

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.NEWSSOURCE],
    queryFn: NewssourceAPI.list,
  });
  let navigation = [
    { name: 'Home', href: '/' },
    { name: 'TechCrunch（テッククランチ）', href: '/category/techcrunch' },
    { name: 'Google（グーグル）', href: '/category/9to5google' },
    { name: 'Apple（アップル）', href: '/category/9to5mac' },
    { name: 'おすすめAIツール一覧', href: '/category/bestlistai' },
  ];
  if (data) {
    navigation = data.map((item) => ({ name: item.label, href: `/category/${item.value}` }));
    navigation.unshift({ name: 'Home', href: '/' });
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">TS</div>
            <span className="text-xl font-bold">NihonTechHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-6 md:flex">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search and Theme Toggle */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="search"
                    placeholder={Strings.searchArticles}
                    className="w-64"
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && query.trim() !== '') {
                        router.push(`/search/${encodeURIComponent(query.trim())}`);
                      }
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      router.push(`/search/${encodeURIComponent(query?.trim?.())}`);
                    }}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsSearchOpen(true);
                  }}
                  className="hidden md:flex"
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Theme Toggle */}
            <Button variant="ghost" size="sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="mt-8 flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href} className="text-lg font-medium transition-colors hover:text-primary">
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4">
                    <Input type="search" placeholder={Strings.searchArticles} className="w-full" />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
