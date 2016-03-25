export const setPoweredBy = value => function(req, res, next) {
	res.set('x-powered-by', value);
	next();
};
