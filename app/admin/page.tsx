"use client";

import React, { useState } from "react";

type FormState = {
  title: string;
  description: string;
  price: string;
  imageFile: File | null;
  imageUrl: string;
};

export default function AdminPage() {
  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    price: "",
    imageFile: null,
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm({ ...form, imageFile: e.target.files[0] });
    }
  };

  const uploadImage = async () => {
    if (!form.imageFile) return setMessage("No file selected");

    setUploading(true);
    const body = new FormData();
    body.append("file", form.imageFile);

    try {
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (!data.url) throw new Error(data.error || "Upload failed");
      setForm({ ...form, imageUrl: data.url });
      setMessage("✅ Image uploaded!");
    } catch (err: any) {
      console.error("UPLOAD ERROR:", err);
      setMessage("❌ Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.imageUrl) return setMessage("Please upload an image first");

    setLoading(true);
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        price: Number(form.price),
        imageUrl: form.imageUrl,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!data.ok) return setMessage("❌ " + data.error);

    setMessage("✅ Product saved!");
    setForm({ title: "", description: "", price: "", imageFile: null, imageUrl: "" });
  };

  return (
    <main className="min-h-screen container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin — Add Product</h1>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-2" />

        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2" rows={3} />

        <input name="price" value={form.price} onChange={handleChange} type="number" step="0.01" placeholder="Price" className="w-full border p-2" />

        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="button" onClick={uploadImage} disabled={uploading} className="bg-blue-500 text-white px-4 py-2 rounded">
          {uploading ? "Uploading..." : "Upload Image"}
        </button>

        {form.imageUrl && <img src={form.imageUrl} alt="preview" className="w-32 h-32 object-cover rounded" />}

        <button disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded w-full">
          {loading ? "Saving..." : "Save Product"}
        </button>

        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </main>
  );
}
