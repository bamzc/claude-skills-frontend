#!/usr/bin/env node

/**
 * Claude Skills 安装脚本测试版
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

async function testInstall() {
  try {
    log('\n🧪 测试模式：Claude Skills 安装脚本', 'blue')

    // 测试目标目录（使用命令行参数或默认路径）
    const targetProject = process.argv[2] || '/Users/bamzc/bamzc/project/gaoji/test-pilot'

    log(`📁 测试项目: ${targetProject}`, 'blue')

    // 目标目录
    const targetDir = path.join(targetProject, '.claude', 'skills')

    // 源目录（当前包的 skills 目录）
    const sourceDir = path.join(__dirname, '..', 'skills')

    log(`📦 源目录: ${sourceDir}`, 'blue')
    log(`🎯 目标目录: ${targetDir}`, 'blue')

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
      if (exists) {
        log(`  ⚠️  ${skill} (已存在，跳过)`, 'yellow')
        continue
      }

      // 复制 Skill
      await fs.copy(sourcePath, targetPath)
      log(`  ✅ ${skill} (已安装)`, 'green')
    }

    log('\n🎉 测试完成！', 'green')
    log('\n💡 验证方法:', 'blue')
    log(`   cd ${targetProject}`, 'blue')
    log(`   ls -la .claude/skills/\n`, 'blue')
  } catch (error) {
    log(`\n❌ 测试失败: ${error.message}`, 'red')
    console.error(error)
    process.exit(1)
  }
}

// 执行测试
testInstall()
