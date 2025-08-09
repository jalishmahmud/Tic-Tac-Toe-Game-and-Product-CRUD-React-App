import { Product } from "@/types/product";

const API_BASE = "https://fakestoreapi.com/products";

export async function fetchProducts(
  page: number,
  limit: number,
  searchTerm: string,
  categoryFilter: string
): Promise<{ products: Product[]; total: number }> {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch products");

  let products: Product[] = await res.json();

  if (searchTerm) {
    products = products.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (categoryFilter) {
    products = products.filter((p) => p.category === categoryFilter);
  }

  const total = products.length;
  products = products.slice((page - 1) * limit, page * limit);

  return { products, total };
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function createProduct(
  data: Omit<Product, "id" | "rating">
): Promise<Product> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
}

export async function updateProduct(
  id: number,
  data: Partial<Omit<Product, "id" | "rating">>
): Promise<Product> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete product");
}
