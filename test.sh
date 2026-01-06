#!/bin/bash

# Claude Skills Frontend - 本地测试脚本
# @author Bamzc

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 项目路径
PACKAGE_DIR="/Users/bamzc/bamzc/project/gaoji/claude-skills-frontend"
TEST_PROJECT="/Users/bamzc/bamzc/project/gaoji/test-pilot"

echo -e "${BLUE}🧪 开始测试 claude-skills-frontend${NC}\n"

# 步骤 1: 检查包项目
echo -e "${BLUE}📦 步骤 1: 检查包项目${NC}"
if [ ! -d "$PACKAGE_DIR" ]; then
  echo -e "${RED}❌ 包项目不存在: $PACKAGE_DIR${NC}"
  exit 1
fi
echo -e "${GREEN}✅ 包项目存在${NC}\n"

# 步骤 2: 检查测试项目
echo -e "${BLUE}📁 步骤 2: 检查测试项目${NC}"
if [ ! -d "$TEST_PROJECT" ]; then
  echo -e "${RED}❌ 测试项目不存在: $TEST_PROJECT${NC}"
  exit 1
fi
echo -e "${GREEN}✅ 测试项目存在${NC}\n"

# 步骤 3: 检查 Skills 源文件
echo -e "${BLUE}📂 步骤 3: 检查 Skills 源文件${NC}"
if [ ! -d "$PACKAGE_DIR/skills/frontend-code-review" ]; then
  echo -e "${RED}❌ frontend-code-review Skill 不存在${NC}"
  exit 1
fi
echo -e "${GREEN}✅ frontend-code-review Skill 存在${NC}\n"

# 步骤 4: 清理测试项目的旧 Skills
echo -e "${BLUE}🧹 步骤 4: 清理测试项目的旧 Skills${NC}"
if [ -d "$TEST_PROJECT/.claude/skills/frontend-code-review" ]; then
  rm -rf "$TEST_PROJECT/.claude/skills/frontend-code-review"
  echo -e "${YELLOW}⚠️  已删除旧的 frontend-code-review${NC}"
fi
echo -e "${GREEN}✅ 清理完成${NC}\n"

# 步骤 5: 运行安装脚本
echo -e "${BLUE}🚀 步骤 5: 运行安装脚本${NC}"
cd "$PACKAGE_DIR"
node bin/test-install.js "$TEST_PROJECT"
echo ""

# 步骤 6: 验证安装结果
echo -e "${BLUE}🔍 步骤 6: 验证安装结果${NC}"
if [ -d "$TEST_PROJECT/.claude/skills/frontend-code-review" ]; then
  echo -e "${GREEN}✅ frontend-code-review 安装成功${NC}"

  # 检查文件是否完整
  if [ -f "$TEST_PROJECT/.claude/skills/frontend-code-review/SKILL.md" ]; then
    echo -e "${GREEN}✅ SKILL.md 存在${NC}"
  else
    echo -e "${RED}❌ SKILL.md 不存在${NC}"
    exit 1
  fi

  if [ -f "$TEST_PROJECT/.claude/skills/frontend-code-review/references/checklist.md" ]; then
    echo -e "${GREEN}✅ checklist.md 存在${NC}"
  else
    echo -e "${RED}❌ checklist.md 不存在${NC}"
    exit 1
  fi
else
  echo -e "${RED}❌ frontend-code-review 安装失败${NC}"
  exit 1
fi
echo ""

# 步骤 7: 显示安装的文件
echo -e "${BLUE}📄 步骤 7: 安装的文件列表${NC}"
ls -lah "$TEST_PROJECT/.claude/skills/frontend-code-review/"
echo ""

# 测试完成
echo -e "${GREEN}🎉 测试完成！所有检查通过！${NC}\n"

# 提示下一步
echo -e "${BLUE}💡 下一步操作:${NC}"
echo -e "   1. 在 Claude Code 中测试 Skill 功能"
echo -e "   2. 如果测试通过，可以发布到 npm"
echo -e "   3. 清理测试: rm -rf $TEST_PROJECT/.claude/skills/frontend-code-review\n"
