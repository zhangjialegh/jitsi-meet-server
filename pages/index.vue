<template>
  <div class="mian-container">
    <el-form :model="form" ref="roomForm" :rules="formRule" class="demo-dynamic">
      <el-form-item prop="room">
        <el-input placeholder="请输入房间号" v-model="form.room">
          <el-button slot="append" @click="goRoom">进入房间</el-button>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  asyncData({ isDev }) {
    return {
      isDev
    }
  },
  data() {
    return {
      formRule: {
        room: { required: true, message: '请输入房间号', trigger: 'blur' }
      },
      form: {
        room: ''
      }
    }
  },
  methods: {
    goRoom() {
      this.$refs.roomForm.validate((valid) => {
        if (valid) {
          this.$router.push(`/room/${this.form.room}`)
        }
      })
    }
  }
}
</script>

<style>
.mian-container {
  margin: 0 auto;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: url('../assets/th.jpg') no-repeat center center;
  background-size: cover;
}
.mian-container .demo-dynamic {
  min-width: 500px;
}
</style>
