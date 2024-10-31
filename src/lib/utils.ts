import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const renderDate = (givenDate: Date) => {
  const currentDate = new Date();
  const yesterday = new Date();
  yesterday.setDate(currentDate.getDate() - 1);

  if (givenDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }
  return format(givenDate, givenDate.toDateString() === currentDate.toDateString() ? "p": "P");
}