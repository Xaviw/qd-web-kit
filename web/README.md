## 为什么用 UnoCSS 而不是 Tailwind

[为什么选择 UnoCSS？（官网）](https://unocss-cn.pages.dev/guide/why)

[unocss 究竟比 tailwindcss 快多少？](https://icebreaker.top/articles/2024/3/5-unocss-vs-tailwindcss/)

简单来说，UnoCSS 的优点包括：

1. 更好的性能

2. 更灵活的属性匹配

例如 `w-18`，在 tailwind 中并没有提供，只能在配置中添加定义或者使用 `w-[4.5rem]`。而 unocss 可以正确匹配自定义属性值

3. 更优秀的插件

提供了变体组等插件，能够精简写法

```ts
// uno.config.ts
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...
  transformers: [
    transformerVariantGroup(),
  ],
})
```

```html
<div class="hover:bg-gray-400 hover:font-medium font-light font-mono" />
<!-- 简化之后： -->
<div class="hover:(bg-gray-400 font-medium) font-(light mono)" />
```

4. 内置基于 Iconify 的[图标预设](https://unocss-cn.pages.dev/presets/icons)

并且可以很轻松的扩展项目内的 svg 以同样的方式使用，详见 uno.config.ts 文件

5. 与 TailwindCSS 无缝衔接

原子类名一致，同样支持 `@apply` 指令
