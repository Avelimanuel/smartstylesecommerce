"use server";

import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { CartItem } from "@/types";
import { cookies } from "next/headers";
import {
  convertToRegularJsobject,
  formatErrors,
  roundToWholeNumber,
} from "../utils";
import { cartItemSchema, insertedCartItemsSchema } from "../validators";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

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
        message: `${product.name} added to cart`,
      };
    } else {
      //Check if item already exists in the cart
      const ifItemexistInCart = (cart.items as CartItem[]).find(
        (theItem) => theItem.productId === item.productId
      );

      if (ifItemexistInCart) {
        //Check the product stock
        if (product.stock < ifItemexistInCart.qty + 1) {
          throw new Error(`Not enough in stock`);
        }

        //Increase the quantity
        (cart.items as CartItem[]).find(
          (theItem) => theItem.productId === item.productId
        )!.qty = ifItemexistInCart.qty + 1;
      } else {
        //If item does not exist in cart

        //Check the stock
        if (product.stock < 1) throw new Error("Out of stock");

        //Add the item to the cart.items
        cart.items.push(item);
      }
      //save to the database
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calculateTotalPrice(cart.items as CartItem[]),
        },
      });
      //Revalidate the product page
      revalidatePath(`/product/${product.slug}`);
      return {
        success: true,
        message: `${product.name}${
          ifItemexistInCart ? " updated in " : "added to "
        } the cart`,
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

export async function removeItemFromCart(productId: string) {
  try {
    let sessionCartId =
      (await cookies()).get("sessionCartId")?.value || crypto.randomUUID();

    //Get the product
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error(`Product not found`);

    //Get users cart
    const usersCart = await getMycartItems();
    if (!usersCart) throw new Error("Cart not found");

    //Check for the item
    const ifItemExists = (usersCart.items as CartItem[]).find(
      (cartitem) => cartitem.productId
    );
    if (!ifItemExists) throw new Error("Item not found");
    //Check if quantity is one in the cart
    if (ifItemExists.qty === 1) {
      //Remove from the cart
      usersCart.items = (usersCart.items as CartItem[]).filter(
        (cartitem) => cartitem.productId !== ifItemExists.productId
      );
    } else {
      //If the quantity is > 1
      (usersCart.items as CartItem[]).find(
        (cartitem) => cartitem.productId === productId
      )!.qty = ifItemExists.qty - 1;
    }
    //Update the cart in the database
    await prisma.cart.update({
      where: { id: usersCart.id },
      data: {
        items: usersCart.items as Prisma.CartUpdateitemsInput[],
        ...calculateTotalPrice(usersCart.items as CartItem[]),
      },
    });
    //Revalidate the product page
    revalidatePath(`/product/${product.slug}`);
    return {
      success: true,
      message: `${product.name} removed from cart`,
    };
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
}
