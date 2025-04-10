// This file is for general info and descriptions for the different sections of the website
import type { Site, Sections, CVEntry } from "@types"

// KEY SITE INFORMATION
export const site: Site = {
  title: {
    en: "Dr J",
    es: "Dr J",
    fi: "Dr J"
  },
  description: {
    en: "Coder. Consultant. Political Economist.",
    es: "Programador. Consultor. Economista Político.",
    fi: "Koodaaja. Konsultti. Poliittinen taloustieteilijä."
  },
  author: {
    en: "Dr J",
    es: "Dr José A Bolanos",
    fi: "Dr J"
  },
  contact: {
    en: "hello@josebolanos.xyz",
    es: "hello@josebolanos.xyz",
    fi: "hello@josebolanos.xyz"
  },
  copyright: {
    en: "All rights reserved",
    es: "Todos los derechos reservados",
    fi: "Kaikki oikeudet pidätetään"
  },
  terms: {
    en: "Company details, terms & conditions",
    es: "Detalles de empresa, términos & condiciones",
    fi: "Yritystiedot & Ehdot"
  }
}

// KEY SITE SECTIONS
export const sections: Sections = {
  blog: {
    en: "Blog",
    es: "Blog",
    fi: "Blogi"
  },
  portfolio: {
    en: "Portfolio",
    es: "Proyectos",
    fi: "Portfolio"
  },
  services: {
    en: "Services",
    es: "Servicios",
    fi: "Palvelut"
  },
  servicios: {
    en: "Services",
    es: "Servicios",
    fi: "Palvelut"
  },
  palvelut: {
    en: "Services",
    es: "Servicios",
    fi: "Palvelut"
  },
  tags: {
    en: "Blogs by tag",
    es: "Blogs por etiqueta",
    fi: "Blogi tagit"
  }
}

// DEGREES
export const degrees: CVEntry[] = [

  {
    name: {
      en: "PhD in Political Economy",
      es: "PhD en Economía Política",
      fi: "Poliittisten taloustieteiden tohtori"
    },
    place: {
      en: "King's College London",
      es: "King's College London",
      fi: "King's College London"
    },
    enddate: 2019,
    contents: {
      en: "Dissertation topic: Competition by sustainability standards; Supervisor: Christel Koop",
      es: "Tema de tésis: Competencia en mercados de certificación sostenibles; Supervisor: Christel Koop",
      fi: "Väitöskirjan aihe: Competition by sustainability standards; Ohjaaja: Christel Koop"
    },
    tags: ["coding", "academia", "policy"]
  },
  {
    name: {
      en: "MA Environment Politics & Globalisation",
      es: "MA Política Ambiental & Globalización",
      fi: "Maisterin tutkinto Ympäristöpolitiikka & Globalisaatio"
    },
    place: {
      en: "King's College London",
      es: "King's College London",
      fi: "King's College London"
    },
    enddate: 2012,
    contents: {
      en: "Dissertation topic: Non-financial (now ESG) risk governance in energy projects; Supervisor: Naho Mirumachi",
      es: "Tema de tésis: Manejo de riesgos no financieros (hoy día, ESG) en proyectos de energía; Supervisor: Naho Mirumachi",
      fi: "Väitöskirjan aihe: Non-financial (now ESG) risk governance in energy projects; Ohjaaja: Naho Mirumachi"
    },
    tags: ["coding", "academia", "policy"]
  },
  {
    name: {
      en: "BA International Relations",
      es: "BA Relaciones Internacionales",
      fi: "Kandidaatin tutkinto Kansainväliset suhteet"
    },
    place: {
      en: "TalTech",
      es: "TalTech",
      fi: "TalTech"
    },
    enddate: 2010,
    contents: {
      en: "Dissertation topic: Explaining public support for controversial foreign policies; Supervisor: Marko Vujicic",
      es: "Tema de tésis: Dinámicas de apoyo para políticas exteriores controversiales; Supervisor: Marko Vujicic",
      fi: "Väitöskirjan aihe: Explaining public support for controversial foreign policies; Ohjaaja: Marko Vujicic"
    },
    tags: ["coding", "academia", "policy"]
  },
]

