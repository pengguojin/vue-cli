<!--  -->
<template lang="html">
    <section class="n-tabs">
		<ul class="n-tabContainer" id="auto-id-1509603311057">
			<li class="n-tabItem" data-id="homepage">
				<a href="#" id="homepage" class="current">精选</a>
			</li>
			<li class="n-tabItem" data-id="44114">
				<a href="#" id="44114" class="">直播</a>
			</li>
			<li class="n-tabItem" data-id="15394">
				<a href="#" id="15394" class="">视频购</a>
			</li>
			<li class="n-tabItem" data-id="01436">
				<a href="#" id="01436" class="">社区</a>
			</li>
			<li class="n-tabItem" data-id="18211">
				<a href="#" id="18211" class="">家居生活</a>
			</li>
			<li class="n-tabItem" data-id="83651">
				<a href="#" id="83651" class="">生鲜</a>
			</li>
			<li class="n-tabItem" data-id="37957">
				<a href="#" id="37957" class="">数码</a>
			</li>
			<li class="n-tabItem" data-id="74029">
				<a href="#" id="74029" class="">个人洗护</a>
			</li>
			<li class="n-tabItem" data-id="73179">
				<a href="#" id="73179" class="">海外直邮</a>
			</li>
			<li class="n-tabItem" data-id="41804">
				<a href="#" id="41804" class="">服饰鞋靴</a>
			</li>
		</ul>
	</section>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}

</script>
<style lang="css" scoped>
    .n-tabs {
        position: fixed;
        top:44px;
        left: 0;
        width: 100%;
        height: 41px;
        overflow: hidden;
        z-index: 1000;
        background-color: #fff;
        box-shadow: 0 0 10PX 0PX rgba(155,143,143,0.6);
        -webkit-box-shadow: 0 0 10PX 0PX rgba(155,143,143,0.6);
        -moz-box-shadow: 0 0 10PX 0PX rgba(155,143,143,0.6);
    }
    .n-tabs .edge {
        position: fixed;
        top: 0;
        height: 41px;
        width: 100%;
        border-bottom: 1px solid #e5e5e5;
    }
    .n-tabs .n-tabContainer {
        -webkit-overflow-scrolling: touch;
        position: relative;
        top: 0;
        left: 0;
        overflow-x: auto;
        overflow-y: hidden;
        padding-left: 16px;
        height: 51px;
        font-size: 14px;
        color: #333;
        white-space: nowrap;
    }
    .n-tabs .n-tabContainer .navtab {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
    }

    .n-tabs .n-tabContainer .n-tabItem {
        -webkit-box-flex: 1;
        -webkit-flex-grow: 1;
        flex-grow: 1;
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
        display: inline-block;
        height: 41px;
        line-height: 41px;
        text-align: center;
        margin-left: 20px;
    }
    .n-tabs .n-tabContainer .n-tabItem:first-child {
        margin-left: 0;
    }
    .n-tabs .n-tabContainer .n-tabItem .current {
        display: inline-block;
        height: 41px;
        border-bottom: 2px solid #e31436;
        color: #e31436;
    }
</style>
