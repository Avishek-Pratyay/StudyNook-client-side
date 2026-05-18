import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "StudyNook",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <Toaster position="top-right" />
          {children}
        </AuthProvider>
        
      </body>
    </html>
  );
}