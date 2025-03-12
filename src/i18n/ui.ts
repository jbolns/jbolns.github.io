// THIS FILE IS FOR LANGUAGE DEFAULTS AND TOP-LEVEL NAVIGATION

// IMPORTS
import type { Multi, Links, Misc } from "@types"


// ALL LANGUAGES
export const languages: Multi = {
  en: "English",
  es: "Español",
  fi: "Suomi",
};


// DEFAULT LANGUAGE
export const defaultLang = "en";

// COLLECTION NAMES
export const listOfCollections = ["blog"]

// TOP-LEVEL NAVIGATION
//
// Each entry requires:
//  - TEXT (to render in menus)
//  - HREF (where link points to)
//  - LANGUAGES (array) (languages where item will show)
//    - E.g.
//      - `languages: ["es"]` => item shows only on "es" version of site.
//      - `languages: ["es", "en"]` => item shows on "es" and "en" versions of site.

export const navLinks: Links = [
  {
    text: "Home",
    href: "/",
    languages: ["en"]
  },
  {
    text: "Inicio",
    href: "/",
    languages: ["es"]
  },
  {
    text: "Etusivu",
    href: "/",
    languages: ["fi"]
  },
  {
    text: "CV",
    href: "/cv",
    languages: ["en", "es", "fi"]
  },
  {
    text: "Blog",
    href: "/blog",
    languages: ["en", "es"]
  },
  {
    text: "Blogi",
    href: "/blog",
    languages: ["fi"]
  },
  {
    text: "Portfolio",
    href: "/portfolio",
    languages: ["en", "fi", "es"]
  }
]

export type Sections = {
  [key: string]: Multi
}

// MISC STRINGS
// Strings for animation wrapper
export const wrapperStrings: Misc = {
  w1: {
    en: "Click here to load animation",
    es: "Click aquí para cargar animación",
    fi: "Klikkaa tästä animaatioon"
  },
  w2: {
    en: "(Not recommended in mobile/slow devices.)",
    es: "(No recomendado en móbiles o conexiones lentas.)",
    fi: "(Ei suositella mobiililaitteille tai hitaille yhteyksille.)"
  },
  low: {
    en: "low",
    es: "baja",
    fi: "low"
  },
  mid: {
    en: "mid",
    es: "mediana",
    fi: "mid"
  },
  high: {
    en: "high",
    es: "alta",
    fi: "high"
  }
}

// Strings used in CV
export const cvStrings: Misc = {
  mode: {
    en: "View mode",
    es: "Modo de lectura",
    fi: "Lukutila"
  },
  m1: {
    en: "This CV is interactive. Select an industry focus. CV will adapt accordingly.",
    es: "Este CV es interactivo. Selecciona una industria. El CV se adaptará a tu selección",
    fi: "Tämä CV on interaktiivinen. Valitse toimialan painopiste ja CV mukautuu."
  },
  experience: {
    en: "Experience",
    es: "Experiencia",
    fi: "Työkokemus"
  },
  education: {
    en: "Education",
    es: "Educación",
    fi: "Koulutus"
  },
  degrees: {
    en: "Degrees",
    es: "Formal",
    fi: "Tutkinnot"
  },
  certifications: {
    en: "Diplomas & certifications",
    es: "Diplomas & certificaciones",
    fi: "Diplomit ja todistukset"
  },
  publications: {
    en: "Publications",
    es: "Publicaciones",
    fi: "Julkaisut"
  }
}

// Strings for tag and icon labels requiring small adjustments
export const labelStrings: Misc = {
  coding: {
    en: "coding/analytics",
    es: "programación/analíticas",
    fi: "koodaus/analytiikka"
  },
  policy: {
    en: "policy",
    es: "economía y política",
    fi: "politiikka"
  },
  academia: {
    en: "academia",
    es: "investigación",
    fi: "tutkimus"
  },
}

// OG strings used in header
export const ogStrings: Multi = {
  en: "en_GB",
  es: "es_ES",
  fi: "fi_FI"
}
