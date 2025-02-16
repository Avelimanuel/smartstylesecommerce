"use server";

import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { CartItem } from "@/types";
import { cookies } from "next/headers";
import { convertToRegularJsobject, roundToWholeNumber } from "../utils";
import { cartItemSchema, insertedCartItemsSchema } from "../validators";
import { revalidatePath } from "next/cache";

//Function to calculte the total price of items in the cart
const calculateTotalPrice = (items: CartItem[]) => {
  const itemsPrice = roundToWholeNumber(
      items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    ),
    shippingPrice = roundToWholeNumber(itemsPrice > 3000 ? 0 : 300),
    taxPrice = roundToWholeNumber(0.15 * itemsPrice),
    totalPrice = roundToWholeNumber(itemsPrice + shippingPrice + taxPrice);
  Number(itemsPrice);
  Number(taxPrice);
  Number(totalPrice);
  return {
    itemPrice: itemsPrice,
    shippingPrice: shippingPrice,
    taxPrice: taxPrice,
    totalPrice: totalPrice,
  };
};

export async function addToCartAction(data: CartItem) {
  try {
    //Check for cart cookie
    let sessionCartId =
      (await cookies()).get("sessionCartId")?.value || crypto.randomUUID();

    //Get the session and the user id
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    //Get cart
    const cart = await getMycartItems();

    //Parse and validate item
    const item = cartItemSchema.parse(data);
    console.log(item);
    //Find product in database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    if (!product) throw new Error("Product not found");

    if (!cart) {
      //Create a new cart object
      const newCart = insertedCartItemsSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,

        ...calculateTotalPrice([item]),
      });

      await prisma.cart.create({
        data: newCart,
      });
      //Revalidate the product page
      revalidatePath(`/product/${product.slug}`);
      return {
        success: true,
        message: "Item added to cart",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to add item to cart" + error,
    };
  }
}

export async function getMycartItems() {
  //Check for cart cookie
  const sessioncartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessioncartId) throw new Error("Cart session was not found");

  //Get the session and the user id
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessioncartId },
  });
  if (!cart) return undefined;

  //convert items and return
  return convertToRegularJsobject({
    ...cart,
    items: cart.items as CartItem[],
    itemPrice: cart.itemPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}
