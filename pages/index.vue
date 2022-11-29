<template>
  <!-- <main> -->
  <LoginScreen @request-authorization="requestAuthorization" />
  <!-- </main> -->
</template>

<script setup lang="ts">
import { useAuthDataStore } from "~/store/auth";

const authDataStore = useAuthDataStore();
const {accountURL, clientId, redirectURI, scope} = authDataStore;

const requestAuthorization = () => {
  window.location.href = `${accountURL}/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectURI}`;
};
</script>

<style lang="postcss" scoped>
main {
  @apply h-full;
}
</style>