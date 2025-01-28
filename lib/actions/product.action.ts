"use server";

import { prisma } from "@/db/prisma";
import { convertToRegularJsobject } from "../utils";


//Get the latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  });
  return convertToRegularJsobject(data);
}

//Get a single product by its slug
export async function getSingleProductByslug(slug:string){
  return await prisma.product.findFirst({
    where:{slug:slug}
  })

}
