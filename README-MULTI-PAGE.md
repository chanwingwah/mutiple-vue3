# Vue Element Plus Admin - 多页面应用

基于 Vue 3 + Element Plus + TypeScript + Vite 的多页面后台管理系统。

## 🚀 特性

- **多页面架构**：支持多个独立页面，每个页面都有独立的入口
- **自动导航生成**：自动扫描页面目录，生成导航页面
- **开发体验**：支持热更新，开发环境自动路由处理
- **构建优化**：构建时自动生成多个HTML文件，支持CDN部署
- **TypeScript**：完整的 TypeScript 支持
- **Element Plus**：基于 Element Plus UI 组件库
- **现代化工具链**：Vite + Vue 3 + ES6+

## 📁 项目结构

```
vue-element-plus-admin-master/
├── build/                    # 构建相关配置
│   └── multi-page.js        # 多页面核心逻辑
├── pages/                   # 多页面目录
│   ├── about/              # 关于我们页面
│   │   ├── index.html      # 页面HTML
│   │   ├── main.ts         # 页面入口
│   │   └── AboutApp.vue    # 页面组件
│   ├── dashboard/          # 仪表板页面
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── DashboardApp.vue
│   └── login/              # 登录页面
│       ├── index.html
│       ├── main.ts
│       └── LoginApp.vue
├── scripts/                 # 脚本文件
│   └── generate-nav.js     # 导航页面生成脚本
├── src/                     # 源代码
├── vite.config.ts          # Vite配置
├── package.json
└── README-MULTI-PAGE.md    # 本文档
```

## 🛠️ 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发环境

```bash
# 启动开发服务器
pnpm dev

# 生成导航页面
pnpm generate:nav
```

### 构建部署

```bash
# 开发环境构建
pnpm build:dev

# 生产环境构建
pnpm build:pro

# 预览构建结果
pnpm serve:pro
```

## 📖 使用指南

### 1. 添加新页面

在 `pages/` 目录下创建新的页面目录：

```bash
mkdir pages/new-page
```

创建页面文件：

```html
<!-- pages/new-page/index.html -->
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>新页面</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./main.ts"></script>
  </body>
</html>
```

```typescript
// pages/new-page/main.ts
import { createApp } from 'vue'
import NewPageApp from './NewPageApp.vue'

createApp(NewPageApp).mount('#app')
```

```vue
<!-- pages/new-page/NewPageApp.vue -->
<template>
  <div>
    <h1>新页面</h1>
    <p>这是一个新的页面</p>
  </div>
</template>

<script setup lang="ts">
// 页面逻辑
</script>
```

### 2. 生成导航页面

添加新页面后，运行以下命令更新导航：

```bash
pnpm generate:nav
```

### 3. 访问页面

开发环境：
- 导航页：`http://localhost:4000/`
- 新页面：`http://localhost:4000/new-page.html`

构建后：
- 导航页：`dist-dev/index.html`
- 新页面：`dist-dev/new-page.html`

## 🔧 配置说明

### 多页面配置

多页面功能通过 `build/multi-page.js` 实现，包含：

- **自动扫描**：自动扫描 `pages/` 目录下的页面
- **导航生成**：自动生成导航页面
- **路由处理**：开发环境自动处理页面路由
- **构建优化**：构建时自动移动HTML文件到根目录

### Vite 配置

主要配置在 `vite.config.ts` 中：

```typescript
import { getHtmlInputs, generateNavigationPlugin, moveHtmlToRootPlugin } from './build/multi-page.js'

export default {
  plugins: [
    // 其他插件...
    generateNavigationPlugin(root),    // 生成导航页面
    moveHtmlToRootPlugin(root)         // 移动HTML到根目录
  ],
  build: {
    rollupOptions: {
      input: getHtmlInputs(),          // 多页面入口
    }
  }
}
```

## 📝 脚本说明

### generate:nav

生成导航页面的脚本：

```bash
pnpm generate:nav
```

功能：
- 扫描 `pages/` 目录
- 读取每个页面的标题
- 生成 `index.html` 导航页面
- 自动添加到 `.gitignore`

### 自定义脚本

你可以创建自定义脚本：

```bash
# 创建脚本
touch scripts/custom-script.js

# 添加到 package.json
{
  "scripts": {
    "custom": "node scripts/custom-script.js"
  }
}
```

## 🚀 部署说明

### 静态部署

构建后的文件可以直接部署到静态服务器：

```bash
# 构建
pnpm build:pro

# 部署 dist 目录到服务器
```

### CDN 部署

支持 CDN 部署，所有资源都会被打包到 `assets/` 目录。

### 子目录部署

如需部署到子目录，修改 `vite.config.ts` 中的 `base` 配置：

```typescript
export default {
  base: '/your-sub-path/',
  // ...
}
```

## 🔍 开发技巧

### 1. 页面间通信

由于是多页面应用，页面间通信可以通过：

- **URL 参数**：`?param=value`
- **LocalStorage**：`localStorage.setItem/getItem`
- **SessionStorage**：`sessionStorage.setItem/getItem`
- **PostMessage**：跨页面通信

### 2. 共享组件

在 `src/components/` 中创建共享组件，在各个页面中导入使用。

### 3. 共享样式

在 `src/styles/` 中创建共享样式，在各个页面中导入使用。

### 4. 环境变量

使用 `.env` 文件配置环境变量：

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000

# .env.production
VITE_API_BASE_URL=https://api.example.com
```

## 🐛 常见问题

### Q: 新页面不显示在导航中？

A: 运行 `pnpm generate:nav` 重新生成导航页面。

### Q: 构建后页面无法访问？

A: 检查构建输出目录，确保HTML文件在正确位置。

### Q: 开发环境页面404？

A: 确保页面目录下有 `index.html` 文件。

### Q: 样式不生效？

A: 检查样式文件路径，确保正确导入。

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

如有问题，请通过以下方式联系：

- 提交 Issue
- 发送邮件
- 微信群讨论

---

**Vue Element Plus Admin - 多页面应用** 🚀 