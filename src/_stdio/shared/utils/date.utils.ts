import find from 'lodash-es/find';
import dateFormat from 'dateformat';

export const DATE_FORMAT = 'dd mmm, yyyy';

export const i18n_vn = {
  dayNames: [],
  monthNames: [
    'Thg 01',
    'Thg 02',
    'Thg 03',
    'Thg 04',
    'Thg 05',
    'Thg 06',
    'Thg 07',
    'Thg 08',
    'Thg 09',
    'Thg 10',
    'Thg 11',
    'Thg 12',
    'Tháng một',
    'Tháng hai',
    'Tháng ba',
    'Tháng tư',
    'Tháng năm',
    'Tháng sáu',
    'Tháng bảy',
    'Tháng tám',
    'Tháng chín',
    'Tháng mười',
    'Tháng mười một',
    'Tháng mười hai',
  ],
  timeNames: ['s', 'c', 'sa', 'ch', 'S', 'C', 'SA', 'CH'],
};

export const timeSince = (now: Date, date: Date) => {
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 0 },
  ];
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const interval = find(intervals, (i) => i.seconds < seconds);
  if (interval) {
    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
  }
  return date;
};

export const convertDateFormat = (date?: Date | string | number, format?: string) => {
  dateFormat.i18n = i18n_vn;
  return dateFormat(date, format);
};
