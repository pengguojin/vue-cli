<!--  -->
<template lang="html">
    <div>
        <Header/>
        <div class="index_36kr">
            <div class="pagewrap">
                <div class="mainlib_flex_wapper">
                <IndexMain/>
                <IndexRight/>
                </div>
            </div>
        </div>
        <Footer/>
    </div>    
</template>

<script>
import Header from "@/components/inc/header"
import Footer from "@/components/inc/footer"
import IndexMain from "@/components/index/index_main"
import IndexRight from "@/components/index/index_right"

export default {
    name: 'Index',
    components: { 
        Header, 
        Footer, 
        IndexMain, 
        IndexRight 
    }
};
</script>
<style lang="css" scoped>

</style>
