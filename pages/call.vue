<template>
  <el-dialog title="提示" :visible.sync="visible" width="30%" center>
    <span>需要注意的是内容是默认不居中的</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  asyncData({query}) {
    return {
      query
    }
  },
  data() {
    return {
      visible: true
    }
  },
  mounted() {
    console.log(this, 'io')
  },
  methods: {
    close() {
      this.visible = true
    },
    sure() {
      let url = ''
      window.open(url, '_blank')
    }
  }
}
</script>
<style scoped>
.container-call{}
</style>
