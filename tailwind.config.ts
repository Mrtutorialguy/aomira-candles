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
        parchment: "#F9F6F0",
        linen: "#F3EDE2",
        amberwarm: "#D97736",
        terracotta: "#B85D36",
        cedar: "#2A2421",
        charcoal: "#1F1B18",
        sage: "#7D8C75",
        moss: "#485343",
        brass: "#C29B38",
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
