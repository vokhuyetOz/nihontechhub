'use client';

import { useQueryRecent } from '@/app/modules/use-query-recent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppLanguage } from '@/modules/hooks/use-app-language';
import { estimateReadTime, formatDate } from '@/modules/utils';
import { Calendar } from 'lucide-react';
import Link from 'next/link';

export function SidebarRecent() {
  const { Strings } = useAppLanguage();
  const { data: recentPosts } = useQueryRecent();

  if (!recentPosts?.length) {
    return null;
  }
  return (
    <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm transition-all duration-300 hover:from-card/90 hover:to-card/60 hover:shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <div className="rounded-lg bg-primary/10 p-2">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <span>{Strings.recentPost}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentPosts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} className="group/item block rounded-lg p-3 transition-all duration-300 hover:bg-muted/50 hover:shadow-sm">
            <h4 className="mb-2 line-clamp-2 text-sm font-medium transition-colors duration-300 group-hover/item:text-primary">{post.title}</h4>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{formatDate(post.updatedAt)}</span>
              <span className="rounded-full bg-muted/50 px-2 py-1">{estimateReadTime(post.content)}</span>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
