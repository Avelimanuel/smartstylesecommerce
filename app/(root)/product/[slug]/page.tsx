import { getSingleProductByslug } from "@/lib/actions/product.action";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import ProductImages from "@/components/shared/products/product-images";

const SingleItemDetails = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const singleItem = await getSingleProductByslug(slug);

  if (!singleItem) notFound();

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Images Section */}
        <div className="lg:col-span-2">
          <div className="relative w-full h-[300px] md:h-[400px]">
            <ProductImages images={singleItem.images}/>
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Badge className="w-max text-sm">{singleItem.category}</Badge>
          <h1 className="text-2xl font-bold">{singleItem.name}</h1>
          <p className="text-gray-600">{singleItem.numReviews} reviews</p>
          <div className="text-xl font-semibold text-green-700 bg-green-100 rounded-full px-4 py-2 w-max">
            Ksh. {singleItem.price}
          </div>
          <div>
            <h2 className="font-semibold">Description</h2>
            <p className="text-sm text-gray-600 italic">
              {singleItem.description}
            </p>
          </div>
        </div>

        {/* Action Section */}
        <div className="lg:col-span-1">
          <Card className="shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between text-lg font-medium">
                <span>Price</span>
                <span>Ksh. {singleItem.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Status</span>
                {singleItem.stock < 1 ? (
                  <Badge variant="destructive">Out of Stock</Badge>
                ) : (
                  <Badge variant="outline" className="text-blue-600">
                    Available
                  </Badge>
                )}
              </div>
              {singleItem.stock > 0 && (
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Add to Cart
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SingleItemDetails;
