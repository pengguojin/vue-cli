<!--  -->
<template lang="html">
  <div>
        <input v-for="(json, index) in arr" type="button" :value="index" :key="index" @click="fn(index)"/>
        <transition-group name="slideLeft">
            <div class="box" v-for="(json, index) in arr" :key="index" v-if="json.show">{{index}}</div>
        </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [{ show: true }, { show: true }, { show: true }, { show: true }]
    }
  },
  methods: {
      fn (index) {
          this.arr[index].show=!this.arr[index].show
      }
  }
};
</script>
<style lang="css" scoped>
    .box {
        width: 200px;height: 100px;background: #ccc;border: 1px solid black;
    }
</style>
