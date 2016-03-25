import {createLogger} from 'bunyan';


const logger = createLogger({ name: process.env.APP_NAME || "express-app" });

// 404 all the things
export function format404(req, res, next) {
    next({
        status: 404,
        message: 'Not Found'
    });
}

export function handle(err, req, res, next) { // eslint-disable-line no-unused-vars

    let json = {
        status: err.status||500,
        message: err.message || 'An unknown error ocurred.',
        url: req.originalUrl
    };

    if(process.env.NODE_ENV === 'development') {
        json.stack = err.stack;
    }

    res.status(json.status).send(json);
    logger.error(json);

}
