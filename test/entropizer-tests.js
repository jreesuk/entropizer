describe('entropizer', function() {
	
	it('can be constructed', function() {
		expect(Entropizer).toBeDefined();
		new Entropizer();
	});

	it('has a method called evaluate', function() {
		var entropizer = new Entropizer();
		expect(typeof entropizer.evaluate).toEqual('function');
	});

	describe('evaluation', function() {
		
		function testEvaluation(password, expectedEntropy) {
			it('evaluates "' + password + '" as ' + expectedEntropy + ' bits', function() {
				var entropizer = new Entropizer();
				var entropy = entropizer.evaluate(password);
				expect(entropy).toBeCloseTo(expectedEntropy, 3);
			});
		}

		var testCases = [
			{ password: '', expectedEntropy: 0 },
			{ password: 'a', expectedEntropy: 4.700 },
			{ password: 'B', expectedEntropy: 4.700 },
			{ password: '4', expectedEntropy: 3.322 },
			{ password: 'ab', expectedEntropy: 9.401 },
			{ password: 'AB', expectedEntropy: 9.401 },
			{ password: 'aB', expectedEntropy: 11.401 },
			{ password: '123', expectedEntropy: 9.966 },
			{ password: 'password', expectedEntropy: 37.604 },
			{ password: 'PASSWORD', expectedEntropy: 37.604 },
			{ password: 'Password', expectedEntropy: 45.604 },
			{ password: 'PaSsWoRd1234', expectedEntropy: 71.450 }
		];

		// Parameterize our test cases
		for (var i = 0; i < testCases.length; i++) {
			testEvaluation(testCases[i].password, testCases[i].expectedEntropy);
		}

	});

});