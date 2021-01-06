const {exec} = require('child_process')
const ora = require('ora')
const path = require('path')

const spinner = ora()
spinner.start('部署中....')
const child = exec(path.resolve(__dirname, '../../deploy.sh'), (error) => {
  if (error) {
    throw error
  }
  spinner.stop().succeed('部署完成')
})

process.on('SIGINT',() => {
  process.kill(child.pid)
})
