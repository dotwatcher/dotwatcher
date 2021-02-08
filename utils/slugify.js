import slugify from 'slugify';

export default string => {
	return slugify(
		string,
		{
			remove: /[$*_+~.()'"!:@?%=]/g,
			lower: true
		}
	);
};
