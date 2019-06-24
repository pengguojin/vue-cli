<!-- 底部tab -->
<template lang="html">
  <footer class="aui-footer-default aui-footer-fixed">
		<router-link v-for="(link,index) in links" :key="index" :to="{name: link.toLink}" 
				@click.native="light(index)" :class="['aui-footer-item', {'aui-footer-active':flag===index}]">
			<span class="aui-footer-item-icon aui-icon aui-footer-icon-home"></span>
			<span class="aui-footer-item-text">{{link.name}}</span>
		</router-link>
	</footer>
</template>

<script>
export default {
  name: 'Footer',
  	data () {
		return {
			links: [
				{ name: '首页', toLink: 'Main'},
				{ name: '分类', toLink: 'ClassMain'},
				{ name: '发现', toLink: 'FindMain'},
				{ name: '购物车', toLink: 'CarMain'},
				{ name: '我的', toLink: 'MeMain'}
			],
			flag: 0
		}
	},
	methods: {
		light:function(index){
			this.flag=index;
		}
	}
}

</script>
<style lang="css" scoped>
</style>
