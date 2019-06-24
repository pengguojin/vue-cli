<template>
  <div>
    <input type="button" value="点击我" @click="handleTest">
    <!-- {{test}} -->
    {{userName}}
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      test: ""
    };
  },
  computed: {
    // 1、
    ...mapState(["userName"])
    // 2、
    // userName() {
    //   return this.$store.state.userName;
    // }
    // 3、
    // ...mapState({
    //   userName: "userName"
    // })
  },
  methods: {
    ...mapMutations(["USER_NAME"]),
    ...mapActions(["getUserName"]),
    handleTest() {
      // this.$bus.$emit("a-click", "abc");
      // this.USER_NAME("彭国津1");
      // this.$store.dispatch("getUserName");
      this.getUserName();
      // this.$store.state.userName = "aa";
    }
  }
};
</script>
