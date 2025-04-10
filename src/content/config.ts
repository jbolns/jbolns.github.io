import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		locale: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().refine((img) => img.width >= 600, {
			message: "Cover image must be at least 600 pixels wide!",
		}),
		tags: z.array(z.string())
	}),
})

const cv = defineCollection({
	type: "content",
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
	type: "content",
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		locale: z.string(),
		pubDate: z.coerce.date(),
		updateDate: z.coerce.date(),
		heroImage: image().refine((img) => img.width >= 600, {
			message: "Cover image must be at least 600 pixels wide!",
		}),
		stack: z.array(z.string()).optional(),
		tags: z.array(z.string())
	}),
})

const services = defineCollection({
	type: "content",
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		locale: z.string(),
		pubDate: z.coerce.date(),
		heroImage: image().refine((img) => img.width >= 600, {
			message: "Cover image must be at least 600 pixels wide!",
		}),
		stack: z.array(z.string()).optional(),
		tags: z.array(z.string())
	}),
})

const servicios = services
const palvelut = services

export const collections = { blog, cv, portfolio, services, servicios, palvelut }