'use client';

import { useQueryEventAll } from '@/app/modules/use-query-event';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TEvent } from '@/modules/api/event';
import { useAppLanguage } from '@/modules/hooks/use-app-language';
import { getDateString, getGroupDateString, getSentences, getTimeString, parseDate } from '@/modules/utils';
import { Clock, Calendar, Brain, Sparkles, Cpu, ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../ui/button';

const getSummary = (description: string, isExpanded = false) => {
  const sentences = getSentences(description);
  if (isExpanded) {
    return description;
  }
  // Return first 2 sentences or all if less than 2
  return sentences.slice(0, 2).join('\n\n') + (sentences.length > 2 ? '...' : '');
};

const needsReadMore = (description: string) => {
  const sentences = getSentences(description);
  return sentences.length > 2;
};

const getImpactStyles = (impact: string) => {
  switch (impact) {
    case 'Critical':
      return {
        dot: 'bg-destructive shadow-destructive/30',
        badge: 'bg-destructive text-destructive-foreground border-destructive',
        glow: 'shadow-lg shadow-destructive/20',
      };
    case 'High':
      return {
        dot: 'bg-orange-600 shadow-orange-600/30',
        badge: 'bg-orange-600 text-white border-orange-600',
        glow: 'shadow-lg shadow-orange-600/20',
      };
    case 'Medium':
      return {
        dot: 'bg-primary shadow-primary/30',
        badge: 'bg-primary text-primary-foreground border-primary',
        glow: 'shadow-md shadow-primary/10',
      };
    case 'Low':
      return {
        dot: 'bg-muted-foreground shadow-muted-foreground/20',
        badge: 'bg-muted text-muted-foreground border-muted-foreground',
        glow: 'shadow-sm',
      };
    default:
      return {
        dot: 'bg-muted-foreground shadow-muted-foreground/20',
        badge: 'bg-muted text-muted-foreground border-muted-foreground',
        glow: 'shadow-sm',
      };
  }
};

const groupEventsByDate = (events: TEvent[]) => {
  const grouped = events.reduce(
    (acc, event) => {
      const date = getGroupDateString(event.earliestPublished);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    },
    {} as Record<string, TEvent[]>,
  );
  // Sort dates in descending order and sort events within each date by time
  return Object.entries(grouped)
    .sort(([a], [b]) => parseDate(b).getTime() - parseDate(a).getTime())
    .map(([date, events]) => ({
      date,
      events: events.sort((a, b) => parseDate(b.earliestPublished).getTime() - parseDate(a.earliestPublished).getTime()),
    }));
};

export function KeyTechEventsAll() {
  const { Strings } = useAppLanguage();

  const { data: list } = useQueryEventAll();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };
  if (!list?.length) {
    return null;
  }

  const groupedEvents = groupEventsByDate(list);
  return (
    <div className="space-y-8">
      <div className="space-y-4 text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="rounded-full border border-emerald-200/50 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 p-3">
            <Cpu className="h-7 w-7 text-emerald-600" />
          </div>
          <div className="flex items-center gap-2">
            <h1 className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-3xl font-bold text-transparent">{Strings.AIAggregatedTechTimeline}</h1>
            <Brain className="h-6 w-6 animate-pulse text-emerald-500" />
          </div>
        </div>

        <div className="mx-auto max-w-4xl rounded-lg border border-emerald-100 bg-gradient-to-r from-emerald-50 to-blue-50 p-6">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
            <div className="text-left">
              <p className="leading-relaxed text-muted-foreground">
                <span className="font-semibold text-emerald-700">{Strings.smartNewsSynthesis}:</span> {Strings.smartNewsSynthesisDesc}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* Enhanced timeline line with gradient */}
        <div className="absolute bottom-0 left-6 top-0 w-px bg-gradient-to-b from-primary via-accent to-muted-foreground/20 md:left-12"></div>
        <div className="space-y-16">
          {groupedEvents.map(({ date, events }) => {
            const dateStr = getDateString(date);

            return (
              <div key={date} className="space-y-8">
                {/* Date header */}
                <div className="flex items-center gap-4">
                  <div className="rounded-lg border border-primary/20 bg-primary/10 px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Calendar className="h-4 w-4" />
                      {dateStr}
                    </div>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent"></div>
                </div>

                {/* Events for this date */}
                <div className="space-y-8">
                  {events.map((event) => {
                    const timeStr = getTimeString(event.earliestPublished);
                    const styles = getImpactStyles(event.impact);
                    const isExpanded = expandedItems.has(event.id);
                    const content = getSummary(event.content, isExpanded);
                    const showReadMore = needsReadMore(event.content);
                    return (
                      <div key={event.id} className="group relative flex gap-6 md:gap-8">
                        {/* Enhanced timeline section */}
                        <div className="flex w-12 flex-shrink-0 flex-col items-center md:w-24">
                          {/* Time badge */}
                          <div className="mb-4 rounded-md bg-muted px-2 py-1">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {timeStr}
                            </div>
                          </div>

                          {/* Enhanced timeline dot */}
                          <div className="relative">
                            <div className={`h-4 w-4 rounded-full ${styles.dot} relative z-10 shadow-lg transition-all duration-300 group-hover:scale-125`}>
                              <div className="absolute inset-0 rounded-full bg-white/30"></div>
                            </div>
                            {/* Pulse animation for high impact events */}
                            {(event.impact === 'Critical' || event.impact === 'High') && (
                              <div className={`absolute inset-0 h-4 w-4 rounded-full ${styles.dot} animate-ping opacity-20`}></div>
                            )}
                          </div>
                        </div>

                        {/* Enhanced event content */}
                        <Card className={`flex-1 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] ${styles.glow} border-l-4 border-l-primary/20`}>
                          <CardContent className="p-6 md:p-8">
                            {/* Header with impact badge */}
                            <div className="mb-4 flex items-start justify-between gap-4">
                              <div className="flex-1 space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                  <Badge variant="outline" className={styles.badge}>
                                    {Strings.xImpact(event.impact)}
                                  </Badge>
                                  <Badge className="border-0 bg-blue-600 text-xs text-white">
                                    <Brain className="mr-1 h-3 w-3" />
                                    {Strings.AISynthesized}
                                  </Badge>
                                </div>
                                <h3 className="text-balance text-xl font-bold leading-tight transition-colors group-hover:text-primary">{event.title}</h3>
                              </div>
                            </div>

                            <div className="mb-2 text-pretty leading-relaxed text-muted-foreground">
                              {content
                                ?.split(/(?:\n\n|。|\n)+/)
                                .filter(Boolean)
                                .map((line, idx) => (
                                  <p key={idx} className="mb-2">
                                    {line}
                                  </p>
                                ))}
                            </div>

                            {showReadMore && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleExpanded(event.id)}
                                className="mb-3 h-auto p-0 font-medium text-emerald-600 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-700"
                              >
                                {isExpanded ? (
                                  <>
                                    {Strings.showLess}
                                    <ChevronUp className="ml-1 h-4 w-4 transition-transform duration-300" />
                                  </>
                                ) : (
                                  <>
                                    {Strings.readMore}
                                    <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300" />
                                  </>
                                )}
                              </Button>
                            )}
                            <div className="mb-4">
                              {event?.keywords?.map((keyword) => (
                                <Badge key={keyword} variant="secondary" className="mr-1 text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                            {/* Enhanced footer */}
                            <div className="flex items-center justify-between border-t border-border pt-4">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-muted-foreground">
                                  <span className="font-semibold text-blue-600">{Strings.AIAggregatedFrom}:</span>
                                </span>
                                <div className="flex flex-wrap gap-2">
                                  {event.feeds?.map((source, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs transition-colors hover:bg-primary/10">
                                      {source}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
