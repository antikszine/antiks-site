import type { Reroute } from '@sveltejs/kit';

//set up rerouting!
const altLinks: Record<string, string> = {
    '/about': '/home/about',
    '/login': '/home/login',
    '/register': '/home/register',
    '/profile': '/home/profile',
    '/forgot': '/home/login/forgot',
    '/digest': '/home/digest',
    '/forum': '/home/forum',
    '/stockpile': '/home/stockpile',
    '/resources': '/home/resources',
    '/webring': '/home/webring',
}

export const reroute: Reroute = ({ url }) => {
    if (url.pathname in altLinks) {
        return altLinks[url.pathname];
    }
}