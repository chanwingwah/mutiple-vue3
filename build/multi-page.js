import fs from 'fs'
import path from 'path'

// 获取多页面入口
function getHtmlInputs(root = process.cwd()) {
  const pagesDir = path.resolve(root, 'pages')
  const inputs = {}
  
  // 生成导航页面
  generateNavigationHtml(root)
  
  // 添加主导航页
  inputs.main = path.resolve(root, 'index.html')
  
  if (fs.existsSync(pagesDir)) {
    fs.readdirSync(pagesDir, { withFileTypes: true }).forEach(dirent => {
      if (dirent.isDirectory()) {
        const htmlPath = path.resolve(pagesDir, dirent.name, 'index.html')
        if (fs.existsSync(htmlPath)) {
          inputs[dirent.name] = htmlPath
        }
      }
    })
  }
  
  console.log('构建多页面入口：', inputs)
  return inputs
}

// 移动HTML文件到根目录的插件
function moveHtmlToRootPlugin(root = process.cwd()) {
  return {
    name: 'move-html-to-root',
    closeBundle() {
      const outDir = path.resolve(root, 'dist-dev')
      const pagesDir = path.resolve(outDir, 'pages')
      
      if (fs.existsSync(pagesDir)) {
        fs.readdirSync(pagesDir, { withFileTypes: true }).forEach(dirent => {
          if (dirent.isDirectory()) {
            const htmlPath = path.join(pagesDir, dirent.name, 'index.html')
            const targetPath = path.join(outDir, `${dirent.name}.html`)
            
            if (fs.existsSync(htmlPath)) {
              // 读取HTML内容并修正资源路径
              let content = fs.readFileSync(htmlPath, 'utf-8')
              // 修正相对路径，因为文件现在在根目录
              content = content.replace(/href="\.\.\/\.\.\/assets\//g, 'href="./assets/')
              content = content.replace(/src="\.\.\/\.\.\/assets\//g, 'src="./assets/')
              
              fs.writeFileSync(targetPath, content)
              console.log(`✅ 已移动 ${dirent.name}/index.html 到根目录 ${dirent.name}.html`)
              
              // 删除原目录
              fs.rmSync(path.join(pagesDir, dirent.name), { recursive: true, force: true })
            }
          }
        })
        
        // 如果pages目录为空，删除它
        if (fs.readdirSync(pagesDir).length === 0) {
          fs.rmdirSync(pagesDir)
          console.log('🗑️  已删除空的 pages 目录')
        }
      }
    }
  }
}

// 生成导航页面HTML
function generateNavigationHtml(root = process.cwd()) {
  const pagesDir = path.resolve(root, 'pages')
  const navigationHtml = path.resolve(root, 'index.html')
  
  if (fs.existsSync(pagesDir)) {
    const pages = []
    fs.readdirSync(pagesDir, { withFileTypes: true }).forEach(dirent => {
      if (dirent.isDirectory()) {
        const htmlPath = path.join(pagesDir, dirent.name, 'index.html')
        if (fs.existsSync(htmlPath)) {
          // 读取页面标题
          const htmlContent = fs.readFileSync(htmlPath, 'utf-8')
          const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/)
          const title = titleMatch ? titleMatch[1] : dirent.name
          pages.push({ name: dirent.name, title })
        }
      }
    })
    
    // 生成导航页面HTML
    const navigationContent = `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue Element Plus Admin - 多页面导航</title>
    <style>
      body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        margin: 0; padding: 40px; background: #f5f5f5;
      }
      .container { 
        max-width: 800px; margin: 0 auto; background: white; 
        border-radius: 8px; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }
      h1 { color: #409eff; text-align: center; margin-bottom: 40px; }
      .nav-grid { 
        display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px; margin-top: 30px;
      }
      .nav-item { 
        background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 6px;
        padding: 20px; text-align: center; text-decoration: none; color: #333;
        transition: all 0.3s ease;
      }
      .nav-item:hover { 
        background: #409eff; color: white; transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
      }
      .nav-item h3 { margin: 0 0 10px 0; font-size: 18px; }
      .nav-item p { margin: 0; color: #666; font-size: 14px; }
      .nav-item:hover p { color: rgba(255,255,255,0.8); }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>🚀 Vue Element Plus Admin</h1>
      <p style="text-align: center; color: #666; margin-bottom: 30px;">
        多页面应用导航 - 选择要访问的页面
      </p>
      <div class="nav-grid">
        ${pages.map(page => `
          <a href="/${page.name}.html" class="nav-item">
            <h3>${page.title}</h3>
            <p>访问 ${page.name} 页面</p>
          </a>
        `).join('')}
      </div>
    </div>
  </body>
</html>`
    
    fs.writeFileSync(navigationHtml, navigationContent)
    console.log(`✅ 已生成导航页面，包含 ${pages.length} 个页面入口`)
  }
}

// 自动生成导航页面的插件
function generateNavigationPlugin(root = process.cwd()) {
  return {
    name: 'generate-navigation',
    buildStart() {
      generateNavigationHtml(root)
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url
        if (url && url.endsWith('.html') && !url.startsWith('/src/') && url !== '/index.html' && url !== '/') {
          // 处理 /about.html, /dashboard.html 等请求
          const pageName = url.replace('.html', '').replace('/', '')
          const htmlPath = path.resolve(root, `pages/${pageName}/index.html`)
          
          if (fs.existsSync(htmlPath)) {
            let content = fs.readFileSync(htmlPath, 'utf-8')
            // 修正script路径
            content = content.replace(
              /src="\.\/main\.ts"/g,
              `src="/pages/${pageName}/main.ts"`
            )
            res.setHeader('Content-Type', 'text/html')
            res.end(content)
            return
          }
        }
        next()
      })
    }
  }
}

export {
  getHtmlInputs,
  generateNavigationPlugin,
  moveHtmlToRootPlugin,
  generateNavigationHtml
} 