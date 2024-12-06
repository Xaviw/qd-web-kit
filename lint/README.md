# 代码格式化相关配置

基于 [@antfu/eslint-config](https://github.com/antfu/eslint-config) 并传入个性化配置

**必须将 `.vscode` 文件夹提交到 git，并保留内部的工作区配置**

## 为什么不使用 Prettier？

[为什么我不使用 Prettier (antfu)](https://antfu.me/posts/why-not-prettier-zh)

[为什么使用 ESLint Stylistic (eslint官方)](https://stylistic.eslint.org.cn/guide/why)

## 使用

安装 `@qd/lint` 后，在项目根目录下创建 `eslint.config.js` 文件，并写入：

```js
import config from '@qd/lint'

export default config()
```

之后执行以下命令：

```sh
pnpm i -D eslint eslint-plugin-format @unocss/eslint-plugin @prettier/plugin-xml
```

安装完成后在 `package.json` 中添加如下命令，用于进行格式检查和自动修复：

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## 支持格式化的文件类型

- js
- jsx
- ts
- tsx
- vue
- html
- md
- json
- jsonc
- yaml
- toml
- xml
- css
- less
- scss
- pcss
- postcss

## 查看启用的规则

在 `eslint.config.js` 文件所在目录下执行：

```sh
npx @eslint/config-inspector
```

## 自定义配置

参考 `@antfu/eslint-config` 说明中的 [Customization](https://github.com/antfu/eslint-config?tab=readme-ov-file#customization) 部分

需要注意 `@antfu/eslint-config` 对插件规则前缀进行了重命名，参考 [Plugins Renaming](https://github.com/antfu/eslint-config?tab=readme-ov-file#plugins-renaming)
