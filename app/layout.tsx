import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import "modern-normalize";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"], // какие веса нужны
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: {
    default: "Car Rental Service",
    template: "%s | Car Rental",
  },
  description: "Find and rent the perfect car for your needs",
  keywords: ["car rental", "rent a car", "vehicle rental"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Car Rental Service",
    description: "Find and rent the perfect car",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <Toaster />
        <Header />
        <main> {children}</main>

        {/* {modal} */}
      </body>
    </html>
  );
}
