<template>

  <div class="wrapper">
        <div class="content-wrap">
          
        </div> 

  </div>
</template>

<script>

export default {
  props: {},
  data() {
    return {
		
    };
  },
  methods: {
		// 选择发布渠道
		async submitChannel(){
			const {
				data: res
			} = await this.$http.selectChannel(this.selectChannelData)

			if (res.code == 200) {
				this.$message.success("发布成功");
			} else {
				this.$message.error(res.msg);
			}
		}
  },
  mounted() {
	  
  }
};
</script>
<style lang="scss" scoped>

</style>