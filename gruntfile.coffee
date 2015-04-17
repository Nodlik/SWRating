module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    less:
      theme:
        options:
          paths: ['theme/default']
          cleancss: true
          compress: true,
          yuicompress: true,
          optimization: 2
        files:
          'build/css/rating-default.css': 'theme/default/main.less'

    watch:
      typeescript:
        files: ['src/**/*.ts']
        tasks: ['typescript']
      less:
        files: ['theme/**/*.less']
        tasks: ['less']

    handlebars:
      options:
        processName: (path) ->
          path.replace(/^.*[\\\/]/, '')
      all:
        files: 'build/template.js': ['src/**/*.hbs']

    typescript:
      base:
        src: 'src/Rating.ts'
        dest: 'build/rating.js'
        options:
          target: 'es5'
          references: [
            "packages/reference/**/*.d.ts"
          ]
    copy:
      main:
        files: [
          expand: true
          src: ['img/**']
          dest: 'build/'
        ,
          expand: true
          src: 'packages/js/handlebars.js/dist/handlebars.runtime.js'
          dest: 'build/lib/'
          flatten: true,
          filter: 'isFile'
        ]

    clean:
      build:
        src: ["build"]

    uglify:
      dist:
        files:
          'build/rating.min.js': [
            'build/template.js'
            'build/rating.js'
          ]
          'build/rating.standalone.js': [
            'build/lib/handlebars.runtime.js'
            'build/template.js'
            'build/rating.js'
          ]

  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-typescript'
  grunt.loadNpmTasks 'grunt-contrib-handlebars'


  grunt.registerTask('build', [
    'clean:build'
    'less:theme'
    'typescript'
    'handlebars'
    'copy'
    'uglify'
  ])