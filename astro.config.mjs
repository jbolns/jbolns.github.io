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

    //redirects: {
        //'/services/fi': '/palvelut/fi',
        //'/services/fi/[...slug]': '/palvelut/fi/[...slug]',
        //'/services/es': '/servicios/es',
        //'/services/es/[...slug]': '/servicios/es/[...slug]',
        //'/servicios/en': '/services/en',
        //'/servicios/en/[...slug]': '/services/en/[...slug]',
        //'/servicios/fi': '/palvelut/fi',
        //'/servicios/fi/[...slug]': '/palvelut/fi/[...slug]',
        //'/palvelut/en': '/services/en',
        //'/palvelut/en/[...slug]': '/services/en/[...slug]',
        //'/palvelut/es': '/servicios/es',
        //'/palvelut/es/[...slug]': '/servicios/es/[...slug]',
    //}
});