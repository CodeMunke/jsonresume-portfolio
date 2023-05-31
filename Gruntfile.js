const dotenv = require('dotenv')
const fs = require('fs');
const dhparam = require('dhparam')

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
            generate_ssh: {
                cmd: function() {
                    grunt.log.writeln("Generating SSH keys...");
                    dotenv.config({path: grunt.option('env_file') || './docker.env'});
                    const passphrase = process.env.SSH_ASKPASS;
                
                    process.env['SSH_ASKPASS'] = passphrase
                    process.env['DISPLAY'] = 1
                    const sshPath = __dirname + "\\build\\ssh"

                    //If the ssh folder doesn't exist, make one
                    if (!fs.existsSync(sshPath)){
                        fs.mkdirSync(sshPath, { recursive: true });
                    }
                    //If it exists but isn't empty, delete everything in it
                    else if (fs.readdirSync(sshPath).length) {
                        grunt.log.writeln("Previous SSH keys found. Overwriting...")
                        fs.rmSync(sshPath, {recursive: true})
                        fs.mkdirSync(sshPath, { recursive: true });
                    }
                    return `ssh-keygen -t rsa -b 4096 -f ${sshPath}\\id_rsa`
                }
            },
            build_img: {
                cmd: function(img_name="resume_server") {
                    grunt.log.writeln("Building Docker image...");

                    dotenv.config({path: grunt.option('env_file') || './docker.env'});

                    const username = process.env.USR;
                    const pwd = process.env.PASSWORD;

                    return `docker build -t ${img_name} --build-arg username=${username} --build-arg passwd=${pwd} .`
                }
            },
            run_docker: {
                cmd: function(img_name="resume_server") {
                    dotenv.config({path: grunt.option('env_file') || './docker.env'});
                    
                    const port = process.env.PORT;
                    const pubkey = process.env.PUBKEY_PATH;
                    const user = process.env.USR;
                    
                    return `docker run -p ${port}:3000 -p 22:22 --env-file ./.env -v ${pubkey}:/home/${user}/.ssh/authorized_keys ${img_name}`
                }
            },
            compose_docker: {
                cmd: function() {
                    grunt.log.writeln("Building project using docker-compose.yml...");

                    return 'docker-compose up -d'
                }
            },
            generate_dh: {
                cmd: function() {
                    const dhPath = __dirname + "\\build\\dhparam"

                    //If the dhparam folder doesn't exist, make one
                    if (!fs.existsSync(dhPath)){
                        fs.mkdirSync(dhPath, { recursive: true });
                    }
                    //If it exists but isn't empty, delete everything in it
                    else if (fs.readdirSync(dhPath).length) {
                        grunt.log.writeln("Previous Diffie-Hellman keys found. Overwriting...")
                        fs.rmSync(dhPath, {recursive: true})
                        fs.mkdirSync(dhPath, { recursive: true });
                    }
                    
                    grunt.log.writeln("Generating 4096-bit Diffie-Hellman key. Such a task is no joke. Please wait...")
                    var dh = dhparam(4096);
                    fs.writeFileSync(dhPath + '\\dhparam-4096.pem', dh);

                    return 'echo Complete!'
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
    grunt.registerTask('deploy', 'Deploy the project into Docker', function(mode, img_name="resume_server") {
        if (!(mode == 'image' || mode == 'project')) {
            // grunt.log.writeln(mode)
            grunt.log.error('Incorrect or absent deployment mode. Specify whether you want to deploy the image only (grunt deploy:image) or the Docker Compose project (grunt deploy:project).')
        
            return false;
        }
        if (!grunt.option('env_file')) {
            grunt.log.writeln("No docker env file specified. Defaulting to docker.env...")

            if (!fs.existsSync('./docker.env')){
                grunt.log.writeln("No docker env file found! Generating with defaults...")

                const defaultEnv = "PORT=3000\nSSH_ASKPASS=jsonresume\nPUBKEY_PATH=.\\build\\ssh\\id_rsa.pub\nUSR=user\nPASSWORD=docker";
                fs.writeFileSync('./docker.env', defaultEnv);
            }
        }

        grunt.log.writeln("Building project...")
        tasks = [
            'build',
            `exec:generate_ssh`,
        ]

        if (mode == 'image') {
            tasks.push(`exec:build_img:${img_name}`)
        }
        else {
            tasks.push('exec:generate_dh','exec:compose_docker')
        }

        grunt.task.run(tasks)
    });
    grunt.registerTask('run_docker', ['exec:run_docker']);
}
