module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      brightness: {
        25: ".25",
        175: "1.75"
      },
      colors: {
        yellow: {
          dark: "#F6902A",
          DEFAULT: "#FAC777",
          opaque: "rgba(250, 199, 119, 0.5)"
        },
        green: {
          dark: "#14483E",
          DEFAULT: "#1C6859",
          light: "#ACCD79"
        },
        blue: {
          DEFAULT: "#0099FF"
        },
        red: {
          DEFAULT: "#C55A4B"
        },
        black: {
          DEFAULT: "#2B2B2B"
        },
        gray: {
          DEFAULT: "#F3F3F3",
          light: "#EEF5F7"
        }
      },
      spacing: {
        "3/10": "30%"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
