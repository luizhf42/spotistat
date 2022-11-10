<template>
  <div>
    <h1>
      Check your Spotify listening stats. <br />
      For free.
    </h1>
    <button @click="emit('request-authorization')">Log in and enjoy</button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["request-authorization"]);
</script>

<style lang="postcss" scoped>
div {
  @apply h-full w-full bg-loginBg flex flex-col justify-center items-center;

  & h1 {
    @apply text-5xl sm:text-6xl text-mainGreen text-center mb-8 mx-4 font-bold;
  }

  & button {
    @apply text-lg p-4 bg-mainGreen font-bold uppercase rounded-full shadow-[0_0_4px_0px] shadow-greenShadow
    hover:scale-[1.02] hover:bg-mainGreenHover;
  }
}
</style>