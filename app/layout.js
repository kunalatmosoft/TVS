// app/layout.js or your relevant layout file

import localFont from "next/font/local";
import Head from "next/head"; // Import Head from next/head
import "./globals.css";
import { AuthProvider } from "../context/AuthContext"; // Import the AuthProvider

// Load local fonts
const geistSans = localFont({
  src: "/fonts/GeistVF.woff", // Adjust the path to use public directory
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap", // Improves performance
});

const geistMono = localFont({
  src: "/fonts/GeistMonoVF.woff", // Adjust the path to use public directory
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap", // Improves performance
});

// Metadata for the page
export const metadata = {
  title: "MAPL-TVS",
  description: "Explore the range of TVS bikes and scooters at MAPL-TVS.",
  keywords: "TVS, bikes, scooters, MAPL-TVS, motorcycle, automotive",
  author: "Your Name", // Update with your name or organization
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="icon"
          href="https://maplgroup.com/wp-content/uploads/2020/08/llkk.png"
          type="image/png"
          sizes="32x32"
        />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider> {/* Wrap children with AuthProvider */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
