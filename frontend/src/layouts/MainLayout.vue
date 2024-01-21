<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white border-b-solid border-b-1 border-b-[#ebebeb] flex m-auto justify-center px-4">
      <q-toolbar class="h-[80px] max-w-[1200px] min-w-[410px]">
        <q-toolbar-title>
          <div @click="$router.push('/')" class="font-semibold text-3xl tracking-[-1px] text-black cursor-pointer">
            <span class="text-primary">Inflation</span>Wise
          </div>
        </q-toolbar-title>

        <q-btn
          no-caps
          unelevated
          label="Get your Analysis"
          color="primary"
          @click="$router.push('/analysis')"
          class="p-2 px-4 rounded-lg h-fit"
        />
      </q-toolbar>
    </q-header>

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
