'use strict';

var angular = require('angular');

// modules
require('./modules/main/_index');
require('./modules/funcionalidade/_index');
require('./modules/kanban/_index');
require('./modules/modulo/_index');
require('./modules/home/_index');

require('angular-route');
require('angular-animate');
require('angular-sanitize');
require('angular-scroll');
require('angular-messages');
require('ng-sortable');
require('angular-i18n/angular-locale_pt-br');
require('textangular/dist/textAngular-rangy.min');
require('textangular/dist/textAngular-sanitize.min');
require('textangular/dist/textAngular');
require('textangular/dist/textAngularSetup');

var requires = [
  'agileTcc.Main',
  'agileTcc.Home',
  'agileTcc.Kanban',
  'agileTcc.Modulo',
  'agileTcc.Funcionalidade',
  'ngRoute',
  'as.sortable',
  'ngSanitize',
  'ngAnimate',
  'ngMessages',
  'duScroll'
];

angular.module('agileTcc', requires);
angular.module('agileTcc').config(require('./system.config'));
angular.module('agileTcc').config(require('./system.token.interceptor.config'));
angular.module('agileTcc').run(require('./system.run'));
angular.module('agileTcc').run(require('./system.route.interceptor.run'));
angular.module('agileTcc').constant('SystemUriConfig', require('./system.constants'));
angular.module('agileTcc').constant('ApplicationSettings', require('./system.application.constants'));
angular.module('agileTcc').constant('layoutSize', require('./system.layoutSize'));