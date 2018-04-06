const nextRoutes = require('next-routes');

const routes = module.exports = nextRoutes();

routes.add('race', '/:type(race)/:id');
routes.add('post', '/:type(post)/:id');
routes.add('about', '/about-us/:foo(bar|baz)');
routes.add('profile', '/profile/:id');
