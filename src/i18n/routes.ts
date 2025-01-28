import type { Multi } from "@types"
// Routes to re-direct users to equivalent page when they change language using language picker

// Pattern !!!
//
// routes = { 
//  { lang_1: slug, lang_2: slug, ..., lang_N: slug }  // For top-level pages
//  { lang_1: collection/slug, lang_2: collection/slug, ..., lang_N: collection/slug } // For any page inside a collection
//  ...
// }

// Note.
// You only need to add a route when page has a different slug in some languages.
// If the slug is the same across **all** languages, redirection happens automatically.

export const routes: Multi[] = [
  { en: "coding", es: "programacion", fi: "kodea" },  // Tag equivalence
  { en: "policy", es: "politica", fi: "policy" },  // Tag equivalence
  { en: "risk-in-platform-economy", es: "gestion-riesgo-digital", fi: "" }, // Blog & Portfolio
  { en: "private-governance", es: "certificaciones-del-futuro", fi: "" }, // Blog
  { en: "organisational-culture", es: "cultura-organizacional", fi: "" }, // Blog
  { en: "digital-transformation-currents", es: "corrientes-transformacion-digital", fi: "digitaalisen-kehityksen-virrat" }, // Blog
  { en: "national-international", es: "nacional-internacional", fi: "" }, // Portfolio
  { en: "rethink-voluntary-governance", es: "reevaluar-gobernanza-voluntaria", fi: "uudelleentarkastelu-vapaaehtoinen-hallinto" }, // Blog
  { en: "safeguards-matter", es: "salvaguardas-institucionales", fi: "instituutiot-ovat-tarkeita" }, // Blog
  //{ en: "", es: "", fi: "" }, // Blog
  //{ en: "", es: "", fi: "" }, // Blog
]