"use client";
import React, { useState } from "react";
import { Product } from "../../types/product";

interface Props {
  initialData?: Partial<Product>;
  onSubmit: (data: Omit<Product, "id" | "rating">) => void;
  loading?: boolean;
}

interface FormData {
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
}

const categories = [
  "",
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

export default function ProductForm({ initialData, onSubmit, loading }: Props) {
  const [form, setForm] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    image: "",
    ...initialData,
    price: initialData?.price?.toString() || "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    else if (form.title.length > 100) newErrors.title = "Title max 100 chars";

    if (!form.price.trim()) newErrors.price = "Price is required";
    else if (isNaN(Number(form.price)) || Number(form.price) <= 0)
      newErrors.price = "Price must be a positive number";

    if (!form.description.trim())
      newErrors.description = "Description is required";
    else if (form.description.length > 500)
      newErrors.description = "Description max 500 chars";

    if (!form.category) newErrors.category = "Category is required";

    if (!form.image.trim()) newErrors.image = "Image URL is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      title: form.title.trim(),
      price: Number(form.price),
      description: form.description.trim(),
      category: form.category,
      image: form.image.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className={`w-full border p-2 rounded ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          maxLength={100}
          required
        />
        {errors.title && (
          <p className="text-red-600 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold mb-1">Price</label>
        <input
          type="number"
          step="0.01"
          value={form.price}
          onChange={(e) => handleChange("price", e.target.value)}
          className={`w-full border p-2 rounded ${
            errors.price ? "border-red-500" : "border-gray-300"
          }`}
          min="0"
          required
        />
        {errors.price && (
          <p className="text-red-600 text-sm mt-1">{errors.price}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className={`w-full border p-2 rounded ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          maxLength={500}
          rows={4}
          required
        />
        {errors.description && (
          <p className="text-red-600 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold mb-1">Category</label>
        <select
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className={`w-full border p-2 rounded ${
            errors.category ? "border-red-500" : "border-gray-300"
          }`}
          required
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat || "Select category"}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-600 text-sm mt-1">{errors.category}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold mb-1">Image URL</label>
        <input
          type="url"
          value={form.image}
          onChange={(e) => handleChange("image", e.target.value)}
          className={`w-full border p-2 rounded ${
            errors.image ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.image && (
          <p className="text-red-600 text-sm mt-1">{errors.image}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {loading ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
}
