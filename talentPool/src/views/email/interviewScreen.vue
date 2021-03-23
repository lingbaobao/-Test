<template>
	<div>
	
      <emailTemplate ref="childRef"/>
   
	<span @click="onClick">父组件点击保存</span>	
	</div>
	
</template>

<script>
	import emailTemplate from '@/components/email/emailTemplate.vue'//邮件模版
	export default {
	  	components: {
	    	emailTemplate
	  	},
	  	data() {
	   	 	return {
			
	    }
	  	},
		created() {
			//   console.log(this.$refs.childRef.tinymceId);
			//   this.$refs.childRef.sayHello();
		},
		methods: {
			onClick(){
					console.log("最后的值")
					console.log(this.$refs.childRef.onClick1());
			}
		}
	}
</script>

<style>
</style>
