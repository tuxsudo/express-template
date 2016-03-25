import dotEnv from 'dotenv';

(()=> {
    // Locally, fake some env variables managed in .env file off project root.
    return process.env.NODE_ENV!=="production" ? dotEnv.load() : false;
})();
