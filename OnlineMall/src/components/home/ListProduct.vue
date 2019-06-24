<!--  -->
<template lang="html">
  <section class="aui-list-product">
    <div class="aui-list-product-box">
        <a v-for="list in lists" href="ui-product.html" class="aui-list-product-item">
            <div class="aui-list-product-item-img">
                <img :src="list.img" alt="">
            </div>
            <div class="aui-list-product-item-text">
                <h3>{{list.desc}}</h3>
                <div class="aui-list-product-mes-box">
                <div>
                <span class="aui-list-product-item-price">
                    <em>¥</em>
                    {{list.prePrice}}
                </span>
                    <span class="aui-list-product-item-del-price">
                    ¥{{list.price}}
                </span>
                </div>
                <div class="aui-comment">{{list.commment}}评论</div>
                </div>
            </div>
        </a>
    </div>
    </section>
</template>

<script>
export default {
  data () {
    return {
        lists: [
            {
                img: 'static/themes/img/pd/sf-15.jpg',
                desc:'KOBE LETTUCE 秋冬新款 女士日系甜美纯色半高领宽松套头毛衣针织衫', 
                price: 399.99, 
                prePrice: 495.65, 
                commment: 986
            },
            {
                img: 'static/themes/img/pd/sf-16.jpg',
                desc:'KOBE LETTUCE 秋冬新款 女士日系甜美纯色半高领宽松套头毛衣针织衫', 
                price: 399.99, 
                prePrice: 495.65, 
                commment: 986
            },
            {
                img: 'static/themes/img/pd/sf-17.jpg',
                desc:'KOBE LETTUCE 秋冬新款 女士日系甜美纯色半高领宽松套头毛衣针织衫', 
                price: 399.99, 
                prePrice: 495.65, 
                commment: 986
            },
            {
                img: 'static/themes/img/pd/sf-18.jpg',
                desc:'KOBE LETTUCE 秋冬新款 女士日系甜美纯色半高领宽松套头毛衣针织衫', 
                price: 399.99, 
                prePrice: 495.65, 
                commment: 986
            }
        ]
    }
  }
}

</script>
<style lang="css" scoped>
</style>
