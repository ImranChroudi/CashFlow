// @ts-check
import { defineConfig , passthroughImageService } from 'astro/config';
import Unfonts from 'unplugin-fonts/astro'
import tailwindcss from '@tailwindcss/vite';
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://cash-flow-c2u4.vercel.app/",
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
    sitemap({
      serialize(item : any) {
        // High priority pages - main service pages
        const highPriorityPages = [
          "/",
        ];

        // Lower priority pages - contact and jobs

        const url = new URL(item.url);
        const path = url.pathname;

        // Filter out 404 and other non-content pages
        if (path === "/404/") {
          return null; // Exclude from sitemap
        }

        // Set priorities
        if (highPriorityPages.includes(path)) {
          item.priority = 1.0;
        } else {
          // Default priority for any other pages
          item.priority = 0.8;
        }

        const dailyPages = ["/"];

      

        // Set changefreq
        if (dailyPages.includes(path)) {
          item.changefreq = "daily";
        }  else {
          item.changefreq = "monthly";
        }
        return item;
      },
    } as any )
  ],
  image: {
      service: passthroughImageService(),
    },
  vite: {
    plugins: [tailwindcss()]
  }
});