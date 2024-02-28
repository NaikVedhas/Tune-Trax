/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}' , 'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    extend: {
      screens: {
        'dark': { raw: '(prefers-color-scheme: dark)' }
    }
    },
  },
  plugins: [  require('flowbite/plugin'),],
  
}


