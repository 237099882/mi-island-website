import ProductCard from "@/components/ProductCard";

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/products`, { cache: "no-store" });
  const data = await res.json();
  return data.products;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      {(!products || products.length === 0) && (
        <p>No products yet. Check back later!</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p: any) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </main>
  );
}
