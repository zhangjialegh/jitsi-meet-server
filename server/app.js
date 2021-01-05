const Koa = require("koa");
const body = require("koa-body");
const path = require("path");
const app = new Koa();
const server = require("http").Server(app.callback());
const { Nuxt, Builder } = require("nuxt");
const nuxtConfig = require("../nuxt.config.js");
const socketIO = require("./socket");

app.use(
  body({
    formidable: {
      keepExtensions: true,
      maxFieldsSize: 500 * 1024 * 1024, // 文件上传大小
      hash: "md5",
      onFileBegin: (name, file) => {
        // 文件上传前的设置
      }
    },
    multipart: true
  })
);

global.isDev = false;
const env = process.env.NODE_ENV;
if (env == "development") {
  //坑点 设置环境的时候 注意空格
  global.host = "http://127.0.0.1:3000/";
  global.isDev = true;
} else if (env == "production") {
  global.host = "https://im.jialekoi.cn/";
}

//拦截静态资源 开始
const static = require("koa-static");
const staticpath = "./static/";
app.use(
  static(path.join(__dirname, staticpath), {
    immutable: true
  })
);

nuxtConfig.dev = global.isDev;
async function start() {
  const nuxt = new Nuxt(nuxtConfig);
  const {
    host = process.env.HOST || "127.0.0.1",
    port = process.env.PORT || 3000
  } = nuxt.options.server;

  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt);
    await builder.build(); //开发环境下 进行实时nuxt编译
  } else {
    await nuxt.ready();
  }

  app.on("error", (err, ctx) => {});

  app.use(async (ctx, next) => {
    if (/api\//.test(ctx.request.url)) {
      //如果url中白包含 api/ 判定为 接口为koa2的返回参数渲染
      await next();
    } else {
      //不然使用nuxt的的render渲染
      ctx.status = 200;
      return new Promise((resolve, reject) => {
        ctx.res.on("close", resolve);
        ctx.res.on("finish", resolve);
        nuxt.render(ctx.req, ctx.res, promise => {
          promise.then(resolve).catch(reject);
        });
      });
    }
  });
  // const router = require("./routers/index"); //所有koa2 route的配置加载
  // app.use(router.routes());

  // io.path('/meet')
  socketIO(server);

  server.listen(port, host);
  // server.timeout = 5 * 60 * 1000; //超时设置
}

start();
