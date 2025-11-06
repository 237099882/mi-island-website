// app/page.tsx
export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-9xl mb-4">谜</h1>
      <h2 className="text-5xl font-bold mb-4">Welcome to Miland Store</h2>
      <p className="text-lg text-gray-700 mb-6">
        这是一家娃娃店
      </p>
      <a
        href="/products"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        View Products
      </a>
      <section className="w-full mt-16 bg-white py-12 flex flex-col items-center">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-30 px-4">
          <div className="flex justify-center">
            <img src="3.webp" className="rounded-lg shadow-lg w-64 h-64 object-cover" />
          </div>
          <div className="flex justify-center">
            <img src="3.webp" className="rounded-lg shadow-lg w-64 h-64 object-cover" />
          </div>
          <div className="flex justify-center">
            <img src="3.webp" className="rounded-lg shadow-lg w-64 h-64 object-cover" />
          </div>
        </div>
      </section>
    </main>
  );
}
