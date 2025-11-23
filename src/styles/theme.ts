export const theme = {
  colors: {
    primary: "#your-primary-color",
    red: {
      500: "#ef4444",
      700: "#b91c1c",
    },
    blue: {
      500: "#3b82f6",
      700: "#1d4ed8",
    },
    gray: {
      300: "#d1d5db",
      600: "#4b5563",
      800: "#1f2937",
      900: "#111827",
    },
  },
  spacing: {
    2: "0.5rem",
    4: "1rem",
    6: "1.5rem",
    8: "2rem",
  },
  fontSize: {
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "4xl": "2.25rem",
    "6xl": "3.75rem",
  },
  breakpoints: {
    md: "768px",
  },
};

export type Theme = typeof theme;
