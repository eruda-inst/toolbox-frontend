import type { Metadata } from "next";
import { plusJakartaSans } from "@/configs/font.config";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Toolbox",
  description:
    "Plataforma de centralização de ferramentas utilizadas na Newnet",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${plusJakartaSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

export default RootLayout;
