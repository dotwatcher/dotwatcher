const nextRoutes = require('next-routes');

const routes = module.exports = nextRoutes();

routes.add('index', '/');
routes.add('page', '/page/:id');
routes.add('post', '/post/:id');
routes.add('race', '/race/:slug');
routes.add('races', '/races');
routes.add('feature', '/feature/:slug');
routes.add('features', '/features');
routes.add('results', '/results/:year?/:race?');
routes.add('profile', '/profile/:name');
routes.add('contributor', '/contributor/:name');
