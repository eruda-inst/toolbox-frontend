import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { ToastProvider } from "@heroui/react";
import { PermInitializer } from "@/components/PermInitializer/PermInitializer";

interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <ToastProvider />
      <PermInitializer />
      {children}
    </ThemeProvider>
  );
}

export default Providers;
