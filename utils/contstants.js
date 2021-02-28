export const AUTH0_CALLBACK_DOMAIN =
	process.env.AUTH0_CALLBACK_DOMAIN || `https://${process.env.VERCEL_URL}`;

export const HEAD = {
	DESCRIPTION: "desc",
	TITLE: "title",
	OG_IMAGE: "ogimg",
	OG_DESCRIPTION: "ogdesc",
	OG_TITLE: "ogtitle"
};
