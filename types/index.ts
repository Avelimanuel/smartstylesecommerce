import { z } from "zod";
import {
  insertProductSchema,
  insertedCartItemsSchema,
  cartItemSchema,
  insertOrderItemSchema,
  insertOrderSchema,
  shippingAddressSchema,
} from "@/lib/validators";
export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type Cart = z.infer<typeof insertedCartItemsSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: Boolean;
  paidAt: Date | null;
  isDelivered: Boolean;
  deliverdAt: Date | null;
  orderitems: OrderItem[];
  user:{name:string,email:string}
};
export type OrderItem = z.infer<typeof insertOrderItemSchema>;
