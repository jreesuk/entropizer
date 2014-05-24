window.Entropizer = (function() {
	var log2 = Math.log(2);
	var Entropizer = function() {
		this.classes = [
			{ regex: /[a-z]/, size: 26 },
			{ regex: /[A-Z]/, size: 26 },
			{ regex: /[0-9]/, size: 10 }
		];
	};
	Entropizer.prototype.evaluate = function(password) {
		var charsetSize = 0;

		if (!password) {
			return 0;
		}
		
		var currentClass;
		for (var i = 0; i < this.classes.length; i++) {
			currentClass = this.classes[i];
			if (currentClass.regex.test(password)) {
				charsetSize += currentClass.size;
			}
		}
		
		if (charsetSize === 0) {
			return 0;
		}

		return Math.log(charsetSize) / log2 * password.length;
	};
	return Entropizer;
})();