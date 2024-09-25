/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/common/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'ant-input-border': '#d9d9d9', // Add custom color
        'gray-20': '#333333',
        'grayCustom': '#828282',
      },
      opacity: {
        '50': '.50',
      },
      fontSize: {
        'custom-16': '16px',
      },
    },
  },
  plugins: [],
}

