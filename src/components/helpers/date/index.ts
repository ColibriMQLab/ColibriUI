import { format, parseISO, isValid } from "date-fns";

type DateFormat = string | Date;

// Helper to parse date strings with fallback
export const parse = (dateInput: DateFormat): Date => {
  if (!dateInput) {
    return new Date();
  }

  const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;

  return isValid(date) ? date : new Date(dateInput);
};

// Convert date to ISO format (YYYY-MM-DD)
export const toISODate = (date: Date): string => format(date, "yyyy-MM-dd");

// Convert date to DMY format (dd.MM.yyyy)
export const toDMYDate = (dateISO: string): string =>
  dateISO ? format(new Date(dateISO), "dd.MM.yyyy") : "";
