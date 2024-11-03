/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      screens: {
        'md2': '355px', // Breakpoint tùy chỉnh cho độ rộng nhỏ hơn `lg`
      },
    },
  },
  plugins: [],
}

