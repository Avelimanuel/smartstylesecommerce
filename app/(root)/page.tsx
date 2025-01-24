import ProductList from "@/components/shared/products/product-list";
import sampleData from "@/db/sample-data";

const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

const Homepage = async () => {
  await delay(2000);
  return (
    <>
      <ProductList data={sampleData.products} title="New Arrivals" limit={4} />
    </>
  );
};

export default Homepage;
