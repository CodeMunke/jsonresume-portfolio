module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
          development: {
            options: {
              paths: ["src/static/elegant/assets"]
            },
            files: {
              "src/static/elegant/style.css": "src/static/elegant/assets/less/theme.less"
            }
          }
        },
        watch: {
            styles: {
                files: ['src/static/elegant/assets/less/**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            },
            pug: {
                files: ['src/static/elegant/index.pug'],
                tasks: ['exec:compile_pug'],
                options: {
                    nospawn: true
                }
            }
        },
        exec: {
            compile_pug: {
                cmd: 'pug -c ./src/static/elegant/index.pug --out ./src/static/elegant/tpl && echo module.exports = { renderResume: template }; >> ./src/static/elegant/tpl/index.js'
            },
            run_server: {
                cmd: "node src/server.mjs"
            },
            generate_keys: {
                cmd: function(passphrase) {
                    const fs = require('fs');
                    const path = require("path");

                    grunt.log.writeln("Generating SSH keys...")
                    process.env['SSH_ASKPASS'] = passphrase
                    process.env['DISPLAY'] = 1
                    const sshPath = __dirname + "\\build\\ssh"

                    //If the ssh folder doesn't exist, make one
                    if (!fs.existsSync(sshPath)){
                        fs.mkdirSync(sshPath, { recursive: true });
                    }
                    //If it exists but isn't empty, delete everything in it
                    else if (fs.existsSync(sshPath + "\\id_rsa")) {
                        grunt.log.writeln("Previous SSH keys found. Overwriting...")
                        fs.readdir(sshPath, (err, files) => {
                            if (err) throw err;

                            for (const file of files) {
                              fs.unlink(path.join(sshPath, file), (err) => {
                                if (err) throw err;
                              });
                            }
                        })
                    }
                    return `ssh-keygen -t rsa -b 4096 -f ${sshPath}\\id_rsa`
                }
            },
            build_img: {
                cmd: function(username, pwd, img_name="resume_server") {
                    grunt.log.writeln("Building Docker image...")
                    return `docker build -t ${img_name} --build-arg username=${username} --build-arg passwd=${pwd} .`
                }
            },
            run_docker: {
                cmd: function(img_name="resume_server") {
                    const dotenv = require('dotenv')
                    dotenv.config();
                    const port = process.env.PORT;
                    
                    return `docker run -p ${port}:${port} -p 22:22 --env-file ./.env ${img_name}`
                }
            }
        },
        copy: {
            resumejson: {
                cwd: './',
                src: [ 'resume.json' ],
                dest: './node_modules/resume-schema',
                expand: true
            },
            build_less: {
                cwd: './src/static/elegant',
                src: 
                [ 
                    'style.css'
                ],
                dest: './build/web/static/elegant',
                expand: true
            },
            build_main: {
                cwd: './src/static',
                src: 
                [ 
                    'elegant/moment-precise-range.js',
                    'elegant/index.js',
                    'elegant/tpl/index.js'
                ],
                dest: './build/web/static',
                expand: true
            },
            build_onepage: {
                cwd: './src/static/onepage',
                src: 
                [ 
                    'resume.hbs',
                    'style.css',
                    'index.js'
                ],
                dest: './build/web/static/onepage',
                expand: true
            },
            favicon: {
                cwd: './',
                src: [ 'favicon.ico' ],
                dest: './build/web/static',
                expand: true
            },
            server: {
                cwd: './src',
                src: 
                [ 
                    'server.mjs'
                ],
                dest: './build/web',
                expand: true
            }
        },
        clean: {
            build: {
                src: [ 'build' ]
            }
        }
    });

    // Load the plugin that compiles less to css
    grunt.loadNpmTasks('grunt-contrib-less');

    // Load the plugin that watches file changes
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Load the plugin to execute shell commands
    grunt.loadNpmTasks('grunt-exec');

    // Load the plugin to clean directories
    grunt.loadNpmTasks('grunt-contrib-clean')

    // Load the plugin to copy files
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default tasks
    grunt.registerTask('default', ['exec']);
    grunt.registerTask('build', [
        'clean',
        'less',
        'exec:compile_pug',
        'copy:build_main',
        'copy:build_less',
        'copy:build_onepage',
        'copy:server',
        /* Uncomment this item (and the comma above) if you add a favicon.ico
           in the project root. You'll also need to uncomment the <link...> tag
           at the top of resume.template.
         */
        'copy:favicon'
    ]);
    grunt.registerTask('serve', [
        'build',
        'exec:run_server'
    ]);
    grunt.registerTask('compile:pug', ['exec:compile_pug']);
    grunt.registerTask('deploy', 'Deploy the project into Docker', function(passphrase, username, pwd, img_name="resume_server") {
        if (!passphrase) {
            grunt.log.error("Passphrase is required to generate SSH keys.")
            return false
        }
        if (!username) {
            grunt.log.error("Username is required to build the Docker image.")
            return false
        }
        if (!pwd) {
            grunt.log.error("Password is required to build the Docker image.")
            return false
        }
        grunt.log.writeln("Building project...")
        grunt.task.run(['build', `exec:generate_keys:${passphrase}`, `exec:build_img:${username}:${pwd}:${img_name}`])
    });
    grunt.registerTask('run_docker', ['exec:run_docker']);
}
