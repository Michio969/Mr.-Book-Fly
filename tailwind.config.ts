import type { Config } from 'tailwindcss';

const config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Warm Vintage - Amber */
        amber: {
          50: '#faf8f3',
          100: '#f3ede0',
          200: '#ead8bf',
          300: '#e0bf99',
          400: '#d4a574',
          500: '#c9935f',
          600: '#b8804d',
          700: '#a66d3b',
          800: '#8d5a2e',
          900: '#6b4423',
        },
        /* Sea Glass - Teal */
        teal: {
          50: '#f0faf9',
          100: '#d9f0f0',
          200: '#b3dfe0',
          300: '#8ecec9',
          400: '#6ab5b5',
          500: '#5a9a99',
          600: '#4a8282',
          700: '#3a6a67',
          800: '#2d5454',
          900: '#1f3a3a',
        },
        /* Parchment - Cream */
        parchment: {
          50: '#fffbf5',
          100: '#fff8f0',
          200: '#fef3e8',
          300: '#fde9db',
          400: '#fcd8c3',
          500: '#f5c9a8',
          600: '#e8b896',
          700: '#dba678',
          800: '#c9945a',
          900: '#a67a42',
        },
        /* Glass Effect - Overlays */
        glass: {
          white: 'rgba(255, 255, 255, 0.95)',
          50: 'rgba(250, 248, 243, 0.85)',
          100: 'rgba(243, 237, 224, 0.80)',
          200: 'rgba(234, 216, 191, 0.75)',
        },
        /* Semantic Colors */
        success: '#4a8282',
        warning: '#c9935f',
        error: '#d97706',
        info: '#5a9a99',
      },
      fontFamily: {
        serif: "var(--font-serif, 'Crimson Text', 'Lora', 'Georgia', serif)",
        sans: "var(--font-sans, 'Inter', 'Segoe UI', 'Roboto', sans-serif)",
        mono: "var(--font-mono, 'JetBrains Mono', 'Fira Code', monospace)",
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      spacing: {
        0: '0',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        glass: '0 8px 32px rgba(31, 41, 55, 0.1), inset 1px 1px 0 rgba(255, 255, 255, 0.6)',
      },
      borderRadius: {
        none: '0',
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        full: '9999px',
      },
      backdropBlur: {
        sm: '4px',
        md: '12px',
        lg: '24px',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
      },
      transitionTimingFunction: {
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        hide: '-1',
        base: '0',
        dropdown: '1000',
        sticky: '1100',
        modal: '1200',
        popover: '1300',
        tooltip: '1400',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
