<template>
  <div></div>
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