module.exports = function (express) {
  "use strict";
  var router = express.Router();

  router.get('/:module/:name', function(req, res) {
    var name = req.params.name,
        module = req.params.module;
    res.render(module + '/views/partials/' + name);
  });

  return router;
};