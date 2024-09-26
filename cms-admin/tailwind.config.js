/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        manropes: ['Manrope', 'sans-serif']
      },
      colors: {
        custom: {
          'purple-blue': '#8951FF',
          'blue-green': '#21C3FC',
          blue: '#0E43FB'
        },
        neutral: {
          100: '#FFFFFF',
          200: '#D9E1FA',
          300: '#D1DBF9',
          400: '#AEB9E1',
          500: '#7E89AC',
          600: '#0B1739',
          700: '#0A1330',
          800: '#081028'
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          purple: '#CB3CFF'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          dark: '#0B1739',
          violet: '#9A91FB',
          green: '#00C2FF',
          gray: '#343B4F',
          orange: '#FDB52A'
        },
        system: {
          'blue-400': '#086CD9',
          'blue-300': '#1D88FE',
          'blue-200': '#8FC3FF',
          'blue-100': '#EAF4FF',
          'green-400': '#11845B',
          'green-300': '#05C168',
          'green-200': '#7FDCA4',
          'green-100': '#DEF2E6',
          'red-400': '#DC2B2B',
          'red-300': '#FF5A65',
          'red-200': '#FFBEC2',
          'red-100': '#FFEFF0',
          'orange-400': '#D5691B',
          'orange-300': '#FF9E2C',
          'orange-200': '#FFD19B',
          'orange-100': '#FFF3E4'
        },
        other: {
          'purple-100': '#575DFF',
          'purple-50': '#575DFF',
          'blue-50': '#1D88FE',
          'sky-blue-50': '#57C3FF',
          'red-50': '#FF5A65',
          'gray-50': '#AEB9E1',
          'green-50': '#05C168',
          'yellow-50': '#FFB016',
          'overlay-60': 'rgba(13, 20, 57, 0.6)',
          'overlay-40': 'rgba(13, 20, 57, 0.4)',
          'overlay-gadient':
            'linear-gradient(180deg, rgba(0, 0, 0, 0.19) 0% rgba(0, 0 , 0, 0.64) 56%, rgba(0, 0, 0, 0) 100%)'
        },
        Illustrations: {
          'orange-100': '#FFE3D3',
          'orange-200': '#E8AD8C',
          'blue-dark-100': '#27266A',
          'purple-light': '#DBD8FF'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))'
        }
      },
      boxShadow: {
        'shadow-01': '1px 1px 1px 0px rgba(16, 25, 52, 0.4)',
        'shadow-02': '0px 2px 12px 0px rgba(1, 5, 17, 0.12)',
        'shadow-03': '0px 8px 28px 0px rgba(1, 5, 17, 0.3)',
        'shadow-04': '0px 14px 42px 0px rgba(20, 20, 43, 0.14)',
        'shadow-05': '0px 24px 65px 0px rgba(20, 20, 43, 0.16)',
        'shadow-06': '0px 32px 72px 0px rgba(20, 20, 43, 0.24)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
