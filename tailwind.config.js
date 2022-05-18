module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
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
      '6xl': '4rem',
    },
    extend: {
      colors: {
        primary: {
          1: '#05386B',
          2: '#379683',
          3: '#5CDB95',
          4: '#8EE4AF',
          5: '#EDF5E1',
        },
        test: {
          1: '#0B0C10',
          2: '#1F2833',
          3: '#C5C6C7',
          4: '#66FCF1',
          5: '#45A29E',
          6: '#ededed'
        },
        test2: {
          1: '#051622',
          2: '#1BA098',
          3: '#DEB992'
        },
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        secondary: {
          1: '#1A1A1d',
          2: '#4E4E50',
          3: '#6F2232',
          4: '#cc1919',
          5: '#ffc34d',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
      },
    },
  },
  plugins: [],
};
