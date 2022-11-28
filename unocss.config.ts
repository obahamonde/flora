import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  shortcuts: [
    ["scale", "hover:scale-110 hover:transition-all duration-200 ease-in-out"],
    ["cp", "cursor-pointer"],
    ["rf", "rounded-full"],
    ["col", "flex flex-col"],
    ["row", "flex flex-row"],
    ["center", "items-center justify-center"],
    ["start", "items-start justify-start"],
    ["end", "items-end justify-end"],
    ["tr", "top-0 right-0"],
    ["br", "bottom-0 right-0"],
    ["bl", "bottom-0 left-0"],
    ["tl", "top-0 left-0"],
    ["sh", "shadow-gray-500 shadow-md"],
    ["sh-sm", "shadow-sm"],
    ["sh-md", "shadow-md"],
    ["sh-lg", "shadow-lg"],
    ["sh-xl", "shadow-xl"],
    ["sh-2xl", "shadow-2xl"],
    ["scale", "hover:scale-110 hover:transition-all duration-200 ease-in-out"],
    ["grid2", "grid grid-cols-2"],
    ["grid3", "grid grid-cols-3"],
    ["grid4", "grid grid-cols-4"],
    ["grid5", "grid grid-cols-5"],
    ["grid6", "grid grid-cols-6"],
    ["slide-up", "animate-slide-in-up animate-duration-200"],
    ["slide-down", "animate-slide-in-down animate-duration-200"],
    ["slide-left", "animate-slide-in-left animate-duration-200"],
    ["slide-right", "animate-slide-in-right animate-duration-200"],
    ["fade-in", "animate-fade-in animate-duration-200"],
    ["fade-in-up", "animate-fade-in-up animate-duration-200"],
    ["fade-in-down", "animate-fade-in-down animate-duration-200"],
    ["fade-in-left", "animate-fade-in-left animate-duration-200"],
    ["fade-in-right", "animate-fade-in-right animate-duration-200"],
    ["spin-in-up", "animate-spin-in-up animate-duration-200"],
    ["spin-in-down", "animate-spin-in-down animate-duration-200"],
    ["spin-in-left", "animate-spin-in-left animate-duration-200"],
    ["spin-in-right", "animate-spin-in-right animate-duration-200"],
    ["no-outline", "outline-none focus:outline-none hover:outline-none"],
    ["toast", " tr mt-16 row rounded-lg  shadow-primary sh-lg z-50 fixed p-4"],
    [
      "btn-get",
      "dark:invert m-2 bg-primary text-light rounded-lg shadow-success hover:bg-success hover:text-accent hover:shadow-primary shadow-md px-4 py-2 cp hover:scale-110 hover:transition-all duration-200 ease-in-out hover:cursor-pointer hover:font-extrabold hover:underline",
    ],
    [
      "btn-del",
      "dark:invert m-2 bg-danger text-light rounded-lg shadow-warning hover:bg-warning hover:text-danger hover:shadow-danger shadow-md px-4 py-2 cp hover:scale-110 hover:transition-all duration-200 ease-in-out hover:cursor-pointer hover:font-extrabold hover:underline",
    ],
    [
      "btn-post",
      "dark:invert m-2 bg-success text-info rounded-lg shadow-primary hover:bg-primary hover:text-light hover:shadow-success shadow-md px-4 py-2 cp hover:scale-110 hover:transition-all duration-200 ease-in-out hover:cursor-pointer hover:font-extrabold hover:underline",
    ],
    [
      "btn-put",
      "dark:invert m-2 bg-warning text-light rounded-lg shadow-info hover:bg-info hover:text-light hover:shadow-warning shadow-md px-4 py-2 cp hover:scale-110 hover:transition-all duration-200 ease-in-out hover:cursor-pointer hover:font-extrabold hover:underline",
    ],
    [
      "text-title",
      "font-script dark:text-light text-info text-2xl text-center"
    ],
    [
      "text-subtitle",
      "font-sans text-primary dark:text-warning text-xl text-center"
    ],
    [
      "text-caption",
      "font-mono text-accent dark:text-success text-sm font-extrabold text-center"
    ],
    
    [
      "text-body",
      "font-serif text-light dark:text-success text-lg"
    ],
    [
      "text-input",
      "no-outline w-48 bg-gray-200 dark:bg-gray-500 sh text-caption"
    ]
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: "Inter",
        serif: "Alegreya",
        mono: "DM Mono",
        script: "Merienda",
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: "prose prose-sm m-auto text-left".split(" "),
  theme: {
    colors: {
      primary: "#FFF4F8", // get primary light
      secondary: "#119483", // post secondary success
      accent: "#C72AAE", // put warning accent
      ligth: "#ffffff", // delete danger warning
      warning: "#FF1484",
      danger: "#F606E1",
      info: "#000000",
      success: "#40FB83",
    },
  },
  rules: [
    [
      /^x(\d+)$/,
      ([, d]) => ({
        height: `${d}rem`,
        width: `${d}rem`,
      }),
    ],
    [
      /^[bg|border|color|fill|outline|shadow|text]-(.*)$/,
      ([, attr, color], { theme }) => {
        if (color in theme.colors) {
          switch (attr) {
            case "bg":
              return {
                backgroundColor: theme.colors[color],
              };
            case "border":
              return {
                borderColor: theme.colors[color],
              };
            case "color":
              return {
                color: theme.colors[color],
              };
            case "fill":
              return {
                fill: theme.colors[color],
              };
            case "outline":
              return {
                outlineColor: theme.colors[color],
              };
            case "shadow":
              return {
                shadowColor: theme.colors[color],
              };
            case "text":
              return {
                color: theme.colors[color],
              };
          }
        }
      },
    ],
  ],
});
