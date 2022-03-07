import slug from "slug";

export type Post = {
	title: string,
	slug: string,
	preview: string,
	timestamp: number,
	draft: boolean,
	date: string,
}


export function single(post): Post {
	return {
		...post,
		slug: slug(post.title),
		timestamp: (new Date(post.date)).valueOf()
	}
}

export function all(posts: Post[]) {
	return posts
		.map(post => single(post))
		.filter(post => true !== post.draft)
		.sort((a, b) => b.timestamp - a.timestamp)
}

export function getRSS(posts: Post[]) {
	return {
		title: 'Pyronaur.com RSS',
		description: 'Pyronaur.com RSS Feed',
		stylesheet: true,
		customData: `<language>en-us</language>`,
		items: posts.map((post: Post) => ({
			title: post.title,
			description: post.preview,
			link: post.slug,
			pubDate: post.date,
		})),
	}
}