// DIPLOMAS & CERTIFICATIONS
export const certifications: CVEntry[] = [
  {
    name: { en: "Full Stack Open", es: "Full Stack Open", fi: "Full Stack Open" },
    place: { en: "Univ. Helsinki (Online)", es: "Univ. Helsinki (Online)", fi: "Helsingin Yliopisto (Online)" },
    enddate: 2024,
    contents: { en: "React; Express; E2E & Snapshot Testing; Redux; React Query", es: "React; Express; E2E & Snapshot Testing; Redux; React Query", fi: "React; Express; E2E & Snapshot Testing; Redux; React Query" },
    tags: ["coding"]
  },
  {
    name: { en: "Data Warehousing", es: "Data Warehousing", fi: "Data Warehousing" },
    place: { en: "Univ. Colorado (Coursera)", es: "Univ. Colorado (Coursera)", fi: "Univ. Colorado (Coursera)" },
    enddate: 2022,
    contents: { en: "PostgreSQL; Pentaho; MicroStrategy", es: "PostgreSQL; Pentaho; MicroStrategy", fi: "PostgreSQL; Pentaho; MicroStrategy" },
    tags: ["coding"]
  },
  {
    name: { en: "Statistics with Python", es: "Estadística con Python", fi: "Tilastointi Pythonilla" },
    place: { en: "Univ. Michigan (Coursera)", es: "Univ. Michigan (Coursera)", fi: "Univ. Michigan (Coursera)" },
    enddate: 2022,
    contents: { en: "Python", es: "Python", fi: "Python" },
    tags: ["coding", "academia"]
  },
  {
    name: { en: "AI for Business", es: "AI para Negocios", fi: "Tekoäly yrityksille" },
    place: { en: "U Penn. (Coursera)", es: "U Penn. (Coursera)", fi: "U Penn. (Coursera)" },
    enddate: 2022,
    contents: { en: "DL fundamentals; Rule- and AI-based systems implementation; Blockchain in AI; AI & digital transformation", es: "Fundamentos de DL; Implementación de sistemas basados en reglas y IA; IA y blockchain; IA y la transformación digital", fi: "DL:n perusteet; Sääntö- ja tekoälypohjaiset järjestelmät; Blockchain & tekoäly; Tekoäly ja digitaalinen muutos" },
    tags: ["policy"]
  },
  {
    name: { en: "AI Product Management", es: "Manejo de Productos IA", fi: "Tekoäly-tuotehallinta" },
    place: { en: "Duke (Coursera)", es: "Duke (Coursera)", fi: "Duke (Coursera)" },
    enddate: 2022,
    contents: { en: "ML basics; Project management best practices; AI ethics", es: "Fundamentos de ML; Administración de proyectos; Ética de la IA", fi: "ML:n perusteet; Projektinhallinnan parhaat käytännöt; Tekoälyn etiikka" },
    tags: ["coding", "policy"]
  },
  {
    name: { en: "Excel Data Analytics & Visualization", es: "Análisis y visualización de datos en Excel", fi: "Datan analysointi ja visualisointi Excelissä" },
    place: { en: "Macquarie Univ. (Coursera)", es: "Macquarie Univ. (Coursera)", fi: "Macquarie Univ. (Coursera)" },
    enddate: 2022,
    contents: { en: "PowerPivot; Get & Transform; DAX", es: "PowerPivot; Get & Transform; DAX", fi: "PowerPivot; Get & Transform; DAX" },
    tags: ["coding"]
  },
  {
    name: { en: "Data Analytics", es: "Análisis de Datos", fi: "Data-analytiikka" },
    place: { en: "Google (Coursera)", es: "Google (Coursera)", fi: "Google (Coursera)" },
    enddate: 2022,
    contents: { en: "Spreadsheets; SQL; Tableau; R", es: "Hojas de cálculo; SQL; Tableau; R", fi: "Spreadsheets; SQL; Tableau; R" },
    tags: ["coding", "academia"]
  },
  {
    name: { en: "React", es: "React", fi: "React" },
    place: { en: "HKUST (Coursera)", es: "HKUST (Coursera)", fi: "HKUST (Coursera)" },
    enddate: 2022,
    contents: { en: "React & Bootstrap; React Native; Express & Mongo", es: "React & Bootstrap; React Native; Express & Mongo", fi: "React & Bootstrap; React Native; Express & Mongo" },
    tags: ["coding"]
  },
  {
    name: { en: "Angular", es: "Angular", fi: "Angular" },
    place: { en: "HKUST (Coursera)", es: "HKUST (Coursera)", fi: "HKUST (Coursera)" },
    enddate: 2022,
    contents: { en: "Angular & Bootstrap; Ionic; Cordova & NativeScript; Express & Mongo", es: "Angular & Bootstrap; Ionic; Cordova & NativeScript; Express & Mongo", fi: "Angular & Bootstrap; Ionic; Cordova & NativeScript; Express & Mongo" },
    tags: ["coding"]
  },
  {
    name: { en: "Project Management", es: "Manejo de Proyectos", fi: "Projektinhallinta" },
    place: { en: "Google (Coursera)", es: "Google (Coursera)", fi: "Google (Coursera)" },
    enddate: 2021,
    contents: { en: "Waterfall; Agile", es: "Waterfall; Agile", fi: "Waterfall; Agile" },
    tags: ["coding", "academia"]
  },
  {
    name: { en: "Excel Automation", es: "Automatización en Excel", fi: "Excel Automaatio" },
    place: { en: "Univ. Colorado (Coursera)", es: "Univ. Colorado (Coursera)", fi: "Univ. Colorado (Coursera)" },
    enddate: 2021,
    contents: { en: "VBA", es: "VBA", fi: "VBA" },
    tags: ["coding"]
  },
  {
    name: { en: "Associateship of King's College (AKC)", es: "Associateship of King's College (AKC)", fi: "Associateship of King's College (AKC)" },
    place: { en: "King's College London", es: "King's College London", fi: "King's College London" },
    enddate: 2021,
    contents: { en: "Religion, Ethics, & Society", es: "Religión, Ética, & Sociedad", fi: "Uskonto, etiikka ja yhteiskunta" },
    tags: ["academia"]
  },
]

