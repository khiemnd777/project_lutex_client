import find from 'lodash-es/find';
import moment from 'moment';

export const DefaultDateFormat = 'DD-MMM-yyyy';

export const GetDate = (dateString: string, defaultDate = '-') => {
  const date = moment(dateString);
  if (date.year() === 1) {
    // 0001-01-01T00:00:00
    return defaultDate;
  }
  return date.format(DefaultDateFormat);
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
