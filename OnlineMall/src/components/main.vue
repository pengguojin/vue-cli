<!-- 首页 -->
<template lang="html">
  <div>
    <Header />
    <div class="aui-content-box">
      <!-- Banner -->
      <Banner :listImg="listImg"/>
      <!-- GridContent -->
      <GridContent />
      <!-- AvdContent --> 
      <AvdContent />
      <!-- SlideContent -->
      <SlideContent />

      <div class="aui-dri"></div>
      
      <!-- ListContent -->
      <ListContent />
      <div class="aui-recommend">
        <img src="static/themes/img/bg/icon-tj1.jpg" alt="">
        <!--<h2>为你推荐</h2>-->
      </div>
      <!-- ListProduct -->
      <ListProduct />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/common/Header'
import Banner from '@/components/home/Banner'
import GridContent from '@/components/home/GridContent'
import AvdContent from '@/components/home/AvdContent'
import SlideContent from '@/components/home/SlideContent'
import ListContent from '@/components/home/ListContent'
import ListProduct from '@/components/home/ListProduct'
import Footer from '@/components/common/Footer'

export default {
  name: 'Main',
  data () {
    return {
      listImg: [
          'static/themes/img/banner/banner.jpg',
          'static/themes/img/banner/banner1.jpg',
          'static/themes/img/banner/banner2.jpg', 
          'static/themes/img/banner/banner3.jpg',
          'static/themes/img/banner/banner4.jpg',
          'static/themes/img/banner/banner5.jpg',
          'static/themes/img/banner/banner6.jpg'
      ]
    }
  },

  components: {
    Banner, Header, Footer,
    GridContent, AvdContent, SlideContent, ListContent, ListProduct
  }
}

</script>
<style lang="css" scoped>
</style>
