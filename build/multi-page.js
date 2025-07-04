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
    // 递归扫描所有HTML文件
    const scanHtmlFiles = (dir, baseDir = dir) => {
      const files = []
      const items = fs.readdirSync(dir, { withFileTypes: true })
      
      for (const item of items) {
        const fullPath = path.join(dir, item.name)
        if (item.isDirectory()) {
          files.push(...scanHtmlFiles(fullPath, baseDir))
        } else if (item.isFile() && item.name.endsWith('.html')) {
          files.push(fullPath)
        }
      }
      return files
    }
    
    const htmlFiles = scanHtmlFiles(pagesDir)
    htmlFiles.forEach(file => {
      const relativePath = path.relative(pagesDir, file)
      const name = relativePath.replace('.html', '')
      inputs[name] = file
    })
  }
  
  console.log('构建多页面入口：', Object.keys(inputs))
  return inputs
}

// 生成导航页面HTML
function generateNavigationHtml(root = process.cwd()) {
  const pagesDir = path.resolve(root, 'pages')
  const navigationHtml = path.resolve(root, 'index.html')
  
  if (fs.existsSync(pagesDir)) {
    const pages = []
    
    // 递归扫描所有HTML文件
    const scanHtmlFiles = (dir, baseDir = dir) => {
      const files = []
      const items = fs.readdirSync(dir, { withFileTypes: true })
      
      for (const item of items) {
        const fullPath = path.join(dir, item.name)
        if (item.isDirectory()) {
          files.push(...scanHtmlFiles(fullPath, baseDir))
        } else if (item.isFile() && item.name.endsWith('.html')) {
          files.push(fullPath)
        }
      }
      return files
    }
    
    const htmlFiles = scanHtmlFiles(pagesDir)
    htmlFiles.forEach(file => {
      const relativePath = path.relative(pagesDir, file)
      const name = relativePath.replace('.html', '')
      
      // 读取页面标题
      const htmlContent = fs.readFileSync(file, 'utf-8')
      const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/)
      const title = titleMatch ? titleMatch[1] : name
      
      pages.push({ 
        name, 
        title,
        path: relativePath.replace('.html', '')
      })
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
        max-width: 1000px; margin: 0 auto; background: white; 
        border-radius: 8px; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }
      h1 { color: #409eff; text-align: center; margin-bottom: 40px; }
      .nav-grid { 
        display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px; margin-top: 30px;
      }
      .nav-item { 
        background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 6px;
        padding: 20px; text-align: center; text-decoration: none; color: #333;
        transition: all 0.3s ease; display: block;
      }
      .nav-item:hover { 
        background: #409eff; color: white; transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
      }
      .nav-item h3 { margin: 0 0 10px 0; font-size: 18px; }
      .nav-item p { margin: 0; color: #666; font-size: 14px; }
      .nav-item:hover p { color: rgba(255,255,255,0.8); }
      .page-path { 
        font-size: 12px; color: #999; margin-top: 8px; 
        font-family: 'Courier New', monospace;
      }
      .nav-item:hover .page-path { color: rgba(255,255,255,0.6); }
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
          <a href="pages/${page.path}.html" class="nav-item">
            <h3>${page.title}</h3>
            <p>访问 ${page.name} 页面</p>
            <div class="page-path">pages/${page.path}.html</div>
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
        console.log('请求URL:', url) // 添加调试信息
        
        if (url && url.startsWith('/pages/') && url.endsWith('.html')) {
          // 处理 /pages/about/index.html, /pages/admin/users/index.html 等请求
          const pagePath = url.replace('/pages/', '').replace('.html', '')
          const htmlPath = path.resolve(root, `pages/${pagePath}.html`)
          
          console.log('页面路径:', pagePath) // 添加调试信息
          console.log('HTML文件路径:', htmlPath) // 添加调试信息
          
          if (fs.existsSync(htmlPath)) {
            let content = fs.readFileSync(htmlPath, 'utf-8')
            
            // 修正script路径 - 根据HTML文件名确定对应的TS文件
            const fileName = path.basename(pagePath)
            const dirName = path.dirname(pagePath)
            const scriptPath = fileName === 'index' 
              ? path.join(dirName, 'main.ts')
              : path.join(dirName, `${fileName}.ts`)
            
            console.log('脚本路径:', scriptPath) // 添加调试信息
            
            content = content.replace(
              /src="\.\/main\.ts"/g,
              `src="/pages/${scriptPath}"`
            )
            content = content.replace(
              /src="\.\/[^"]*\.ts"/g,
              `src="/pages/${scriptPath}"`
            )
            
            res.setHeader('Content-Type', 'text/html')
            res.end(content)
            console.log('✅ 成功返回页面内容') // 添加调试信息
            return
          } else {
            console.log('❌ HTML文件不存在:', htmlPath) // 添加调试信息
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
  generateNavigationHtml
} 