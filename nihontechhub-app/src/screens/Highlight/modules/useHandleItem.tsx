import {
  getGroupDateString,
  getSentences,
  joinSentences,
} from '@utils/modules';
import { TEvent } from '@utils/modules/FetchApi/Event/EventAPI';
import { THighlight } from '@utils/modules/FetchApi/Highlight/HighlightAPI';
import { useState } from 'react';

const getBestImage = (images: THighlight['images']) => {
  if (!images || images.length === 0) {
    return '/placeholder.svg';
  }
  // Sort by score and return the highest scoring image
  const sortedImages = images
    .filter(item => !item?.image_link?.includes('instagram.com'))
    .sort((a, b) => b.score - a.score);
  return sortedImages[0]?.image_link;
};

const getSummary = (content: string, isExpanded = false) => {
  const sentences = getSentences(content);
  if (isExpanded) {
    return joinSentences(sentences);
  }
  // Return first 2 sentences or all if less than 3
  return (
    joinSentences(sentences.slice(0, 2)) + (sentences.length > 2 ? '...' : '')
  );
};

const needsReadMore = (content: string) => {
  const sentences = getSentences(content);
  return sentences.length > 2;
};

export function getImpactColor(type: THighlight['type']) {
  switch (type) {
    case 'affairs':
      return {
        backgroundColor: '#dc2626', // red-600
        borderColor: '#b91c1c', // red-700
        color: '#fff', // white text
      };

    case 'innovation':
      return {
        backgroundColor: '#f59e0b', // amber-500
        borderColor: '#d97706', // amber-600
        color: '#fff', // white text
      };

    case 'products':
      return {
        backgroundColor: '#3b82f6', // blue-500
        borderColor: '#2563eb', // blue-600
        color: '#fff', // white text
      };

    default:
      return {
        backgroundColor: '#6b7280', // gray-500
        borderColor: '#4b5563', // gray-600
        color: '#fff', // white text
      };
  }
}
export function getImpactStyles(level: string) {
  switch (level) {
    case 'Critical':
      return {
        dotColor: '#dc2626',
        borderColor: '#b91c1c',
        badgeBg: '#fee2e2',
        badgeText: '#b91c1c',
      };
    case 'High':
      return {
        dotColor: '#f59e0b',
        borderColor: '#d97706',
        badgeBg: '#fff7ed',
        badgeText: '#b45309',
      };
    case 'Medium':
      return {
        dotColor: '#3b82f6',
        borderColor: '#2563eb',
        badgeBg: '#eff6ff',
        badgeText: '#1d4ed8',
      };
    default:
      return {
        dotColor: '#6b7280',
        borderColor: '#4b5563',
        badgeBg: '#f3f4f6',
        badgeText: '#374151',
      };
  }
}

export const useHandleItem = (data: THighlight | TEvent) => {
  const [expanded, setExpanded] = useState(false);
  return {
    imageUrl: getBestImage((data as THighlight).images),
    summary: getSummary(data.content, expanded),
    needsReadMore: needsReadMore(data.content),
    expanded,
    setExpanded,
  };
};
