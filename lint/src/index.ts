/* eslint-disable jsdoc/check-param-names */
import antfu from '@antfu/eslint-config'
import 'eslint-flat-config-utils'

/**
 * ESLint 扁平配置项构造函数（[文档](https://github.com/antfu/eslint-config?tab=readme-ov-file#customization)）
 *
 * @param {OptionsConfig & TypedFlatConfigItem} options
 *  构造配置
 * @param {Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>[]} userConfigs
 *  覆盖规则
 */
const linter = async (...args: Parameters<typeof antfu>) => {
  const options = args[0] || {}
  const userConfigs = args.slice(1).filter(item => !!item)

  const defaultConfig = {
    vue: true,
    unocss: true,
    formatters: {
      css: true,
      html: true,
      markdown: true,
      svg: true,
    },
    toml: false,
    test: false,
    lessOpinionated: true,
  }

  return antfu(
    { ...defaultConfig, ...options },
    {
      rules: {
        'no-console': 'warn',
      },
    },
    ...userConfigs,
  )
}

export default linter
