module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			scripts: {
				files: ['src/**/*.js'],
				tasks: ['default']
			}
		},
		uglify: {
			options: {
				banner: '/*! Entropizer v0.0\nCopyright 2014 Jonathan Rees */\n'
			},
			dist: {
				src: 'src/entropizer/entropizer.js',
				dest: 'dist/entropizer.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['uglify']);
}