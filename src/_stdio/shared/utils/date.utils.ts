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
