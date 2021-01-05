module.exports = {
  apps : [{
    name: 'im',
    script: 'server/app.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: '',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '123.57.1.92',
      ref  : 'origin/master',
      repo : 'git@github.com:zhangjialegh/jitsi-meet-server.git',
      path : '/srv/jitsi-meet-server/',
      'post-deploy' : 'yarn --registry https://registry.npm.taobao.org/ && yarn build && pm2 reload ecosystem.config.js --env production'
    }
  }
};
