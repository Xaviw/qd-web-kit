<script lang="ts" setup>
import { useNaiveDesignTokens } from '@qd/design'
import { useTheme } from '@qd/utils'
import {
  darkTheme,
  // dateEnUS,
  // enUS,
  dateZhCN,
  type GlobalThemeOverrides,
  lightTheme,
  NConfigProvider,
  NMessageProvider,
  NNotificationProvider,
  zhCN,
} from 'naive-ui'
import { computed, ref } from 'vue'

defineOptions({ name: 'App' })

const themeOverrides = ref<GlobalThemeOverrides>()

const { isDark } = useTheme(undefined, {
  onChanged() {
    const common = useNaiveDesignTokens()
    themeOverrides.value = { common }
  },
})

const theme = computed(() =>
  isDark.value ? darkTheme : lightTheme,
)
</script>

<template>
  <NConfigProvider
    :date-locale="dateZhCN"
    :locale="zhCN"
    :theme
    :theme-overrides
    class="h-full"
  >
    <NNotificationProvider>
      <NMessageProvider>
        <RouterView />
      </NMessageProvider>
    </NNotificationProvider>
  </NConfigProvider>
</template>
