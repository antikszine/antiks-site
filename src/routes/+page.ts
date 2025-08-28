import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		post: {
			title: `welcome`,
			content: `welcome to the pinnacle of humanity`
		}
	};
};