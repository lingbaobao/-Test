<template>

  <div class="wrapper">
        <div class="positionDetail-wrap content-wrap-mini">
            <div class="operate-btn">
                <el-button type="primary" size="mini" @click=goHistory>返回</el-button>
            </div>

            <div class="detail-ul-wrap">
                <el-divider content-position="left" class="divider-main">渠道账号设置详情</el-divider>
                <ul>
                    <li>
                        <em>名称</em>
                        <span>{{detailData.channelName}}</span>
                    </li>
                    <li v-for="(item,index) in detailData.extAttr" :key="index">
                        <em>{{item.name}}</em>
                        <span v-if="item.property=='IsEnabled' && item.value == '0'">停用</span>
                        <span v-if="item.property=='IsEnabled' && item.value == '1'">启用</span>
                        <span v-if="item.property!='IsEnabled' && item.type !='password'">{{item.value}}</span>
                        <span v-if="item.type =='password'">******</span>
                    </li>
                    <!-- <li>
                        <em>是否启用</em>
                        <span v-if="detailData.state==1">启用</span>
                        <span v-else>停用</span>
                    </li> -->
                </ul>
            </div>
            
        </div>
  </div>
</template>

<script>

export default {
  props: {},
  data() {
    return {
		detailData:[]
    };
  },
  methods: {
	  // 返回上一页
        goHistory(){
            this.$router.go(-1)
        },
		// 
		async channelDetail(){
			const {
                data: res
            } = await this.$http.channelAccountDetail({params:{id:this.$route.query.id}})

            if (res.code == 200) {
                this.detailData = res.data
                
            } else {
                this.$message.error(res.msg);
            }
		}
  },
  mounted() {
	  this.channelDetail()
  }
};
</script>
<style lang="scss" scoped>

</style>