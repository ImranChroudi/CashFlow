// @ts-check
import { defineConfig , passthroughImageService } from 'astro/config';
import Unfonts from 'unplugin-fonts/astro'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [
    Unfonts({
      google: {
        families: ["Poppins", "Sora"],
      },
      custom: {
        display: "auto",
        preload: true,
        prefetch: true,
        injectTo: "head-prepend",
        families: [
          {
            name: "Poppins",
            src: "./public/Poppins/*.ttf",
            local: "Poppins",
            transform(font) {
              if (font.basename === "poppins-semibold") {
                font.weight = 600;
              } else if (font.basename === "poppins-regular") {
                font.weight = 400;
              } else if (font.basename === "poppins-light") {
                font.weight = 300;
              } else if (font.basename === "poppins-medium") {
                font.weight = 500;
              } else if (font.basename === "poppins-bold") {
                font.weight = 700;
              }
              return font;
            },
          },
          {
            name: "Sora",
            src: "./public/sora/*.ttf",
            local: "sora",
            transform(font) {
              if (font.basename === "sora-regular") {
                font.weight = 400;
              } else if (font.basename === "sora-medium") {
                font.weight = 500;
              } else if (font.basename === "sora-bold") {
                font.weight = 700;
              }
              return font;
            },
          },
        ],
      },
    }),
  ],
  image: {
      service: passthroughImageService(),
    },

  vite: {
    plugins: [tailwindcss()]
  }
});