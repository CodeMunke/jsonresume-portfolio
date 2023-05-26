FROM node:16.14.2-slim

#Define the working directory
WORKDIR /usr/src/app

#Skip the chromium download for puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
#Supply username and password at build-time using --build-arg
ARG username
ARG passwd

#For tidiness, define the user's home dir
ENV USR_HOME=/home/${username}

#Get openssh and sudo
RUN apt-get update && apt-get install -y openssh-server sudo

#Ensure that the bundled chromium is working with puppeteer
RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

#Make the new user using the args supplied
RUN useradd $username
RUN echo "$username:$passwd" | chpasswd
RUN usermod -aG sudo $username

#Set up sshd keys
RUN mkdir /var/run/sshd
COPY assets/docker/sshd_config /etc/ssh/
#Generate your own keys using grunt before building the image
COPY build/assets/ssh/id_rsa.pub ${USR_HOME}/.ssh/authorized_keys
RUN chmod -R go= ${USR_HOME}/.ssh
RUN chown -R ${username}:${username} ${USR_HOME}/.ssh

#Expose the ssh port
EXPOSE 22

#Copy over the site source
COPY package*.json ./
COPY server.mjs ./
COPY index.js ./
COPY tpl/index.js ./tpl/index.js
COPY moment-precise-range.js ./
COPY assets/css/theme.css ./assets/css/theme.css
COPY assets/onepage/index.js ./assets/onepage/index.js
COPY assets/onepage/resume.hbs ./assets/onepage/resume.hbs
COPY assets/onepage/style.css ./assets/onepage/style.css

#Copy over the initialization script
COPY assets/docker/init.sh /usr/local/bin/

#Prepeare the node environment
RUN npm ci --omit=dev

#Initialize the container using the init script
CMD ["bash","init.sh"]