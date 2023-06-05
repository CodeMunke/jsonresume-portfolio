const fs = require('fs');
const dhparam = require('dhparam')
const archiver = require('archiver');
const prompt = require('prompt-sync')({sigint: true})

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
              "src/static/elegant/css/style.css": "src/static/elegant/assets/less/theme.less"
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
                cmd: "node ./build/web/server.mjs"
            },
            generate_ssh: {
                cmd: function() {
                    const sshPath = __dirname + "\\build\\ssh"
                    //If the ssh folder doesn't exist, make one
                    if (!fs.existsSync(sshPath)){
                        fs.mkdirSync(sshPath, { recursive: true });
                    }
                    //If it exists but isn't empty, delete everything in it
                    else if (fs.readdirSync(sshPath).length) {
                        if (grunt.option('over'))
                            grunt.log.writeln("Previous SSH keys found. Overwriting...")
                        else
                        {
                            grunt.log.error("Previous SSH keys found. Aborting...");
                            grunt.log.error("Start the task with '--over' option to overwrite them.");
                            return false
                        }

                        fs.rmSync(sshPath, {recursive: true})
                        fs.mkdirSync(sshPath, { recursive: true });
                    }

                    const passphrase = prompt('Please enter a passphrase for the RSA keys: ')
                    if (passphrase === null || passphrase == '') {
                        grunt.log.error("Passphrase hasn't been entered. Aborting...");
                        return false
                    }

                    grunt.log.writeln("Generating SSH keys...");
                    process.env['SSH_ASKPASS'] = passphrase
                    process.env['DISPLAY'] = 1

                    return `ssh-keygen -t rsa -b 4096 -f ${sshPath}\\id_rsa`
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
                        if (grunt.option('over'))
                            grunt.log.writeln("Previous Diffie-Hellman keys found. Overwriting...")
                        else
                        {
                            grunt.log.error("Previous Diffie-Hellman keys found. Aborting...");
                            grunt.log.error("Start the task with '--over' option to overwrite them.");
                            return false
                        }
                        fs.rmSync(dhPath, {recursive: true})
                        fs.mkdirSync(dhPath, { recursive: true });
                    }
                    
                    grunt.log.writeln("Generating 4096-bit Diffie-Hellman key. Such a task is no joke and will take a long, LONG time. Please wait...")
                    var dh = dhparam(4096);
                    fs.writeFileSync(dhPath + '\\dhparam-4096.pem', dh);

                    return 'echo Complete!'
                }
            }
        },
        copy: {
            fonts: {
                cwd: './src/static/elegant/assets',
                src: 
                [ 
                    'icomoon/fonts/**',
                    'google/fonts/**'
                ],
                dest: './build/web/static/fonts',
                filter: 'isFile',
                expand: true,
                flatten: true
            },
            copy_elegant: {
                cwd: './src/static',
                src: 
                [ 
                    'elegant/moment-precise-range.js',
                    'elegant/index.mjs',
                    'elegant/tpl/index.js',
                    'elegant/css/style.css',
                    '*'
                ],
                dest: './build/web/static',
                expand: true
            },
            copy_onepage: {
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
                src: [ 
                    './build/web',
                ]
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
        'copy:copy_elegant',
        'copy:copy_onepage',
        'copy:fonts',
        'copy:server',
        /* Uncomment this item (and the comma above) if you add a favicon.ico
           in the project root. You'll also need to uncomment the <link...> tag
           at the top of resume.template.
         */
        // 'copy:favicon'
    ]);
    grunt.registerTask('serve', [
        'build',
        'exec:run_server'
    ]);
    grunt.registerTask('compile:pug', ['exec:compile_pug']);
    grunt.registerTask('archive', function() {
        var done = this.async();
        grunt.log.writeln("Now packing your project into jsonresume.zip...")

        // create a file to stream archive data to.
        const output = fs.createWriteStream(__dirname + '/jsonresume.zip');
        const archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });

        // listen for all archive data to be written
        // 'close' event is fired only when a file descriptor is involved
        output.on('close', function() {
            grunt.log.ok(archive.pointer() + ' total bytes');
            grunt.log.ok('archiver has been finalized and the output file descriptor has closed.');
        });
        
        // This event is fired when the data source is drained no matter what was the data source.
        // It is not part of this library but rather from the NodeJS Stream API.
        // @see: https://nodejs.org/api/stream.html#stream_event_end
        output.on('end', function() {
            grunt.log.writeln('Data has been drained');
        });
        
        // good practice to catch warnings (ie stat failures and other non-blocking errors)
        archive.on('warning', function(err) {
            if (err.code === 'ENOENT') {
                grunt.log.writeln(err.message)
            } else {
                grunt.log.error(err.message)
                throw err;
            }
        });

        // good practice to catch warnings (ie stat failures and other non-blocking errors)
        archive.on('end', function() {
            grunt.log.ok('Archivation complete. A total of %d bytes have been written.', archive.pointer());
        });
        
        // good practice to catch this error explicitly
        archive.on('error', function(err) {
            grunt.log.error(err.message)
            throw err;
        });

        archive.on('entry', function(entry) {
            grunt.log.writeln(`${entry.name} written, total size of ${entry.stats.size} bytes`);
        });

        // pipe archive data to the file
        archive.pipe(output);

        archive.file('Dockerfile');
        archive.file('package-lock.json');
        archive.file('package.json');
        archive.file('.dockerignore');
        archive.file('docker-compose.yml');
        archive.file('.env');
        archive.file('deploy.ps1');
        archive.directory('nginx-conf/');
        archive.directory('build/');
        archive.directory('docker/');

        archive.finalize().then(() => done())
    })
    grunt.registerTask('pack', 'Build and pack the entire project into a deployable archive', function() {
        tasks = [
            'build',
            `exec:generate_ssh`,
            'exec:generate_dh',
            'archive'
        ]
        grunt.task.run(tasks)
    });
}
