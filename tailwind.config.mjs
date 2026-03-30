/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        bela: '0 0 0 1px rgba(255,255,255,0.06), 0 24px 48px -12px rgba(0,0,0,0.55)',
        'bela-glow': '0 0 0 1px rgba(244,63,94,0.12), 0 20px 40px -12px rgba(225,29,72,0.18)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
