'use strict';
const Koa    = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');
const app    = new Koa();


//log all events to the terminal
app.use(logger());

app.use(async(ctx, next) =>
{
    try
    {
        await next();
    } catch (error)
    {
        ctx.status = error.status || 500;
        ctx.body   = error.message;
        ctx.app.emit('error', error, ctx);
    }
});

// Instantiate our new Router
const router    = new Router();
const dogRouter = new Router({
    prefix: '/dogs'
});

// Require our external routes and pass in the router
require('./routes/basic')({router});
require('./routes/dogs')({dogRouter});

// tells the router to use all the routes that are on the object
app.use(router.routes());
app.use(router.allowedMethods());

app.use(dogRouter.routes());
app.use(dogRouter.allowedMethods());

// tell the server to listen to events on a specific port
const server = app.listen(3000);
module.exports = server;
