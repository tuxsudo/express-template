import jwt from 'jsonwebtoken';

export default function(secret) {

    return function enforceToken(req, res, next) {

        let token = req.headers['x-access-token'] || req.body.token || req.query.token;

        if(!token) {
            return next({ status: 401 });
        }

        if(token) {

            jwt.verify(token, secret, function(err, decoded) {
                if(err) { return next({ status: 403 }); }
                req.user = decoded;
                return next();
            });
        }


    }
}
