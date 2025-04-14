// Simple types
export type Lang = string
export type CollectionName = string

// List of collections
export type ListOfCollections = CollectionName[]

// Multi-language
export interface Multi {
  [key: string]: string;
}

// Page information
export type Page = {
  title: Multi
  description: Multi
}

// Sections
export type Sections = {
  [key: string]: Multi
}

// Site information
export interface Site extends Page {
  author: Multi
  contact: Multi
  copyright: Multi
  terms: Multi
}

// Top-level navigation links
export type Links = {
  text: string
  href: string
  languages: string[]
}[]

// Social media links
export type Socials = {
  name: string
  icon: string
  text: string
  href: string
}[]

// Entries for degree section of CV
export type DegreeEntry = {
  name: Multi
  institution: Multi
  date: number
  topic: Multi
  supervisor: string
}

// Entries for certifications section of CV
export type CertificationEntry = {
  name: Multi
  institution: Multi
  date: number
  contents: Multi
  tags: string[]
}

// Entries for degree section of CV
export type CVEntry = {
  name: Multi
  place: Multi
  startdate?: number
  enddate: number
  contents: Multi
  tags: string[]
}

// Additional type for, well, stuff
export type Misc = {
  [key: string]: Multi
}

// Entries for degree section of CV
export type ServicesCats = {
  [key: string]: Misc,
}