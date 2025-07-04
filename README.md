# Vue Element Plus Admin - 多页面版本

一套基于 Vue3、Element Plus、TypeScript、Vite 的多页面后台管理系统集成方案。

## 🚀 快速开始

```bash
# 克隆项目
git clone <repository-url>
cd mutiple-vue3-main

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 访问导航页面
open http://localhost:4000
```

## 🚀 特性

- **多页面架构**：支持多个独立的页面应用，每个页面可以独立开发和部署
- **Vue 3 + TypeScript**：使用最新的 Vue 3 Composition API 和 TypeScript
- **Element Plus**：基于 Element Plus 的 UI 组件库
- **Vite**：快速的构建工具和开发服务器
- **模块化设计**：每个页面都是独立的模块，便于维护和扩展
- **响应式布局**：支持各种屏幕尺寸的响应式设计

## 📁 项目结构

```
├── dist-dev/                    # 构建输出目录
│   └── frontend/               # 前端资源目录
│       ├── index.html          # 导航页面
│       ├── pages/              # 多页面目录
│       │   ├── about/          # 关于页面
│       │   ├── dashboard/      # 仪表板页面
│       │   └── login/          # 登录页面
│       ├── assets/             # 静态资源
│       ├── favicon.ico
│       └── logo.png
├── pages/                      # 页面源码目录
│   ├── about/
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── AboutApp.vue
│   ├── dashboard/
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── DashboardApp.vue
│   └── login/
│       ├── index.html
│       ├── main.ts
│       └── LoginApp.vue
├── src/                        # 共享源码目录
│   ├── components/             # 公共组件
│   ├── hooks/                  # 组合式函数
│   ├── plugins/                # 插件配置
│   ├── store/                  # 状态管理
│   ├── styles/                 # 样式文件
│   └── utils/                  # 工具函数
├── build/                      # 构建配置
│   └── multi-page.js           # 多页面构建插件
├── mock/                       # Mock 数据
├── public/                     # 静态资源
└── vite.config.ts              # Vite 配置
```

## 🛠️ 开发环境

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.1.0

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

开发服务器将在 `http://localhost:4000` 启动。

### 访问页面

- **导航页面**：`http://localhost:4000/`
- **关于页面**：`http://localhost:4000/pages/about/index.html`
- **仪表板页面**：`http://localhost:4000/pages/dashboard/index.html`
- **登录页面**：`http://localhost:4000/pages/login/index.html`

## 🏗️ 构建部署

### 构建项目

```bash
# 开发环境构建
pnpm build:dev

# 生产环境构建
pnpm build:pro

# 测试环境构建
pnpm build:test
```

### 构建输出

构建后的文件位于 `dist-dev/frontend/` 目录下：

```
dist-dev/
└── frontend/
    ├── index.html              # 导航页面
    ├── pages/                  # 多页面目录
    │   ├── about/index.html
    │   ├── dashboard/index.html
    │   └── login/index.html
    ├── assets/                 # 静态资源
    ├── favicon.ico
    └── logo.png
```

### 部署访问

将 `dist-dev` 目录作为服务器根目录，访问路径：

- **导航页面**：`http://your-domain/frontend/index.html`
- **关于页面**：`http://your-domain/frontend/pages/about/index.html`
- **仪表板页面**：`http://your-domain/frontend/pages/dashboard/index.html`
- **登录页面**：`http://your-domain/frontend/pages/login/index.html`

## 📝 添加新页面

### 方法一：使用 Plop 生成器（推荐）

项目集成了 Plop 代码生成器，可以快速创建新页面：

```bash
# 启动 plop 生成器
pnpm p
```

选择生成器类型：
- **page** - 在 `pages/` 目录下创建新页面
- **view** - 在 `src/views/` 目录下创建页面
- **component** - 在 `src/components/` 目录下创建组件

#### 创建 pages 目录下的页面

