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
        clinic: {
          sage: "#3d5a45",
          moss: "#5c7a63",
          cream: "#f7f4ef",
          paper: "#fdfcfa",
          ink: "#1c1917",
          muted: "#57534e",
          accent: "#c4a574",
        },
      },
      fontFamily: {
        serif: [
          "Georgia",
          "Cambria",
          "Palatino Linotype",
          "Book Antiqua",
          "Times New Roman",
          "serif",
        ],
        sans: [
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
