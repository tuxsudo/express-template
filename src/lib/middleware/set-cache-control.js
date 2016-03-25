export const setCacheControl = (value = 60*5) => function(req, res, next) {
	res.set('Cache-Control', 'max-age=' + value);
	next();
};
