#!/usr/bin/env node

/**
 * Claude Skills 自动安装脚本
 * @author Bamzc
 */

import fs from 'fs-extra'
import path from 'path'
import os from 'os'
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

/**
 * 检查命令是否存在
 */
async function commandExists(command) {
  try {
    const { execSync } = await import('child_process')
    execSync(`which ${command}`, { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

/**
 * 配置所有 MCP 服务器
 */
async function setupMCPServers() {
  try {
    const claudeConfigPath = path.join(os.homedir(), '.claude.json')

    log('\n🔧 配置 MCP 服务器...', 'blue')

    // MCP 服务器配置列表
    const mcpServers = {
      memory: {
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-memory'],
        type: 'stdio',
        description: '知识图谱记忆系统',
      },
      'sequential-thinking': {
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-sequential-thinking'],
        type: 'stdio',
        description: '顺序思考工具',
      },
      context7: {
        command: 'npx',
        args: ['-y', '@upstash/context7-mcp'],
        type: 'stdio',
        description: '文档查询工具',
      },
      'chrome-devtools': {
        command: 'npx',
        args: ['-y', 'chrome-devtools-mcp@latest'],
        env: {},
        description: 'Chrome 调试工具',
      },
      playwright: {
        command: 'npx',
        args: ['-y', '@executeautomation/playwright-mcp-server'],
        env: {},
        description: '浏览器自动化工具',
      },
    }

    // 检查 uvx 是否安装，如果安装了就添加 fetch 服务器
    const hasUvx = await commandExists('uvx')
    if (hasUvx) {
      mcpServers.fetch = {
        command: 'uvx',
        args: ['mcp-server-fetch'],
        type: 'stdio',
        description: 'HTTP 请求工具',
      }
      log('  ✅ 检测到 uvx，将配置 fetch 服务器', 'green')
    } else {
      log('  ⚠️  未检测到 uvx，跳过 fetch 服务器配置', 'yellow')
      log('  💡 安装 uv 后可使用: brew install uv', 'blue')
    }

    let claudeConfig = {}
    let configExists = false

    // 读取现有配置
    if (await fs.pathExists(claudeConfigPath)) {
      try {
        claudeConfig = await fs.readJson(claudeConfigPath)
        configExists = true
      } catch (error) {
        log('  ⚠️  现有配置文件格式错误，将创建新配置', 'yellow')
      }
    }

    // 确保 mcpServers 对象存在
    if (!claudeConfig.mcpServers) {
      claudeConfig.mcpServers = {}
    }

    // 添加 MCP 服务器配置
    let addedCount = 0
    let skippedCount = 0

    for (const [name, config] of Object.entries(mcpServers)) {
      if (claudeConfig.mcpServers[name]) {
        log(`  ⏭️  ${name} 已配置，跳过`, 'yellow')
        skippedCount++
      } else {
        claudeConfig.mcpServers[name] = config
        log(`  ✅ ${name} - ${config.description}`, 'green')
        addedCount++
      }
    }

    // 写入配置文件
    if (addedCount > 0) {
      await fs.writeJson(claudeConfigPath, claudeConfig, { spaces: 2 })
      log(
        `\n  ✅ MCP 配置${configExists ? '已更新' : '已创建'}: ${claudeConfigPath}`,
        'green'
      )
      log(`  📊 新增 ${addedCount} 个服务器，跳过 ${skippedCount} 个`, 'blue')
      log('  💡 需要重启 Claude Code 使配置生效', 'yellow')
    } else {
      log('\n  ✅ 所有 MCP 服务器已配置完成', 'green')
    }
  } catch (error) {
    log(`  ⚠️  MCP 配置失败: ${error.message}`, 'yellow')
    log('  💡 你可以稍后手动配置 MCP 服务器', 'blue')
  }
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

    // 检查是否是包自身的项目，如果是则跳过 Skills 安装
    const projectPkg = await fs.readJson(path.join(projectRoot, 'package.json'))
    if (projectPkg.name === 'claude-skills-frontend') {
      log('\n⏭️  检测到是包自身项目，跳过 Skills 安装', 'yellow')
      log('  但仍会配置 MCP 服务器...', 'blue')

      // 配置所有 MCP 服务器
      await setupMCPServers()

      log('\n✅ MCP 服务器配置完成！', 'green')
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

    // 配置所有 MCP 服务器
    await setupMCPServers()

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
