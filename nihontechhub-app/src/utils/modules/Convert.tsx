/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { InfiniteData } from '@tanstack/react-query';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import 'dayjs/locale/ja';

dayjs.extend(customParseFormat);
dayjs.locale('ja');

dayjs.extend(calendar);
dayjs.locale('vi');

import { TAPIPagingInfiniteResponseFormat } from './FetchApi/types';
import { LanguageService } from './Language';

export const Convert = {
  isJson: (object?: object | null) => {
    let item = typeof object !== 'string' ? JSON.stringify(object) : object;
    if (typeof object === 'object') {
      return false;
    }
    try {
      item = JSON.parse(item);
    } catch (e) {
      return false;
    }
    if (typeof item === 'object' && item !== null) {
      return true;
    }
    return false;
  },
  isUrl: (value: string) => {
    const regEx =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/gm;
    return regEx.test(value);
  },
  dataQueryToList: <T extends object>(
    data?: InfiniteData<TAPIPagingInfiniteResponseFormat<T[]>>,
  ) => {
    if (!data) {
      return [];
    }
    const convertList: T[] = [];
    data?.pages?.forEach(element => {
      if (!element?.data) {
        return;
      }
      if (Array.isArray(element.data)) {
        convertList.push(...element.data);
      } else {
        convertList.push(element.data);
      }
    });
    return [...new Set(convertList)];
  },

  //sort by value property
  sortObject: (obj: Record<string, any> = {}) => {
    const arr = [];
    for (const prop in obj) {
      if (obj[prop] !== undefined) {
        arr.push({
          key: prop,
          value: obj[prop],
        });
      }
    }
    arr.sort(function (a, b) {
      return a.value - b.value;
    });
    return arr;
  },

  dataRenderingChildren: ({ item }: any) => {
    if (!item) {
      return undefined;
    }

    if (!Array.isArray(item.children)) {
      return item.children;
    }

    return item.children.map(childItem => {
      const ChildrenComponent = childItem.component;
      return (
        <ChildrenComponent key={childItem.id} {...childItem.config}>
          {Convert.dataRenderingChildren({ item: childItem.children })}
        </ChildrenComponent>
      );
    });
  },
  formatUpdatedAt(dateString: string) {
    return dayjs(dateString).calendar(null, {
      sameDay: '[Hôm nay lúc] HH:mm',
      lastDay: '[Hôm qua lúc] HH:mm',
      lastWeek: 'DD/MM/YYYY',
      sameElse: 'DD/MM/YYYY',
    });
  },
  formatNumber: (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count?.toString();
  },

  removeVietnameseTones(str: string) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  },

  searchItems<T extends Array<{ id: string; name?: string; index: number }>>(
    items: T,
    query: string,
  ): T {
    if (!query) return items;

    const normalizedQuery = Convert.removeVietnameseTones(
      query.toString().toLowerCase(),
    );

    // Nếu query là số -> dịch từ 1-based -> 0-based
    const parsedNumber = Number(normalizedQuery);
    const isNumeric = !isNaN(parsedNumber);
    const normalizedIndexQuery = isNumeric
      ? (parsedNumber - 1).toString()
      : null;

    const results = items
      .map(item => {
        const indexStr = item.index?.toString() ?? '';
        const nameStr = item.name ?? '';
        const normalizedName = Convert.removeVietnameseTones(
          nameStr.toLowerCase(),
        );

        let score = 0;

        // Ưu tiên match theo index (0-based so với query đã dịch)
        if (isNumeric && normalizedIndexQuery) {
          if (indexStr === normalizedIndexQuery) score += 100;
          else if (indexStr.includes(normalizedIndexQuery)) score += 50;
        }

        // Ưu tiên match theo name
        if (normalizedName === normalizedQuery) score += 80;
        else if (normalizedName.includes(normalizedQuery)) score += 40;

        return { ...item, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ score, ...rest }) => rest); // bỏ score khi trả về

    return results;
  },
};
export const getSentences = (str: string) => {
  return str
    ?.split(/(?<=[。！？!?.])(?=[「『（(」』）)]*[^」』）)]|$)/u)
    .map(s => s.trim())
    .filter(Boolean);
};
export const joinSentences = (sentences: string[]) => {
  const code = LanguageService.getCode();
  if (code === 'en') {
    return sentences?.join?.('\n\n');
  }
  return sentences?.join?.('。\n\n');
};

export const santizedText = (str = '') => {
  return str
    .replace(
      /(\={5,}|\-{5,}|_{5,}|(?:Donate|Ghi chú|Ghi chu|Cảm ơn|Cam on|Note)[:：]?.*)[\s\S]*$/i,
      '',
    )
    .trim();
};

export const cloneObject = (input: object) => JSON.parse(JSON.stringify(input));
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function estimateReadTime(text = '', wordsPerMinute = 200) {
  const words = text.length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

export function getDateString(
  date: string,
  format = 'YYYY-MM-DD HH:mm:ss ddd',
) {
  // parse input date string
  const parsedDate = dayjs(date, format);

  const code = LanguageService.getCode();
  // format giống toLocaleDateString('ja-JP', ...)
  if (code === 'en') {
    return parsedDate.format('YYYY-MM-DD (ddd)'); // ex: 2025-11-01 (Sat)
  }
  return parsedDate.format('YYYY年M月D日（ddd）'); // ex: 2025年11月1日（土）
}

export function getTimeString(
  date: string,
  format = 'YYYY-MM-DD HH:mm:ss ddd',
) {
  return dayjs(date, format).format('HH:mm');
}

export const parseDate = (str: string, format = 'yyyy-MM-dd HH:mm:ss EEE') =>
  dayjs(str, format).toDate();

export function getGroupDateString(
  date: string,
  format = 'YYYY-MM-DD HH:mm:ss ddd',
) {
  // parse input date string
  const parsedDate = dayjs(date, format);

  const code = LanguageService.getCode();
  // format giống toLocaleDateString('ja-JP', ...)
  if (code === 'en') {
    return parsedDate.format('YYYY-MM-DD'); // ex: 2025-11-01
  }
  return parsedDate.format('YYYY年M月D日');
}

export function uniqueBy<T>(
  items: T[],
  key?: keyof T | ((item: T) => any),
): T[] {
  const seen = new Set<any>();

  return items.filter(item => {
    let value: any;

    if (typeof key === 'function') {
      value = key(item);
    } else if (typeof key === 'string' && item && typeof item === 'object') {
      value = (item as any)[key];
    } else {
      // nếu không có key, hoặc item là primitive (string, number, v.v.)
      value = item;
    }

    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

export function capitalizeFirstChar(str: string) {
  if (!str) return ''; // kiểm tra chuỗi rỗng
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function extractFileName(str: string) {
  return str?.match?.(/([\w\-]+)\.[\w]+/)?.[1];
}
