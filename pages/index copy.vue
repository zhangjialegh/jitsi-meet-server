<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">nuxt-jitsi</h1>
      <!-- <el-button type="primary" >{{item.id}}<i class="el-icon-upload el-icon--right"></i></el-button> -->
      <el-checkbox-group v-model="checkboxGroup1" size="small">
        <el-checkbox :label="item.id" border v-for="item in rooms" :key="item.id">{{item.id}}</el-checkbox>
        <!-- <el-checkbox label="备选项2" border disabled></el-checkbox> -->
      </el-checkbox-group>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer" class="button--green"> Documentation </a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" rel="noopener noreferrer" class="button--grey"> GitHub </a>
      </div>
      <el-button type="success" @click="send">CALL</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socket: null,
      jitsi: null,
      rooms: [],
      checkboxGroup1: []
    }
  },
  destroyed() {
    if (this.socket) {
      this.socket.disconnect()
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
      // console.log(this.socket.connected) // true
      this.socket.on('rooms', (m) => {
        console.log(this.socket.id,'client')
        this.rooms = m.filter(item => item.id !== this.socket.id)
      })
      this.socket.on('call_'+this.socket.id, (count)=> {
        console.log(count,'count')
      })
    })
    // this.socket.on('disconnect', (reason) => {
    //   throw Error(reason)
    // })
  },
  methods: {
    send() {
      // window.open('meet','_blank')
      // this.socket.emit('wg', 'www.')
      // this.$router.push('/meet')
      // this.checkboxGroup1
      const sts = this.rooms.filter(item => this.checkboxGroup1.includes(item.id))
      this.socket.emit('call', sts, (data) => {
        console.log(data,'ooooppp')
      })
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
