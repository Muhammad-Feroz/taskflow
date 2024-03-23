/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    ...Array.from({length: 12}, (_, i) => `grid-cols-${i + 1}`),
    ...Array.from({length: 10}, (_, i) => `gap-${i + 1}`),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

