<template>
  <UserScreen />
</template>

<script setup lang="ts">
import { useAuthDataStore } from "~/store/auth";

interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
  token_type: "Bearer";
}

const authDataStore = useAuthDataStore();
const {
  accountURL,
  clientId,
  clientSecret,
  redirectURI,
  setAccessToken,
  setRefreshToken,
} = authDataStore;
onMounted(() => checkIfUserIsAuthorized());
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
    refresh_token: authDataStore.refreshToken,
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

const handleAuthorizationResponse = ({
  access_token,
  refresh_token,
}: TokenResponse) => {
  setAccessToken(access_token || "");
  setRefreshToken(refresh_token || "");
  getUserProfile();
};

const getUserProfile = async () => {
  await $fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + authDataStore.accessToken,
    },
  }).then(
    (response) => {
      console.log(response);
    },
    (error) => console.error(error)
  );
};
</script>

<style lang="postcss" scoped>
</style>