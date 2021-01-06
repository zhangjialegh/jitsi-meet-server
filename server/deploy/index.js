const {exec} = require('child_process')
const ora = require('ora')
const path = require('path')

const spinner = ora()
spinner.start('部署中....')
exec(path.resolve(__dirname, '../../deploy.sh'), (error) => {
  if (error) {
    throw error
  }
  spinner.stop().succeed('部署完成')
})