// PUBLICATIONS
export const publications: CVEntry[] = [

  {
    name: {
      en: "Energy, uncertainty, & entrepreneurship: John D Rockefeller's sequential approach to transaction costs management in the early oil industry",
      es: "Energía, incertidumbre y emprendimiento: el enfoque secuencial de John D. Rockefeller para la gestión de los costos de transacción en la temprana industria petrolera (publicación en Inglés)",
      fi: "Energy, uncertainty, & entrepreneurship: John D Rockefeller's sequential approach to transaction costs management in the early oil industry"
    },
    place: {
      en: "Energy Research & Social Science (ERSS), 55, 26–34",
      es: "Energy Research & Social Science (ERSS), 55, 26–34",
      fi: "Energy Research & Social Science (ERSS), 55, 26–34"
    },
    enddate: 2019,
    contents: {
      en: "https://doi.org/10.1016/j.erss.2019.04.020",
      es: "https://doi.org/10.1016/j.erss.2019.04.020",
      fi: "https://doi.org/10.1016/j.erss.2019.04.020"
    },
    tags: ["academia", "policy"]
  },
  {
    name: {
      en: "The political economy of oil: The limits of our ability to prevent failure",
      es: "La economía política del petróleo: los límites de nuestra capacidad para prevenir el fracaso (publicación en Inglés)",
      fi: "The political economy of oil: The limits of our ability to prevent failure"
    },
    place: {
      en: "In: S Raszewski (ed.), The International Political Economy of Oil & Gas (Palgrave Macmillan), 57–70",
      es: "In: S Raszewski (ed.), The International Political Economy of Oil & Gas (Palgrave Macmillan), 57–70",
      fi: "In: S Raszewski (ed.), The International Political Economy of Oil & Gas (Palgrave Macmillan), 57–70"
    },
    enddate: 2018,
    contents: {
      en: "https://www.amazon.com/International-Political-Economy-Oil-Gas/dp/331962556X",
      es: "https://www.amazon.com/International-Political-Economy-Oil-Gas/dp/331962556X",
      fi: "https://www.amazon.com/International-Political-Economy-Oil-Gas/dp/331962556X"
    },
    tags: ["academia", "policy"]
  },
  {
    name: {
      en: "Food in the platform economy: Advancing risk regulation in the context of the platform economy",
      es: "Plataformas digitales en el sector alimentos: avanzando la regulación de riesgos en la economía de plataformas (publicación en Inglés)",
      fi: "Food in the platform economy: Advancing risk regulation in the context of the platform economy"
    },
    place: {
      en: "Food Standards Agency",
      es: "Food Standards Agency",
      fi: "Food Standards Agency"
    },
    enddate: 2021,
    contents: {
      en: "https://www.food.gov.uk/research/research-projects/food-in-the-platform-economy",
      es: "https://www.food.gov.uk/research/research-projects/food-in-the-platform-economy",
      fi: "https://www.food.gov.uk/research/research-projects/food-in-the-platform-economy"
    },
    tags: ["academia", "policy", "coding"]
  },
  {
    name: {
      en: "Governments are demanding more and faster data than ever",
      es: "Los gobiernos exigen más datos, más rápido que nunca (publicación en Inglés)",
      fi: "Governments are demanding more and faster data than ever"
    },
    place: {
      en: "LSE Blogs (co-authored w. A. Guter-Sandu)",
      es: "LSE Blogs (con A. Guter-Sandu)",
      fi: "LSE Blogs (yhdessä w. A. Guter-Sandun kanssa)"
    },
    enddate: 2020,
    contents: {
      en: "https://blogs.lse.ac.uk/covid19/2020/05/19/governments-are-demanding-more-and-faster-data-than-ever-that-carries-risks/",
      es: "https://blogs.lse.ac.uk/covid19/2020/05/19/governments-are-demanding-more-and-faster-data-than-ever-that-carries-risks/",
      fi: "https://blogs.lse.ac.uk/covid19/2020/05/19/governments-are-demanding-more-and-faster-data-than-ever-that-carries-risks/"
    },
    tags: ["academia", "policy", "coding"]
  },
  {
    name: {
      en: "Regulatory experiments, legitimacy, and emergency: Jose A. Bolanos draws attention to the challenge of determining what an emergency is and finding appropriate ways of response",
      es: "Experimentos regulatorios, legitimidad y emergencia: José A. Bolaños aborda el tema del desafío de determinar qué es una emergencia y como responder apropiadamente (publicación en Inglés)",
      fi: "Regulatory experiments, legitimacy, and emergency: Jose A. Bolanos draws attention to the challenge of determining what an emergency is and finding appropriate ways of response"
    },
    place: {
      en: "Risk & Regulation #37",
      es: "Risk & Regulation #37",
      fi: "Risk & Regulation #37"
    },
    enddate: 2019,
    contents: {
      en: "https://www.lse.ac.uk/accounting/assets/CARR/documents/R-R/2019-Summer/190701-riskregulation-ONLINE.pdf",
      es: "https://www.lse.ac.uk/accounting/assets/CARR/documents/R-R/2019-Summer/190701-riskregulation-ONLINE.pdf",
      fi: "https://www.lse.ac.uk/accounting/assets/CARR/documents/R-R/2019-Summer/190701-riskregulation-ONLINE.pdf"
    },
    tags: ["academia", "policy"]
  },
  {
    name: {
      en: "Organisations, culture, & food safety: A rapid comparative overview of organisational culture frameworks in the food sector",
      es: "Cultura organizacional y seguridad alimentaria: una comparativa rápida de los marcos de cultura organizacional en el sector alimentario (publicación en Inglés)",
      fi: "Organisations, culture, & food safety: A rapid comparative overview of organisational culture frameworks in the food sector"
    },
    place: {
      en: "Food Standards Agency (FSA)",
      es: "Food Standards Agency (FSA)",
      fi: "Food Standards Agency (FSA)"
    },
    enddate: 2021,
    contents: {
      en: "https://www.food.gov.uk/sites/default/files/media/document/organisations-culture-food-safety.pdf",
      es: "https://www.food.gov.uk/sites/default/files/media/document/organisations-culture-food-safety.pdf",
      fi: "https://www.food.gov.uk/sites/default/files/media/document/organisations-culture-food-safety.pdf"
    },
    tags: ["academia", "policy"]
  },
  {
    name: {
      en: "Risk, opportunity, & solidarity: A framework for risk-aware, democratically inclusive, & progressive, global governance",
      es: "Riesgo, oportunidad y solidaridad: un marco inclusivo y progresista para la gobernanza de riesgo global (publicación en Inglés)",
      fi: "Risk, opportunity, & solidarity: A framework for risk-aware, democratically inclusive, & progressive, global governance"
    },
    place: {
      en: "Global Challenges Foundation (GCF)",
      es: "Global Challenges Foundation (GCF)",
      fi: "Global Challenges Foundation (GCF)"
    },
    enddate: 2018,
    contents: {
      en: "https://globalchallenges.org/library-entries/risk-opportunity-and-solidarity/",
      es: "https://globalchallenges.org/library-entries/risk-opportunity-and-solidarity/",
      fi: "https://globalchallenges.org/library-entries/risk-opportunity-and-solidarity/"
    },
    tags: ["academia", "policy"]
  },
]