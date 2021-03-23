<template>
  <div class="wrapper">
        <div class="positionDetail-wrap content-wrap-mini">
            <div class="operate-btn">
                <el-button type="primary" size="mini" @click=goHistory>返回</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="primary" size="mini" @click="editEmail">编辑</el-button>
            </div>

            <div class="detail-ul-wrap">
                <el-divider content-position="left" class="divider-main">收取邮箱详情</el-divider>
                <ul>
                    <li>
                        <em>邮箱</em>
                        <span>{{detailData.email}}</span>
                    </li>
                    <li>
                        <em>邮箱类型</em>
                        <span>{{detailData.mailType}}</span>
                    </li>
                    <li>
                        <em>端口号</em>
                        <span>{{detailData.portNum}}</span>
                    </li>
                    <li>
                        <em>协议类型</em>
                        <span>{{detailData.protocolType}}</span>
                    </li>
                     <li>
                        <em>用户名</em>
                        <span>{{detailData.userName}}</span>
                    </li>
                    <li>
                        <em>密码</em>
                        <!-- <span>{{detailData.pwd}}</span> -->
                        <span>******</span>
                    </li>
                    <li>
                        <em>收取开始日期</em>
                        <span>{{detailData.receiveRule}}</span>
                    </li>
                    <li>
                        <em>安全类型</em>
                        <span v-if="detailData.safeType == 1">需要安全密码验证</span>
                        <span v-if="detailData.safeType == 2">要求SSL安全连接</span>
                    </li>
                    <li>
                        <em>服务器地址</em>
                        <span>{{detailData.serverAddress}}</span>
                    </li>
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
        detailData:[],
        emailList:[],
        protocolList:[]
    };
  },
  methods: {
        // 返回上一页
        goHistory(){
            this.$router.go(-1)
        },
        // 编辑
        editEmail(){
            this.$router.push({
                path:'add?id='+this.$route.query.id
            })
        },
        // 邮件类型
		async emailTypes(){
			const {
				data: res
			} = await this.$http.emailTypes()

			if (res.code == 200) {
                this.emailList = res.data
			} else {
				this.$message.error(res.msg);
			}
        },
        // 协议类型
		async emailProtocolTypes(){
			const {
				data: res
			} = await this.$http.emailProtocolTypes()

			if (res.code == 200) {
                this.protocolList = res.data
			} else {
				this.$message.error(res.msg);
			}
        },
        // 获取详情
        async emailDetail(){
			const {
				data: res
			} = await this.$http.emailDetail({params:{id:this.$route.query.id}})

			if (res.code == 200) {
                this.detailData = res.data

                this.emailList.forEach(item=>{
                    if( item.type ==  this.detailData.mailType){
                        this.detailData.mailType = item.name
                    }
                })

                this.protocolList.forEach(item=>{
                    if( item.id ==  Number(this.detailData.protocolType) ){
                        this.detailData.protocolType = item.name
                    }
                })

			} else {
				this.$message.error(res.msg);
			}
        },
  },
  mounted() {
        this.emailTypes()
        this.emailProtocolTypes()
        this.emailDetail()
  }
};
</script>

<style scoped>
</style>