export const suggestHttps = (time = 60*5) => function(req, res, next) {
	res.set('Strict-Transport-Security', `max-age=${time}`);
	next();
};
