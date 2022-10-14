<template>
  <div>
    <h1 @click="requestAuthorization">bora</h1>
  </div>
</template>
const accountURL = "https://accounts.spotify.com";
const clientId = config.public.clientId;
const redirectURI = "http://localhost:3000/";
const scope =
  "user-read-playback-state user-follow-read user-read-currently-playing user-read-playback-position user-top-read user-read-recently-played";
const requestAuthorization = () => {
  window.location.href = `${accountURL}/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectURI}`;
};
