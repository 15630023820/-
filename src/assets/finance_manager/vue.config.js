const { defineConfig } = require('@vue/cli-service')

const isProduction = process.env.NODE_ENV === 'production';
const TerserPlugin = require("terser-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const configureWebpack = {};
const plugins = [];
let externals = {};
let productionSourceMap = true;


let cdn = {
  build:{
    js:[
      "https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.min.js",
      "https://unpkg.com/vuex@3.6.2/dist/vuex.min.js",
      'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js',
      'https://unpkg.com/vue-router@3.6.5/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js'
    ]
  },
  dev:{
    js:[],
    css:[]
  }
}

let chainWebpack = config => {
    // 传递cdn到页面
      config.plugin('html').tap(args =>{
          if (isProduction) {
            args[0].myCdn = cdn.build;
          } else {
            args[0].myCdn = cdn.dev;
          }
          return args;
      });
};
if (isProduction) {
  // webpack不要管的三方库
  externals = {
    // key: 引入的方式， value:暴露出来的对象
    'vue-router':'VueRouter',
    vue:'Vue',
    vuex:'Vuex',
    axios:'axios',
    echarts:'echarts'
  }


  // 避免代码被控制台看到逻辑
  productionSourceMap = false;

  plugins.push(new TerserPlugin({
    terserOptions:{
      compress:{
        pure_funcs:['console.log','console.warn'],
        drop_debugger:true,// 默认值true
      },
      format:{
        comments:false
      },
    }
  }),
  new CompressionWebpackPlugin({
    threshold: 8192, // 只有8kb才压缩
    test: /\.js|css|json(\?.*)?$/i,
  }),
  new BundleAnalyzer()
  
)


} else {
  configureWebpack.devServer = {
    // productionSourceMap:true,
    // client: {
    //   overlay: false,
    // },
    proxy: {
      '^/api': {
        target: process.env.VUE_APP_URL,//', // webpack会自动附加/api
        // 后端需要/api 所以不需要我们 pathRewrite去干掉/api
        logLevel: 'debug',
        logProvider: () => console,
        changeOrigin: true, // 让服务器可以看到代理的过程ip，dev=>API 看到8080
      }
    } 
  }
}



configureWebpack.plugins = plugins;
configureWebpack.externals = externals;
// 第一层是vue-cli
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap,
  configureWebpack,
  chainWebpack
})




