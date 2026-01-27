# Claude Skills Frontend - 完整包结构

## 目录结构

\`\`\`
claude-skills-frontend/
├── package.json                 # npm 包配置
├── README.md                    # 使用文档
├── LICENSE                      # MIT 许可证
├── .gitignore
├── .npmignore                   # npm 发布忽略文件
├── bin/
│   └── install.js               # 自动安装脚本
├── skills/                      # Skills 源文件
│   ├── frontend-code-review/
│   │   ├── SKILL.md
│   │   └── references/
│   │       └── checklist.md
│   ├── security-review/
│   │   ├── SKILL.md
│   │   └── references/
│   │       └── security-checklist.md
│   └── api-doc-generator/
│       ├── SKILL.md
│       └── references/
│           └── templates.md
└── templates/                   # CLAUDE.md 模板（可选）
    ├── CLAUDE.md.react
    ├── CLAUDE.md.vue
    └── CLAUDE.md.angular
\`\`\`

## 发布到 npm

### 1. 注册 npm 账号

\`\`\`bash
npm login
\`\`\`

### 2. 发布包

\`\`\`bash
# 首次发布
npm publish --access public

# 更新版本后发布
npm version patch  # 修订号 +1
npm version minor  # 次版本号 +1
npm version major  # 主版本号 +1
npm publish
\`\`\`

## 在项目中使用

### 安装

\`\`\`bash
pnpm add -D claude-skills-frontend
\`\`\`

### 自动安装 Skills

安装包后，`postinstall` 脚本会自动运行，将 Skills 复制到 `.claude/skills/` 目录。

### 手动安装

\`\`\`bash
npx install-claude-skills
\`\`\`

### 更新 Skills

\`\`\`bash
# 更新包
pnpm update claude-skills-frontend

# 删除旧的 Skills
rm -rf .claude/skills/*

# 重新安装
npx install-claude-skills
\`\`\`

## 版本管理策略

### 语义化版本

- **1.0.0 → 1.0.1**：修复 bug、更新文档
- **1.0.0 → 1.1.0**：新增 Skill、新增功能
- **1.0.0 → 2.0.0**：不兼容的变更（Skill 结构调整）

### 版本锁定

在 `package.json` 中锁定版本：

\`\`\`json
{
  "devDependencies": {
    "claude-skills-frontend": "1.0.0"  // 精确版本
  }
}
\`\`\`

或使用版本范围：

\`\`\`json
{
  "devDependencies": {
    "claude-skills-frontend": "^1.0.0"  // 兼容 1.x.x
  }
}
\`\`\`

## 团队协作

### 1. 统一 Skills 版本

在 `package.json` 中指定版本，团队成员执行 `pnpm install` 后自动安装相同版本的 Skills。

### 2. 自定义 Skills

团队可以 fork 这个包，添加自己的 Skills：

\`\`\`bash
# Fork 仓库
git clone https://github.com/bamzc/claude-skills-frontend.git
cd claude-skills-frontend

# 添加自定义 Skill
mkdir skills/custom-skill
# 编写 SKILL.md

# 发布到 npm
npm publish
\`\`\`

### 3. 贡献 Skills

欢迎提交 PR 贡献新的 Skills：

1. Fork 仓库
2. 创建新分支：`git checkout -b feature/new-skill`
3. 添加新 Skill
4. 提交 PR

## CI/CD 集成

### GitHub Actions 示例

\`\`\`yaml
# .github/workflows/code-review.yml
name: Code Review

on:
  pull_request:
    branches: [main]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 10

      - name: Install dependencies
        run: pnpm install

      - name: Install Claude Skills
        run: npx install-claude-skills

      - name: Run code review
        run: |
          # 使用 Claude Code CLI 进行审查
          # 这里需要配置 Claude API Key
          echo "代码审查完成"
\`\`\`

## 常见问题

### Q1: Skills 安装到哪里？

安装到项目的 `.claude/skills/` 目录。

### Q2: 如何更新 Skills？

\`\`\`bash
pnpm update claude-skills-frontend
rm -rf .claude/skills/*
npx install-claude-skills
\`\`\`

### Q3: 如何只安装特定的 Skill？

手动复制：

\`\`\`bash
cp -r node_modules/claude-skills-frontend/skills/frontend-code-review .claude/skills/
\`\`\`

### Q4: 如何自定义 Skill？

1. 复制 Skill 到项目：`cp -r node_modules/claude-skills-frontend/skills/frontend-code-review .claude/skills/`
2. 修改 `.claude/skills/frontend-code-review/SKILL.md`
3. 项目级的 Skill 会覆盖 npm 包中的 Skill

### Q5: 如何在团队中共享自定义 Skills？

1. Fork 这个包
2. 添加自定义 Skills
3. 发布到 npm
4. 团队成员安装你的包

## 最佳实践

### 1. 项目级 vs 全局 Skills

- **全局 Skills**：通过 npm 包安装，所有项目通用
- **项目级 Skills**：直接放在 `.claude/skills/`，项目特定

### 2. CLAUDE.md 配置

每个项目应该有自己的 `CLAUDE.md`，定义项目特定的规范和风格。

### 3. 版本管理

- 开发阶段：使用 `^1.0.0`（自动更新小版本）
- 生产阶段：使用 `1.0.0`（锁定版本）

### 4. 定期更新

建议每月更新一次 Skills 包，获取最新的审查规则。

---

**作者**: Bamzc
**最后更新**: 2026-01-06
