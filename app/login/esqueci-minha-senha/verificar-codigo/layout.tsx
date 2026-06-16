import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toolbox · Verificar código",
};

function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

export default MainLayout;
