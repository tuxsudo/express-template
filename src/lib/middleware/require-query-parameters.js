export function requireQueryParameters( input = [] ) {

    // allow String or [String]
    let params = [].concat( input );

    return function(req, res, next) {

        let fail = [].concat( params )
                .map(p => req.query[p] )
                .some(n => n===undefined);

        next(fail && {
            status: 400,
            message: `parameter${params.length===1?'':'s'} required: '${ params.join(', ') }'`,
            user: req.user && req.user.label
        });
    }
}
