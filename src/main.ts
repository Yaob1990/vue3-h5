import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "amfe-flexible";
import { Toast } from "vant";

/* eslint-disable */
if (process.env.NODE_ENV === "develop" || /test/gi.test(window.location.host)) {
  // 生产环境不需要加载，去除 Prefetch
  import(/* webpackChunkName: "vconsole"*/ "vconsole")
    .then(({ default: vconsole }) => {
      const vConsole = new vconsole();
    })
    .catch(error => "An error occurred while loading the component");
}
/* eslint-enable */

// @ts-ignore
const app = createApp(App);
app.use(store);
app.use(router);
app.use(Toast);
app.mount("#app");
