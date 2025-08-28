import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		post: {
			title: `login`,
			content: `writing`
		}
	};
};