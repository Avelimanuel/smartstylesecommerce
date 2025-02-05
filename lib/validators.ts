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
  email:z.string().email('Invalid email or password'),
  password:z.string().min(6,'password must be atleast 6 characters')
})
