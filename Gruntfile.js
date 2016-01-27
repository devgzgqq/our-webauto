/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        //合并文件 concatCss合并css文件，concatJs合并js文件
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
            },
            concatCss: {
                src: ['src/css/*.css', '!src/css/OurUI.css'],
                dest: 'src/css/OurUI.css'
            },
            concatJs: {
                src: ['src/js/*.js'],
                dest: 'build/js/OurUI.js'
            }
        },

        //拷贝html文件到发布目录
        copy: {
            copyHtml: {
                expand: true,
                cwd: 'src/page/',
                src: '**',
                dest: 'build/',
                flatten: false,
                filter: 'isFile',
            },
            copyLib: {
                expand: true,
                cwd: 'src/js/',
                src: 'libs/**',
                dest: 'build/js',
            },
            copyImg: {
                expand: true,
                cwd: 'src/images/',
                src: '**',
                dest: 'build/images',
            }
        },

        //合并图标文件
        sprite: {
            options: {
                imagepath: 'src/images/sprite/',
                imagepath_map: null,
                spritedest: 'build/images/',
                spritepath: '../images',
                padding: 2,
                useimageset: false,
                newsprite: false,
                spritestamp: false,
                cssstamp: false,
                algorithm: 'binary-tree',
                // 默认使用`pngsmith`图像处理引擎
                engine: 'pngsmith'
            },
            autoSprite: {
                files: [{
                    // 启用动态扩展
                    expand: true,
                    // css文件源的文件夹
                    cwd: 'src/css/',
                    // 匹配规则
                    src: 'OurUI.css',
                    // 导出css和sprite的路径地址
                    dest: 'build/css/',
                    // 导出的css名
                    ext: '.css'
                }]
            }
        },

        //压缩css生成.min.css文件
        cssmin: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'build/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/css/',
                    ext: '.min.css'
                }]
            }
        },

        //压缩JS，生产.min.js文件
        uglify: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'build/js/',
                    src: ['*.js', '!*.min.js'],
                    dest: 'build/js/',
                    ext: '.min.js'
                }]
            }
        },

        watch: {
            script: {
                files: 'src/js/*',
                tasks: ['concat', 'uglify', 'copy:copyLib']
            },
            html: {
                files: 'page/*',
                tasks: ['copy:copyHtml']
            },
            css: {
                files: 'src/css/*',
                tasks: ['concat', 'sprite','cssmin']
            },
            img: {
                files: 'src/images/*',
                tasks: ['copy:copyImg']
            }
        },
    });

    // 加载指定插件任务
    grunt.loadNpmTasks('grunt-css-sprite');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 默认执行的任务
    grunt.registerTask('default', ['concat', 'sprite', 'copy', 'cssmin', 'uglify']);

    grunt.registerTask('watch', ['watch']);

};
