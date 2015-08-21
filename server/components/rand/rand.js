'use strict';

module.exports.rand36_8x4 = function() {
	var rand36_8x4 = '';
  for(var i=0; i<4; i++){
    rand36_8x4 += Math.random().toString(36).slice(-8) + (i<3?'-':'');
  }
	return rand36_8x4;
};
