# Entropizer

*Tiny password entropy calculator*

For the jQuery plugin, click [here](https://github.com/jreesuk/jquery-entropizer)

## What is entropy and why should I care?

*Entropy* is a measure of disorder. In the context of passwords, it's a measure of how many different password
combinations there are using a certain set of rules. The more combinations an attacker has to check, the longer it will take
them to crack your password by brute force.

Entropy is expressed in *bits* - this is the logarithm (base 2) of the number of combinations. As such, an 80-bit password isn't
twice as strong as a 40-bit password, it's 2<sup>40</sup> (about a trillion) times stronger.

A lot of password meters still use basic criteria such as minimum length, number and symbol requirements etc. This is inadequate
and results in [weak, forgettable passwords](http://xkcd.com/936/). Entropy is a much more reliable measure of password strength.

## What is Entropizer?

Entropizer is a simple, super-lightweight (~1kb minified) library that calculates password entropy. It's easy to set up and customize, and
comes with several preset character classes. You can also define custom character classes (e.g. for localization).

Entropizer supports [AMD](http://requirejs.org/) and [CommonJS](http://wiki.commonjs.org/wiki/CommonJS). It is available
as an [npm package](https://www.npmjs.org/package/entropizer) and a [bower](http://bower.io/) component.

## Getting Started

Basic usage:

```js
// Use default character classes: lowercase, uppercase, numeric, split symbols (common and uncommon)
var entropizer = new Entropizer();

// ~57 bits of entropy
var entropy = entropizer.evaluate('password123');
```

Preset character classes are found under `Entropizer.classes`:

`lowercase`, `uppercase`, `numeric`, `symbols`, `symbolsCommon`, `symbolsUncommon`, `hexadecimal`

Specify the classes to use:

```js
// Using names
var entropizer = new Entropizer({
	classes: ['lowercase', 'uppercase', 'numeric']
});

// Using the character class objects
var entropizer = new Entropizer({
	classes: [
		Entropizer.classes.lowercase,
		Entropizer.classes.uppercase,
		Entropizer.classes.numeric
	]
});

// Custom character classes
var entropizer = new Entropizer({
	classes: [
		{ regex: /[a-m]/, size: 13 },		// Using regex and a class size
		{ characters: 'nopqrstuvwxyz' }		// Using characters (implicit size)
	]
});
```

You can mix and match these different ways of defining character classes.

## Still confused?

Read the source, it's tiny!
