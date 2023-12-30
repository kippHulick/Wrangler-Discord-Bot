FROM node:latest

EXPOSE 3000

ARG TOKEN
ARG GUILD_ID
ARG CLIENT_ID
ARG SPOTIFY_ID
ARG SPOTIFY_SECRET
ARG DB_TOKEN
ARG SRA_KEY
ARG SERP_KEY

RUN apt-get update ; apt-get -y install \
  build-essential \
  libcairo2-dev \
  libpango1.0-dev \
  libjpeg-dev \
  libgif-dev \
  librsvg2-dev \
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
  zlib1g-dev \
  ffmpeg

COPY package*.json /usr/src/bot

COPY . .

ENV TOKEN: ${ TOKEN }
ENV GUILD_ID: ${ secrets.GUILD_ID }
ENV CLIENT_ID: ${ secrets.CLIENT_ID }
ENV SPOTIFY_ID: ${ secrets.SPOTIFY_ID }
ENV SPOTIFY_SECRET: ${ secrets.SPOTIFY_SECRET }
ENV DB_TOKEN: ${ secrets.DB_TOKEN }
ENV SRA_KEY: ${ secrets.SRA_KEY }
ENV SERP_KEY: ${ secrets.SERP_KEY }

RUN npm install

CMD ["node", "index.js"]
