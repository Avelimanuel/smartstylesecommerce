import { z } from "zod";

export const insertProductSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  slug: z.string().min(3, "Product slug must be at least 3 characters"),
  category: z.string().min(3, "Product category must be at least 3 characters"),
  price: z.coerce.number().min(0, "Price must be at least 0"),
  brand: z.string().min(3, "Product brand must be at least 3 characters"),
  description: z
    .string()
    .min(3, "Product description must be at least 3 characters"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
});

//Schema for signing in
export const signInFormSchema = z.object({
  email: z.string().email("Invalid email or password"),
  password: z.string().min(6, "password must be atleast 6 characters"),
});

//Schema for signing up a user
export const signUpFormSchema = z
  .object({
    name: z.string().min(4, "Name must be at least 4 characters"),
    email: z.string().email("Invalid email or password"),
    password: z.string().min(6, "password must be atleast 6 characters"),
    confirmPassword: z.string().min(6, "password must be atleast 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }); //check if the passwords match

//Cartitem schema

export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  qty: z.number().int().nonnegative("Quantity must be a positive number"),
  image: z.string().min(1, "Image is required"),
  price: z.preprocess(
    (val) => (val ? Number(val) : 0),
    z.number().min(0, "Price must be at least 0")
  ),
});

export const insertedCartItemsSchema = z.object({
  items: z.array(cartItemSchema),
  itemPrice: z.coerce.number().min(0, "Price must be at least 0"),
  totalPrice: z.coerce.number().min(0, "Price must be at least 0"),
  shippingPrice: z.coerce.number().min(0, "Price must be at least 0"),
  taxPrice: z.coerce.number().min(0, "Price must be at least 0"),
  sessionCartId: z.string().min(1, "Session cart id is required"),
  userId: z.string().optional().nullable(),
});

//Schema for shippimg address

export const shippingAddressSchema = z.object({
  fullName: z.string().min(4, "Name must be atleast 4 characters long."),
  Country: z.string().min(4, "country name must be atleast 4 characters long."),
  City: z.string().min(4, "City name must be atleast 4 characters long."),
  Constituency: z
    .string()
    .min(4, "Constituency name must be atleast 4 characters long."),
  Landmark: z
    .string()
    .min(4, "Landmark name must be atleast 4 characters long."),
});
