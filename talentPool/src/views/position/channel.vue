<template>

  <div class="wrapper">
        <div class="content-wrap channel-wrap">
			 <div class="detail-ul-wrap">
                 <div class="operate-btn">
                    <el-button type="primary" size="mini" @click=goHistory>返回</el-button>
                </div>
                <el-divider content-position="left" class="divider-main">职位详情</el-divider>
                <ul :class="{ulHeight:shrinkText=='展开'}">
					<p class="shrink" @click="onShrink" >{{shrinkText}}</p>
                    <li>
                        <em>职位名称</em>
                        <span>{{pDList.postName}}</span>
                    </li>
                    <li>
                        <em>招聘人数</em>
                        <span v-if="pDList.num != -1">{{pDList.num}}</span>
                        <span v-if="pDList.num == -1">若干</span>
                    </li>
                    <li>
                        <em>招聘类别</em>
                        <span>{{pDList.recruitTypeName}}</span>
                    </li>
                    <li>
                        <em>工作性质</em>
                        <span>{{pDList.workNatureName}}</span>
                    </li>
                    <li>
                        <em>需求项目</em>
                        <span>{{pDList.projectText}}</span>
                    </li><li>
                        <em>需求部门</em>
                        <span>{{pDList.departmentText}}</span>
                    </li>
                    <li>
                        <em>工作省份</em>
                        <span>{{pDList.provinceText}}</span>
                    </li>
                    <li>
                        <em>详细地址</em>
                        <span>{{pDList.workAddress}}</span>
                    </li>
                    <li>
                        <em>薪资范围</em>
                        <span>{{pDList.salaryRangText}}</span>
                    </li>
                    <li>
                        <em>工作经验</em>
                        <span>{{pDList.workYearText}}</span>
                    </li>
                    <li>
                        <em>性别</em>
                        <span v-if="pDList.gender == 2">无</span>
                        <span v-if="pDList.gender == 0">女</span>
                        <span v-if="pDList.gender == 1">男</span>
                    </li>
                    <li>
                        <em>学历</em>
                        <span>{{pDList.educationText}}</span>
                    </li>
                    <li>
                        <em>紧急程度</em>
                        <span>{{pDList.urgencyText}}</span>
                    </li>
                    <li>
                        <em>工作职责</em>
                        <span>{{pDList.jobDescription}}</span>
                    </li>
                    <li>
                        <em>任职资格</em>
                        <span>{{pDList.jobRequire}}</span>
                    </li>
                    <li>
                        <em>薪资福利</em>
                        <span>{{pDList.welfare}}</span>
                    </li>
                    <li>
                        <em>简历收取信箱</em>
                        <div style="width: calc(100% - 100px);">
                            <p v-for="(item,index) in pDList.collectEmail" :key="index" class="list-p">
                                <span >{{item.email}} -- {{item.emailState}}</span>
                            </p>
                        </div> 
                    </li>
                    <li>
                        <em>简历共享人</em>
                        <p v-for="(item,index) in pDList.sharersEmail" :key="index" class="list-p">
                            <span >{{item.username}} -- {{item.email}}</span>
                        </p>
                    </li>
                    <li>
                        <em>面试官</em>
                        <p v-for="(item,index) in pDList.interviewerEmail" :key="index" class="list-p">
                            <span >{{item.username}} -- {{item.email}}</span>
                        </p>
                    </li>
                    <li>
                        <em>招聘负责人</em>
                        <span>{{pDList.recruitUser}}</span>
                    </li>
                    <li>
                        <em>招聘流程</em>
                        <span>{{pDList.workflowKey}}</span>
                    </li>
                    <li>
                        <em>是否内推</em>
                        <span v-if="pDList.isReferral == 0">否</span>
                        <span v-if="pDList.isReferral == 1">是</span>
                    </li>
                </ul>
            </div>
            <div class="channel-choose">
                <el-divider content-position="left" class="divider-main">选择发布渠道</el-divider>
                <ul class="account-list-container">
                    <li v-for="(item,index) in channelData" :key="index" @click="chooseChannel(item)" 
                    class="account-item-top" :data-username="item.arr.username" :data-password="item.arr.pwd"
                    :data-membername="item.arr.account" :data-website="item.channelId" :data-channelname="item.channelName">  
						<p v-if="item.channelName == '前程无忧'" >
							<img src="../../assets/images/qcwy.png" alt="">
							<span>{{item.accountAlias}}</span>
						</p>
						<p v-if="item.channelName == '拉勾网'">
							<img src="../../assets/images/qcwy.png" alt="">
							<span>{{item.accountAlias}}</span>
						</p>
						<p v-if="item.channelName == '智联招聘'">
							<img src="../../assets/images/zl.png" alt="">
							<span>{{item.accountAlias}}</span>
						</p>
						<p v-if="item.channelName == 'BOSS直聘'">
							<img src="../../assets/images/boss.png" alt="">
							<span>{{item.accountAlias}}</span>
						</p>
						<p v-if="item.channelName == '猎聘网'">
							<img src="../../assets/images/liepin.png" alt="">
							<span>{{item.accountAlias}}</span>
						</p>
						<p v-if="item.channelName == '仟寻'">
							<img src="../../assets/images/qx.jpg" alt="">
							<span>{{item.accountAlias}}</span>
						</p>
						<p v-if="item.channelName == '仟寻2'">
							<img src="../../assets/images/qx.jpg" alt="">
							<span>{{item.accountAlias}}</span>
						</p>
					</li>
                </ul>
            </div>
        </div> 

		<!-- 选择发布的渠道 -->
		<el-dialog title="选择发布的渠道" :visible.sync="channelDialog">
			<span class="positionStateT">您选择的渠道为<em>{{channelName}}</em>,确认发布吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="channelDialog = false">取 消</el-button>
				<el-button type="primary" @click="submitChannel">确 定</el-button>
			</span>
		</el-dialog>
  </div>
