# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
