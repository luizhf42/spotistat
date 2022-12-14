<template>
  <UserScreen v-if="userData.profile" />
</template>

<script setup lang="ts">
import { useAuthDataStore } from "~/store/auth";
import { useUserDataStore } from "~/store/user";

interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
  token_type: "Bearer";
}

const authData = useAuthDataStore();
const userData = useUserDataStore();
const { accountURL, clientId, clientSecret, redirectURI } = authData;

onMounted(() => checkIfUserIsAuthorized());

const checkIfUserIsAuthorized = () => {
  if (window.location.search.length) {
    handleRedirect();
  } else navigateTo("/");
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
    refresh_token: authData.refreshToken,
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
  authData.accessToken = access_token || authData.accessToken;
  authData.refreshToken = refresh_token || authData.refreshToken;
  getUserProfile();
};

const getUserProfile = async () => {
  await $fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + authData.accessToken,
    },
  }).then(
    (response) => {
      console.log(response);
      userData.profile = response;
    },
    (error) => console.error(error)
  );
};

</script>

<style lang="postcss" scoped>

</style>