import ProductList from "@/components/shared/products/product-list";
import { getLatestProducts } from "@/lib/actions/product.action";

const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

const Homepage = async () => {
  const latestProducts = await getLatestProducts()
  await delay(2000);
  return (
    <>
      <ProductList data={latestProducts} title="New Arrivals" limit={4} />
    </>
  );
};

export default Homepage;
