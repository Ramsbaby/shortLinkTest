/**
 * 공백이나 널인지 확인
 * @returns {Boolean}
 */
String.prototype.isBlank = function() {
	var str = this.trim();
	for(var i = 0; i < str.length; i++) {
		if(str.charAt(i) != "\t" && str.charAt(i) != "\n" && str.charAt(i) != "\r") return false;
	}
	return true;
}