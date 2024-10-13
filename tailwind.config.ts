import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	'./styles/**/*.css',
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			 'mayacard': `linear-gradient(
				120deg,
				hsl(330deg 100% 20%) 0%,
				hsl(335deg 90% 24%) 6%,
				hsl(341deg 78% 28%) 12%,
				hsl(347deg 69% 32%) 18%,
				hsl(354deg 61% 36%) 24%,
				hsl(0deg 56% 40%) 30%,
				hsl(7deg 60% 41%) 37%,
				hsl(13deg 64% 42%) 44%,
				hsl(19deg 69% 42%) 52%,
				hsl(24deg 74% 42%) 60%,
				hsl(29deg 80% 42%) 70%,
				hsl(34deg 87% 41%) 82%,
				hsl(39deg 97% 39%) 100%
			  )`,
			  'cardhover': `linear-gradient(
				120deg,
				hsl(330deg 100% 20%) 0%,
				hsl(335deg 90% 24%) 6%,
				hsl(341deg 78% 28%) 12%,
				hsl(347deg 69% 32%) 18%,
				hsl(354deg 61% 36%) 24%,
				hsl(0deg 56% 40%) 30%,
				hsl(7deg 60% 41%) 37%,
				hsl(13deg 64% 42%) 44%,
				hsl(19deg 69% 42%) 52%,
				hsl(24deg 74% 42%) 60%,
				hsl(29deg 80% 42%) 70%,
				hsl(34deg 87% 41%) 82%,
				hsl(39deg 97% 39%) 100%
			  )`,
			  

  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
			  brand: '#d56f23',
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
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
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			'caret-blink': {
  				'0%,70%,100%': {
  					opacity: '1'
  				},
  				'20%,50%': {
  					opacity: '0'
  				}
  			}
  		},
  		animation: {
  			'caret-blink': 'caret-blink 1.25s ease-out infinite'
  		}
  	}
  },
plugins: [
    require("tailwindcss-animate"),
    // Add a plugin to create custom utility classes
	//@ts-ignore
    function({ addUtilities }) {
      addUtilities({
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(4px)',
          borderRadius: '10px',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        },
      });
    },
  ],
};

export default config;
