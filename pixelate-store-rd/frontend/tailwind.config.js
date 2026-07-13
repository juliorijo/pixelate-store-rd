module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark professional palette for e-commerce
        primary: '#0f1117',           // Almost black - main background
        secondary: '#1a1f3a',         // Dark navy - secondary background
        tertiary: '#2d3748',          // Dark gray - cards, borders
        'tertiary-light': '#3d4657',  // Lighter dark gray

        // Red accent (brand color - kept from original)
        accent: '#c41e3a',            // Red - CTAs
        'accent-bright': '#e63946',   // Bright red - hover, emphasis
        'accent-dark': '#8b1428',     // Dark red - secondary actions

        // Text colors
        'text-primary': '#ffffff',    // White - main text
        'text-secondary': '#b3bac8',  // Light gray - secondary text
        'text-muted': '#8b92a0',      // Muted text

        // Status colors
        'success': '#22c55e',         // Green - validation, positive
        'warning': '#f59e0b',         // Orange - warnings, limited stock
        'error': '#ef4444',           // Red - errors
        'info': '#3b82f6',            // Blue - informational

        // Utility
        'border': '#2d3748',          // Border color
        'bg-hover': '#252d42',        // Hover background
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
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.glass-card': {
          '@apply relative overflow-hidden rounded-2xl backdrop-blur-xl bg-tertiary/50 border border-tertiary-light/30 transition-all duration-300': {},
          'box-shadow': `
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(255, 255, 255, 0.05)
          `,
        },
        '.glass-card-hover': {
          '@apply glass-card hover:bg-tertiary-light/60 hover:border-tertiary-light/50 hover:shadow-lg hover:shadow-black/20': {},
        },
        '.btn-primary': {
          '@apply px-6 py-3 bg-accent hover:bg-accent-bright text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95': {},
        },
        '.btn-secondary': {
          '@apply px-6 py-3 bg-tertiary hover:bg-tertiary-light text-text-primary font-bold rounded-lg transition-all duration-200': {},
        },
        '.badge': {
          '@apply inline-block px-3 py-1 rounded-full text-xs font-bold': {},
        },
        '.badge-accent': {
          '@apply badge bg-accent/20 text-accent': {},
        },
        '.badge-success': {
          '@apply badge bg-success/20 text-success': {},
        },
        '.badge-warning': {
          '@apply badge bg-warning/20 text-warning': {},
        },
      });
    },
  ],
}
