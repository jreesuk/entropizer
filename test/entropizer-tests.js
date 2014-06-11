/* global describe, it, expect */

define(['entropizer'], function(Entropizer) {
	'use strict';

	describe('entropizer', function() {

		describe('API', function() {

			it('can be constructed with no parameters', function() {
				expect(Entropizer).toBeDefined();
				new Entropizer();
			});

			it('can be constructed with an array of preset character classes', function() {
				var entropizer = new Entropizer({
					classes: [
						Entropizer.classes.numeric
					]
				});
				expect(entropizer.evaluate('abc')).toEqual(0);
				expect(entropizer.evaluate('123')).toBeCloseTo(9.966, 3);
			});

			it('can be constructed with an array of custom character-based character classes', function() {
				var entropizer = new Entropizer({
					classes: [
						{ characters: 'abcd' },
						{ characters: '1234' }
					]
				});
				expect(entropizer.evaluate('aA')).toEqual(4);
				expect(entropizer.evaluate('abc123')).toEqual(18);
			});

			it('can be constructed with an array of custom regex-based character classes', function() {
				var entropizer = new Entropizer({
					classes: [
						{ regex: /[abcd]/, size: 4 },
						{ regex: /[1234]/, size: 4 }
					]
				});
				expect(entropizer.evaluate('aA')).toEqual(4);
				expect(entropizer.evaluate('abc123')).toEqual(18);
			});

			it('can be constructed with an array of character class names', function() {
				Entropizer.classes.a = { regex: /[abcd]/, size: 4 };
				Entropizer.classes.b = { regex: /[1234]/, size: 4 };
				var entropizer = new Entropizer({
					classes: ['a', 'b']
				});
				expect(entropizer.evaluate('aA')).toEqual(4);
				expect(entropizer.evaluate('abc123')).toEqual(18);
			});

			it('can be constructed with mix of character classes and names', function() {
				Entropizer.classes.test = { regex: /[abcd]/, size: 4 };
				var entropizer = new Entropizer({
					classes: [
						'test',
						'numeric',
						{ regex: /[ABCD]/, size: 4 },
						{ characters: '!?' }
					]
				});
				expect(entropizer.evaluate('aA')).toEqual(6);
				expect(entropizer.evaluate('Abz123?')).toBeCloseTo(30.253, 3);
			});

			it('has a method called evaluate', function() {
				var entropizer = new Entropizer();
				expect(typeof entropizer.evaluate).toEqual('function');
			});

			describe('preset character classes', function() {

				function testCharacterClass(characterClass, characters) {
					expect(typeof characterClass).toEqual('object');
					var entropizer = new Entropizer({
						classes: [characterClass]
					});
					for (var i = 0; i < characters.length; i++) {
						expect(entropizer.evaluate(characters.charAt(i))).toBeGreaterThan(0);
					}
				}

				it('has a field called classes', function() {
					expect(typeof Entropizer.classes).toEqual('object');
				});

				it('has a preset character class called lowercase', function() {
					testCharacterClass(Entropizer.classes.lowercase, 'abcdefghijklmnopqrstuvwxyz');
				});

				it('has a preset character class called uppercase', function() {
					testCharacterClass(Entropizer.classes.uppercase, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
				});

				it('has a preset character class called numeric', function() {
					testCharacterClass(Entropizer.classes.numeric, '0123456789');
				});

				it('has a preset character class called symbols', function() {
					testCharacterClass(Entropizer.classes.symbols, '`¬¦!"£$%^&*()-_=+[{]};:\'@#~,<.>/?\\| ');
				});

				it('has a preset character class called symbolsCommon', function() {
					testCharacterClass(Entropizer.classes.symbolsCommon, '!?,. ');
				});

				it('has a preset character class called symbolsUncommon', function() {
					testCharacterClass(Entropizer.classes.symbolsUncommon, '`¬¦"£$%^&*()-_=+[{]};:\'@#~<>/\\|');
				});

				it('has a preset character class called hexadecimal', function() {
					testCharacterClass(Entropizer.classes.hexadecimal, 'abcdefABCDEF0123456789');
				});

			});

		});

		describe('evaluation', function() {

			function testEvaluation(password, expectedEntropy) {
				it('evaluates "' + password + '" as ' + expectedEntropy + ' bits', function() {
					var entropizer = new Entropizer();
					var entropy = entropizer.evaluate(password);
					expect(entropy).toBeCloseTo(expectedEntropy, 3);
				});
			}

			// Parameterize our test cases
			function runTests(testCases) {
				for (var i = 0; i < testCases.length; i++) {
					testEvaluation(testCases[i].password, testCases[i].expectedEntropy);
				}
			}

			describe('empty password', function() {
				runTests([
					{ password: '', expectedEntropy: 0 }
				]);
			});

			describe('single characters', function() {
				runTests([
					{ password: 'a', expectedEntropy: 4.700 },
					{ password: 'B', expectedEntropy: 4.700 },
					{ password: '4', expectedEntropy: 3.322 },
					{ password: ' ', expectedEntropy: 2.322 },
					{ password: '!', expectedEntropy: 2.322 },
					{ password: '?', expectedEntropy: 2.322 },
					{ password: '^', expectedEntropy: 4.954 },
					{ password: '$', expectedEntropy: 4.954 },
					{ password: '[', expectedEntropy: 4.954 }
				]);
			});

			describe('multiple characters, single character class', function() {
				runTests([
					{ password: 'ab', expectedEntropy: 9.401 },
					{ password: 'AB', expectedEntropy: 9.401 },
					{ password: '123', expectedEntropy: 9.966 },
					{ password: 'password', expectedEntropy: 37.604 },
					{ password: 'PASSWORD', expectedEntropy: 37.604 },
					{ password: '>(^_^)>', expectedEntropy: 34.679 }
				]);
			});

			describe('multiple characters, mixed character classes', function() {
				runTests([
					{ password: 'aB', expectedEntropy: 11.401 },
					{ password: 'Password', expectedEntropy: 45.604 },
					{ password: 'PaSsWoRd1234', expectedEntropy: 71.450 },
					{ password: 'pass word!', expectedEntropy: 49.542 },
					{ password: '!"£$%^&*()_+', expectedEntropy: 62.039 },
					{ password: 'To be, or not to be, that is the question.', expectedEntropy: 244.981 },
					{ password: 'To be, or not to be; that is the question.', expectedEntropy: 271.296 },
					{ password: 'T0 b3, 0r n0t t0 b3; Th4t !5 th3 qu35t10n.', expectedEntropy: 277.818 }
				]);
			});

			describe('excluding unknown characters from character set but not length', function() {
				runTests([
					{ password: 'é', expectedEntropy: 0 },
					{ password: 'café', expectedEntropy: 18.802 },
					{ password: 'Champs-Élysées', expectedEntropy: 89.251 }
				]);
			});

		});

	});

});