FROM node:latest

RUN apt-get update ; apt-get install -y git build-essential gcc make yasm autoconf automake cmake libtool checkinstall libmp3lame-dev pkg-config libunwind-dev zlib1g-dev libssl-dev

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

RUN wget https://launchpad.net/ubuntu/+archive/primary/+sourcefiles/ffmpeg/7:6.1-5ubuntu1/ffmpeg_6.1.orig.tar.xz
RUN tar xf ffmpeg_6.1.orig.tar.xz; rm -r ffmpeg_6.1.orig.tar.xz
RUN cd ./ffmpeg-6.1; ./configure --enable-gpl --enable-libmp3lame --enable-decoder=mjpeg,png --enable-encoder=png --enable-openssl --enable-nonfree


RUN cd ./ffmpeg-6.1; make
RUN  cd ./ffmpeg-6.1; make install

COPY package*.json /usr/src/bot

COPY . /usr/src/bot

RUN npm install

CMD ["node", "index.js"]