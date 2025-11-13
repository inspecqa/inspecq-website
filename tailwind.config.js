/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        onest: ["Onest", "ui-sans-serif", "system-ui"],
      },

      // Named, semantic font sizes (use like: `text-h2`, `text-body`, etc.)
      fontSize: {
        display: ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }], // 56px
        h1: ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }], // 48px
        h2: ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }], // 40px
        h3: ["2rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }], // 32px
        h4: ["1.75rem", { lineHeight: "1.3", letterSpacing: "-0.02em" }], // 28px
        h5: ["1.5rem", { lineHeight: "1.35", letterSpacing: "-0.01em" }], // 24px
        h6: ["1.25rem", { lineHeight: "1.45", letterSpacing: "-0.01em" }], // 20px

        "body-lg": ["1.125rem", { lineHeight: "1.75rem" }], // 18px
        body: ["1rem", { lineHeight: "1.625" }], // 16px
        caption: ["0.875rem", { lineHeight: "1.35" }], // 14px
        xs: ["0.75rem", { lineHeight: "1.2" }], // 12px
      },

      colors: {
        // Primary Colors
        teal: {
          50: "#e6f2f2",
          100: "#b0d8d8",
          200: "#8ac5c5",
          300: "#54aaaa",
          400: "#339999",
          500: "#008080",
          600: "#007474",
          700: "#005B5B",
          800: "#004646",
          900: "#003636",
        },

        // Secondary Colors
        black: {
          50: "#E7E8E9",
          100: "#B5B7BC",
          200: "#92959C",
          300: "#60646E",
          400: "#414652",
          500: "#111827",
          600: "#0F1623",
          700: "#0C111C",
          800: "#090D15",
          900: "#070A10",
        },

        background: {
          50: "#FFFFFF",
          100: "#DEF8EF",
          200: "#BDF1DF",
          300: "#9BE9D0",
          400: "#7AE2C0",
          500: "#59DBB0",
        },

        // Status Colors
        others: {
          white: "#FFFFFF",
          yellow: "#DBFF82",
          red: "#ED0000",
          lightWhite: "#F9FAFB",
          gray: "#E5E6E7",
          lightGray: "#848484",
          buttonBorder: "#FFF9F9",
        },
      },

      // Prose defaults aligned to the scale above
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.black.500"),
            a: {
              color: theme("colors.teal.600"),
              textDecoration: "none",
              fontWeight: "600",
              "&:hover": { color: theme("colors.teal.700") },
            },
            h1: {
              fontFamily: theme("fontFamily.onest").join(", "),
              fontWeight: "800",
              color: theme("colors.black.600"),
              fontSize: theme("fontSize.h1")[0],
              lineHeight: theme("fontSize.h1")[1].lineHeight,
              letterSpacing: theme("fontSize.h1")[1].letterSpacing,
            },
            h2: {
              fontFamily: theme("fontFamily.onest").join(", "),
              fontWeight: "700",
              color: theme("colors.black.600"),
              fontSize: theme("fontSize.h2")[0],
              lineHeight: theme("fontSize.h2")[1].lineHeight,
              letterSpacing: theme("fontSize.h2")[1].letterSpacing,
            },
            h3: {
              fontFamily: theme("fontFamily.onest").join(", "),
              fontWeight: "600",
              color: theme("colors.black.600"),
              fontSize: theme("fontSize.h3")[0],
              lineHeight: theme("fontSize.h3")[1].lineHeight,
              letterSpacing: theme("fontSize.h3")[1].letterSpacing,
            },
            p: {
              fontSize: theme("fontSize.body")[0],
              lineHeight: theme("fontSize.body")[1].lineHeight,
            },
            small: {
              fontSize: theme("fontSize.caption")[0],
              lineHeight: theme("fontSize.caption")[1].lineHeight,
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};