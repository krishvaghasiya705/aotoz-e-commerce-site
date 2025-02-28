export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        laptop: { max: "1500px" },
        xl: { max: "1440px" },
        tab: { max: "1180px" },
        ipad: { max: "900px" },
        minitab: { max: "768px" },
        mobile: { max: "576px" },
      },
      fontFamily: {
        jaro: ['Jaro', 'serif'],
        roboto: ['Roboto', 'serif'],
        playfair: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
