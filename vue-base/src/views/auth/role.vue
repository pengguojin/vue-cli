<template>
  <div>
    角色管理：
    <input type="button" value="点击我">
    <input type="text" v-model="show" @input="handleTest">
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: ""
    };
  },
  methods: {
    handleTest() {
      this.$bus.$emit("a-click", this.show);
    }
  }
};
</script>
<style>
</style>