import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', ...fontFamily.sans],
        body: ['var(--font-body)', ...fontFamily.sans]
      },
      transitionProperty: {
        'max-height' : 'max-height',
      },
      colors: {
        border: '#2a2a2a',
        input: '#2a2a2a',
        ring: '#ffd1dc',
        background: '#000000',
        foreground: '#ffffff',
        primary: {
          DEFAULT: '#ffd1dc',
          foreground: '#ffd1dc'
        },
        secondary: {
          DEFAULT: '#1a1a1a',
          foreground: '#ffffff'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: '#2a2a2a',
          foreground: '#b3b3b3'
        },
        accent: {
          DEFAULT: '#1a1a1a',
          foreground: '#ffffff'
        },
        popover: {
          DEFAULT: '#1a1a1a',
          foreground: '#ffffff'
        },
        card: {
          DEFAULT: '#1a1a1a',
          foreground: '#ffffff'
        },
      },
      borderRadius: {
        xl: `calc(var(--radius) + 4px)`,
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: `calc(var(--radius) - 4px)`
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
