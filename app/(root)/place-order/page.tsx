import { auth } from "@/auth";
import { getMycartItems } from "@/lib/actions/cartactions";
import { getUserById } from "@/lib/actions/users.actions";
import { ShippingAddress } from "@/types";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Checkoutsteps from "@/components/shared/checkout-steps";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Place Order",
};

const PlaceOrderPage = async () => {
  const cart = await getMycartItems();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User Not Found");
  const user = await getUserById(userId);
  if (!cart || cart.items.length === 0) redirect("/cart");
  if (!user.address) redirect("/shipping-address");
  if (!user.paymentMethod) redirect("/payment-method");
  const userAddress = user.address as ShippingAddress;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Checkoutsteps current={3} />

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-8 mb-6 animate-in fade-in slide-in-from-top-4">
          Place Your Order
        </h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-md p-6 transform transition-all hover:scale-[1.02] duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Shipping Address
              </h2>
              <div className="space-y-2 text-gray-600">
                <p className="font-medium">{userAddress.fullName}</p>
                <p>{userAddress.Country}</p>
                <p>{userAddress.City}</p>
                <p>{userAddress.Constituency}</p>
                <p>{userAddress.Landmark}</p>
              </div>
              <Link href="/shipping-address">
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Edit Address
                </button>
              </Link>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-md p-6 transform transition-all hover:scale-[1.02] duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Payment Method
              </h2>
              <p className="text-gray-600">{user.paymentMethod}</p>
              <Link href="/payment-method">
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Edit Payment
                </button>
              </Link>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Order Items
              </h2>
              <table className="w-full min-w-[400px]">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 text-gray-700">Item</th>
                    <th className="text-center py-3 text-gray-700">Qty</th>
                    <th className="text-right py-3 text-gray-700">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item) => (
                    <tr
                      key={item.slug}
                      className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4">
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center space-x-3"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="rounded-md"
                          />
                          <span className="text-gray-700 hover:text-blue-600">
                            {item.name}
                          </span>
                        </Link>
                      </td>
                      <td className="text-center text-gray-600">{item.qty}</td>
                      <td className="text-right text-gray-800">
                        Ksh. {item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between">
                  <span className="font-medium">Items Price</span>
                  <span>Ksh. {cart.itemPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Tax</span>
                  <span>Ksh. {cart.taxPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Shipping</span>
                  <span>Ksh. {cart.shippingPrice}</span>
                </div>
                <div className="flex justify-between border-t pt-4">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-gray-800">
                    Ksh. {cart.totalPrice}
                  </span>
                </div>
              </div>
              <button className="w-full mt-6 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold">
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
