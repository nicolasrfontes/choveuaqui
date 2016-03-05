module.exports = function( grunt ) {

    grunt.initConfig({

        uglify : {
            options : {
                mangle : false
            },

            my_target : {
                files : {
                    'public/assets/build/chuvaController.js' : [ 'public/assets/js/controllers/chuvaController.js' ]
                }
            }
        } // uglify

    });


    // Plugins do Grunt
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );


    // Tarefas que serão executadas
    grunt.registerTask( 'default', [ 'uglify' ] );

};