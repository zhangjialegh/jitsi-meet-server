<template>
  <div>
    <div class="container-meet" id="jitsi_meet"></div>
    <el-dialog title="提示" :visible.sync="visible" width="30%" center :show-close="false" append-to-body>
      <span>会话结束，请关闭当前页面</span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  asyncData({ query }) {
    return {
      query
    }
  },
  data() {
    return {
      jitsi: null,
      visible: false
    }
  },
  mounted() {
    this.initJitsi(this.query)
  },
  methods: {
    initJitsi(mt) {
      const domin = 'im-tj.btzh.cn'
      this.jitsi = new window.JitsiMeetExternalAPI(domin, {
        roomName: mt.roomName || `abc${Date.now()}_` + (Math.random() * 80 + 20),
        width: '100%',
        height: '100%',
        parentNode: document.querySelector('#jitsi_meet'),
        // configOverwrite: jitsiConfig, // 是否替换服务端config配置
        // interfaceConfigOverwrite: jitsiInterFace, // 是否替换服务端interface配置
        noSSL: false
      })
      this.jitsi.executeCommand('displayName', mt.name)
      this.jitsi.addEventListeners({
        readyToClose: () => {
          this.disposeVideo()
        }
      })
      setTimeout(() => {
        this.$notify({
          title: '成功',
          message: '这是一条成功的提示消息',
          type: 'success'
        })
      }, 4000)
    },
    disposeVideo() {
      this.jitsi.dispose()
      this.visible = true
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
