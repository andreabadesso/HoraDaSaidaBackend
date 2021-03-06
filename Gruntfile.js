module.exports = function(grunt) {

    grunt.initConfig({
        simplemocha: {
            options: {
                globals: ['expect'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'tap'
            },
            all: {
                src: ['tests/**/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.registerTask('default', ['simplemocha']);
};
