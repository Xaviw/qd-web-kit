import type { CustomIconLoader } from '@iconify/utils'
import type { IconsOptions } from 'unocss/preset-icons'
import { existsSync, promises as fs, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'
import { cleanupSVG, runSVGO, SVG } from '@iconify/tools'
import glob from 'tiny-glob'

export interface CustomCollectionOptions {
  /** 自定义图标集名称 */
  name: string
  /** glob 匹配表达式 */
  glob: string
}

export interface GlobOptions {
  /**
   * 更改默认工作目录
   * @default '.'
   */
  cwd?: string
  /**
   * 允许匹配以点开头的文件名或目录
   * @default false
   */
  dot?: boolean
  /**
   * 编辑器配置文件路径，相对于 cwd；
   * 用于生成 iconify.customCollectionJsonPaths 配置
   * @default '.vscode/settings.json'
   */
  editorSettingsPath?: string
}

/**
 * 将本地文件夹中的 svg 文件作为自定义图标集
 * @returns unocss preset-icons 插件配置
 */
export function iconsPresetConfig(collectionsArray: CustomCollectionOptions[] = [], options?: GlobOptions) {
  if (!collectionsArray.length) {
    return {}
  }

  const collections: Record<string, CustomIconLoader> = {}
  const names = collectionsArray.map(item => item.name)

  for (const { name, glob } of collectionsArray) {
    collections[name] = FileSystemIconLoader(name, glob, options)
  }

  const config: Pick<IconsOptions, 'collections' | 'customizations'> = {
    collections,
    customizations: {
      iconCustomizer(collection, _icon, props) {
        // 自定义图标集统一宽高
        if (names.includes(collection)) {
          props.width = '1em'
          props.height = '1em'
        }
      },
    },
  }

  return config
}

/**
 * 返回图标 CustomIconLoader，并生成预览 JSON
 */
function FileSystemIconLoader(
  name: string,
  globStr: string,
  options: GlobOptions = {},
): CustomIconLoader {
  if (!globStr.endsWith('.svg')) {
    throw new Error('只能将 svg 文件作为图标，glob 表达式请以 `.svg` 结尾！')
  }

  let filePaths: string[] = []

  const filesPromise = glob(globStr, {
    ...options,
    absolute: true,
    filesOnly: true,
  }).then((paths) => {
    filePaths = paths

    const editorSettingsPath = options.editorSettingsPath || '.vscode/settings.json'
    genIconifyJson(name, editorSettingsPath, paths)
  })

  return async (name) => {
    await filesPromise

    const path = filePaths.find(item => item.endsWith(`${name}.svg`))

    if (path) {
      const svg = await fs.readFile(path, 'utf-8')
      const optimizedSvg = tramsformSvg(svg)
      return optimizedSvg
    }
  }
}

/**
 * 优化 SVG 代码
 */
function tramsformSvg(svg: string) {
  const parsed = new SVG(svg)

  cleanupSVG(parsed)
  runSVGO(parsed)

  return parsed.toMinifiedString()
}

/**
 * 生成 Iconify IntelliSense 插件支持的预览 JSON
 * @param collectionName 图标集前缀
 * @param editorSettingsPath 编辑器配置文件路径
 * @param paths 全部图标路径
 */
function genIconifyJson(collectionName: string, editorSettingsPath: string, paths: string[]) {
  // 检查并创建 node_modules/.vite 目录
  const viteIconDir = join(cwd(), 'node_modules', '.vite')
  if (!existsSync(viteIconDir)) {
    mkdirSync(viteIconDir, { recursive: true })
  }

  const icons = paths.reduce((p, c) => {
    const name = c.split('/').pop()!.replace('.svg', '')
    const svg = readFileSync(c, 'utf-8')
    return {
      ...p,
      [name]: {
        body: tramsformSvg(svg),
      },
    }
  }, {})

  const iconJsonPath = join(viteIconDir, `${collectionName}.json`)

  writeFileSync(iconJsonPath, JSON.stringify({
    prefix: collectionName,
    icons,
    width: '1em',
    height: '1em',
  }))

  // const editorSettingsDir = join(cwd(), editorSettingsPath)
  // if (existsSync(editorSettingsDir)) {
  // const packageIndex = customCollectionJsonPaths?.children?.findIndex(
  //   child => findNodeAtLocation(child, ['value', 'name']).value === packageName,
  // )
  // if (packageIndex !== -1) {
  //   const packageNode = subpackagesNode.children[packageIndex]
  //   const edits = modify(jsonStr, packageNode.offset, packageNode.length, JSON.stringify(packageData))
  //   return applyEdits(jsonStr, edits)
  // }
  // else {
  //   const edits = modify(jsonStr, subpackagesNode.offset + subpackagesNode.length - 1, 0, `,${JSON.stringify(packageData)}`)
  //   return applyEdits(jsonStr, edits)
  // }

  // const customCollectionJsonPaths = settingString['iconify.customCollectionJsonPaths'] || []

  // if (!customCollectionJsonPaths.includes(iconJsonPath)) {
  //   customCollectionJsonPaths.push(iconJsonPath)
  // }

  // settingString['iconify.customCollectionJsonPaths'] = customCollectionJsonPaths

  // writeFileSync(editorSettingsDir, JSON.stringify(settingString, null, 2))
  // }
}
