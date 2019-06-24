<!--  -->
<template lang="html">
  <div>
    <FindHeader />
    <FindTab />
    <FindContent />
  </div>
</template>

<script>
import FindHeader from './FindHeader'
import FindTab from './FindTab'
import FindContent from './FindContent'

export default {
  data () {
    return {
    }
  },
  components: {
    FindHeader, FindTab, FindContent
  }
}

</script>
<style lang="css" scoped>
</style>
