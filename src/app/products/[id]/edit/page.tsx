"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  fetchProductById,
  updateProduct,
  fetchProducts,
  clearSelectedProduct,
} from "../../../../store/productsSlice";
import ProductForm from "../../../../components/products/ProductForm";
import { RootState, useAppDispatch, useAppSelector } from "../../../../store";
import { Product } from "@/types/product";

export default function EditProductPage() {
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

  const onSubmit = async (data: Omit<Product, "id" | "rating">) => {
    if (!id) return;
    await dispatch(updateProduct({ id: Number(id), data }));
    await dispatch(fetchProducts());
    router.push("/products");
  };

  if (loading || !product) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <button
        onClick={() => router.push("/products")}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <ProductForm
        initialData={product}
        onSubmit={onSubmit}
        loading={loading}
      />
    </div>
  );
}
