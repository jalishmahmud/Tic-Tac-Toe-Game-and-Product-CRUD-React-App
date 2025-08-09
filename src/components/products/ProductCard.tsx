"use client";
import React from "react";
import { Product } from "../../types/product";
import Link from "next/link";

interface Props {
  product: Product;
  onDelete: () => void;
}

export default function ProductCard({ product, onDelete }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col flex-grow p-5">
        <h3
          className="text-lg font-semibold text-gray-900 mb-1 truncate"
          title={product.title}
        >
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 mb-2 capitalize">
          {product.category}
        </p>
        <p className="text-xl font-bold text-gray-900 mb-4">
          ${product.price.toFixed(2)}
        </p>

        <div className="mt-auto flex gap-3">
          <Link
            href={`/products/${product.id}`}
            className="flex-grow rounded-md bg-slate-200 px-4 py-2 text-center text-slate-800 shadow-sm hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1 transition"
          >
            Details
          </Link>
          <Link
            href={`/products/${product.id}/edit`}
            className="flex-grow rounded-md bg-amber-200 px-4 py-2 text-center text-amber-900 shadow-sm hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-1 transition"
          >
            Edit
          </Link>
          <button
            onClick={onDelete}
            className="flex-grow rounded-md bg-rose-300 px-4 py-2 text-center text-rose-900 shadow-sm hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-1 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
