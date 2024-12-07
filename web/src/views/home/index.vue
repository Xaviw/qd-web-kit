<script setup lang="ts">
import type { MenuOption } from 'naive-ui'

const menuOptions: MenuOption[] = [
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    children: [
      {
        label: '鼠',
        key: 'rat',
      },
    ],
  },
]
</script>

<template>
  <n-layout has-sider class="h-full">
    <n-layout-sider>
      <n-menu
        :options="menuOptions"
      />
    </n-layout-sider>

    <n-layout content-class="flex flex-col">
      <n-layout-header>header</n-layout-header>

      <n-layout-content>
        content
        <div class="text-9xl">
          <i class="i-qd-favicon" />
          <i class="i-carbon-3d-cursor" />
        </div>
      </n-layout-content>

      <n-layout-footer>footer</n-layout-footer>
    </n-layout>
  </n-layout>
</template>
