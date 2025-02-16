import { z } from "zod";
import {
  insertProductSchema,
  insertedCartItemsSchema,
  cartItemSchema,
} from "@/lib/validators";
export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type Cart = z.infer<typeof insertedCartItemsSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
