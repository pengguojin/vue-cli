<!--  -->
<template lang="html">
    <div class="aui-banner-content aui-fixed-top" data-aui-slider>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="img in listImg">
                    <a href="#">
						<img :src="img">
					</a>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

export default {
    props: ['listImg'],
    data () {
        return {
        }
    },
    mounted() {
        new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination'
            },
            paginationClickable: true,
            loop: true,
            speed: 600,
            autoplay: {
                delay: 3000
            }
        })
    }
}
</script>
<style lang="css">
    .swiper-container {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 1;
    }

    .swiper-wrapper {
        width: 100%;
        height: 100%;
    }

    .swiper-slide {
        width: 100%;
        height: 100%;
        -webkit-flex-shrink: 0;
        -ms-flex-negative: 0;
        flex-shrink: 0;
    }

    .swiper-slide img {
        width: 100%;
        background-size: cover;
    }
</style>
