FROM node:16.14.2-slim

WORKDIR /usr/src/app

# Uncomment to skip the chromium download when installing puppeteer. If you do,
# you'll need to launch puppeteer with:
#     browser.launch({executablePath: 'google-chrome-stable'})
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY server.mjs ./
COPY index.js ./
COPY tpl/index.js ./tpl/index.js
COPY moment-precise-range.js ./
COPY assets/css/theme.css ./assets/css/theme.css
COPY assets/onepage/index.js ./assets/onepage/index.js
COPY assets/onepage/resume.hbs ./assets/onepage/resume.hbs
COPY assets/onepage/style.css ./assets/onepage/style.css

RUN npm ci --omit=dev

CMD [ "node", "server.mjs" ]