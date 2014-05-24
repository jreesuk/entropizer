(function() {

	var defaultClasses = ['lowercase', 'uppercase', 'numeric', 'symbolsCommon', 'symbolsUncommon'];
	var defaultSymbolsCommon = ' ,.?!';
	var defaultSymbolsUncommon = '"£$%^&*()-_=+[]{};:\'@#~<>/\\|`¬¦';

	// Constructor
	var Entropizer = function(options) {
		var classes = (options && options.classes) || defaultClasses;
		this.classes = [];
		for(var i = 0; i < classes.length; i++) {
			this.classes.push(typeof classes[i] === 'string' ? Entropizer.classes[classes[i]] : classes[i]);
		}
	};

	// Preset character classes
	Entropizer.classes = {
		lowercase: { regex: /[a-z]/, size: 26 },
		uppercase: { regex: /[A-Z]/, size: 26 },
		numeric: { regex: /[0-9]/, size: 10 },
		symbols: { characters: defaultSymbolsCommon + defaultSymbolsUncommon },
		symbolsCommon: { characters: defaultSymbolsCommon },
		symbolsUncommon: { characters: defaultSymbolsUncommon },
		hexadecimal: { regex: /[a-fA-F0-9]/, size: 16 }
	};

	Entropizer.prototype.evaluate = function(password) {

		// Null or empty
		if (!password) {
			return 0;
		}
		
		var currentClass, i, j, charsetSize = 0;

		// Find the size of the union of all the character classes used in the password
		for (i = 0; i < this.classes.length; i++) {
			currentClass = this.classes[i];

			// Regex-based
			if (currentClass.regex && currentClass.regex.test(password)) {
				charsetSize += currentClass.size;
			}
			// Characters-based
			else if (currentClass.characters) {
				for (j = 0; j < currentClass.characters.length; j++) {
					if (password.indexOf(currentClass.characters[j]) > -1) {
						charsetSize += currentClass.characters.length;
						break;
					}
				}
			}
		}
		
		// If it's all unknown characters, return 0 instead of -Infinity
		if (charsetSize === 0) {
			return 0;
		}

		// Bits per character is log_2 of character set size
		return Math.log(charsetSize) / Math.log(2) * password.length;
	};

	// Define AMD module
	if (typeof define === 'function' && define.amd) {
		define('entropizer', [], function() {
			return Entropizer;
		});
	}
	// Define global
	else if (typeof window === 'object') {
		window.Entropizer = Entropizer;
	}

})();