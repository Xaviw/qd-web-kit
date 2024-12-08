<script setup lang="ts">
import Header from '@/layouts/Header/index.vue'
import Sider from '@/layouts/Sider/index.vue'
import { ref } from 'vue'
import { RouterView } from 'vue-router'

const collapsed = ref(true)
const collapsedWidth = ref(62)
</script>

<template>
  <n-layout has-sider class="h-full">
    <n-layout-sider
      bordered
      show-trigger
      collapse-mode="width"
      :collapsed-width
      :collapsed
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <Sider :collapsed :collapsed-width />
    </n-layout-sider>

    <n-layout content-class="flex flex-col">
      <n-layout-header bordered class="flex items-center gap-6 p-4">
        <Header />
      </n-layout-header>

      <!-- tabs -->
      <n-layout-header bordered>
        123
      </n-layout-header>

      <n-layout-content class="bg-background-deep">
        <RouterView />
      </n-layout-content>

      <!-- <n-layout-footer bordered>
        footer
      </n-layout-footer> -->
    </n-layout>
  </n-layout>
</template>
