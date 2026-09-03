import FingerprintJS, { Agent } from '@fingerprintjs/fingerprintjs';
import { clsx, type ClassValue } from 'clsx';
import { format, parse } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isServer = typeof window === 'undefined';

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export function estimateReadTime(text = '', wordsPerMinute = 200) {
  const words = text.length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const isHTML = (content: string) => /<\/?[a-z][\s\S]*>/i.test(content);

export function getTimeString(date: string) {
  const eventTime = parse(
    date, // "2025-09-11 12:10:03 Thu"
    'yyyy-MM-dd HH:mm:ss EEE', // format pattern
    new Date(), // reference date
  );

  const timeStr = eventTime.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return timeStr;
}

export function getDateString(date: string, format = 'yyyy-MM-dd') {
  const eventTime = parse(
    date, // "2025-09-11 12:10:03 Thu"
    format, // format pattern
    new Date(), // reference date
  );

  const dateStr = eventTime.toLocaleDateString('ja-JP', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  return dateStr;
}

export const parseDate = (str: string, format = 'yyyy-MM-dd HH:mm:ss EEE') => parse(str, format, new Date());
export const getGroupDateString = (str: string) => format(parseDate(str), 'yyyy-MM-dd');

export const getSentences = (str: string) => {
  return str?.split(/(?:\n\n|。|\n)+/).filter(Boolean);
};

export const concatSentences = (sentences: string[]) => {
  return sentences.join('\n\n');
};

let FP: Agent | null = null;

export const generateFingerprint = async () => {
  // Load the agent (only once)
  if (!FP) {
    FP = await FingerprintJS.load();
  }
  const result = await FP.get();
  return result.visitorId;
};
