#!/usr/bin/env node

/**
 * Claude Skills 自动安装脚本
 * @author Bamzc
 */

import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

async function installSkills() {
  try {
    log('\n🚀 开始安装 Claude Skills...', 'blue')

    // 获取项目根目录
    // 优先使用 INIT_CWD（npm install 运行时的原始工作目录）
    // 否则从当前目录向上查找 package.json
    let projectRoot = process.env.INIT_CWD || process.cwd()

    while (!fs.existsSync(path.join(projectRoot, 'package.json'))) {
      const parent = path.dirname(projectRoot)
      if (parent === projectRoot) {
        throw new Error('无法找到项目根目录（package.json）')
      }
      projectRoot = parent
    }

    log(`📁 项目根目录: ${projectRoot}`, 'blue')

    // 检查是否是包自身的项目，如果是则跳过安装
    const projectPkg = await fs.readJson(path.join(projectRoot, 'package.json'))
    if (projectPkg.name === 'claude-skills-frontend') {
      log('\n⏭️  检测到是包自身项目，跳过安装', 'yellow')
      return
    }

    // 目标目录
    const targetDir = path.join(projectRoot, '.claude', 'skills')

    // 源目录（npm 包中的 skills 目录）
    const sourceDir = path.join(__dirname, '..', 'skills')

    // 确保目标目录存在
    await fs.ensureDir(targetDir)

    // 获取所有 Skills
    const skills = await fs.readdir(sourceDir)

    log(`\n📦 发现 ${skills.length} 个 Skills:`, 'blue')

    // 复制每个 Skill
    for (const skill of skills) {
      const sourcePath = path.join(sourceDir, skill)
      const targetPath = path.join(targetDir, skill)

      // 检查是否是目录
      const stat = await fs.stat(sourcePath)
      if (!stat.isDirectory()) continue

      // 检查目标目录是否已存在
      const exists = await fs.pathExists(targetPath)

      // 复制 Skill（覆盖已存在的）
      await fs.copy(sourcePath, targetPath, { overwrite: true })
      log(`  ✅ ${skill} (${exists ? '已更新' : '已安装'})`, 'green')
    }

    // 复制 CLAUDE.md 到项目根目录
    const claudeMdSource = path.join(__dirname, '..', 'CLAUDE.md')
    const claudeMdTarget = path.join(projectRoot, 'CLAUDE.md')

    if (await fs.pathExists(claudeMdSource)) {
      const exists = await fs.pathExists(claudeMdTarget)
      await fs.copy(claudeMdSource, claudeMdTarget, { overwrite: true })
      log(`\n✅ CLAUDE.md ${exists ? '已更新' : '已复制到项目根目录'}`, 'green')
    }

    log('\n🎉 Claude Skills 安装完成！', 'green')
    log('\n💡 使用方法:', 'blue')
    log('   在 Claude Code 对话中提及 Skill 名称即可使用', 'blue')
    log('   例如: "请使用 frontend-code-review 审查这个文件"\n', 'blue')
  } catch (error) {
    log(`\n❌ 安装失败: ${error.message}`, 'red')
    process.exit(1)
  }
}

// 执行安装
installSkills()
