import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vent.Help - A Safe Space to Vent",
  description: "A safe, anonymous space to share your thoughts and feelings. No login required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <nav className="glass-strong sticky top-0 z-50 border-b border-accent-purple/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <div className="flex-shrink-0">
                <h1 className="text-3xl font-bold gradient-text-animated hover:scale-105 transition-transform duration-300">
                  Vent.Help
                </h1>
              </div>
              <div className="flex space-x-6">
                <a href="/" className="nav-link">
                  🏠 Home
                </a>
                <a href="/self-care" className="nav-link">
                  💚 Self Care
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-[calc(100vh-5rem)] py-12">
          {children}
        </main>
        <footer className="glass border-t border-accent-purple/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col items-center space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold gradient-text mb-2">
                  Vent.Help
                </h3>
                <p className="text-text-secondary text-sm max-w-md">
                  A safe, anonymous space to express yourself. All posts expire after 24 hours.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                <a href="#" className="text-text-secondary hover:text-accent-purple transition-all duration-300 hover:scale-105">
                  Privacy Policy
                </a>
                <a href="#" className="text-text-secondary hover:text-accent-blue transition-all duration-300 hover:scale-105">
                  Terms of Service
                </a>
                <a href="#" className="text-text-secondary hover:text-accent-pink transition-all duration-300 hover:scale-105">
                  Contact
                </a>
                <a href="#" className="text-text-secondary hover:text-accent-purple transition-all duration-300 hover:scale-105">
                  About
                </a>
              </div>
              <div className="text-center text-text-secondary text-sm">
                <p>© {new Date().getFullYear()} Vent.Help - Made with 💜 for mental wellness</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
