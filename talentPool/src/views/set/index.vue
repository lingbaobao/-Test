<template>

  <div class="wrapper">
        <div class="content-wrap">
			<ul class="set-wrap">
				<li>
					<div class="thumb">
						<span class="el-icon-s-promotion"></span>
					</div>
					<div class="item">
						<p class="title">职位筛选流程</p>
						<router-link :to="{name:'process/list'}">流程</router-link>
						<router-link :to="{name:'stage/list'}">阶段</router-link>
						<router-link :to="{name:'state/list'}">状态</router-link>
						<router-link :to="{name:'reason/list'}">原因</router-link>
					</div>
				</li>
				<li>
					<div class="thumb">
						<span class="el-icon-s-tools"></span>
					</div>
					<div class="item">
						<p class="title">流程中的设置</p>
						<router-link :to="{name:'modelList'}">通知模板</router-link>
						<router-link :to="{name:'goodsType'}">面试评价表</router-link>
						<router-link :to="{name:'goodsType'}">面试类型管理</router-link>
					</div>
				</li>
				<li>
					<div class="thumb">
						<span class="el-icon-s-comment"></span>
					</div>
					<div class="item">
						<p class="title">渠道来源</p>
						<router-link :to="{name:'set/channel/list'}">渠道来源</router-link>
						<router-link :to="{name:'set/account/list'}">渠道账号设置</router-link>
					</div>
				</li>
				<li>
					<div class="thumb">
						<span class="el-icon-eleme"></span>
					</div>
					<div class="item">
						<p class="title">邮箱收取简历</p>
						<router-link :to="{name:'set/email/list'}">收取邮箱</router-link>
						<router-link :to="{name:'set/rule/list'}">简历归档规则</router-link>
					</div>
				</li>
			</ul>
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