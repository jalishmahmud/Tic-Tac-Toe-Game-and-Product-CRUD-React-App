import Nav from "@/components/tic-tac-toe/Nav";
export default function TicTacToeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <Nav />
      </header>
      <main>{children}</main>
    </div>
  );
}
