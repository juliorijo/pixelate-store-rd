module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',           // Blanco principal
        secondary: '#f5f5f5',         // Blanco grisáceo
        accent: '#c41e3a',            // Rojo oscuro/opaco
        'accent-dark': '#8b1428',     // Rojo más oscuro
        'accent-light': '#e63946',    // Rojo más claro
        dark: '#1f2937',              // Gris oscuro para fondos
        'dark-secondary': '#111827',  // Gris muy oscuro
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideInDown: 'slideInDown 0.5s ease-out',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.glass-card': {
          '@apply relative overflow-hidden rounded-3xl backdrop-blur-3xl bg-white/15 border border-white/30': {},
          'box-shadow': `
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.5),
            inset 0 -1px 0 rgba(255, 255, 255, 0.1),
            inset 0 0 20px 10px rgba(255, 255, 255, 0.15)
          `,
          '&::before': {
            content: '""',
            '@apply absolute top-0 left-0 right-0 h-px': {},
            'background': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
          },
          '&::after': {
            content: '""',
            '@apply absolute top-0 left-0 w-px h-full': {},
            'background': 'linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent, rgba(255, 255, 255, 0.3))',
          },
        },
        '.glass-card-hover': {
          '@apply glass-card transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:shadow-2xl': {},
        },
      });
    },
  ],
}
