"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { CartItem } from "@/types";
import { addToCartAction } from "@/lib/actions/cartactions";
const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();
  const { toast } = useToast();
  const handleAddToCart = async () => {
    const res = await addToCartAction(item);
    if (!res.success) {
      toast({
        variant: "destructive",
        description: res.message,
      });
      return;
    }
    toast({
      description: `${item.name} added to cart`,
      action: (
        <ToastAction
          className="bg-primary text-white hover:bg-gray-800"
          altText="Go to cart"
          onClick={() => router.push("/cart")}
        >
          Go to cart
        </ToastAction>
      ),
    });
  };
  return (
    <Button className="" type="button" onClick={handleAddToCart}>
     <Plus/> Add to cart
    </Button>
  );
};

export default AddToCart;
