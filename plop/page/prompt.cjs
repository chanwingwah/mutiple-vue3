const toUpperCase = (str) => str.charAt(0).toUpperCase() + str.slice(1)

module.exports = {
  description: 'Create page in pages directory',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '请输入页面名称（Please enter page name）',
      validate: (value) => {
        if (!value) {
          return '页面名称不能为空'
        }
        return true
      }
    },
    {
      type: 'input',
      name: 'title',
      message: '请输入页面标题（Please enter page title）',
      default: (answers) => answers.name
    }
  ],
  actions: (data) => {
    const { name, title } = data
    const upperFirstName = toUpperCase(name)

    const actions = []
    if (name) {
      // 创建目录
      actions.push({
        type: 'add',
        path: `./pages/${name}/index.html`,
        templateFile: './plop/page/index.hbs',
        data: {
          name,
          upperFirstName,
          title
        }
      })
      
      actions.push({
        type: 'add',
        path: `./pages/${name}/main.ts`,
        templateFile: './plop/page/main.hbs',
        data: {
          name,
          upperFirstName
        }
      })
      
      actions.push({
        type: 'add',
        path: `./pages/${name}/${upperFirstName}App.vue`,
        templateFile: './plop/page/app.hbs',
        data: {
          name,
          upperFirstName,
          title
        }
      })
    }

    return actions
  }
} 