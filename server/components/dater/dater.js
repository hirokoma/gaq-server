'use strict';

// 0埋め
var toDoubleDigits = function(num) {
  num += '';
  if (num.length === 1) {
    num = '0' + num;
  }
 return num;
};


module.exports.format = function(date) {
	var dateText =  '' +
									date.getFullYear() + '-' +
									toDoubleDigits(date.getMonth() + 1) + '-' +
									toDoubleDigits(date.getDate()) + '-' +
									toDoubleDigits(date.getHours()) + '-' +
									toDoubleDigits(date.getMinutes()) + '-' +
									toDoubleDigits(date.getSeconds()) ;
	return dateText;
};

module.exports.timestamp = function(date) {
	// --参考--
	// 1900年01月01日00時00分00秒 = 6QGIXKF9C (9桁)
	// 3000年01月01日00時00分00秒 = AMTUTK08W (9桁)
	var dateText =  '' +
									date.getFullYear() +
									toDoubleDigits(date.getMonth() + 1) +
									toDoubleDigits(date.getDate()) +
									toDoubleDigits(date.getHours()) +
									toDoubleDigits(date.getMinutes()) +
									toDoubleDigits(date.getSeconds()) ;
	return (dateText * 1).toString(36);
};
