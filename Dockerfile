#
# JAVA needed for firebase emulators
#
FROM maven:3.6.3-jdk-11

#
# NODE JS and NPM (~120MB)
#
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
RUN apt-get install nodejs && apt-get clean

#
# FIREBASE (~61MB)
#
RUN npm install firebase-tools@7.12.1 -g

#
# CHROME DEV and PUPPETEER (~400MB)
#
RUN  apt-get update \
     # See https://crbug.com/795759
     && apt-get install -yq libgconf-2-4 \
     # Install latest chrome dev package, which installs the necessary libs to
     # make the bundled version of Chromium that Puppeteer installs work.
     && apt-get install -y wget --no-install-recommends \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     && apt-get install -y google-chrome-unstable --no-install-recommends \
     && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

#
# YARN (~8MB)
#
RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.21.1
ENV PATH="/root/.yarn/bin:${PATH}"

ENTRYPOINT ["/bin/sh"]