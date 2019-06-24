<!--  -->
<template lang="html">
    <a class="nav-link nav-link-collapse collapsed" @click="collShow" data-toggle="collapse" href="#" data-parent="#exampleAccordion">
        <i :class="['fa fa-fw', 'fa-'+menu.image]"></i>
        <span :class="select==menu.href?'nav-link-text gactive':'nav-link-text'">{{menu.title}}</span>
    </a>
</template>

<script>
export default {
  name: 'TwoChild',
  data () {
      return {
          showUl: false
      }
  },
  props: ['menu', 'select'],
  methods: {
    collShow () {
        this.showUl = !this.showUl
    }
  }
}

</script>
<style lang="css" scoped>
</style>
