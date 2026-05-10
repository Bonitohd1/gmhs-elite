import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#0F766E", 50: "#F0FDFA", 100: "#CCFBF1", 600: "#0D9488" },
        accent: "#F59E0B",
        success: "#10B981",
        danger: "#DC2626",
      },
    },
  },
  plugins: [],
};
export default config;
