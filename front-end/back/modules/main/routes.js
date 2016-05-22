module.exports = function (express) {
  var router = express.Router();
  var routes = [
    '/',
    '/:page',
    '/:page/:id'
  ];

  router.get(routes, function (req, res) {
    res.render('main/views/index');
  });

  return router;
};
