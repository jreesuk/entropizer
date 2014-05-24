# Entropizer

Tiny entropy-based password strength meter

## What is entropy and why should I care?

Entropy is a measure of disorder. In the context of passwords, it's a measure of how many different password
combinations there are using a certain set of rules. The more combinations an attacker has to check, the longer it will take
them to crack your password by brute force.

Entropy is expressed in *bits* - this is a way of representing these huge numbers of combinations in a more accessible form.
It's defined as the logarithm (base 2) of the number of combinations - as such, an 80-bit password isn't twice as strong as
a 40-bit password, it's 2<sup>40</sup> (about a trillion) times stronger.

A lot of password meters still use basic criteria such as minimum length, number and symbol requirements etc. This is inadequate
and results in [weak, forgettable passwords](http://xkcd.com/936/). Entropy is a much more reliable measure of password strength.

## What is Entropizer?

Entropizer is a simple, super-lightweight (~1kb) library that calculates password entropy. It's easy to set up and customize, and
comes with several preset character classes. You can also define custom character classes (e.g. for localization).

Entropizer also supports [AMD](http://requirejs.org/).

## Getting Started

Basic usage:

```js
// Use default character classes: lowercase, uppercase, numeric, split symbols (common and uncommon)
var entropizer = new Entropizer();

// 57 bits of entropy
var entropy = entropizer.evaluate('password123');
```

Specifying preset character classes (`lowercase`, `uppercase`, `numeric`, `symbols`, `symbolsCommon`, `symbolsUncommon`, `hexadecimal`):

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
```

Specifying custom character classes:

```js
// Using regex
var entropizer = new Entropizer({
	classes: [
		{ regex: /[a-mA-M]/, size: 13 },	// case-insensitive half-alphabets
		{ regex: /[n-zN-Z]/, size: 13 }		// not sure why you would ever do this, but why not :)
	]
});

// Using characters
var entropizer = new Entropizer({
	classes: [
		{ characters: 'abcd' }		// automatically determines size = 4
	]
});
```

You can also add custom character classes to `Entropizer.classes` and reference them by name.

## Still confused?

Read the source, it's tiny!

## Coming soon

- jQuery UI plugin
- Dictionary lookups and common mutations
