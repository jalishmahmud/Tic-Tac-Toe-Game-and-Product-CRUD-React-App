"use client";
import React from "react";
import { createProduct, fetchProducts } from "../../../store/productsSlice";
import ProductForm from "../../../components/products/ProductForm";
import { useRouter } from "next/navigation";
import { RootState, useAppDispatch, useAppSelector } from "../../../store";
import { Product } from "../../../types/product";

export default function CreateProductPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error } = useAppSelector(
    (state: RootState) => state.products
  );

  const onSubmit = async (data: Omit<Product, "id" | "rating">) => {
    await dispatch(createProduct(data));
    await dispatch(fetchProducts());
    router.push("/products");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Product</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <ProductForm onSubmit={onSubmit} loading={loading} />
    </div>
  );
}
