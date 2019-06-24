<!--  -->
<template lang="html">
  <div>
        <DetailHeader />
        <Banner :listImg="listImg"/>
        <DetailContent />
        <DetailFooter />
  </div>
</template>

<script>
import DetailHeader from './DetailHeader'
import DetailFooter from './DetailFooter'
import Banner from '@/components/home/Banner'
import DetailContent from './DetailContent'

export default {
  data () {
    return {
      listImg: [
          'static/themes/img/pd/pd-zf-1.jpg',
          'static/themes/img/pd/pd-zf-2.jpg',
          'static/themes/img/pd/pd-zf-3.jpg',
          'static/themes/img/pd/pd-zf-4.jpg',
          'static/themes/img/pd/pd-zf-5.jpg'
      ]
    }
  },
  components: {
      DetailHeader, DetailFooter, Banner, DetailContent
  }
}

</script>
<style lang="css" scoped>
    
</style>
