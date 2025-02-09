import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Covert a prisma object into a JS object

export function convertToRegularJsobject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

//Format errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any

export function formatErrors(error: any) {
  if (error.name === "ZodError") {
    // Handle the zod error
    const fielderrors = Object.keys(error.errors).map(
      (field) => error.errors[field].message
    );
    return fielderrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    // Handle the prisma error
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}
