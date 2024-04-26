"use client";

import { Provider } from "react-redux";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Providers from "@/components/Providers/Providers";
import CustomSnackbar from "@/components/SnackBar";
import store from "@/store";
import theme from "../theme";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

document.title = "Content Guru";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Provider store={store}>
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>
                <Header />
                {children}
                <CustomSnackbar />
              </ThemeProvider>
            </AppRouterCacheProvider>
          </Provider>
        </Providers>
      </body>
    </html>
  );
}
