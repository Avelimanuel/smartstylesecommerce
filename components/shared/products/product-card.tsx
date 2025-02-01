import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.description}
            width={300}
            height={300}
            priority={true}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div className="text-xs">{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className="font-semibold text-sm">{product.name}</h2>
        </Link>
        <div className="flex-between gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700">Add to Cart</Button>
          {product.stock > 0 ? (
            <h1 className="font-bold">Ksh. {product.price}</h1>
          ) : (
            <Badge variant="destructive">Out of stock</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
