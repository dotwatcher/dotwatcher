const nextRoutes = require('next-routes');

const routes = module.exports = nextRoutes();

routes.add('page', '/:type(page)/:id');
routes.add('post', '/:type(post)/:id');
routes.add('profile', '/profile/:id');
routes.add('race', '/:type(race)/:id');
