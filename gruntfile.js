module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: [
                    'js/*.js'
                ],
                // the location of the resulting JS file
                dest: 'js/built/script.main.js'
            }
        },
        uglify: {
            options: {
                beautify: true
            },
            built: {
                src:['js/built/script.main.js'],
                dest:'js/built/script.main.min.js'

            }
        },

        sass: {
            dist: {
                options: {
                    spawn: false,
                },
                files: {
                    'css/style.css': 'sass/style.scss'
                }
            }
        },
        watch: {
            scripts: {
                files: ['**/*.js',],
                tasks: ['concat','uglify'],
                options: {
                    spawn: false,
                    livereload: true,
                },
            },
            css: {
                files: ['sass/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            }

        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
  /*  grunt.loadNpmTasks('grunt-contrib-jshint'); */

    grunt.registerTask('default', ['concat','uglify','sass','watch']);



};

