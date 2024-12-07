import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
// import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Vue(),
    VueJsx(),
    UnoCSS(),
    // AutoImport({
    //   imports: [
    //     'vue',
    //     {
    //       'naive-ui': [
    //         'useDialog',
    //         'useMessage',
    //         'useNotification',
    //         'useLoadingBar',
    //       ],
    //     },
    //   ],
    // }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: 'types/components.d.ts',
    }),
  ],
})
