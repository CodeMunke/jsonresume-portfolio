# Portfolio complex (CV + Resume) on Docker

A site-portfolio designed to streamline the resume and CV generation process based on two [JSONResume](https://jsonresume.org/) themes and a ~~little bit~~ LOT of CSS/JS greasing, hosted on nodejs Docker container, NGINX reverse proxy and an [automatic certbot image](https://github.com/gchan/auto-letsencrypt).

## Architecture of the $site

### The site

The site consists of three modules:

1. **Main/CV module**: for portfolio serving and CV generation. It uses the [Elegant](https://github.com/mudassir0909/jsonresume-theme-elegant) JSONResume theme as base. Written using JS and LESS + Pug/Jade.
2. **Resume module**: made for serving and generation of the **truncated one-page resume**. Based on the [OnePage](https://github.com/ainsleyc/jsonresume-theme-onepage) JSONResume theme. Extremely simplistic, written in JS + CSS + HBS placed in `src/static/onepage/`;
3. **Backend module**: made to serve and handle the above frontend modules. Made with NodeJS. Located entirely within `server.mjs`.

### The Docker container

The `resume_srv` container is created to support puppeteer and creates a user with a given `USR` and `PWD` variables being used as username and password respectively. Both of these variables are passed at build-time.

The container that hosts the site also can be accessed via SSH. The public key is mounted as `build/ssh/id_rsa.pub` and you should use your private key `build/ssh/id_rsa` to authenticate because password-based authentication is disabled. Using SSH, you can do hot changes to the server if necessary.

## The NGINX reverse proxy

The `webserver` container is based on a pretty much a bog-standard, unmodified nginx-alpine image, but with a ton of mounts.

## The automatic certbot

The `certbot` container is designed to automatically check for SSL certificate validity.

## How to deploy

### **Define resume.json**

Make your own resume.json as specified and either referece it in your file system or host it elsewhere (I, for example, host it on GitHub gists). There are key differences between the usual `resume.json` format and this one:

* It has and uses `resume.basics.objective`, the objective of your job search;
* It Uses `resume.picture` instead of `resume.image`;
* Since this project is based on the Elegant theme, [which supports Markdown rendering](https://github.com/mudassir0909/jsonresume-theme-elegant#markdown-supported) you can format your text in this way;
* It uses `resume.work[i].url` instead of `resume.work[i].website`;
* The server truncates everything in `resume.json` that is placed between the [word joiners](https://unicode-table.com/en/2060/) when it renders the resume. ***They won't be removed when rendering the full CV.***
  
### **Prepare the development environment**

```bash
git clone https://github.com/CodeMunke/jsonresume-portfolio.git
npm install -g grunt
npm install -g pug-cli
cd jsonresume-portfolio
npm install
```

### **Build and run!**

```bash
#To build AND serve
$ grunt serve
...
Serving CV at: http://localhost:3000/
Serving resume at: http://localhost:3000/{resumeEndpoint}

#To build only
grunt build

#To serve only
$ grunt exec:run_server
...
Serving CV at: http://localhost:3000/
Serving resume at: http://localhost:3000/{resumeEndpoint}
```

Don't be alarmed if the site loads without fonts or icons because they're supposed to be hosted locally with NGINX.

### **Deploy to Docker**


Before you can begin, you need to do 3 things to your project:

* Build it using `grunt build`
* Generate RSA keys for SSH using `grunt exec:generate_ssh`. You will be prompted to enter a passphrase.
* Generate the Diffie-Hellman keys using `grunt exec:generate_dh`. It's a very long process but it gets done eventually, so don't be alarmed.

Then, you need to add the `.env` environment variable file.

```bash
#URL to resume.json
JSONRESUME_URL=link_goes_here

#Pubkey for the server to mount
PUBKEY=./build/ssh/id_rsa.pub

#Username of the user
USR=docker

#Password of the user
PWD=resume

#Internal path to the webroot directory
WEBROOT=/var/www/static

#Email to register the certificate with
EMAIL=ex.ex@gmail.com

#Hosting domain
DOMAIN=mydomain.com
```

This file will be used by **docker-compose** to substitute the variables specified in it.

### **⚠️ IMPORTANT ⚠️**

Before deployment, make sure that:

1. All `.sh` files are in `LF` End of Line format, otherwise these scripts **WILL NOT LAUNCH.**
2. That the `.env` file described above is in the project root, where the `docker-compose` file is. Otherwise, it **WILL NOT LAUNCH**.

### **Deploying on different OSes**

#### On Windows (that supports WSL 2)

After this, you can just launch `deploy.ps1` Powershell script as administrator. Don't forget to change the script running permissions by running `Set-ExecutionPolicy RemoteSigned` as administrator.

#### On Linux-based OSes

Launch `deploy.sh` in bash. Whether it requires to be run as `sudo` or `root` depends on your [docker configuration](https://askubuntu.com/questions/477551/how-can-i-use-docker-without-sudo).

### **Um... Portability?**

Got it covered. Run `grunt pack` to do all preparations to deployment and pack it into a .zip archive or run `grunt archive` if you did them already to just package it.

Unpack the archive on the host machine of your choice, edit the `.env` variables as you see fit and run `deploy.ps1` or `deploy.sh` depending on the OS.

### **Regarding modifications and contributions**

Just follow the ***DANGER*** signs from [both](https://github.com/mudassir0909/jsonresume-theme-elegant#contributing) [repos](https://github.com/ainsleyc/jsonresume-theme-onepage) and everything should be A-OK 😉

**And now, for the fun stuff!**

## Feature overview

The key feature of this portfolio complex is that it has TWO buttons:

* *Download resume*; this one exports the CV into a truncated *hopefully* one-page resume *(depends on how much of your CV you're willing to let go of using the word joiners)*. No bling; no icons; spartan, strct and short.
* *Download full CV*; this one, however, does a full export of your CV with no compomises. Icons, sections, socials, all rendered into a neat printable form.
* *SSH access to the server*; the server can be accessed via SSH with a private key.
* *Super-secure!*; the web security measures undertaken make this site pretty secure. Proof [here](https://www.ssllabs.com/ssltest/analyze.html?d=sda.ddns.net) and [there](https://securityheaders.com/?q=sda.ddns.net&followRedirects=on).

Both of them export the CV and truncated resume into neat PDFs, yay! 😄
