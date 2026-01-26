export const Colors = {
	globalBackground: "#FFFAF5",
	black: "#000",
	white: "#fff",
	orange: {
		500: "#F58700",
		600: "#C26B00",
	},
	gray: {
		200: "#e5e7eb",
		300: "#d1d5dc",
		400: "#99a1af",
		500: "#6a7282",
		600: "#4a5565",
	},
	red: {
		50: "#FCF3F2",
		100: "#FAE3E2",
		200: "#F7CCCB",
		300: "#F4A6A5",
		400: "#EE6E6C",
		500: "#E64341",
	},
	green: {
		500: "#00c951",
	},
} as const;

export const Layout = {
	padding: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32,
	},
	margin: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32,
	},
	radius: {
		sm: 8,
		md: 16,
		lg: 24,
	},
	gap: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32,
	},
} as const;

export const Typography = {
  fontFamily: {
    light: 'DMSans_300Light',
    regular: 'DMSans_400Regular',
    medium: 'DMSans_500Medium',
    semibold: 'DMSans_600SemiBold',
    bold: 'DMSans_700Bold',
  },

  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 46,
  },

  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    '2xl': 36,
    '3xl': 42,
    '4xl': 48,
    '5xl': 56,
  },

  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
} as const;
