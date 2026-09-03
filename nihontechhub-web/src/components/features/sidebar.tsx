import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tag } from 'lucide-react';
import Link from 'next/link';

import { AccessTradeBanner } from './accesstrade-banner';
import { SidebarRecent } from './sidebar-recent';
import { SidebarTrending } from './sidebar-trending';

export function Sidebar() {
  const popularTags = [
    { name: 'AI', count: 24, color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    { name: 'Machine Learning', count: 18, color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
    { name: 'IOS', count: 15, color: 'bg-green-500/10 text-green-600 border-green-500/20' },
    { name: 'ANDROID', count: 12, color: 'bg-red-500/10 text-red-600 border-red-500/20' },
    { name: 'GOOGLE', count: 10, color: 'bg-orange-500/10 text-orange-600 border-orange-500/20' },
    { name: 'APPLE', count: 8, color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
  ];

  return (
    <div className="space-y-8">
      {/* Trending Articles */}
      <SidebarTrending />

      {/* Affiliate Banner - prominent position */}
      <AccessTradeBanner variant="sidebar" />

      {/* Popular Tags */}
      <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm transition-all duration-300 hover:from-card/90 hover:to-card/60 hover:shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <div className="rounded-lg bg-primary/10 p-2">
              <Tag className="h-5 w-5 text-primary" />
            </div>
            <span>Popular Tags</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Link key={tag.name} href={`/tag/${tag.name.toLowerCase().replace(' ', '-')}`}>
                <Badge className={`${tag.color} cursor-pointer border transition-all duration-300 hover:scale-105`}>
                  {tag.name} ({tag.count})
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <SidebarRecent />
    </div>
  );
}
