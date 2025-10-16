import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const webring = [
		{
			name: 'whereditgo.diamonds',
			url: 'https://whereditgo.diamonds/',
			desc: 'vault hunting and another library'
		},
		{
			name: 'COVALRIA',
			url: 'https://covalria.com/',
			desc: 'webcomic (therashons)'
		},
		{	
			name: 'H-R(m)',
			url: 'https://h-rm.co/',
			desc: 'homeroom, intercoms, and broadcasting'
		
		},
		{	
			name: 'Central On Air',
			url: 'https://centralonair.com/',
			desc: 'community radio in cambridge, MA'
		
		},
		// (template for future entries)
        //{
		// 	name: 'blah blah',
		// 	url: '(add link here)',
		// 	desc: '(flavor text)'
		// }
	];

	return { webring };
};
