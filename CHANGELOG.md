# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-01-27

### Added
- 🔌 **自动配置 MCP 服务器**：安装时自动配置以下 MCP 服务器
  - `memory` - 知识图谱记忆系统
  - `sequential-thinking` - 顺序思考工具
  - `context7` - 文档查询工具
  - `chrome-devtools` - Chrome 调试工具
  - `playwright` - 浏览器自动化工具
  - `fetch` - HTTP 请求工具（需要 uv）
- 🛠️ **智能检测**：自动检测 uvx 是否安装，决定是否配置 fetch 服务器
- 📝 **详细文档**：添加 MCP 服务器配置说明和验证方法

### Changed
- 优化安装脚本，跳过已配置的服务器，避免覆盖用户自定义配置
- 改进日志输出，显示配置统计信息

## [1.0.0] - 2026-01-06

### Added
- 初始版本发布
- 添加 `frontend-code-review` Skill
  - 支持 React、Vue、Angular 等主流框架
  - 多维度代码审查（质量、性能、安全、可访问性）
  - 标准化评分系统（S/A/B/C/D/F）
  - 详细的检查清单和工具推荐
- 添加 `skill-creator` Skill
  - 指导用户创建新的 Claude Skills
  - 提供核心概念和最佳实践
  - 包含示例和模板
- 添加 `awesome-skill-creator` Skill
  - Skill 创建指南（增强版）
  - 更详细的指导和高级技巧
  - 完整的示例和常见问题解答
- 自动安装脚本（postinstall）
- 完整的使用文档

### Features
- 代码质量检查
- 功能实现审查
- 性能优化建议
- 安全漏洞检测
- 可访问性审查
- 框架特定模式检查（React Hooks、Vue Composition API、TypeScript）
- Skill 创建指导

---

## 版本规划

### [1.1.0] - 计划中
- [ ] 添加 `security-review` Skill
- [ ] 添加 `api-doc-generator` Skill
- [ ] 支持自定义审查规则

### [1.2.0] - 计划中
- [ ] 添加 CLAUDE.md 模板
- [ ] 支持配置文件（.claude-skills.json）
- [ ] 添加更多框架支持（Svelte、Solid.js）

### [2.0.0] - 计划中
- [ ] 重构 Skill 结构
- [ ] 支持插件系统
- [ ] 添加 CLI 工具
