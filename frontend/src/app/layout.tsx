import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Advocacia Gestão - Sistema de Gestão Jurídica",
  description: "Fingindo que trabalha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={` h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
