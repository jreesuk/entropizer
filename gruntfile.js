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
		jasmine: {
			src: ['src/**/*.js'],
			options: {
				specs: ['test/**/*.js'],
				template: require('grunt-template-jasmine-requirejs'),
				templateOptions: {
					requireConfig: {
						baseUrl: ''
					}
				}
			}
		},
		uglify: {
			options: {
				banner: '/*!\n * Entropizer - <%= pkg.version %>\n * Built: <%= grunt.template.today("yyyy-mm-dd HH:MM") %>\n * https://github.com/jreesuk/entropizer\n * \n * Copyright (c) 2014 Jonathan Rees\n */\n',
			},
			dist: {
				src: ['src/**/*.js'],
				dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jshint', 'jasmine', 'uglify']);
}