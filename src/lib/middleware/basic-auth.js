import basicAuth from 'basic-auth';

// [{user: jared, pass: pass}]
let users = [];

function validateUser({ user, pass }) {
    return users.filter(u => u.user===user && u.pass===pass)[0];
}

function unauthorized( res, next ) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return next({ status: 401, message: 'Authentication Required'});
}

function authorized(user, req, next) {
    req.user = user;
    next();
}


export function setUserList(userlist=[]) {
    users = userlist;
}

export const middleware = (req, res, next) => {
    let user = basicAuth( req );
    let activeUser = user && user.name && user.pass
        && validateUser({ users, user: user.name, pass: user.pass });

    return !activeUser ? unauthorized(res, next) : authorized(activeUser, req, next);
}
