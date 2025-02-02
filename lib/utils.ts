import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Covert a prisma object into a JS object

export function convertToRegularJsobject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
