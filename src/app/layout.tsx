import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "../providers/Providers";
import Nav from "../components/Nav";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Tic-Tac-Toe Game and Product CRUD React App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${poppins.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-screen p-6 max-w-4xl mx-auto">
            <header className="mb-6">
              <Nav />
            </header>
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
