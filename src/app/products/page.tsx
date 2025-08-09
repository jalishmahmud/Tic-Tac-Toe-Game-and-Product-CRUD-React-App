"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { RootState } from "./../../store";
import {
  fetchProducts,
  setSearchTerm,
  setCategoryFilter,
  setPage,
  setDeletingProductId,
  deleteProduct,
} from "./../../store/productsSlice";
import ProductCard from "../../components/products/ProductCard";
import SidebarFilter from "../../components/products/SidebarFilter";
import SearchInput from "../../components/products/SearchInput";
import Pagination from "../../components/products/Pagination";
import ConfirmationDialog from "../../components/products/ConfirmationDialog";
import Link from "next/link";

export default function ProductsListPage() {
  const dispatch = useAppDispatch();
  const {
    items,
    total,
    loading,
    error,
    searchTerm,
    categoryFilter,
    page,
    limit,
    deletingProductId,
  } = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, searchTerm, categoryFilter, page]);

  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteConfirm = () => {
    if (deletingProductId !== null) {
      dispatch(deleteProduct(deletingProductId!));
      setShowConfirm(false);
      dispatch(setDeletingProductId(null));
    }
  };

  const openDeleteConfirm = (id: number) => {
    dispatch(setDeletingProductId(id));
    setShowConfirm(true);
  };

  return (
    <div className="flex gap-6">
      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-center">
          <SearchInput
            value={searchTerm}
            onChange={(v) => dispatch(setSearchTerm(v))}
          />
          <Link
            href="/products/create"
            className="px-4 py-2 bg-indigo-600 rounded no-underline hover:no-underline hover:!text-white !text-white"
          >
            + New Product
          </Link>
        </div>
        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {!loading && items.length === 0 && <p>No products found.</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={() => openDeleteConfirm(product.id)}
            />
          ))}
        </div>
        <Pagination
          currentPage={page}
          totalItems={total}
          itemsPerPage={limit}
          onPageChange={(p) => dispatch(setPage(p))}
        />
      </div>
      <SidebarFilter
        selectedCategory={categoryFilter}
        onCategoryChange={(cat) => dispatch(setCategoryFilter(cat))}
      />
      {showConfirm && (
        <ConfirmationDialog
          message="Are you sure you want to delete this product?"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
