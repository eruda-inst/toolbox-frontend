import type { Metadata } from "next";
import { plusJakartaSans } from "@/configs/font.config";
import Providers from "@/app/providers";
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
      suppressHydrationWarning
      className={`${plusJakartaSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export default RootLayout;
