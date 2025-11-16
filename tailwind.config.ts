import type { Config } from "tailwindcss";
import containerQueries from "@tailwindcss/container-queries";


const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "425px",
      },
      // Chuyển dùng @utility
      // fontFamily: {
      //   sentient: ["var(--font-sentient)"],
      //   figtree: ["var(--font-figtree)"],
      // },
      fontSize: {
        'fluid2lg': [
          'clamp(0.8rem, 0.8vw, 1rem)',
          { lineHeight: '1' }
        ],
        'fluid3lg': [
          'clamp(1rem, 1vw, 1.28rem)',
          { lineHeight: '1.2' }
        ],
        'fluid4lg': [
          'clamp(1.2rem, 1.2vw, 1.53rem)',
          { lineHeight: '1' }
        ],
        'fluid2xl': [
          'clamp(1.6rem, 1.6vw, 2.2rem)',
          { lineHeight: '1.5' }
        ],
        'fluid3xl': [
          'clamp(2.8rem, 2.5vw, 3.5rem)',
          { lineHeight: '1.1' }
        ],
        'fluid5xl': [
          'clamp(3rem, 3.5vw, 5rem)',
          { lineHeight: '1.2' }
        ],
        'fluid6xl': [
          'calc(3rem + 2vw)',
          { lineHeight: '1.1' }
        ],
        'fluid7xl': [
          'calc(5rem + 2vw)',
          { lineHeight: '1.1' }
        ],
        'fluid8xl': [
          'clamp(3rem, 4.5vw, 5.6rem)',
          { lineHeight: '1' }
        ],
        'fluid9xl': [
          'clamp(4rem, 8.5vw, 12.8rem)',
          { lineHeight: '1' }
        ],
      },
      padding: {
        'fluid': 'calc(18px * 0.5)'
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [containerQueries],
};

export default config;
