'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function KanbanService(requestApiService) {
  this.findKanban = function (cb) {
    requestApiService.get(cb, '/kanban');
  };
}

servicesModule.service('KanbanService', KanbanService);