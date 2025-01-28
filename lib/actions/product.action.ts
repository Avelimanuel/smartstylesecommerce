"use server";

import { prisma } from "@/db/prisma";
import { convertToRegularJsobject } from "../utils";

export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  });
  return convertToRegularJsobject(data);
}
