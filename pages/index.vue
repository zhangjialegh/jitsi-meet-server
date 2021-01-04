<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">nuxt-jitsi</h1>
      <el-button type="primary" v-for="item in rooms" :key="item.id">{{item.id}}<i class="el-icon-upload el-icon--right"></i></el-button>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer" class="button--green"> Documentation </a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" rel="noopener noreferrer" class="button--grey"> GitHub </a>
      </div>
      <el-button type="success" @click="send">成功按钮</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socket: null,
      jitsi: null,
      rooms: []
    }
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.emit('xxxxxx', this.socket)
      this.socket.close()
    }
  },
  mounted() {
    console.log(this.$io, 'io')
    this.socket = this.$io('http://localhost:3000', {
      reconnectionDelayMax: 10000,
      path: '/custom',
      query: {
        token: '123',
        listener: 'wg'
      }
    })
    this.socket.on('connect', () => {
      console.log(this.socket.connected) // true
      this.socket.on('rooms', (m) => {
        console.log(m,'client')
        this.rooms = m
      })
    })
    // this.socket.on('disconnect', (reason) => {
    //   throw Error(reason)
    // })
  },
  methods: {
    initJitsi(name) {
      const domin = 'im-tj.btzh.cn'
      this.jitsi = new window.JitsiMeetExternalAPI(domin, {
        roomName: name || `abc${Date.now()}_` + (Math.random() * 80 + 20),
        width: '100%',
        height: '100%',
        parentNode: document.querySelector('#jitsi_meet'),
        // configOverwrite: jitsiConfig, // 是否替换服务端config配置
        // interfaceConfigOverwrite: jitsiInterFace, // 是否替换服务端interface配置
        noSSL: false
      })
      this.jitsi.addEventListeners({
        readyToClose: () => {
          this.disposeVideo()
        }
      })
    },
    send() {
      // window.open('meet','_blank')
      this.socket.emit('wg', 'www.')
    },
    disposeVideo() {
      this.jitsi.dispose()
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
