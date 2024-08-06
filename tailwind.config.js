module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        distancia: ['Distancia-800-ExtraBold'],
      },
    },
    keyframes: {
      easeInNav: {
        "0%":   { transform: "translateX(-100%)" },
        "100%": { transform: "translateX(0%)" }
      },
      easeOutNav: {
        "0%":   { transform: "translateX(0%)" },
        "100%": { transform: "translateX(-100%)" },
      }
    },
    animation: {
      easeInNav:    'easeInNav  300ms  ease-in-out',
      easeInNav_2:  'easeInNav  450ms  ease-in-out',
      easeInNav_3:  'easeInNav  600ms  ease-in-out',
      easeOutNav:   'easeOutNav 300ms  ease-in-out',
      easeOutNav_2: 'easeOutNav 450ms  ease-in-out',
      easeOutNav_3: 'easeOutNav 600ms  ease-in-out',
    }
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}
