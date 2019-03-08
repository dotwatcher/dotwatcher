const nextRoutes = require('next-routes');

const routes = module.exports = nextRoutes();

routes.add('page', '/:type(page)/:id');
routes.add('post', '/:type(post)/:id');
routes.add('race', '/:type(race)/:slug');
routes.add('feature', '/:type(feature)/:slug');
routes.add('results', '/:type(results)/:year?/:race?');
routes.add('profile', '/:type(profile)/:name');
