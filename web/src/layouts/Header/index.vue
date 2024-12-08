<script setup lang="ts">
import { useTheme } from '@qd/utils'
import { useFullscreen } from '@vueuse/core'

const { isDark, toggleLightOrDark } = useTheme()

const { toggle, isFullscreen } = useFullscreen()
</script>

<template>
  <!-- 刷新 -->
  <i class="i-tdesign:refresh" />

  <!-- 面包屑导航 -->
  <n-breadcrumb>
    <n-breadcrumb-item>
      北京总行
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      天津分行
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      平山道支行
    </n-breadcrumb-item>
  </n-breadcrumb>

  <div class="flex-1" />

  <!-- 明暗主题 -->
  <i v-show="isDark" class="i-tdesign:mode-light" @click="toggleLightOrDark()" />
  <i v-show="!isDark" class="i-tdesign:mode-dark" @click="toggleLightOrDark()" />

  <!-- 国际化 -->
  <i class="i-tdesign:translate" />

  <!-- 全屏 -->
  <i v-show="isFullscreen" class="i-tdesign:fullscreen-exit-1" @click="toggle()" />
  <i v-show="!isFullscreen" class="i-tdesign:fullscreen-1" @click="toggle()" />

  <!-- 用户信息 -->
  <n-avatar
    size="small"
    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
  />
</template>

<style scoped>
i {
  --uno: cursor-pointer text-xl;
}
</style>
