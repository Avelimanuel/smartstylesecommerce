import ProductList from "@/components/shared/products/product-list";
import { getLatestProducts } from "@/lib/actions/product.action";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  const formattedProducts = latestProducts.map((product) => ({
    ...product,
    price: Number(product.price),
  }));
  await delay(1000);
  return (
    <>
      <ProductList data={formattedProducts} title="New Arrivals" limit={4} />
    </>
  );
};

export default Homepage;
