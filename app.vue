<template>
    <LoginScreen @request-authorization="requestAuthorization"/>
</template>

<script setup lang="ts">
interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
  token_type: "Bearer";
}

const config = useRuntimeConfig();
const accountURL = "https://accounts.spotify.com";
const clientId = config.public.clientId;
const clientSecret = config.public.clientSecret;
const redirectURI = "http://localhost:3000/";
const scope =
  "user-read-playback-state user-follow-read user-read-currently-playing user-read-playback-position user-top-read user-read-recently-played";
let accessToken: string = "";
let refreshToken: string = "";

onMounted(() => {
  checkIfUserIsAuthorized();
});

const requestAuthorization = () => {
  window.location.href = `${accountURL}/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectURI}`;
};

const checkIfUserIsAuthorized = () => {
  if (window.location.search.length) {
    handleRedirect();
  }
};

const handleRedirect = () => {
  let code = getCode();
  requestAccessToken(code);
  window.history.pushState("", "", redirectURI); // remove params from URL
};

const getCode = () => {
  let code = null;
  const queryString = window.location.search;
  if (queryString.length > 0) {
    const URLParams = new URLSearchParams(queryString);
    code = URLParams.get("code");
  }
  return code;
};

const requestAccessToken = (code: string) => {
  const params = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectURI,
    client_id: clientId,
    client_secret: clientSecret,
  };
  callAuthorizationApi(params);
};

function refreshAccessToken() {
  const params = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
  };
  callAuthorizationApi(params);
}

const callAuthorizationApi = async (params: object) => {
  await $fetch(`${accountURL}/api/token`, {
    method: "POST",
    params: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
  }).then(
    (response: TokenResponse) => handleAuthorizationResponse(response),
    (error) => console.error(error)
  );
};

function handleAuthorizationResponse({
  access_token,
  refresh_token,
}: TokenResponse) {
  accessToken = access_token || "";
  refreshToken = refresh_token || "";
  // checkIfUserIsAuthorized();
}
</script>

