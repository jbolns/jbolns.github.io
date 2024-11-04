/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	safelist: ['footnotes'],
	darkMode: 'selector',
	theme: {
		fontSize: {
			'2sm': ['0.7rem', { letterSpacing: '-0.05em' }],
			'sm': '0.8rem',
			'medium': '0.95rem',
			'base': '1.15rem',
			'lg': '1.25rem',
			'xl': '1.5rem',
			'2xl': '1.7rem',
			'3xl': '1.9rem',
			'4xl': '2.4rem',
			'5xl': '3.05rem',
		},
		extend: {
			screens: {
				'tiny': '404px',
			},
			animation: {
				wiggle: 'wiggle 0.1s linear infinite',
				roll: 'roll 1s ease-in-out',
				borderise: 'borderise 7s ease-in-out infinite',
				rotate: "rotate 10s ease-in-out infinite",
				appear: "appear 15s ease-in-out",
			},
			keyframes: {
				wiggle: {
          '0%, 100%': { transform: 'translat3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, 1px, 0)' },
					'75%': { transform: 'translate3d(1px, 0, 0)' },
        },
				roll: {
					'100%': { transform: 'rotate(360deg) scale3d(0.9, 0.9, 0.9)' }
				},
				borderise: {
					'0, 50%, 100%': { transform: 'translatex(0) scalex(1)' },
					'25%': { transform: 'translatex(100%) scalex(3)' },
					'75%': { transform: 'translatex(-100%) scalex(3)' }
				},
				rotate: {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
				appear: {
					'0%': { transform: 'perspective(2em) rotateX(90deg)', height: '0', width: '0', opacity: '0.2' },
					'20%': { transform: 'perspective(2em) rotateX(30deg)', height: '50vh', },
					'60%': { transform: 'perspective(5em) rotateX(30deg)', height: '30vh', },
				}
			}
		},
	},
	plugins: [],
}





