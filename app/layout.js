import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: {
    default: "StudyNook",
    template: "%s | StudyNook",
  },
  description: "Smart Study Room Booking Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900 dark:bg-[#0b1220] dark:text-white transition-colors duration-300">

        <AuthProvider>
          <Navbar />

          <main className="min-h-screen">
            {children}
          </main>

          <Footer />

          <Toaster position="top-right" />
        </AuthProvider>

      </body>
    </html>
  );
}