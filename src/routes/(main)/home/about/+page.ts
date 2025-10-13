import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	// Example: you could fetch content from an API, CMS, or Firebase
	const aboutText = `
We are not just a collective of people, but a group of friends & creatives looking to raise awareness about the ever-collapsing zeitgeist of feelings towards the internet and it’s temporal nature. 

We plan for our art and documented thoughts to not be viewed as indisputable truth, but as a heutagogy. An open space for discussion for those who wish to be informed. An archive for thoughts, creations, and masterpieces not weighed down or burdened by an uncaring algorithm.

Information and resources that may be helpful to others should, and will be shared in the halls of our archive. 

As creators, we continue to strive forward with our artwork and pieces because it has always been in our hearts. To deny ourselves of that calling is an act against our true selves. The self that we strive to share through this zine. 

In this zine, we are often working on projects of our dreams to have them come to fruition. The catch and release of said projects is all a part of the samsara that we put ourselves through for the sake of art. To lose this feeling to an apathetic platform that refuses to change would mean the death of art as we know it.

Archives can mean a lot of things to us, not just the storing of information, records, and documents. This translates to games, websites, physical zines, online festivals, artwork, music, and anything that is multimedia in nature. The specificity of these things can range from needle-point accurate, to a broad blast radius. Regardless, it is us in the most authentic form that we can be in. 

This is why personal archives are so important to us. To document these important times in our lives, raise awareness, reach milestones together, and uniting all types of artists in order to create something close to, if not a fully independent entity. This is our goal.

We find ourselves in the microcosm of it all not separated, but fighting together by chasing ideas and building what the world hasn’t seen yet. Standing tall together for the love of art, media, and more than just “more”.
`;


	return {
		aboutText,
	};
};
