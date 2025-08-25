import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Simple expense tracker app with Next.js 14 and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen flex justify-center items-start p-4">
        {children}
      </body>
    </html>
  );
}
