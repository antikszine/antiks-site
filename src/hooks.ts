import type { Reroute, Transport } from '@sveltejs/kit';
import type { CollectionReference } from 'firebase/firestore';

//set up rerouting!
const altLinks: Record<string, string> = {
    '/about': '/home/about',
    '/login': '/home/login',
    '/profile': '/home/profile',
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

export const transport: Transport = {
    CollectionReference: {
        encode: (value) => JSON.parse(JSON.stringify(value)),
        decode: (value) => JSON.parse(value)
    }
}