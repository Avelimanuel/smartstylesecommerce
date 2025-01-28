import { getSingleProductByslug } from "@/lib/actions/product.action";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
const SingleItemDetails = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;
  const singleItem = await getSingleProductByslug(slug);
  if (!singleItem) notFound();
  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5 items-center">
          {/* Images column */}
          <div className="col-span-2">
            {/* Images */}
            Images here
          </div>
          {/* Details column */}
          <div className="col-span-2">
            <div className="flex flex-col gap-4">
              <h1 className="font-bold">{singleItem.category}</h1>
              <h3 className="h3-bold">{singleItem.name}</h3>
              <p>{singleItem.numReviews} reviews</p>
              <div className="flex flex-col sm:flex-row sm:items-center font-serif rounded-full w-24 p-2 bg-green-100 text-green-800">
                ksh.{singleItem.price}
              </div>
              <div className="mt-10">
                <p className="font-semibold">Description</p>
                <p className="italic text-sm">{singleItem.description}</p>
              </div>
            </div>
          </div>
          {/* Action column */}
          <div>
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between mb-2">
                  <div>Price</div>
                  <div>
                    <p className="font-serif rounded-full ">
                      Ksh.{singleItem.price}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mb-2">
                  <div>Status</div>
                  <div>
                    <p className="font-serif">
                      {singleItem.stock < 1 ? (
                        <Badge variant="destructive">Out of stock</Badge>
                      ) : (
                        <Badge variant="outline" className="text-blue-500">
                          Available
                        </Badge>
                      )}
                    </p>
                  </div>
                </div>
                {singleItem.stock > 0 && <Button className="w-full">Add to cart</Button>}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleItemDetails;
