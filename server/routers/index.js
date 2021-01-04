const Router = require('koa-router')
const router = new Router({
  prefix: '/api'
})

// router.post('/ocr/photo', async (ctx, next) => {
//   const {imgUrl, type} = ctx.request.body
//   $mt.checkParams(ctx, next,{imgUrl})
//   try {
//     const token = await $utils.get_access_token()
//     const res = await $utils.get_ocr_info(token, imgUrl, type)
//     $res.success(ctx, next, res.data)
//   } catch (error) {
//     $res.error(ctx, next, error)
//   }
// })

// router.get('/uploadToken', async (ctx, next) => {
//   try {
//     const token = await $utils.get_qiniu_token()
//     $res.success(ctx, next, token)
//   } catch (error) {
//     $res.error(ctx, next, error)
//   }
// })

module.exports = router
