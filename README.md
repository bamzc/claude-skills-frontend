# claude-skills-frontend

> 前端开发通用 Claude Skills 集合

[![npm version](https://img.shields.io/npm/v/claude-skills-frontend.svg)](https://www.npmjs.com/package/claude-skills-frontend)
[![downloads](https://badgen.net/npm/dt/claude-skills-frontend)](https://www.npmjs.com/package/claude-skills-frontend)
[![license](https://img.shields.io/npm/l/claude-skills-frontend.svg)](https://github.com/bamzc/claude-skills-frontend/blob/main/LICENSE)

## 📦 包含的 Skills

| Skill | 描述 | 适用场景 |
|-------|------|----------|
| `frontend-code-review` | 前端代码全面审查 | PR 审查、代码质量检查、性能审计 |
| `skill-creator` | Skill 创建指南 | 创建新的 Claude Skills |
| `ui-ux-pro-max` | UI/UX 设计智能助手 | UI 设计、样式选择、配色方案、字体搭配、响应式布局 |

## 🚀 快速开始

### 安装

```bash
# 使用 pnpm（推荐）
pnpm add -D claude-skills-frontend

# 使用 npm
npm install --save-dev claude-skills-frontend

# 使用 yarn
yarn add -D claude-skills-frontend
```

### 自动安装

安装包后，Skills 会自动复制到项目的 `.claude/skills/` 目录。

如果需要手动安装，可以运行：

```bash
npx install-claude-skills
```

### 使用

在 Claude Code 对话中提及 Skill 名称即可使用：

```
你: 请使用 frontend-code-review 审查 src/components/Button.tsx
```

## 📚 Skills 详细说明

### frontend-code-review

**功能**：对前端代码进行全面审查

**审查维度**：
- 代码质量（命名、结构、重复代码）
- 功能实现（业务逻辑、错误处理）
- 性能优化（渲染优化、资源优化）
- 安全性（XSS、输入验证、敏感数据）
- 可访问性（语义化 HTML、ARIA、键盘导航）
- 框架特定（React Hooks、Vue Composition API、TypeScript）

**输出格式**：
- ✅ 优秀实践
- ⚠️ 需要改进的问题（含严重程度）
- 📊 代码评分（0-10 分，S/A/B/C/D/F 等级）
- 📝 改进建议

**支持框架**：
- React 16/17/18/19
- Vue 2/3
- Angular
- 原生 JavaScript/TypeScript

### skill-creator

**功能**：指导用户创建新的 Claude Skills

**提供内容**：
- Skills 的核心概念和原则
- Skill 文件结构和格式
- 最佳实践和注意事项
- 示例和模板

**适用场景**：
- 创建新的 Skill
- 更新现有 Skill
- 学习 Skill 开发

### ui-ux-pro-max

**功能**：UI/UX 设计智能助手，提供全面的设计指导和最佳实践

**核心能力**：
- 50+ UI 设计风格（玻璃态、新拟态、极简主义、野蛮主义等）
- 21 种配色方案（按产品类型分类）
- 50 种字体搭配（含 Google Fonts 导入）
- 20 种图表类型推荐
- 8 种技术栈支持（React、Next.js、Vue、Svelte、SwiftUI、React Native、Flutter、Tailwind）

**设计维度**：
- 产品类型推荐（SaaS、电商、作品集、仪表板等）
- 样式指南（颜色、效果、框架）
- 排版设计（字体搭配、Google Fonts）
- 配色方案（主色、辅色、CTA、背景、文本、边框）
- 页面结构（落地页、英雄区、定价、社交证明）
- UX 最佳实践（动画、无障碍、交互反馈）

**支持技术栈**：
- `html-tailwind`（默认）：Tailwind 工具类、响应式、无障碍
- `react`：状态管理、Hooks、性能优化
- `nextjs`：SSR、路由、图片优化
- `vue`：Composition API、Pinia、Vue Router
- `svelte`：Runes、Stores、SvelteKit
- `swiftui`：视图、状态、导航、动画
- `react-native`：组件、导航、列表
- `flutter`：Widgets、状态、布局、主题

**使用方式**：
通过 Python 脚本搜索设计知识库，获取针对性的设计建议和代码实现指南。

**前置要求**：
需要安装 Python 3（macOS/Linux/Windows 均支持）

## 🔄 更新 Skills

当 Skills 有新版本时，更新包即可：

```bash
# 更新到最新版本
pnpm update claude-skills-frontend

# 重新安装 Skills
npx install-claude-skills
```

## 🛠️ 自定义配置

### 选择性安装 Skills

如果只想安装特定的 Skills，可以手动复制：

```bash
# 只安装前端代码审查 Skill
cp -r node_modules/claude-skills-frontend/skills/frontend-code-review .claude/skills/
```

### 覆盖已有 Skills

默认情况下，安装脚本不会覆盖已存在的 Skills。如果需要强制覆盖：

```bash
# 删除旧的 Skills
rm -rf .claude/skills/frontend-code-review

# 重新安装
npx install-claude-skills
```

## 📁 项目结构

安装后，你的项目结构如下：

```
your-project/
├── .claude/
│   └── skills/
│       ├── frontend-code-review/
│       │   ├── SKILL.md
│       │   └── references/
│       │       └── checklist.md
│       ├── security-review/
│       │   └── SKILL.md
│       └── api-doc-generator/
│           └── SKILL.md
├── node_modules/
│   └── claude-skills-frontend/
├── package.json
└── CLAUDE.md  # 项目级配置（需要自己创建）
```

## 🤝 配合 CLAUDE.md 使用

Skills 会自动继承项目的 `CLAUDE.md` 配置。

**推荐配置**：

```markdown
# CLAUDE.md

## 项目信息
- 项目名称: TestPilot
- 技术栈: Next.js 16 + React 19 + TypeScript
- UI 框架: Tailwind CSS + Shadcn/ui

## 编码规范
- 使用 TypeScript 严格模式
- 遵循 ESLint 规则
- 组件使用函数式组件 + Hooks
- 状态管理使用 Zustand

## 代码风格
- 使用 Prettier 格式化
- 命名规范: camelCase（变量/函数）、PascalCase（组件/类型）
- 注释: 只添加必要的注释，避免过度注释
```

## 🌟 最佳实践

### 1. 定期更新

建议每月更新一次 Skills 包，获取最新的审查规则和最佳实践：

```bash
pnpm update claude-skills-frontend
```

### 2. 团队共享

在团队中使用时，将包添加到 `package.json` 的 `devDependencies`：

```json
{
  "devDependencies": {
    "claude-skills-frontend": "^1.0.0"
  }
}
```

团队成员执行 `pnpm install` 后，Skills 会自动安装。

### 3. CI/CD 集成

在 CI/CD 流程中使用 Skills 进行自动化审查：

```yaml
# .github/workflows/code-review.yml
name: Code Review

on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: npx install-claude-skills
      # 使用 Claude Code CLI 进行审查
      - run: claude code review
```

## 📝 版本管理

### 语义化版本

- **主版本号（Major）**：不兼容的 API 变更
- **次版本号（Minor）**：向下兼容的功能新增
- **修订号（Patch）**：向下兼容的问题修复

### 版本锁定

如果需要锁定特定版本：

```json
{
  "devDependencies": {
    "claude-skills-frontend": "1.0.0"
  }
}
```

## 🐛 问题反馈

如果遇到问题或有建议，欢迎：
- 提交 Issue: https://github.com/bamzc/claude-skills-frontend/issues
- 提交 PR: https://github.com/bamzc/claude-skills-frontend/pulls

## 📄 许可证

MIT © Bamzc

## 🙏 致谢

感谢 Claude Code 团队提供的强大工具！

---

**作者**: Bamzc
**最后更新**: 2026-01-06
