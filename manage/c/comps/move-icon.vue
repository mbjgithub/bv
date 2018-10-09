<template>
	<div>
		<!-- <a href="javascript:void(0);" title="置顶"><i class="icon icon_edit"><svg class="svg_icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_icon_topest"></use></svg></i>
		</a>  -->
		<a href="javascript:void(0);" title="上移" @click="up"><i class="icon icon_setup"><svg class="svg_icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_icon_setup"></use></svg></i>
		</a> 
		<a href="javascript:void(0);" title="下移" @click="down"><i class="icon icon_setdown"><svg class="svg_icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_icon_setdown"></use></svg></i>
		</a> 
		<a href="javascript:void(0);" title="删除" @click="del"><i class="icon icon_trash"><svg class="svg_icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_icon_trash"></use></svg></i>
		</a>
	</div>
</template>

<script>
	
	export default {
		methods:{
			up(){
				this.$emit('up')
			},
			down(){
				this.$emit('down')
			},
			del(){
				this.$emit('del')
			}
		}
	}
</script>