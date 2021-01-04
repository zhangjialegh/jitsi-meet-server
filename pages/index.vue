<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">nuxt-jitsi</h1>
      <el-checkbox-group v-model="checkboxGroup1" size="small">
        <el-checkbox
          :label="item.id"
          border
          v-for="item in rooms"
          :key="item.id"
          >{{ item.id }}</el-checkbox
        ><br />
      </el-checkbox-group>
      <el-button type="success" @click="send">CALL</el-button>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="calling"
      width="30%"
      center
      append-to-body
    >
      <span
        >来自<strong style="color: red">{{ caller && caller.id }}</strong
        >的通话请求</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socket: null,
      jitsi: null,
      caller: null,
      rooms: [],
      checkboxGroup1: [],
      calling: false,
    };
  },
  destroyed() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
  mounted() {
    this.socket = this.$io("http://localhost:4004", {
      reconnectionDelayMax: 10000,
      path: "/custom",
      query: {
        token: "123",
      },
    });
    this.socket.on("connect", () => {
      // console.log(this.socket.connected) // true
      this.socket.on("rooms", (m) => {
        this.rooms = m.filter((item) => item.id !== this.socket.id);
      });
      this.socket.on("call_" + this.socket.id, (caller) => {
        this.calling = true;
        this.caller = caller;
      });
    });
    // this.socket.on('disconnect', (reason) => {
    //   throw Error(reason)
    // })
  },
  methods: {
    send() {
      const sts = this.rooms.filter((item) =>
        this.checkboxGroup1.includes(item.id)
      );
      this.socket.emit("call", sts, (caller) => {
        this.goMeet(caller);
      });
    },
    close() {
      this.calling = false;
    },
    sure() {
      this.calling = false;
      this.goMeet(this.caller);
    },
    goMeet(caller) {
      // this.$router.push({
      //   path: "/meet",
      //   query: {
      //     name: caller.name,
      //     id: caller.id,
      //   },
      // });
      window.open("meet?name=" + caller.name + "&id=" + caller.id, "_blank");
    },
  },
};
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
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
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
