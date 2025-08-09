"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { RootState, useAppDispatch, useAppSelector } from "../../../store";
import {
  fetchProductById,
  clearSelectedProduct,
} from "../../../store/productsSlice";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    selectedProduct: product,
    loading,
    error,
  } = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchProductById(Number(id)));

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [id, dispatch]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => router.push("/products")}
        className="mb-4 text-indigo-600 hover:underline"
      >
        ← Back to Products
      </button>
      <div className="flex gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-64 object-contain rounded"
        />
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="mt-4 font-semibold text-lg">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-1 text-gray-600">Category: {product.category}</p>
          <p className="mt-2">
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </p>
        </div>
      </div>
    </div>
  );
}
