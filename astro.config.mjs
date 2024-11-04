// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    site: 'https://www.josebolanos.xyz',

    integrations: [mdx(), sitemap(), react(), tailwind()],

    i18n: {
        defaultLocale: "en",
        locales: ["en", "es", "fi"],
        routing: {
            prefixDefaultLocale: false
        },
        fallback: {
            es: "en",
            fi: "en"
        }
    },

    vite: {

        resolve: {
            alias: {
                "~/": "/src/assets/",
            },
        },


    }

});