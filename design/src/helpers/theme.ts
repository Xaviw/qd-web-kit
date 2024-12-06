// 需要生成更多相关颜色的主题变量名
export const paletteNames = [
  'primary',
  'success',
  'warning',
  'error',
]

const shadcnUiColors = {
  accent: {
    DEFAULT: 'hsl(var(--accent))',
    foreground: 'hsl(var(--accent-foreground))',
    hover: 'hsl(var(--accent-hover))',
    lighter: 'has(val(--accent-lighter))',
  },
  background: {
    deep: 'hsl(var(--background-deep))',
    DEFAULT: 'hsl(var(--background))',
  },
  border: {
    DEFAULT: 'hsl(var(--border))',
  },
  card: {
    DEFAULT: 'hsl(var(--card))',
    foreground: 'hsl(var(--card-foreground))',
  },
  error: {
    ...createColorsPalette('error'),
    DEFAULT: 'hsl(var(--error))',
  },

  foreground: {
    DEFAULT: 'hsl(var(--foreground))',
  },

  input: {
    background: 'hsl(var(--input-background))',
    DEFAULT: 'hsl(var(--input))',
  },
  muted: {
    DEFAULT: 'hsl(var(--muted))',
    foreground: 'hsl(var(--muted-foreground))',
  },
  popover: {
    DEFAULT: 'hsl(var(--popover))',
    foreground: 'hsl(var(--popover-foreground))',
  },
  primary: {
    ...createColorsPalette('primary'),
    DEFAULT: 'hsl(var(--primary))',
  },

  ring: 'hsl(var(--ring))',
  secondary: {
    DEFAULT: 'hsl(var(--secondary))',
    desc: 'hsl(var(--secondary-desc))',
    foreground: 'hsl(var(--secondary-foreground))',
  },
}

const customColors = {
  header: {
    DEFAULT: 'hsl(var(--header))',
  },
  heavy: {
    DEFAULT: 'hsl(var(--heavy))',
    foreground: 'hsl(var(--heavy-foreground))',
  },
  main: {
    DEFAULT: 'hsl(var(--main))',
  },
  overlay: {
    content: 'hsl(var(--overlay-content))',
    DEFAULT: 'hsl(var(--overlay))',
  },
  sidebar: {
    deep: 'hsl(var(--sidebar-deep))',
    DEFAULT: 'hsl(var(--sidebar))',
  },
  success: {
    ...createColorsPalette('success'),
    DEFAULT: 'hsl(var(--success))',
  },
  warning: {
    ...createColorsPalette('warning'),
    DEFAULT: 'hsl(var(--warning))',
  },
}

/** 生成 unocss theme 配置 */
export const themeConfig = () => ({
  borderRadius: {
    lg: 'var(--radius)',
    md: 'calc(var(--radius) - 2px)',
    sm: 'calc(var(--radius) - 4px)',
    xl: 'calc(var(--radius) + 4px)',
  },
  boxShadow: {
    float: `0 6px 16px 0 rgb(0 0 0 / 8%),
          0 3px 6px -4px rgb(0 0 0 / 12%),
          0 9px 28px 8px rgb(0 0 0 / 5%)`,
  },
  colors: {
    ...customColors,
    ...shadcnUiColors,
  },
})

/**
 * 根据颜色名创建关联颜色主题映射
 * @param name 颜色变量名称
 * @returns 关键字-颜色变量预设对象
 */
function createColorsPalette(name: string) {
  return {
    // 最浅的背景色，适用于非常轻微的阴影或卡片的背景。
    '50': `hsl(var(--${name}-50))`, // rgb(241, 247, 254)
    'background-lightest': `hsl(var(--${name}-50))`,

    // 适用于略浅的背景色，通常用于次要背景或略浅的区域。
    '100': `hsl(var(--${name}-100))`, // rgb(231, 241, 253)
    'background-lighter': `hsl(var(--${name}-100))`,

    // 浅色背景，适用于输入框或表单区域的背景。
    '200': `hsl(var(--${name}-200))`, // rgb(190, 217, 249)
    'background-light': `hsl(var(--${name}-200))`,

    // 浅色边框，适用于输入框或卡片的边框。
    '300': `hsl(var(--${name}-300))`, // rgb(153, 196, 245)
    'border-light': `hsl(var(--${name}-300))`,

    // 适用于普通边框，可能用于按钮或卡片的边框。
    '400': `hsl(var(--${name}-400))`, // rgb(78, 153, 239)
    'border': `hsl(var(--${name}-400))`,

    // 主色文本
    '500': `hsl(var(--${name}-500))`, // rgb(0, 107, 230)
    'text': `hsl(var(--${name}-500))`,

    // 鼠标悬停状态下的颜色，适用于悬停时的背景色或边框色或文本色。
    '600': `hsl(var(--${name}-600))`, // rgb(0, 98, 209)
    'hover': `hsl(var(--${name}-600))`,
    'text-hover': `hsl(var(--${name}-600))`,

    // 激活状态下的颜色，适用于按下时的背景色或边框色或文本色。
    '700': `hsl(var(--${name}-700))`, // rgb(0, 64, 138)
    'active': `hsl(var(--${name}-700))`,
    'text-active': `hsl(var(--${name}-700))`,

    'foreground': `hsl(var(--${name}-foreground))`,
  }
}
