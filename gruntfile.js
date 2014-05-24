module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			scripts: {
				files: ['src/**/*.js', 'test/**/*.js', '.jshintrc'],
				tasks: ['default']
			}
		},
		jshint: {
			options: {
				jshintrc: true
			},
			src: ['src/**/*.js', 'test/**/*.js']
		},
		uglify: {
			options: {
				banner: '/*! Entropizer v0.1\nCopyright 2014 Jonathan Rees */\n'
			},
			dist: {
				src: 'src/entropizer/entropizer.js',
				dest: 'dist/entropizer.min.js'
			}
		},
		jasmine: {
			src: ['dist/entropizer.min.js'],
			options: {
				specs: ['test/**/*.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jshint', 'jasmine', 'uglify']);
}