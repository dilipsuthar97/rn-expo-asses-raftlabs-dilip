/**
 * method to convert a date string to a readable format
 * @param date
 * @returns
 */
export const getReadableDate = (date?: string): string => {
  if (date === undefined) return '';
  const utcDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const readableDate: string = utcDate.toLocaleDateString('en-US', options);
  return readableDate;
};