</template>

<script>

export default {
  props: {},
  data() {
    return {
		channelData:[],
		channelDialog:false,
		selectChannelData:{
			jobId:this.$route.query.id,
			channelId:''
		},
		channelName:'',
		pDList:{},
        shrinkText:"展开",
        channeExtAttrList:[],
    };
  },
  methods: {
      // 返回上一页
        goHistory(){
            this.$router.go(-1)
        },
		onShrink(){
			if( this.shrinkText == "收起"){
				this.shrinkText = "展开"
			}else{
				this.shrinkText = "收起"
			}
		},
		// 
	  	async channelList(){
            const {
				data: res
			} = await this.$http.positionChannelList()

			if (res.code == 200) {
                this.channelData = res.data
                
                this.channelData.forEach(item=>{
                    this.channeExtAttrList.push(item.extAttrList)
                })

                let channeKey
                let channeValue
                let channelArr = []
                this.channeExtAttrList.forEach(item=>{
                    let obj = {}
                    item.forEach((el,index)=>{
                        channeKey = el.property;
                        channeValue = el.value;
                        obj[channeKey] = channeValue;
                    })
                    channelArr.push(obj)
                })

                this.channelData.forEach((item,index)=>{
                    this.channelData[index].arr = channelArr[index]
                })

                console.log(this.channelData)

			} else {
				this.$message.error(res.msg);
			}
		},
		chooseChannel(item){
			this.selectChannelData.channelId = item.channelId
			this.channelName = item.channelName
			// this.channelDialog = true
		},
		// 
		async submitChannel(){
			const {
				data: res
			} = await this.$http.selectChannel(this.selectChannelData)

			if (res.code == 200) {
				this.$message.success("发布成功");
			} else {
				this.$message.error(res.msg);
			}
		},
		// 
	  	async positionDetails(){
            const {
				data: res
			} = await this.$http.positionDetails({id:this.$route.query.id})

			if (res.code == 200) {
				this.pDList = res.data
			} else {
				this.$message.error(res.msg);
			}
		},
  },
  mounted() {
	  this.channelList()
      this.positionDetails()

  }
};
</script>
<style lang="scss" scoped>

</style>