/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 🔥 Certifica que todos os arquivos do React são escaneados
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
