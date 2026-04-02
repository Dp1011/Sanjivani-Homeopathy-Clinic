import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WallpaperBackground } from "@/components/WallpaperBackground";

export const metadata: Metadata = {
  title: {
    default: "Sanjivani Homeopathic Clinic",
    template: "%s | Sanjivani Homeopathic Clinic",
  },
  description:
    "Sanjivani Homeopathic Clinic, Station Road, Nandurbar — classical homeopathy with Dr. Yogesh M Patil (MD Homeopathy).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans min-h-screen flex flex-col antialiased bg-clinic-paper text-clinic-ink relative">
        <WallpaperBackground />
        <div className="relative z-10 flex min-h-screen flex-col flex-1">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
