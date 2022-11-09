<template>
  <div>
    <h1>
      Check your Spotify listening stats. <br />
      For free.
    </h1>
    <!-- TODO: emit click event to trigger requestAuthorization function -->
    <button>Log in and enjoy</button>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="postcss" scoped>
div {
  @apply h-full w-full bg-loginBg flex flex-col justify-center items-center;

  & h1 {
    @apply text-6xl text-mainGreen text-center mb-8 font-bold;
  }

  & button {
    @apply p-4 bg-mainGreen font-bold uppercase rounded-full hover:scale-[1.02] hover:bg-mainGreenHover;
  }
}
</style>