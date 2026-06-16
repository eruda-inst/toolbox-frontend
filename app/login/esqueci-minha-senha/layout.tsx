import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toolbox · Esqueci minha senha",
};

function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

export default MainLayout;
