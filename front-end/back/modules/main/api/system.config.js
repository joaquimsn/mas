module.exports = function (express) {
  "use strict";
  var router    = express.Router();

  router.get('/system/config/menus', function (req, res) {
    var menus = [
      {
        nome: 'Home',
        link: '/',
        icon: 'icon-home'
      }
    ];

    res.json(menus);
  });

  return router;
};