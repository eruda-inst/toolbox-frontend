import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { ToastProvider } from "@heroui/react";

interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <ToastProvider />
      {children}
    </ThemeProvider>
  );
}

export default Providers;
