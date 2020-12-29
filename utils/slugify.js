import slugify from "slugify";

const toSlug = string => {
	return slugify(string, {
		remove: /[$*_+~.()'"!:@?%=]/g,
		lower: true
	});
};

export default toSlug;
