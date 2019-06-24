<!-- 分类-主页面 -->
<template lang="html">
  <div>
    <Header />
    <section class="aui-scroll-contents">
      <div class="aui-scroll-box" data-ydui-scrolltab>
        <div class="aui-scroll-nav">
            <router-link href="#" to="" v-for="(item,index) in lists" :key="item.id" 
                :class="['aui-scroll-item', {'aui-crt':flag==index}]" @click.native="fn(item.id, index)">
                <div class="aui-scroll-item-icon"></div>
                <div class="aui-scroll-item-text">{{item.name}}</div>
            </router-link>
        </div>
        <div class="aui-scroll-content">
          <div class="aui-scroll-content-item">
            <div class="aui-class-img">
                <img :src="lists[flag]?lists[flag].bannerUrl:''" alt="">
            </div>
            <h2 class="aui-scroll-content-title">{{lists[flag]?lists[flag].name:''}}</h2>
            <section class="aui-grid-content">
                <div class="aui-grid-row aui-grid-row-clear">
                    <router-link v-for="detail in details" :key="detail.id" :to="{name: detail.href}" class="aui-grid-row-item">
                        <i class="aui-icon-large aui-icon-sign"><img :src="detail.imgUrl" alt=""></i>
                        <p class="aui-grid-row-label">{{detail.name}}</p>
                    </router-link>
                </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from '@/components/common/Header'
import ClassRight from './ClassRight'

export default {
  name: 'ClassMain',
  data () {
    return {
      flag: 0
    }
  },
  components: {
    ClassRight, Header
  },
  mounted () {
      this.$store.dispatch('getTypeList')
      this.$store.dispatch('getTypeItem', 1)
  },
  computed: {
    lists () {
      return this.$store.state.typeList
    },
    details () {
      return this.$store.state.typeItem
    }
  },
  methods: {
    fn (id, index) {
      this.$store.dispatch('getTypeItem', id)
      this.flag = index
    }
  }
}

</script>
<style lang="css" scoped>
</style>
