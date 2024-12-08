<script setup lang="tsx">
import type { MenuOption } from 'naive-ui'

defineProps<{
  collapsed: boolean
  collapsedWidth: number
}>()

const menuOptions: MenuOption[] = [
  {
    label: '工作台',
    key: 'workbench',
    icon: () => <i class="i-tdesign:dashboard-1" />,
  },
  {
    label: '演示',
    key: 'example',
    icon: () => <i class="i-tdesign:mobile-list" />,
    children: [
      {
        label: '表格',
        key: 'table',
      },
      {
        label: '表单',
        key: 'form',
      },
    ],
  },
]
</script>

<template>
  <!-- Logo -->
  <div class="flex-center gap-4 mx-2 mt-2">
    <i class="i-qd-favicon text-10" />
    <h1 v-show="!collapsed" class="my-0 truncate">
      QuDian Admin
    </h1>
  </div>

  <n-menu
    :options="menuOptions"
    accordion
    :collapsed
    :collapsed-width
  />
</template>
