<template>
  <div class="home">
    <div class="msg">{{ msg }}</div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Options({
  components: {
    HelloWorld
  },
  mounted() {
    this.$toast("提示文案");
  }
})
export default class Home extends Vue {
  msg = "vue3 h5 脚手架";
}
</script>
<style lang="less">
.msg {
  font-weight: @FontBold;
  .bg(orange);
}
</style>
