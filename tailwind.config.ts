import typography from "@tailwindcss/typography";
import type {Config} from "tailwindcss";
import animate from "tailwindcss-animate";
import plugin from "tailwindcss/plugin";
import {CSSRuleObject} from "tailwindcss/types/config";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/_modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    plugin(function ({addComponents, addUtilities, theme}) {
      addComponents({
        ".fake-container-left": {
          [`@media (min-width: ${theme("container.screens.xl")})`]: {
            marginLeft: `calc((100vw - ${theme("container.screens.xl")}) / 2)`,
          },
        },
        ".fake-container-right": {
          [`@media (min-width: ${theme("container.screens.xl")})`]: {
            marginLeft: `calc((100vw - ${theme("container.screens.xl")}) / 2)`,
          },
        },
      });

      const flexSliceUtilities: CSSRuleObject | CSSRuleObject[] = {};
      const maxSlices = 12; // Adjust this based on your needs

      for (let n = 1; n <= maxSlices; n++) {
        for (const gap of Object.keys(theme("gap"))) {
          const percentage = (1 / n) * 100;
          const flexBasis = `calc(${percentage}% - (var(--slice-gap, 1rem) / ${n} * ${
            n - 1
          }))`;

          flexSliceUtilities[`.flex-slice-${n}`] = {
            flex: `0 0 ${flexBasis}`,
          };

          const gapKey = gap.replace(".", "\\.");
          flexSliceUtilities[`.slice-gap-${gapKey}`] = {
            ["--slice-gap"]: theme(`gap.${gap}`),
          };
        }
      }
      addUtilities(flexSliceUtilities);
    }),
    typography,
    animate,
  ],
  theme: {
    extend: {
      boxShadow: {
        "bottom-centre-2-xl":
          "0rem 1.875rem 2.6875rem -0.75rem rgba(16,24,40,0.120)",
        "bottom-centre-3-xl":
          "0rem 2.125rem 3.125rem -0.75rem rgba(16,24,40,0.140)",
        "bottom-centre-lg":
          "0rem 0.875rem 2rem -0.125rem rgba(16,24,40,0.060), 0rem 0.125rem 0.25rem rgba(16,24,40,0.020)",
        "bottom-centre-md":
          "0rem 0.625rem 1.25rem rgba(16,24,40,0.040), 0rem 0.125rem 0.25rem rgba(16,24,40,0.020)",
        "bottom-centre-sm":
          "0rem 0.25rem 0.625rem rgba(16,24,40,0.040), 0rem 0.125rem 0.125rem rgba(16,24,40,0.020)",
        "bottom-centre-xl":
          "0rem 1.25rem 2.25rem -0.375rem rgba(16,24,40,0.080), 0rem 0.125rem 0.25rem rgba(16,24,40,0.020)",
        "bottom-centre-xs": "0rem 0.125rem 0.25rem rgba(16,24,40,0.040)",
        "focused-xs-focused-4-px-error-100":
          "0rem 0rem 0rem 0.25rem rgba(254,228,226,1)",
        "focused-xs-focused-4-px-primary-100":
          "0rem 0rem 0rem 0.25rem rgba(217,235,253,1)",
        "focused-xs-focused-4-px-secondary-100":
          "0rem 0rem 0rem 0.25rem rgba(254,240,199,1)",
        "top-center-lg":
          "0rem -0.875rem 2rem -0.125rem rgba(16,24,40,0.060), 0rem -0.125rem 0.25rem rgba(16,24,40,0.020)",
        xsm: "0rem 0.0625rem 0.125rem 0rem rgba(16, 24, 40, 0.04)",
      },
      colors: {
        "base-black": "#000000ff",
        "base-white": "#ffffffff",
        "done-100": "#d1fadfff",
        "done-200": "#a6f4c5ff",
        "done-25": "#f6fef9ff",
        "done-300": "#6ce9a6ff",
        "done-400": "#32d583ff",
        "done-50": "#ecfdf3ff",
        "done-500": "#12b76aff",
        "done-600": "#039855ff",
        "done-700": "#027a48ff",
        "done-800": "#05603aff",
        "done-900": "#054f31ff",
        "error-danger-100": "#fee4e2ff",
        "error-danger-200": "#fecdcaff",
        "error-danger-25": "#fffbfaff",
        "error-danger-300": "#fda29bff",
        "error-danger-400": "#f97066ff",
        "error-danger-50": "#fef3f2ff",
        "error-danger-500": "#f04438ff",
        "error-danger-600": "#d92d20ff",
        "error-danger-700": "#b42318ff",
        "error-danger-800": "#912018ff",
        "error-danger-900": "#9a1a1e",
        "gray-100": "#f2f4f7ff",
        "gray-200": "#eaecf0ff",
        "gray-25": "#fcfcfdff",
        "gray-300": "#d0d5ddff",
        "gray-400": "#98a2b3ff",
        "gray-50": "#f9fafbff",
        "gray-500": "#667085ff",
        "gray-600": "#475467ff",
        "gray-700": "#344054ff",
        "gray-800": "#1d2939ff",
        "gray-900": "#101828ff",
        "primary-100": "#d6e5fcff",
        "primary-200": "#aecfffff",
        "primary-25": "#f8fbffff",
        "primary-300": "#7cb2ffff",
        "primary-400": "#398affff",
        "primary-50": "#eff6ffff",
        "primary-500": "#0766efff",
        "primary-600": "#0457ceff",
        "primary-700": "#024ca5ff",
        "primary-800": "#023174ff",
        "primary-900": "#02285dff",
        "secondary-100": "#ddfdffff",
        "secondary-200": "#bffbffff",
        "secondary-25": "#f8ffffff",
        "secondary-300": "#94f9ffff",
        "secondary-400": "#4df4ffff",
        "secondary-50": "#edfeffff",
        "secondary-500": "#07e2f0ff",
        "secondary-600": "#01c7d3ff",
        "secondary-700": "#009ea8ff",
        "secondary-800": "#007178ff",
        "secondary-900": "#005055ff",
        "warning-100": "#ffefd1ff",
        "warning-200": "#ffe1a7ff",
        "warning-25": "#fffcf8ff",
        "warning-300": "#ffcd6cff",
        "warning-400": "#ffbc3cff",
        "warning-50": "#fff8ebff",
        "warning-500": "#f0a007ff",
        "warning-600": "#c38204ff",
        "warning-700": "#8f6004ff",
        "warning-800": "#684602ff",
        "warning-900": "#412c02ff",
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          xl: "76rem", // 1216px
        },
      },
      fontFamily: {
        satoshi: "var(--satoshi-font)",
      },
      fontSize: {
        h1: "3.25rem", // 52px
        h2: "2.75rem", // 44px
        h3: "2.5rem", // 40px
        h4: "2.25rem", // 36px
        h5: "1.875rem", // 30px
        h6: "1.5rem", // 24px
        lg: "1.125rem", // 18px
        md: "1rem", // 16px
        sm: "0.875rem", // 14px
        xl: "1.25rem", // 20px
        xs: "0.75rem", // 12px
      },
      lineHeight: {
        h1: "3.75rem", // 60px
        h2: "4.25rem", // 68px
        h3: "3.75rem", // 60px
        h4: "2.75rem", // 44px
        h5: "2.375rem", // 38px
        h6: "2rem", // 32px
        lg: "1.75rem", // 28px
        md: "1.5rem", // 24px
        sm: "1.25rem", // 20px
        xl: "1.5rem", // 24px
        xs: "1.125rem", // 18px
      },
      screens: {
        lg: "64rem", // 1024px
        md: "40rem", // 640px
        xl: "76rem", // 1216px
        xxl: "90rem", // 1440px
      },
    },
  },
} satisfies Config;
