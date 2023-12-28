FROM node:latest

EXPOSE 443
EXPOSE 80
EXPOSE 50000-65535/udp

RUN apt-get update ; apt-get -y install \
  autoconf \
  automake \
  build-essential \
  cmake \
  git-core \
  libass-dev \
  libfreetype6-dev \
  libgnutls28-dev \
  libmp3lame-dev \
  libsdl2-dev \
  libtool \
  libva-dev \
  libvdpau-dev \
  libvorbis-dev \
  libxcb1-dev \
  libxcb-shm0-dev \
  libxcb-xfixes0-dev \
  meson \
  ninja-build \
  pkg-config \
  texinfo \
  wget \
  yasm \
  zlib1g-dev

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