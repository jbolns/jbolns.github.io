// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
    site: 'https://www.josebolanos.xyz',

    integrations: [mdx(), sitemap(), react()],

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
        plugins: [tailwindcss()],
        server: {
            fs: {
                // Allow Linux to serve files from the node_modules folder
                allow: ['..']
            }
        },
        optimizeDeps: {
            exclude: ['tailwindcss'] // Prevents Vite from trying to turn CSS into JS
        }
    },

    devToolbar: {
        enabled: false
    },

});