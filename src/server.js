// bootstrap env
import 'babel-polyfill';
import './init';

// app libs
import express from 'express';
import path from 'path';
import { routes } from './routes';
import {createLogger} from 'bunyan';

// middlewares

import compression from 'compression';
import helmet from 'helmet';
import {suggestHttps} from './lib/middleware/suggest-https';
import { setCacheControl } from './lib/middleware/set-cache-control';
import { format404, handle as handleErrors } from './lib/middleware/error-handlers';

// create the app
export const app = express();
const logger = createLogger({ name: process.env.APP_NAME || "express-app" });



// instantiate middleware
app.use( compression() );
app.use( helmet() );
app.use( suggestHttps() );
app.use('/assets', express.static( path.resolve(__dirname, 'public') ) ); // <-- where to place static files

app.use( setCacheControl() );


// initialize routes
app.use('/dev', routes.dev);
app.use('/', routes.home);


// handle punted errors
app.use( format404 );
app.use( handleErrors );


const port = process.env.PORT || 8080;

// Listen now...
app.listen(port, () => logger.info(`listening on port ${port}!`));
