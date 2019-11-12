const ncp = require('ncp')
const config = require('./config')
const path = require('path')
const fs = require('fs')
const spawnSync = require('child_process').spawnSync
const which = require('which')
const now = which.sync('now')
const rimraf = require('rimraf')

function replaceInFile (filepath, origin, replacement) {
  let data = fs.readFileSync(filepath, 'utf8')
  let result = data.replace(origin, replacement)
  fs.writeFileSync(filepath, result, 'utf8')
}

function makeMirror (mirror) {
  console.log(`Making mirror ${mirror.key}`)
  let dir = path.resolve(__dirname, mirror.key)
  ncp(path.resolve(__dirname, 'template'), dir, function (err) {
    if (err) {
      return console.error(err)
    }
    console.log(`Folder ${mirror.key} created`)
    replaceInFile(
      path.resolve(__dirname, mirror.key, 'index.js'),
      'https://www.google.com/',
      mirror.proxied
    )
    replaceInFile(
      path.resolve(__dirname, mirror.key, 'now.json'),
      `,"alias": "google.upupming.site"`,
      mirror.proxying ? `,"alias": "${mirror.proxying}"` : ''
    )
    console.log(`Folder ${mirror.key} configured`)

    console.log(`Deploying ${mirror.key} to now`)
    let ns = spawnSync(now, [dir, '--target', 'production'])
    console.log(`now.sh: \n${ns.stderr.toString()}`)
    console.log(`now.sh: \n${ns.stdout.toString()}`)

    rimraf(dir, function () {
      console.log(`${dir} cleaned up`)
    })
  })
}

config.mirrors.forEach(makeMirror)
