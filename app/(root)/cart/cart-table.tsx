"use client";
import { Cart } from "@/types";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { addToCartAction, removeItemFromCart } from "@/lib/actions/cartactions";
import { Minus, ArrowRight, Loader, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Card,CardContent } from "@/components/ui/card";




const CartTable = ({ cart }: { cart?: Cart }) => {
  //Initializing
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isCheckoutPending,startcheckoutTransition] = useTransition()
  return (
    <>
      <h1 className="py-4 h2-bold">Shopping cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>
          Your Cart Is Empty{" "}
          <Link className="text-blue-500 font-bold underline" href="/">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cart Items</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Link
                        href={`/products/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        <span className="px-2">{item.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="flex-center gap-2">
                      <Button
                        disabled={isPending}
                        variant="outline"
                        type="button"
                        onClick={() =>
                          startTransition(async () => {
                            const res = await removeItemFromCart(
                              item.productId
                            );
                            if (!res.success) {
                              toast({
                                variant: "destructive",
                                description: res.message,
                              });
                            }
                          })
                        }
                      >
                        {isPending ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Minus className="w-4 h-4" />
                        )}
                      </Button>
                      <span>{item.qty}</span>
                      <Button
                        disabled={isPending}
                        variant="outline"
                        type="button"
                        onClick={() =>
                          startTransition(async () => {
                            const res = await addToCartAction(item);
                            if (!res.success) {
                              toast({
                                variant: "destructive",
                                description: res.message,
                              });
                            }
                          })
                        }
                      >
                        {isPending ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      ksh.{item.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Card>
            <CardContent className="p-4 gap-4">
              <div className="pb-3 text-xl">
                Total items (
                {cart.items.reduce(
                  (accumulator, item) => accumulator + item.qty,
                  0
                )}
                ):
              </div>
              <span className="font-bold">
                Total Price: {formatCurrency(cart.itemPrice)}
              </span>
              <Button
                className="w-full"
                disabled={isPending}
                onClick={() =>
                  startTransition(() => router.push("/shipping-address"))
                }
              >
                {isCheckoutPending ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <h4>Proceed</h4>
                )}
                <ArrowRight className="w-2 h-2" />
              </Button>
            </CardContent>
          </Card>
          <Link href="/" className="text-center text-blue-600 mr-0">
            <Button className="rounded-md bg-green-500 ">Back Shopping</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default CartTable;
