"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainNav() {
  const pathname = usePathname();

  const titlesMap: Record<string, string> = {
    "/tic-tac-toe": "Assignment-1: Tic-Tac-Toe Game",
    "/products": "Assignment-2: CRUD Product App",
  };

  const currentTitle = titlesMap[pathname] ?? "";

  return (
    <nav className="flex justify-between items-center px-4 py-2 bg-white shadow">
      <div className="flex gap-4">
        <Link href="/tic-tac-toe">
          <button
            className={`px-4 py-2 rounded ${
              pathname === "/tic-tac-toe"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            aria-current={pathname === "/tic-tac-toe" ? "page" : undefined}
          >
            Assignment-1
          </button>
        </Link>

        <Link href="/products">
          <button
            className={`px-4 py-2 rounded ${
              pathname === "/products"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            aria-current={pathname === "/products" ? "page" : undefined}
          >
            Assignment-2
          </button>
        </Link>
      </div>

      <h4 className="text-gray-700 font-semibold">{currentTitle}</h4>
    </nav>
  );
}
