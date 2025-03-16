"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { formatErrors } from "../utils";
import { auth } from "@/auth";
import { getMycartItems } from "./cartactions";
import { getUserById } from "./users.actions";
import { cartItemSchema, insertOrderSchema } from "../validators";
import { prisma } from "@/db/prisma";
import { CartItem } from "@/types";

export async function createOrder() {
  try {
    //Getting the session
    const session = await auth();
    if (!session) throw new Error("User not authenticated");

    //Getting the cart
    const cart = await getMycartItems();

    //Getting the user id
    const userId = session?.user?.id;
    if (!userId) throw new Error("User Not Found");

    //Fetching the user from db
    const user = await getUserById(userId);

    //Check if user has got an active cart
    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        message: "Your Cart Is Empty",
        redirectTo: "/cart",
      };
    }
    if (!user.address) {
      return {
        success: false,
        message: "Shipping Address Not Found",
        redirectTo: "/shipping-address",
      };
    }
    if (!user.paymentMethod) {
      return {
        success: false,
        message: "You have no payment method",
        redirectTo: "/payment-method",
      };
    }
    //Create the order object
    const order = insertOrderSchema.parse({
      userId: user.id,
      shippingAddress: user.address,
      paymentMethod: user.paymentMethod,
      itemsPrice: cart.itemPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    });
    //Create a transaction to create order and order items in database
    const insertedOrderId = await prisma.$transaction(async (tx) => {
      //Create order
      const createdOrder = await tx.order.create({ data: order });
      //Create oredr items from the cart items
      for (const item of cart.items as CartItem[]) {
        await tx.orderItem.create({
          data: {
            ...item,
            price: item.price,
            orderId: createdOrder.id,
          },
        });
      }
      //Clear the cart
      await tx.cart.update({
        where: {
          id: cart.id,
        },
        data: {items:[],
          totalPrice:0,
          shippingPrice:0,
          taxPrice:0,
          itemPrice:0
        },
      });
      return createdOrder.id
    });
    if(!insertedOrderId) throw new Error("Order Not Created")
      return {success:true,message:'Order Created Successfull ',redirectTo:`/order/${insertedOrderId}`}
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { success: false, message: formatErrors(error) };
  }
}
