interface ProductProps {
  product: {
    _id: string;
    title: string;
    description: string;
    price: number | { $numberDecimal: string };
    imageUrl: string;
  };
}

export default function ProductCard({ product }: ProductProps) {
  // Fix Decimal128 price
  const price =
    typeof product.price === "object"
      ? parseFloat(product.price.$numberDecimal)
      : product.price;

  return (
    <div className="border p-4 rounded shadow bg-white">
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-48 w-full object-cover rounded mb-3"
        />
      )}
      <h2 className="text-xl font-semibold">{product.title}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="font-bold mt-2">${price.toFixed(2)}</p>
    </div>
  );
}
