"use client";

import { Roboto, PT_Sans } from "next/font/google";

import { createTheme, Theme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const ptSans = PT_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme: Theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily as string,
    h3: {
      fontSize: "24px",
      fontFamily: ptSans.style.fontFamily as string,
      fontWeight: 700,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&$focused $notchedOutline": {
            borderColor: "#2081b5",
          },
        },
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#2081b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

export default theme;
