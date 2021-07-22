import isValid from 'date-fns/isValid';

const EU_DATE = /^(\d{2})[/|-](\d{2})[/|-](\d{4})/;
const ISO_DATE = /^(\d{4})[/|-](\d{2})[/|-](\d{2})/;

export const parseDate = (date: string): Date | undefined => {
  const dateEU = EU_DATE.exec(date);
  if (dateEU) {
    return new Date(
      `${Number(dateEU[3])}-${Number(dateEU[2])}-${Number(dateEU[1])}`
    );
  }
  const dateISO = ISO_DATE.exec(date);
  if (dateISO) {
    return new Date(
      `${Number(dateISO[1])}-${Number(dateISO[2])}-${Number(dateISO[3])}`
    );
  }
};

export const formatDate = (date: string): string | undefined => {
  const parsedDate = parseDate(date);
  return (
    parsedDate &&
    parsedDate.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  );
};

export const isDateValid = (date: string): boolean =>
  Boolean(date) && isValid(parseDate(date));

export const convertFormat = (date: string): string => {
  const values = date.split('-');
  return `${values[2]}-${values[1]}-${values[0]}`;
};

interface DateObject {
  day: string;
  month: string;
  year: string;
}

export const stringDateToObject = (
  value?: string,
  format = 'ISO'
): DateObject => {
  const date = value?.split(/[-|T|\s]/) || ['', '', ''];
  return format === 'ISO'
    ? { day: date[2], month: date[1], year: date[0] }
    : { day: date[0], month: date[1], year: date[2] };
};

export const objectDateToString = (
  { day = '', month = '', year = '' }: DateObject,
  format = 'ISO'
): string | null =>
  day === '' && month === '' && year === ''
    ? null
    : format === 'ISO'
    ? `${year}-${month}-${day}`
    : `${day}-${month}-${year}`;

/** convert all our weird date formats on the /cases api endpoint into iso-compatible strings */
export const normaliseDateToISO = (str: string): string => {
  if (/[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4} [0-9]{1,2}:[0-9:]{1,5}/.test(str)) {
    const [date, time] = str.split(' ');
    const [days, month, year] = date.split('/');
    const [hours, minutes, seconds] = time.split(':');
    return `${year}-${month}-${days}T${hours.padStart(2, '0')}:${minutes}${
      seconds ? `:${seconds}` : ''
    }`;
  } else if (/[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/.test(str)) {
    const [days, month, year] = str.trim().split('/');
    return `${year}-${month}-${days}`;
  } else {
    return str;
  }
};
