"use client";
import React from "react";

interface Props {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
}

const CATEGORIES = [
  "",
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

export default function SidebarFilter({
  selectedCategory,
  onCategoryChange,
}: Props) {
  return (
    <aside className="w-56 sticky top-6 self-start bg-gray-50 border border-gray-300 rounded-md p-4">
      <h4 className="text-md font-medium mb-2 text-gray-800">
        Filter by Category
      </h4>
      <ul className="flex flex-col gap-2">
        {CATEGORIES.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => onCategoryChange(cat)}
              className={`w-full text-left px-2 py-2 rounded-md text-sm font-normal transition-colors duration-150 focus:outline-none ${
                selectedCategory === cat
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              aria-pressed={selectedCategory === cat}
            >
              {cat || "All"}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
