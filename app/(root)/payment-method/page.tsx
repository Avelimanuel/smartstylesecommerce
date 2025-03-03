import { getUserById } from "@/lib/actions/users.actions";
import { Metadata } from "next";
import { auth } from "@/auth";
import PaymentMethodForm from "./payment-method-form";
import Checkoutsteps from "@/components/shared/checkout-steps";

export const metadata: Metadata = {
  title: "Select Payment Method",
};
const PaymentMethodPage = async () => {
  //Getting the session
  const session = await auth();
  //Get the user id
  const userId = session?.user?.id;
  if (!userId) throw new Error("User Not Found");

  //Get user from the database by using the getuserById function that we imported
  const user = await getUserById(userId);
  return (
    <>
      <Checkoutsteps current={2} />
      <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />
    </>
  );
};

export default PaymentMethodPage;
