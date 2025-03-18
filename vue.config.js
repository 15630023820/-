const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //修改webpack
  //chainWebpack(conf){}修改，先访问之前的
  //configureWebpack(conf){}配置之后合并

  //一次性配置
  devServer:{
    proxy:{
      '^/api':{
        target:'http://localhost:3000',//webpack会自动加/api
        //清除/api
        pathRewrite:{
          '^/api':''
        },
        logLevel:'debug',
        logProvider:()=>console,
        changeOrigin:true,//让服务器可以看到代理的过程ip  后端可以看到前端的端口
      }
    }
  }
})
