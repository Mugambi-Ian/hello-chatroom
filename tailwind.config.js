/* eslint-disable global-require */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontSize: {
      xxxs: '0.5rem', // 8px
      xxs: '0.625rem', // 10px
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14 px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', //  24px
      '2.5xl': '1.75rem', // 28px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
      '6xl': '4rem', // 64px
    },
    extend: {
      colors: {
        success: 'var(--success)',
        primary: 'var(--primary)',
        error: 'var(--error)',
        red: {
          DEFAULT: '#E51739',
          100: '#FF6B00',
          200: '#E61739',
        },
        'light-gray': {
          DEFAULT: '#808080',
          100: '#D9D9D9',
          200: '#E9E9E9',
          300: '#edf3f7',
          400: '#A8A8A8',
          500: '#CCCCCC',
        },
        'dark-gray': {
          100: '#fafafa',
          200: '#e8eff5',
          300: '#dfdfdf',
          400: '#cccccc',
          500: '#f0f0f0',
          600: '#808080',
          700: '#5e5e5e',
          800: '#4b4b4b', // text hover
          900: '#2e2e2e',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          100: '#ff6b00',
          200: '#f26100',
          300: '#fb9792',
          400: '#f46c67',
          500: '#fe473e',
          600: '#ff321a',
          700: '#f5241d',
          800: '#e31318',
          900: '#d6000e',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          40: '#B13744',
          100: '#f4e6e9',
          200: '#ffcbce',
          300: '#c6868c',
          400: '#ae5a63',
          500: '#b13644',
          600: '#af1c2e',
          700: '#a1152c',
          800: '#910c26',
          900: '#840620',
        },
      },
    },
  },
};