1. 运行 `pnpm p`
2. 选择 `page` 生成器
3. 输入页面名称（如：`user-management`）
4. 输入页面标题（如：`用户管理`）

生成的文件结构：
```
pages/user-management/
├── index.html          # 页面入口HTML
├── main.ts            # 页面入口TypeScript
└── UserManagementApp.vue # 主要Vue组件
```

生成的页面包含：
- 完整的应用初始化配置
- Element Plus 组件库
- 国际化支持
- 状态管理
- 全局样式和动画
- 现代化的UI设计

### 方法二：手动创建

#### 1. 创建页面目录

在 `pages/` 目录下创建新的页面目录：

```bash
mkdir pages/new-page
```

#### 2. 创建页面文件

在 `pages/new-page/` 目录下创建以下文件：

**index.html**
```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>新页面 - Vue Element Plus Admin</title>
    <style>
      /* 加载动画样式 */
      .app-loading {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: #f0f2f5;
      }
      /* ... 更多样式 */
    </style>
  </head>
  <body>
    <div id="app">
      <div class="app-loading">
        <div class="app-loading-wrap">
          <div class="app-loading-item">
            <div class="app-loading-outter"></div>
            <div class="app-loading-inner"></div>
          </div>
        </div>
      </div>
    </div>
    <script type="module" src="./main.ts"></script>
  </body>
</html>
```

**main.ts**
```typescript
import 'vue/jsx'

// 引入windi css
import '@/plugins/unocss'

// 导入全局的svg图标
import '@/plugins/svgIcon'

// 初始化多语言
import { setupI18n } from '@/plugins/vueI18n'

// 引入状态管理
import { setupStore } from '@/store'

// 全局组件
import { setupGlobCom } from '@/components'

// 引入element-plus
import { setupElementPlus } from '@/plugins/elementPlus'

// 引入全局样式
import '@/styles/index.less'

// 引入动画
import '@/plugins/animate.css'

import { createApp } from 'vue'

import NewPageApp from './NewPageApp.vue'

// 创建实例
const setupAll = async () => {
  const app = createApp(NewPageApp)

  await setupI18n(app)

  setupStore(app)

  setupGlobCom(app)

  setupElementPlus(app)

  app.mount('#app')
}

setupAll()
```

**NewPageApp.vue**
```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ElButton, ElCard, ElSpace, ElMessage } from 'element-plus'

const title = ref('新页面')
const message = ref('欢迎来到新页面！')

const handleClick = () => {
  ElMessage.success('按钮点击成功！')
}
</script>

<template>
  <div class="page-container">
    <ElCard class="welcome-card">
      <template #header>
        <div class="card-header">
          <h1>{{ title }}</h1>
        </div>
      </template>
      
      <div class="card-content">
        <p class="welcome-message">{{ message }}</p>
        
        <ElSpace>
          <ElButton type="primary" @click="handleClick">
            点击我
          </ElButton>
          <ElButton type="success">
            成功按钮
          </ElButton>
          <ElButton type="warning">
            警告按钮
          </ElButton>
        </ElSpace>
      </div>
    </ElCard>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.welcome-card {
  max-width: 600px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
}

.card-header {
  text-align: center;
}

.card-header h1 {
  margin: 0;
  color: #303133;
  font-size: 24px;
  font-weight: 600;
}

.card-content {
  text-align: center;
  padding: 20px 0;
}

.welcome-message {
  font-size: 16px;
  color: #606266;
  margin-bottom: 30px;
  line-height: 1.6;
}
</style>
```

#### 3. 重新构建

```bash
pnpm build:dev
```

新页面将自动添加到导航页面中，访问路径为：`/frontend/pages/new-page/index.html`

## ⚙️ 配置说明

### 环境变量

项目支持多环境配置，主要环境变量：

