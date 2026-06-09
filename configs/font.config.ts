import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";

const manrope = Manrope({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

const tostadaFf = localFont({
  src: "../public/fonts/tostadaff.ttf",
  variable: "--font-tostada-ff",
  display: "swap",
});

export { manrope, plusJakartaSans, tostadaFf };
