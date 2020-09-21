# vue3-h5

基于最新 vue3 版本的 h5 脚手架，开箱即用，目录层次清晰，极易二次扩展。

## 主要封装内容

   1. 集成最新 `vue` 全家桶，使用 `typescript` 开发
   2. 路由使用 hash 模式，方便部署
   3. `axios` 封装，暴露常用的 `get` `post` 方法
   4. `axios` 封装，避免多重 `loading` 的问题，并提供接口配置项
   5. 使用 less ，并提交基础的`mixin`，并作为全局css，提供常用的css 函数
   6. 异步加载 `vconsole`，线上环境，无需手动去除，不会打入主包，不会引起包体积增大
   7. ui 框架选择 `vant`，按需引入
   8. `npm run report` 分析构建包的大小
