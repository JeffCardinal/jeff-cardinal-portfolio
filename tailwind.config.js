module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{html,js,tsx}",
  ],
  darkMode: 'false',
  theme: {
    extend: {
      fontFamily: {
        distancia: ['Distancia-800-ExtraBold'],
        goupe: ['Goupe'],
      },
      transitionDuration: {
        '1000': '1000ms',
        '2000': '2000ms',
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
      },
      spin: {
        "0%":   { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
      loadInFromLeft: {
        "0%":   {
          opacity: 0,
          transform: "translateX(-2%)",
         },
        "100%": {
          opacity: 1,
          transform: "translateX(0%)",
         },
      },
      loadInFromRight: {
        "0%":   {
          opacity: 0,
          transform: "translateX(2%)",
         },
        "100%": {
          opacity: 1,
          transform: "translateX(0%)",
         },
      },
      loadIn: {
        "0%":   {
          opacity: 0,
         },
        "100%": {
          opacity: 1,
         },
      },
      buttonGlyphEaseIn: {
        "0%":   {
          opacity: 0,
          transform: "translateX(20%)",
         },
        "50%": {
          opacity: 1,
          transform: "translateX(-10%)",
         },
         "100%": {
          opacity: 0,
          transform: "translateX(-40%)",
         }
      },
      radarPulse: {
        '0%': { transform: 'scale(1)', opacity: '0.75' },
        '70%': { transform: 'scale(1.5)', opacity: '0' },
        '100%': { transform: 'scale(2.5)', opacity: '0' },
      },
      radarPulse_2: {
        '0%': { transform: 'scale(1)', opacity: '0.75' },
        '70%': { transform: 'scale(1.5)', opacity: '0' },
        '100%': { transform: 'scale(2.5)', opacity: '0' },
      },
    },
    animation: {
      easeInNav:         'easeInNav  300ms  ease-in-out',
      easeInNav_2:       'easeInNav  450ms  ease-in-out',
      easeInNav_3:       'easeInNav  600ms  ease-in-out',
      easeOutNav:        'easeOutNav 300ms  ease-in-out',
      easeOutNav_2:      'easeOutNav 450ms  ease-in-out',
      easeOutNav_3:      'easeOutNav 600ms  ease-in-out',
      spin:              'spin 1s linear infinite',
      loadInFromLeft:    'loadInFromLeft 0.5s ease-in-out',
      loadInFromRight:   'loadInFromRight 0.5s ease-in-out',
      loadIn:            'loadIn 0.5s ease-in-out',
      buttonGlyphEaseIn: 'buttonGlyphEaseIn 1s linear infinite',
      radarPulse: 'radarPulse 1.5s ease-out infinite',
      radarPulse_2: 'radarPulse 1.5s ease-out infinite',
    },
    animationDelay: {
      '500': '500ms',
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    [
      function ({ addUtilities, theme }) {
        const delays = theme('animationDelay');
        const utilities = {};
        for (const key in delays) {
          utilities[`.delay-${key}`] = { animationDelay: delays[key] };
        }
        addUtilities(utilities);
      },
    ],
  ],
}
