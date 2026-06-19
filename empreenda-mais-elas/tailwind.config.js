/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-container-low": "#f3f4f5",
        "primary-fixed-dim": "#ffb4aa",
        "surface-variant": "#e1e3e4",
        "surface-container-lowest": "#ffffff",
        "primary": "#ab332a",
        "on-surface": "#191c1d",
        "on-surface-variant": "#58413e",
        "outline-variant": "#e0bfbb",
        // ... (copie aqui todas as outras cores que estavam no script do HTML)
      },
      fontFamily: {
        "label-sm": ["Plus Jakarta Sans", "sans-serif"],
        "headline-md": ["Playfair Display", "serif"],
        "body-md": ["Plus Jakarta Sans", "sans-serif"],
        "headline-lg": ["Playfair Display", "serif"],
      },
      spacing: {
        "container-padding-mobile": "20px",
        "stack-lg": "48px",
        "gutter": "24px",
        "container-padding-desktop": "48px",
        "base": "8px",
        "stack-md": "24px",
        "stack-sm": "12px"
      }
    }
  },
  plugins: [],
}