**.env.dev**
```env
# 基础路径
VITE_BASE_PATH=/frontend/

# 输出目录
VITE_OUT_DIR=dist-dev/frontend

# 应用标题
VITE_APP_TITLE=ElementAdmin

# 是否开启 Mock
VITE_USE_MOCK=true
```

### 多页面配置

多页面功能通过 `build/multi-page.js` 插件实现：

- 自动扫描 `pages/` 目录下的所有 HTML 文件
- 生成导航页面
- 处理开发环境的页面路由
- 支持多层级目录结构

## 🔧 开发工具

### 代码检查

```bash
# ESLint 检查
pnpm lint:eslint

# Prettier 格式化
pnpm lint:format

# Stylelint 样式检查
pnpm lint:style
```

### TypeScript 检查

```bash
pnpm ts:check
```

### 代码生成

项目集成了 Plop 代码生成器，支持快速生成代码：

```bash
# 启动 plop 生成器
pnpm p
```

#### 生成器类型

1. **page** - 在 `pages/` 目录下创建新页面
   - 生成完整的页面结构（HTML、TS、Vue）
   - 包含所有必要的应用初始化配置
   - 现代化的UI设计

2. **view** - 在 `src/views/` 目录下创建页面
   - 生成Vue页面组件
   - 适用于单页面应用中的路由页面

3. **component** - 在 `src/components/` 目录下创建组件
   - 生成可复用的Vue组件
   - 包含组件导出文件

#### 使用示例

```bash
# 生成用户管理页面
pnpm p
# 选择: page
# 页面名称: user-management
# 页面标题: 用户管理

# 生成用户列表组件
pnpm p
# 选择: component
# 组件名称: UserList
```

## 📦 技术栈

- **前端框架**：Vue 3.5.13
- **构建工具**：Vite 6.0.7
- **UI 组件库**：Element Plus 2.9.2
- **开发语言**：TypeScript 5.7.3
- **包管理器**：pnpm 9.15.3
- **状态管理**：Pinia 2.3.0
- **路由管理**：Vue Router 4.5.0
- **国际化**：Vue I18n 11.0.1
- **样式预处理**：Less 4.2.1
- **原子化 CSS**：UnoCSS 0.65.4
- **代码生成**：Plop 4.0.1
- **代码检查**：ESLint 9.17.0
- **代码格式化**：Prettier 3.4.2
- **样式检查**：Stylelint 16.12.0
- **Mock 数据**：Mock.js 1.1.0
- **图表库**：ECharts 5.6.0
- **富文本编辑器**：WangEditor 5.1.23
- **二维码生成**：QRCode 1.5.4
- **图片裁剪**：Cropper.js 1.6.2

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源。

## 🙏 致谢

- [Vue.js](https://vuejs.org/)
- [Element Plus](https://element-plus.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## ❓ 常见问题

### Q: 如何添加新的页面？
A: 推荐使用 Plop 生成器：运行 `pnpm p`，选择 `page` 生成器，输入页面名称和标题即可。

### Q: 页面无法访问怎么办？
A: 确保开发服务器已启动（`pnpm dev`），然后访问 `http://localhost:4000` 查看导航页面。

### Q: 如何修改页面标题？
A: 在页面的 `index.html` 文件中修改 `<title>` 标签内容。

### Q: 如何添加新的组件？
A: 运行 `pnpm p`，选择 `component` 生成器，输入组件名称即可。

### Q: 如何配置环境变量？
A: 在项目根目录创建 `.env.dev`、`.env.pro` 等环境文件，参考现有的环境配置。

### Q: 构建后的文件在哪里？
A: 构建后的文件在 `dist-dev/frontend/` 目录下，可以通过 `pnpm build:dev` 构建。

## 📞 支持

- 📧 邮箱：502431556@qq.com
- 🐛 问题反馈：[GitHub Issues](https://github.com/your-repo/issues)
- 📖 文档：[项目 Wiki](https://github.com/your-repo/wiki)

---

如有问题或建议，欢迎提交 Issue 或 Pull Request！ 