import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Providers from "@/components/Providers/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Content Guru",
  description: "A CMS application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <Header />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </Providers>
      </body>
    </html>
  );
}
