/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'franprix-red': {
          DEFAULT: '#E30613',
          dark: '#C00510',
          light: '#FDE8E9',
        },
        'bg': '#F5F5F5',
        'surface': '#FFFFFF',
        'text-primary': '#333333',
        'text-secondary': '#666666',
        'text-muted': '#999999',
        'border': '#E5E7EB',
        'border-light': '#F0F0F0',
        'success': {
          DEFAULT: '#2ECC71',
          light: '#EAFAF1',
        },
        'warning': {
          DEFAULT: '#F39C12',
          light: '#FEF5E7',
        },
        'critical': {
          DEFAULT: '#E74C3C',
          light: '#FDEDEC',
        },
      },
      fontFamily: {
        'heading': ['Manrope', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        'lg': '8px',
      },
    },
  },
  plugins: [],
}
