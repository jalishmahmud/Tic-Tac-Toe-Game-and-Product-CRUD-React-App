"use client";
import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: Props) {
  return (
    <input
      type="search"
      placeholder="Search products..."
      className="border rounded p-2 w-full max-w-xs"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
