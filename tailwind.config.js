import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: "#53f3ff",
          purple: "#7c5cff",
          pink: "#ff5cf4",
          blue: "#1d4ed8"
        },
        space: {
          950: "#050714",
          900: "#0b1022",
          850: "#111832"
        }
      },
      boxShadow: {
        glow: "0 0 20px rgba(83, 243, 255, 0.4)",
        glowStrong: "0 0 40px rgba(124, 92, 255, 0.6)"
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        doorLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-110%)" }
        },
        doorRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(110%)" }
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 18px rgba(83, 243, 255, 0.4)" },
          "50%": { boxShadow: "0 0 32px rgba(255, 92, 244, 0.6)" }
        }
      },
      animation: {
        floatSlow: "floatSlow 6s ease-in-out infinite",
        doorLeft: "doorLeft 1.2s ease-in forwards",
        doorRight: "doorRight 1.2s ease-in forwards",
        fadeOut: "fadeOut 1.2s ease-out forwards",
        pulseGlow: "pulseGlow 3s ease-in-out infinite"
      }
    }
  },
  plugins: [typography]
};
