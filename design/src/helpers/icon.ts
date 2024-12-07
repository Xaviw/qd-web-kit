import type { CustomIconLoader } from '@iconify/utils'
import type { IconsOptions } from 'unocss/preset-icons'
import { existsSync, promises as fs, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { cwd } from 'node:process'
import { cleanupSVG, runSVGO, SVG } from '@iconify/tools'
import { applyEdits, type EditResult, modify, parse } from 'jsonc-parser'
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
 * 图标 CustomIconLoader
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
    genIconifyJson(name, paths, options)
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
 * 生成 Iconify IntelliSense 插件支持的预览 JSON，并更新编辑器配置文件
 * @param collectionName 图标集前缀
 * @param paths 全部图标路径
 * @param options
 */
function genIconifyJson(collectionName: string, paths: string[], options: GlobOptions = {}) {
  // 检查 node_modules/.vite 目录
  const viteIconDir = join(cwd(), 'node_modules', '.vite')
  if (!existsSync(viteIconDir)) {
    mkdirSync(viteIconDir, { recursive: true })
  }

  // 构建预览配置
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

  const editorSettingsPath = options.editorSettingsPath || '.vscode/settings.json'
  const originPath = options.cwd || cwd()
  // 编辑器配置文件绝对路径
  const editorSettingsDir = join(originPath, editorSettingsPath)
  // 配置存放路径与编辑器配置文件夹的相对路径
  // .vscode 与 node_modules/.vite/ 的相对路径
  const relativeDir = relative(join(editorSettingsDir, '../../'), iconJsonPath)

  if (existsSync(editorSettingsDir)) {
    const text = readFileSync(editorSettingsDir, 'utf-8')

    const setting = parse(text)
    const paths = setting['iconify.customCollectionJsonPaths']

    let editResult: EditResult

    // 存在配置，unshift
    if (Array.isArray(paths) && !paths.includes(relativeDir)) {
      editResult = modify(text, ['iconify.customCollectionJsonPaths', 0], relativeDir, {
        isArrayInsertion: true,
        formattingOptions: {
          insertSpaces: true,
          tabSize: 2,
        },
      })
    }
    // 不存在配置，直接写入
    else {
      editResult = modify(text, ['iconify.customCollectionJsonPaths'], [relativeDir], {
        formattingOptions: {
          insertSpaces: true,
          tabSize: 2,
        },
      })
    }

    const resultText = applyEdits(text, editResult)
    writeFileSync(editorSettingsDir, resultText)
  }
  // 不存在配置文件，新建并写入
  else {
    const settingsFolder = resolve(editorSettingsDir, '../')
    if (!existsSync(settingsFolder)) {
      mkdirSync(settingsFolder, { recursive: true })
    }

    writeFileSync(editorSettingsDir, `${JSON.stringify({
      'iconify.customCollectionJsonPaths': [relativeDir],
    }, null, 2)}\n`)
  }
}
