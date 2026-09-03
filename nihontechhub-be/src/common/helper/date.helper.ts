import { EIncrementType, ELanguage } from '../enums';

export const localeTimeZone = {
  [ELanguage.VI]: { language: ELanguage.VI, timeZone: 'Asia/Bangkok' },
  [ELanguage.JA]: { language: ELanguage.JA, timeZone: 'Asia/Tokyo' },
  [ELanguage.EN]: { language: ELanguage.EN, timeZone: 'Europe/London' },
} as const;
/**
 * Compares two dates and returns true if the first date is less than or equal to the second date.
 * @param {string | number | Date} d1 - The first date to compare.
 * @param {string | number | Date} d2 - The second date to compare.
 * @returns {boolean} - True if the first date is less than or equal to the second date, false otherwise.
 */
export const DateHelper = {
  // UTC time
  currentDate: () => new Date(),
  compareDates: (
    d1: string | number | Date,
    d2?: string | number | Date,
  ): boolean => {
    const date1 = new Date(d1);
    const date2 = d2 ? new Date(d2) : DateHelper.currentDate();

    const time1 = date1.getTime();
    const time2 = date2.getTime();

    return time1 >= time2;
  },

  compareLessDates: (
    d1: string | number | Date,
    d2?: string | number | Date,
  ): boolean => {
    const date1 = new Date(d1);
    const date2 = d2 ? new Date(d2) : DateHelper.currentDate();

    const time1 = date1.getTime();
    const time2 = date2.getTime();

    return time1 <= time2;
  },

  increaseDate: (
    increment: number,
    increaseType: EIncrementType,
    date?: Date,
  ): Date => {
    const currentDate = date ? new Date(date) : DateHelper.currentDate();
    let increasedDate: Date;

    switch (increaseType) {
      case EIncrementType.YEAR:
        // increasedDate = getYear(increment, currentDate);
        const currYear = currentDate.getFullYear();
        increasedDate = new Date(currentDate.setFullYear(currYear + increment));
        break;
      case EIncrementType.MONTH:
        // increasedDate = getMonth(increment, currentDate);
        const currMonth = currentDate.getMonth();
        increasedDate = new Date(currentDate.setMonth(currMonth + increment));
        break;
      case EIncrementType.WEEK:
        // increasedDate = getWeek(increment, currentDate);
        const currWeek = currentDate.getDate();
        increasedDate = new Date(currentDate.setDate(currWeek + increment * 7));
        break;
      case EIncrementType.DATE:
        // increasedDate = getDay(increment, currentDate);
        const currDate = currentDate.getDate();
        increasedDate = new Date(currentDate.setDate(currDate + increment));
        break;

      case EIncrementType.HOUR:
        //   increasedDate = getHour(increment, currentDate);
        const currHour = currentDate.getHours();
        increasedDate = new Date(currentDate.setHours(currHour + increment));
        break;

      case EIncrementType.MINUTE:
        increasedDate = new Date(
          currentDate.setMinutes(currentDate.getMinutes() + increment),
        );
        break;

      case EIncrementType.SECOND:
        increasedDate = new Date(
          currentDate.setSeconds(currentDate.getSeconds() + increment),
        );
        break;
    }
    return increasedDate;
  },

  getYear: (duration: number, date?: Date): Date => {
    const value = date ?? DateHelper.currentDate();
    return new Date(
      value.getFullYear() + duration,
      value.getMonth(),
      value.getDate(),
      value.getHours(),
      value.getMinutes(),
      value.getSeconds(),
      value.getMilliseconds(),
    );
  },

  getMonth: (duration: number, date?: Date): Date => {
    const value = date ?? DateHelper.currentDate();
    return new Date(
      value.getFullYear(),
      value.getMonth() + duration,
      value.getDate(),
      value.getHours(),
      value.getMinutes(),
      value.getSeconds(),
      value.getMilliseconds(),
    );
  },

  getWeek: (duration: number, date?: Date): Date => {
    const value = date ?? DateHelper.currentDate();
    return new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate() + duration * 7,
      value.getHours(),
      value.getMinutes(),
      value.getSeconds(),
      value.getMilliseconds(),
    );
  },

  getDay: (duration: number, date?: Date): Date => {
    const value = date ?? DateHelper.currentDate();
    return new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate() + duration,
      value.getHours(),
      value.getMinutes(),
      value.getSeconds(),
      value.getMilliseconds(),
    );
  },

  getHour: (duration: number, date?: Date): Date => {
    const value = date ?? DateHelper.currentDate();
    return new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate(),
      value.getHours() + duration,
      value.getMinutes(),
      value.getSeconds(),
      value.getMilliseconds(),
    );
  },

  getDayRange: (date?: Date) => {
    const value = date ? new Date(date) : DateHelper.currentDate();
    // Beginning of the day (00:00:00.000)
    const startOfDay = new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate(),
    );

    startOfDay.setHours(0, 0, 0, 0);
    // End of the day (23:59:59.999)
    const endOfDay = new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate(),
      23,
      59,
      59,
      999,
    );

    return { startOfDay, endOfDay };
  },

  convertMsStringToDate: (input: string): Date => {
    const num = Number(input);

    if (!num) return null;

    const result = new Date(num * 1000);
    return result;
  },

  getTimeLocateInWord: (locate: ELanguage, day?: Date) => {
    const date = day ?? DateHelper.currentDate();
    const { language, timeZone } = localeTimeZone[locate];
    const res = date.toLocaleString(language, {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Use 24-hour format
    });
    return res;
  },
};
