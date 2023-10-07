import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#00f7f7",
          100: "#9BFBFB"
        },
        primary: {
          100: "",
          200: "",
          300: "",
          400: "",
          500: "#D68D00",
          600: "#FF0000",
          700: "#2D2D2D",
          800: "#1E1E1E",
          900: "#1B1818",
        },
      },
    },
  },
  plugins: [],
};
export default config;
