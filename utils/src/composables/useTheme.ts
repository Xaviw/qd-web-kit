import { type BasicColorMode, useColorMode, useDark, useToggle } from '@vueuse/core'
import { type MaybeRefOrGetter, ref } from 'vue'

type DefaultThemeColorModes = 'default' | 'orange'

interface UseThemeColorModeOptions<T extends string> {
  /** 初始颜色模式 */
  initialValue?: MaybeRefOrGetter<T | DefaultThemeColorModes>
  /** 全部颜色模式 */
  modes?: (T | DefaultThemeColorModes)[]
  /** 可以在这里重新运算 UI 库适配器，例如 useNaiveDesignTokens */
  onChanged?: (mode: T) => void
}

const changeHandlers: ((mode: any) => void)[] = []

/** 获取与切换主题明暗、颜色 */
export function useTheme<T extends string = DefaultThemeColorModes>(
  storageKeyPrefix = 'qd',
  useColorModeOptions: UseThemeColorModeOptions<T> = {},
) {
  const modes = 'modes' in useColorModeOptions
    ? useColorModeOptions.modes?.map(mode => ({ [mode]: mode }))
    : {
        default: 'default',
        orange: 'orange',
      } as any

  const initialValue = 'initialValue' in useColorModeOptions
    ? useColorModeOptions.initialValue
    : 'default' as any

  const onChanged = useColorModeOptions.onChanged
  if (typeof onChanged === 'function' && !changeHandlers.includes(onChanged)) {
    changeHandlers.push(onChanged)
  }

  // 避免重复执行
  const previousMode = ref<T | BasicColorMode>()

  /** 主题颜色模式，可以直接赋值切换主题 */
  const themeColor = useColorMode<T>({
    storageKey: `${storageKeyPrefix}-theme-color`,
    attribute: 'data-theme',
    modes,
    initialValue,
    onChanged(mode, defaultHandler) {
      if (previousMode.value === mode) {
        return
      }
      previousMode.value = mode

      defaultHandler(mode)

      changeHandlers.forEach((fn) => {
        fn(mode)
      })
    },
  })

  /** 是否是暗色模式 */
  const isDark = useDark({
    storageKey: `${storageKeyPrefix}-light-or-dark`,
    onChanged(isDark, defaultHandler) {
      const mode = isDark ? 'dark' : 'light'
      if (previousMode.value === mode) {
        return
      }
      previousMode.value = mode

      defaultHandler(mode)

      changeHandlers.forEach((fn) => {
        fn(mode)
      })
    },
  })

  /** 切换明暗模式的方法 */
  const toggleLightOrDark = useToggle(isDark)

  return { themeColor, isDark, toggleLightOrDark }
}
