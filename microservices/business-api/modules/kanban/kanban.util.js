(function(){
	'use strict';

	function compararOrdem(first, second) {
		if(first.ordem < second.ordem) {
				return -1;
		}

		if(first.ordem > second.ordem) {
				return 1;
		}

		return 0;
	}

	module.export = {
		compararOrdem: compararOrdem
	};
}());