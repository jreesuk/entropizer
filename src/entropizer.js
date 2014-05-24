(function() {

	var defaultClasses = ['lowercase', 'uppercase', 'numeric', 'symbolsCommon', 'symbolsUncommon'],
		symbolsCommon = ' ,.?!',
		symbolsUncommon = '"£$%^&*()-_=+[]{};:\'@#~<>/\\|`¬¦';

	// Constructor
	var Entropizer = function(options) {
		var classes = (options && options.classes) || defaultClasses;
		this.classes = [];
		for (var i = 0; i < classes.length; i++) {
			this.classes.push(typeof classes[i] === 'string' ? Entropizer.classes[classes[i]] : classes[i]);
		}
	};

	// Preset character classes
	Entropizer.classes = {
		lowercase: { regex: /[a-z]/, size: 26 },
		uppercase: { regex: /[A-Z]/, size: 26 },
		numeric: { regex: /[0-9]/, size: 10 },
		symbols: { characters: symbolsCommon + symbolsUncommon },
		symbolsCommon: { characters: symbolsCommon },
		symbolsUncommon: { characters: symbolsUncommon },
		hexadecimal: { regex: /[a-fA-F0-9]/, size: 16 }
	};

	// Find the contribution of a character class to a password's alphabet
	Entropizer.prototype._evaluateClass = function(charClass, password) {
		var chars, i;
		if (charClass.regex && charClass.regex.test(password)) {
			return charClass.size;
		}
		else if (charClass.characters) {
			chars = charClass.characters;
			for (i = 0; i < chars.length; i++) {
				if (password.indexOf(chars[i]) > -1) {
					return chars.length;
				}
			}
		}
		return 0;
	};

	// Calculate the number of bits of entropy in a password
	Entropizer.prototype.evaluate = function(password) {
		var i, alphabetSize = 0;

		if (!password) {
			return 0;
		}
		
		// Find the alphabet of the password (the union of all the classes it uses)
		for (i = 0; i < this.classes.length; i++) {
			alphabetSize += this._evaluateClass(this.classes[i], password);
		}
		
		// If it's all unknown characters, return 0 instead of -Infinity
		if (alphabetSize === 0) {
			return 0;
		}

		return Math.log(alphabetSize) / Math.log(2) * password.length;
	};

	// Define AMD module
	if (typeof define === 'function' && define.amd) {
		define('entropizer', [], function() {
			return Entropizer;
		});
	}
	// Define global if no AMD
	else if (typeof window === 'object') {
		window.Entropizer = Entropizer;
	}

})();