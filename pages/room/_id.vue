<template>
  <el-container>
    <el-header class="room-header"
      ><el-avatar> {{ form.name }} </el-avatar></el-header
    >
    <el-main class="room-main">
      <el-form class="demo-dynamic">
        <el-form-item>
          <el-checkbox-group v-model="checkboxGroup1" size="medium">
            <el-checkbox :label="item.id" border v-for="item in rooms" :key="item.id">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="medium" circle icon="el-icon-phone-outline" @click="send" class="send-btn"></el-button>
    </el-main>
    <el-dialog title="提示" :visible.sync="calling" width="30%" center append-to-body>
      <span
        >来自<strong style="color: red">{{ caller && caller.name }}</strong
        >的通话请求</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="此房间昵称" :visible.sync="nameInit" width="30%" :show-close="false" center append-to-body :close-on-click-modal="false">
      <el-form :model="form" ref="roomForm" :rules="formRule" class="demo-dynamic">
        <el-form-item prop="name">
          <el-input placeholder="请输入名称" v-model="form.name">
            <el-button slot="append" @click="beforeSocket">建立连接</el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  asyncData({ isDev, params }) {
    return {
      isDev,
      id: params.id
    }
  },
  data() {
    return {
      socket: null,
      jitsi: null,
      caller: null,
      rooms: [],
      checkboxGroup1: [],
      calling: false,
      nameInit: false,
      formRule: {
        name: { required: true, message: '请输入名称', trigger: 'blur' }
      },
      form: {
        name: ''
      }
    }
  },
  destroyed() {
    if (this.socket) {
      this.socket.disconnect()
    }
  },
  mounted() {
    const name = sessionStorage.getItem(`socket_room_${this.id}`)
    if (!name) {
      this.nameInit = true
    } else {
      this.form.name = name
      this.initSocket(name)
    }
  },
  methods: {
    beforeSocket() {
      this.$refs.roomForm.validate((valid) => {
        if (valid) {
          sessionStorage.setItem(`socket_room_${this.id}`, this.form.name)
          this.nameInit = false
          this.initSocket(this.form.name)
        }
      })
    },
    initSocket(name) {
      const url = this.isDev ? 'http://localhost:4004' : 'https://im.jialekoi.cn'
      this.socket = this.$io(url, {
        transports: ['websocket'],
        reconnectionDelayMax: 10000,
        path: '/nuxt.socket',
        query: {
          token: 'test',
          room: this.id,
          name
        }
      })
      // on reconnection, reset the transports option, as the Websocket
      // connection may have failed (caused by proxy, firewall, browser, ...)
      this.socket.io.on('reconnect_attempt', () => {
        this.socket.io.opts.transports = ['polling', 'websocket']
      })
      this.socket.on('connect', () => {
        // console.log(this.socket.connected) // true
        this.$notify({
          title: '成功',
          message: '连接成功',
          type: 'success'
        })
        this.socket.on(`rooms_${this.id}`, (m) => {
          const addUser = m.filter((item) => !this.rooms.find((ele) => ele.id === item.id)).filter((item) => item.id !== this.socket.id)
          const delUser = this.rooms.filter((item) => !m.find((ele) => ele.id === item.id)).filter((item) => item.id !== this.socket.id)
          if (addUser && addUser.length) {
            addUser.forEach((item) => {
              setTimeout(() => {
                this.$notify({
                  title: '提示',
                  message: item.name + '进入了房间',
                  type: 'success'
                })
              })
            })
          }
          if (delUser && delUser.length) {
            delUser.forEach((item) => {
              setTimeout(() => {
                this.$notify({
                  title: '警告',
                  message: item.name + '离开了房间',
                  type: 'warning'
                })
              })
            })
          }
          this.$nextTick(() => {
            this.rooms = m.filter((item) => item.id !== this.socket.id)
          })
        })
        this.socket.on('call_' + this.socket.id, (caller) => {
          this.calling = true
          this.caller = caller
        })
      })
      // this.socket.on('disconnect', (reason) => {
      //   this.$notify({
      //     title: '警告',
      //     message: reason,
      //     type: 'warning'
      //   })
      // })
      this.socket.on('connect_error', (error) => {
        this.$notify({
          title: '失败',
          message: error,
          type: 'error'
        })
      })
    },
    send() {
      if (!this.checkboxGroup1.length) return
      const sts = this.rooms.filter((item) => this.checkboxGroup1.includes(item.id))
      this.socket.emit('call', sts, (caller) => {
        this.goMeet(caller)
      })
    },
    close() {
      this.calling = false
    },
    sure() {
      this.calling = false
      this.goMeet({ ...this.caller, name: this.form.name })
    },
    goMeet(caller) {
      // this.$router.push({
      //   path: "/meet",
      //   query: {
      //     roomName: caller.roomName,
      //     id: caller.id,
      //   },
      // });
      this.checkboxGroup1 = []
      window.open('/meet?roomName=' + caller.roomName + '&name=' + caller.name, '_blank')
    }
  }
}
</script>

<style>
.room-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: #409eff;
}
.room-main .send-btn {
  position: fixed;
  bottom: 50px;
  right: 30px;
}
</style>
