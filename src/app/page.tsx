"use client";

export default function Home() {
  return (
    <div className="bg-white rounded-lg shadow p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to the Web Application
      </h1>

      <p className="text-gray-700 mb-6">
        This application offers two main features, accessible via the navigation
        bar:
      </p>

      <ul className="list-disc list-inside space-y-2 mb-6 text-gray-800">
        <li>
          <strong>Tic-Tac-Toe Game:</strong> A classic two-player game with a
          clean, interactive design.
        </li>
        <li>
          <strong>Product CRUD App:</strong> A tool to create, view, update, and
          delete products, complete with category filters and search
          functionality.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Tech Stack</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-gray-700">
        <li className="bg-gray-100 px-3 py-2 rounded">
          Next.js 13+ (App Router)
        </li>
        <li className="bg-gray-100 px-3 py-2 rounded">React</li>
        <li className="bg-gray-100 px-3 py-2 rounded">TypeScript</li>
        <li className="bg-gray-100 px-3 py-2 rounded">Tailwind CSS</li>
        <li className="bg-gray-100 px-3 py-2 rounded">Redux Toolkit</li>
        <li className="bg-gray-100 px-3 py-2 rounded">Fake Store API</li>
      </ul>
    </div>
  );
}
