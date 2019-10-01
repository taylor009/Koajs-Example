'use strict';

module.exports = ({router}) => {
    // Getting the home route
    router.get('/', (ctx, next) =>
    {
       ctx.body = 'Hello World';
    });
};
