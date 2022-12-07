<template>
  <main>
    <article class="user-info">
      <img :src="profile.images[0].url" alt="User profile pic">
      <div>
        <small>Profile</small>
        <h1>
          <a :href="profile.external_urls.spotify" target="_blank" rel="noopener noreferrer">{{ profile.display_name
          }}</a>
        </h1>
        <p>{{ profile.followers.total }} followers</p>
      </div>
    </article>
  </main>
</template>

<script setup lang="ts">
import { useUserDataStore } from "~/store/user";
const userData = useUserDataStore();
const { profile } = userData;
const userProfilePic = profile.images[0].url
</script>

<style lang="postcss" scoped>
.user-info {
  @apply bg-mainGreen flex items-center gap-4 h-64 px-8;

  & img {
    @apply h-4/5 rounded-full;
  }

  & small {
    @apply text-xs font-bold uppercase;
  }

  & h1 {
    @apply text-6xl font-bold mb-2;
  }

  & p {
    @apply text-lg;
  }
}
</style>