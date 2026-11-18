import { z } from 'zod';
import type { ToolDefinition } from './definitions.js';
import { postTypeSchema } from './posts.js';

export const readTools: ToolDefinition[] = [
	{
		name: 'wp_read_post',
		description: 'Read the current post content as a block listing',
		availableIn: ['editing'],
		tags: ['reading'],
		execute: (session) => session.readPost(),
	},
	{
		name: 'wp_read_block',
		description:
			'Read a specific block by index (supports dot notation for nested blocks, e.g., "2.1")',
		inputSchema: {
			index: z
				.string()
				.describe('Block index (e.g., "0", "2.1" for nested blocks)'),
		},
		availableIn: ['editing'],
		tags: ['reading'],
		execute: (session, { index }: { index: string }) =>
			session.readBlock(index),
	},
	{
		name: 'wp_view_post',
		description:
			'Read any WordPress post by ID without opening it for editing. Returns the saved (committed) content as a block listing. Use this to research other posts while keeping the current post open.',
		inputSchema: {
			postId: z.number().describe('The post ID to read'),
			postType: postTypeSchema(
				'Optional: when omitted, the type is detected from the ID.'
			),
		},
		availableIn: ['connected', 'editing'],
		tags: ['reading', 'posts'],
		execute: (
			session,
			{ postId, postType }: { postId: number; postType?: string }
		) => session.viewPost(postId, postType),
	},
];
