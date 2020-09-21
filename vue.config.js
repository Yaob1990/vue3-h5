// @ts-nocheck
const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  publicPath: "./",
  configureWebpack: config => {
    if (isProduction) {
      // 为生产环境修改配置...
      // 线上去除console等信息
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = [
        "console.log"
      ];

      // 开启gzip压缩
      const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      );
      if (process.env.npm_config_report) {
        // 打包后模块大小分析//npm run build --report
        config.plugins.push(new BundleAnalyzerPlugin());
      }
    } else {
      // 为开发环境修改配置...
    }
  },
  chainWebpack: config => {
    // 设置目录别名alias
    config.resolve.alias
      .set("assets", "@/assets")
      .set("components", "@/components")
      .set("view", "@/view")
      .set("style", "@/style")
      .set("api", "@/api")
      .set("store", "@/store");

    config.plugin("prefetch").tap(options => {
      options[0].fileBlacklist = options[0].fileBlacklist || [];
      // 打包去除vconsole（prefetch）
      options[0].fileBlacklist.push(/vconsole(.)+?\.js$/);
      // 打包去除预加载map文件
      options[0].fileBlacklist.push(/\.map$/);
      return options;
    });
  },

  //  全局引入less 变量  函数
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        path.resolve(__dirname, "src/style/_variables.less"),
        path.resolve(__dirname, "src/style/_mixin.less")
      ]
    }
  },
  devServer: {
    // 设置代理，用来解决本地开发跨域问题，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    proxy: "https://easy-mock.com/"
  }
};
