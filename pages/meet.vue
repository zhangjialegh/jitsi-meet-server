<template>
  <div class="container-meet" id="jitsi_meet">
  </div>
</template>

<script>
export default {
  data() {
    return {
      socket: null,
      jitsi: null
    }
  },
  mounted() {
    console.log(this.$io, 'io')
    this.socket = this.$io('http://localhost:3000', {
      reconnectionDelayMax: 10000,
      // path: '/meet',
      query: {
        token: '123',
        listener: 'wg'
      }
    })
    this.socket.on('connect', () => {
      console.log(this.socket.connected) // true
    })
    this.initJitsi()
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
      setTimeout(()=>{
        this.$notify({
          title: '成功',
          message: '这是一条成功的提示消息',
          type: 'success'
        });
      },4000)
    },
    send() {
      this.socket.emit('wg', {
        text: 'hello world'
      })
    },
    disposeVideo() {
      this.jitsi.dispose()
    }
  }
}
</script>
<style scoped>
  .container-meet {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>
