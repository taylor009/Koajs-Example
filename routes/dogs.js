const request = require('superagent');

module.exports = ({dogRouter}) =>
{
  dogRouter.get('/', async (ctx, next) =>
  {
      await request.get('/', async (ctx, next) =>
      {
          await request
              .get('https://dog.ceo/api/breeds/list/all')
              .then(res =>
          {
              ctx.body = res.body;
          })
              .catch(error =>
          {
              console.log(error);
          });
      });
  });
};
