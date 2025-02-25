import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { number, string } from "zod";

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

//Round decimal number to a whole number

export function roundToWholeNumber(value: number | string) {
  if (value === null || value === undefined || value === "") {
    console.error("Invalid value passed to roundToWholeNumber:", value);
    return 0; // Default to 0 instead of throwing an error
  }

  const num = Number(value);
  if (isNaN(num)) {
    console.error("roundToWholeNumber received NaN!", value);
    return 0;
  }

  return Math.round(num);
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-KE", {
  currency: "KES",
  style: "currency",
  minimumFractionDigits: 0,
});

export function formatCurrency(amount:number | string | null){
  if(typeof amount === 'number'){
    return CURRENCY_FORMATTER.format(amount)
  }else if(typeof amount === 'string'){
    return CURRENCY_FORMATTER.format(Number(amount))
  }else{
    return NaN
  }

}
