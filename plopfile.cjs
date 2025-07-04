// const viewGenerator = require('./plop/view/prompt.cjs')
const componentGenerator = require('./plop/component/prompt.cjs')
const pageGenerator = require('./plop/page/prompt.cjs')

module.exports = function (plop) {
  // plop.setGenerator('view', viewGenerator)
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('page', pageGenerator)
}
