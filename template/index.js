const Koa = require('koa')
const koaProxy = require('koa-proxies')

const app = new Koa()

app.use(koaProxy('/', {
  target: 'https://www.google.com/',
  changeOrigin: true,
  logs: true,
  autoRewrite: true
}))

module.exports = app.callback()

// const server = app.listen(5500, () => {
//   console.log(`Koa is running on port 5500`)
// })
