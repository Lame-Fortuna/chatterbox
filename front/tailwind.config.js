import daisyui from 'daisyui'
import themes from 'daisyui/theme/object'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",  // <-- if your pages are not inside /src
    "./components/**/*.{js,ts,jsx,tsx}", // <- double check this too
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["black", "lemonade", "pastel", "retro", "cyberpunk"],
  },
}