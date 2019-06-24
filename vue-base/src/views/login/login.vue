<template>
  <div>
    用户名：
    <input type="text" v-model="username">
    密码：
    <input type="text" v-model="password">
    <button @click="login">登陆</button>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      name: String,
      default: "jin"
    }
  },
  data() {
    return {
      username: "admin",
      password: "admin"
    };
  },
  methods: {
    login() {
      this.$router.push({ name: "main" });
    }
  }
};
</script>
<style>
</style>