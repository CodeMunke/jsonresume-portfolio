FROM node:16.14.2-slim

#Skip the chromium download for puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

#Define the user's home dir
ENV USR_HOME=/home/${USR}

#Get openssh and sudo
RUN apt-get update && apt-get install -y openssh-server sudo bash-completion

#Ensure that the bundled chromium is working with puppeteer
RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

#Make the new user using the args supplied
RUN useradd $USR
RUN echo "$USR:$PWD" | chpasswd
RUN usermod -aG sudo $USR

#Define the working directory
WORKDIR ${USR_HOME}/srv

#Set up sshd keys
RUN mkdir /var/run/sshd
RUN mkdir ${USR_HOME}/.ssh
COPY docker/sshd_config /etc/ssh/

#Copy over the site source
COPY package*.json ./
COPY build/web ./

#Copy over the initialization script
COPY docker/init.sh /usr/local/bin/

#Restrict access to the user-level
RUN chown -R ${USR}:${USR} ${USR_HOME}/srv

#Prepeare the node environment
RUN npm ci --omit=dev

ENV PWD=null SSH_ASKPASS=null

#Initialize the container using the init script
CMD ["bash","init.sh"]