import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		post: {
			title: `profile`,
			content: `edit profile`
		}
	};
};