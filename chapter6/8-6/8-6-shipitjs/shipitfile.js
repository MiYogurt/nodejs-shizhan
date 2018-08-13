module.exports = shipit => {
  require('shipit-deploy')(shipit)
  shipit.initConfig({
    default: {
      deployTo: '/home/pi/work2',
      repositoryUrl: 'pi@192.168.1.149:/home/pi/node_project',
    },
    staging: {
      servers: 'pi@192.168.1.149',
    },
  })
  shipit.task('deploy:finish', async () => {
    const config = {
      cwd: '/home/pi/work2/current'
    }
    const run = async (shell) => shipit.remote(shell, config) 
    await run('pwd')
    await run('npm install')
    await run('npx pm2 delete all')
    await run('npx pm2 start index.js')
  })
}