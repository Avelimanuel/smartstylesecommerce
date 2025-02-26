import { auth } from "@/auth";
import { getMycartItems } from "@/lib/actions/cartactions";
import { Metadata } from "next";
import { redirect, } from "next/navigation";
import { ShippingAddress } from "@/types";
import { getUserById } from "@/lib/actions/users.actions";
import Shippingaddressform from "./shipping-address-form";

export const metadata: Metadata = {
  title: "Shipping Address",
};

const ShippingAdressPage = async () => {
  const cart = await getMycartItems();
  if (!cart || cart.items.length === 0) redirect("/cart");
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("User id was not found");
  

  const user = await getUserById(userId);

  return (
    <>
      <Shippingaddressform address={user.address as ShippingAddress} />
    </>
  );
};

export default ShippingAdressPage;
