<template lang="html">
    <div>
        <Header/>
        <div class="pagewrap pagewrap-full">
            <div class="article-detail">
                <div class="post-wrapper">
                <div class="post-detail-con-box full-reading mainlib_flex_wapper">
                    <DetailMain :data="detail_data"/>
                    <DetailRight :data="detail_data"/>
                </div>
                </div>
            </div>
            <div class="share-nav-h5">
                <div class="inner">
                <div class="box am-cf">
                    <div class="each-cell">
                    <span class="icon-collect cell">
                    </span>
                    </div>
                    <div class="each-cell">
                    <span class="icon-comments cell">
                    </span>
                    </div>
                    <div class="each-cell">
                    <a class="icon-weibo weibo cell" href="http://share.baidu.com/s?type=text&amp;searchPic=1&amp;sign=on&amp;to=tsina&amp;key=595885820&amp;url=http://36kr.com/p/5127978.html&amp;title=%E7%8B%AC%E8%A7%92%E5%85%BD%E5%BD%92%E6%9D%A5%EF%BC%9A%E6%9C%BA%E9%81%87%E5%92%8C%E9%A3%8E%E9%99%A9">
                    </a>
                    </div>
                    <div class="each-cell">
                    <span class="icon-back-top back cell">
                    </span>
                    </div>
                </div>
                </div>
            </div>
            <div class="article-detail" style="position: relative; z-index: 1111;">
                <div></div>
                <div class="only-article">
                <div class="center-content">
                    <div class="content-wrapper">
                    <div class="loading_article">
                        <div>
                        <div class="circle">
                            <i class="icon-loading">
                            </i>
                        </div>
                        <b>
                            加载中
                        </b>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
import Header from "@/components/inc/header"
import Footer from "@/components/inc/footer"
import DetailMain from './detail_main'
import DetailRight from './detail_right'
export default {
  name: 'Detail',
  components: {Header, Footer, DetailMain, DetailRight},
  mounted () {
      let id = this.$route.query.id
      console.log("进来了" + id)     
      this.$store.dispatch('loadDetail', id)
  },
  computed: {
      detail_data () {
          console.log(this.$store.state.detail_data)
          return this.$store.state.detail_data
      }
  }
};
</script>
<style lang="css" scoped>

</style>
