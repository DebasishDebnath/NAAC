// theme.js

const colors = {
  primary: {
    DEFAULT: "#2563eb", // blue-600
    foreground: "#ffffff",
  },
  secondary: {
    DEFAULT: "#64748b", // slate-500
    foreground: "#ffffff",
  },
  destructive: {
    DEFAULT: "#dc2626", // red-600
    foreground: "#ffffff",
  },
  muted: {
    DEFAULT: "#f3f4f6", // gray-100
    foreground: "#374151", // gray-700
  },
  accent: {
    DEFAULT: "#dbeafe", // blue-100
    foreground: "#1e3a8a", // blue-900
  },
  background: "#ffffff",
  foreground: "#111827",
  border: "#e5e7eb", // gray-200
  input: "#f9fafb",
  ring: "#2563eb",
};

const borderRadius = {
  lg: "0.5rem",
  md: "0.375rem",
  sm: "0.25rem",
};

const fontFamily = {
  sans: ["Inter", "ui-sans-serif", "system-ui"],
};

module.exports = {
  colors,
  borderRadius,
  fontFamily,
};
