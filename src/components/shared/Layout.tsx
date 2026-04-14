import Sidebar from './Sidebar';
import Navbar from './NavBar';

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex gap-8 p-14">

      {/* Sidebar — fixed left, full height */}
      <Sidebar />

      {/* Main content — fills remaining space */}
      <div className="flex-1 flex flex-col min-w-0 min-h-full">

        {/* Navbar */}
        <Navbar title={title} />

        {/* Page content — grows to fill remaining height */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>

      </div>
    </div>
  );
}