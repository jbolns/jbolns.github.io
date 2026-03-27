import { defineCollection } from "astro:content"
import { z } from "astro/zod"
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "src/content/blog" }),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		locale: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image(),
		tags: z.array(z.string())
	}),
})

const cv = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "src/content/cv" }),
	schema: z.object({
		title: z.string(),
		company: z.string(),
		startDate: z.coerce.number(),
		endDate: z.coerce.number(),
		type: z.string(),
		tags: z.array(z.string()),
		locale: z.string()
	}),
})

const portfolio = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "src/content/portfolio" }),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		locale: z.string(),
		pubDate: z.coerce.date(),
		updateDate: z.coerce.date(),
		heroImage: image(),
		stack: z.array(z.string()).optional(),
		tags: z.array(z.string())
	}),
})

const services = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "src/content/services" }),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		locale: z.string(),
		pubDate: z.coerce.date(),
		priority: z.number(),
		heroImage: image(),
		cats: z.array(z.string()),
		pricing: z.string(),
		callToAction: z.string(),
		callToActionUrl: z.string(),
	}),
})

const servicios = services
const palvelut = services

export const collections = { blog, cv, portfolio, services, servicios, palvelut }