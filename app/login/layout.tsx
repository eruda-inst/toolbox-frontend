import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toolbox · Login",
};

function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="min-h-svh bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(29,78,216,.07)_0%,transparent_65%),radial-gradient(ellipse_90%_80%_at_50%_80%,rgba(29,79,216,0.04)_0%,transparent_60%)]">
        {children}
      </main>
    </>
  );
}

export default MainLayout;
