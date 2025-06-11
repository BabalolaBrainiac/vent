import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VentIT - Express Yourself Freely",
  description: "A safe, anonymous space to share your thoughts and feelings. No sign-up required. Express yourself freely with temporary posts that automatically expire.",
  keywords: "mental health, anonymous venting, emotional support, safe space, temporary posts, mental wellness, express yourself, anonymous sharing",
  openGraph: {
    title: "VentIT - Express Yourself Freely",
    description: "A safe, anonymous space to share your thoughts and feelings. No sign-up required.",
    type: "website",
    locale: "en_US",
    siteName: "VentIT",
  },
  twitter: {
    card: "summary_large_image",
    title: "VentIT - Express Yourself Freely",
    description: "A safe, anonymous space to share your thoughts and feelings. No sign-up required.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F0F23] min-h-screen text-[#F8FAFC]`}>
        <nav className="glass-strong sticky top-0 z-50 border-b border-[#8B5CF6]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link href="/" className="text-2xl font-bold gradient-text-animated hover:scale-105 transition-transform duration-300">
                VentIT
              </Link>
              <div className="flex space-x-4">
                <Link href="/vent" className="nav-link">
                  ✍️ Vent
                </Link>
                <Link href="/vents" className="nav-link">
                  👀 View Vents
                </Link>
                <Link href="/resources" className="nav-link">
                  💚 Resources
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
        <footer className="glass border-t border-[#8B5CF6]/20 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-[#94A3B8] text-sm">
              <p>© {new Date().getFullYear()} VentIT - Made with 💜 for mental wellness</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
