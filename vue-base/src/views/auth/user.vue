<template>
  <div>用户管理：{{show}}</div>
</template>

<script>
export default {
  //
  data() {
    return {
      show: ""
    };
  },
  mounted() {
    this.$bus.$on("a-click", info => {
      //
      this.show = info;
    });
  }
};
</script>
<style>
</style>