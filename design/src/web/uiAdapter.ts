import { TinyColor } from '@ctrl/tinycolor'

export function useNaiveDesignTokens() {
  const rootStyles = getComputedStyle(document.documentElement)

  const getCssVariableValue = (variable: string, isColor: boolean = true) => {
    const value = rootStyles.getPropertyValue(variable)
    return isColor ? convertToRgb(`hsl(${value})`) : value
  }

  return {
    primaryColor: getCssVariableValue('--primary'),
    primaryColorHover: getCssVariableValue('--primary-600'),
    primaryColorPressed: getCssVariableValue('--primary-700'),
    primaryColorSuppl: getCssVariableValue('--primary-800'),

    errorColor: getCssVariableValue('--error'),
    errorColorHover: getCssVariableValue('--error-600'),
    errorColorPressed: getCssVariableValue('--error-700'),
    errorColorSuppl: getCssVariableValue('--error-800'),

    warningColor: getCssVariableValue('--warning'),
    warningColorHover: getCssVariableValue('--warning-600'),
    warningColorPressed: getCssVariableValue('--warning-700'),
    warningColorSuppl: getCssVariableValue('--warning-800'),

    successColor: getCssVariableValue('--success'),
    successColorHover: getCssVariableValue('--success-600'),
    successColorPressed: getCssVariableValue('--success-700'),
    successColorSuppl: getCssVariableValue('--success-800'),

    textColorBase: getCssVariableValue('--foreground'),

    baseColor: getCssVariableValue('--primary-foreground'),

    dividerColor: getCssVariableValue('--border'),
    borderColor: getCssVariableValue('--border'),

    modalColor: getCssVariableValue('--popover'),
    popoverColor: getCssVariableValue('--popover'),

    tableColor: getCssVariableValue('--card'),
    cardColor: getCssVariableValue('--card'),

    bodyColor: getCssVariableValue('--background'),
    invertedColor: getCssVariableValue('--background-deep'),

    borderRadius: getCssVariableValue('--radius', false),
  }
}

/**
 * 将颜色转换为RGB颜色字符串
 * TinyColor无法处理hsl内包含'deg'、'grad'、'rad'或'turn'的字符串
 * 比如 hsl(231deg 98% 65%)将被解析为rgb(0, 0, 0)
 * 这里在转换之前先将这些单位去掉
 * @param str 表示HLS颜色值的字符串
 * @returns 如果颜色值有效，则返回对应的RGB颜色字符串；如果无效，则返回rgb(0, 0, 0)
 */
function convertToRgb(str: string): string {
  return new TinyColor(str.replaceAll(/deg|grad|rad|turn/g, '')).toRgbString()
}
