import { defineConfig } from 'czg'

// https://cz-git.qbb.sh/zh/config/
export default defineConfig({
  extends: ['@commitlint/config-conventional'],
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
  },
  prompt: {
    messages: {
      type: '选择提交类型：',
      customScope: '输入提交范围（可选）：',
      subject: '输入精炼的变更描述：\n',
      body: '输入详细的变更描述（使用 "|" 换行，可选）：\n',
      footerPrefixesSelect: '选择关联issue前缀（可选）：',
      customFooterPrefix: '输入自定义issue前缀：',
      footer: '输入关联issue (例如: #31，可选)：\n',
      confirmCommit: '是否提交或修改?',
    },
    types: [
      { value: 'feat', name: 'feat:     新增功能' },
      { value: 'fix', name: 'fix:      修复缺陷' },
      { value: 'refactor', name: 'refactor: 代码重构（不包括 bug 修复、功能新增）' },
      { value: 'perf', name: 'perf:     性能优化' },
      { value: 'test', name: 'test:     添加疏漏测试或已有测试改动' },
      { value: 'revert', name: 'revert:   回滚 commit' },
      { value: 'chore', name: 'chore:    对构建过程或辅助工具和库的更改（不影响源文件、测试用例）' },
      { value: 'docs', name: 'docs:     文档变更' },
      { value: 'style', name: 'style:    代码格式（不影响功能，例如空格、分号等格式修正）' },
      { value: 'build', name: 'build:    构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）' },
      { value: 'ci', name: 'ci:       修改 CI 配置、脚本' },
    ],
    emptyScopesAlias: '跳过',
    customScopesAlias: '自定义范围',
    issuePrefixes: [
      { value: 'link', name: 'link:   链接 ISSUES 进行中' },
      { value: 'closed', name: 'closed: 标记 ISSUES 已完成' },
    ],
    emptyIssuePrefixAlias: '跳过',
    customIssuePrefixAlias: '自定义前缀',
    skipQuestions: ['breaking', 'scope'],
    defaultScope: '___CUSTOM___:',
  },
})
