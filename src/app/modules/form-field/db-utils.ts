import { v4 as uuidv4 } from 'uuid';
import { formatISO } from 'date-fns';
export function formatDate(date: Date): string | null {
  if (!date || date === null || date === undefined) {
    return null;
  }
  date = new Date(date);
  return formatISO(date, { representation: 'complete' });
}
export const generateUuid4 = (): string => uuidv4();