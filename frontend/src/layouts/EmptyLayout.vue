<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="flex flex-center px-4 max-w-[1200px] min-w-[410px] m-auto w-full">
      <router-view />
    </q-page-container>

    <div class="bg-primary flex m-auto justify-center p-4 text-white text-base">
      <div class="max-w-[1200px] min-w-[410px]">
          Hello world
      </div>
    </div>
  </q-layout>
</template>

<script setup>
</script>
