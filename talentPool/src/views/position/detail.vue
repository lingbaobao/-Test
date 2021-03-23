<template>
  <div class="wrapper">
        <div class="positionDetail-wrap content-wrap">
            <div class="operate-btn">
                <el-button type="primary" size="mini" @click=goHistory>返回</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-dropdown>
                    <el-button type="primary" size="mini">
                        {{oldReStateText}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item,index) in recruitmentStatus" :key="index">
                            <span @click="changeState(item)">{{item}}</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-button type="primary" size="mini" @click="release">发布广告</el-button>
                <el-button type="primary" size="mini" @click="editPosition">编辑</el-button>
                <el-button type="primary" size="mini" @click="delPosition">删除</el-button>
            </div>

            <div class="process-transverse-wrap">
                <p class="title">流程模板 -- {{pDList.workflowKey}}</p>
                <el-steps finish-status="success">
                    <el-step :title="item.name" v-for="(item,index) in stepList" :key ="index"></el-step>
                </el-steps>
            </div>

            <div class="detail-ul-wrap">
                <el-divider content-position="left" class="divider-main">职位详情</el-divider>
                <ul>
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
                                <span v-if="item">{{item.email}} -- {{item.emailState}}</span>
                            </p>
                        </div> 
                    </li>
                    <li>
                        <em>简历共享人</em>
                        <p v-for="(item,index) in pDList.sharersEmail" :key="index" class="list-p">
                            <span>{{item.username}} -- {{item.email}}</span>
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
            
        </div>

        <!-- 更改职位状态 -->
		<el-dialog title="更改职位状态" :visible.sync="positionDialog" class="positionDialog">
			<el-alert
				title="注意：更改职位状态对审批中和审批驳回的职位不生效"
				type="warning"
				show-icon>
			</el-alert>
			<p class="positionStateT">确定将职位状态改为<em>{{reStateText}}</em>？</p>
			<span slot="footer" class="dialog-footer">
				<el-button @click="positionDialog = false">取 消</el-button>
				<el-button type="primary" @click="submitState">确 定</el-button>
			</span>
		</el-dialog>

  </div>
</template>

<script>

export default {
  props: {},
  data() {
    return {
        pDList:{},
        positionId:this.$route.query.id,
        recruitmentStatus:["招聘中",'招聘完成','招聘取消'],
        oldReStateText:"招聘中",
        reStateText:"招聘中",
        reStateId:{
            jobId:this.$route.query.id,
            state:''
        },
        // 更改职位状态 弹窗
        positionDialog:false,
        stepList:[]
    };
  },
  methods: {
        // 返回上一页
        goHistory(){
            this.$router.go(-1)
        },
        // 更改职位状态
        changeState(item){
            this.positionDialog = true
            this.reStateText = item
        },
        // 提交更改职位状态
        async submitState(){
            this.oldReStateText = this.reStateText
            if(this.oldReStateText == "招聘中"){
                this.reStateId.state = 3
            }
            if(this.oldReStateText == "招聘完成"){
                this.reStateId.state = 4
            }
            if(this.oldReStateText == "招聘取消"){
                this.reStateId.state = 5
            }
            const {
				data: res
			} = await this.$http.updateStatePostion(this.reStateId)

			if (res.code == 200) {
				this.$message.success("状态修改完成");
			} else {
				this.$message.error(res.msg);
            }
             this.positionDialog = false
        },
        // 编辑职位
        editPosition(){
            this.$router.push({
                path:'add?id='+this.positionId
            })
        },
        // 发布
        release(){
            this.$router.push({
                path:'channel?id='+this.positionId
            })
        },
        // 删除职位
        async delPosition(){
            const confirmResult = await this.$confirm('确定删除该职位, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).catch(err => err);

			if (confirmResult == "confirm") {
				const {
				data: res
			} = await this.$http.delPosition({jobId:this.positionId})

                if (res.code == 200) {
                    this.$router.push({
                        path:'/position/list'
                    })
                } else {
                    this.$message.error(res.msg);
                }
			}
        },
        // 职位详情
		async positionDetails(){
			const {
				data: res
			} = await this.$http.positionDetails({id:this.positionId})
            if( res.data == null ){
                this.$message.error("没有数据");
                this.$router.go(-1);
                return;
            }

			if (res.code == 200) {
                this.pDList = res.data
                if( res.data.state == 3 ){
                    this.oldReStateText = "招聘中"
                }
                if( res.data.state == 4 ){
                    this.oldReStateText = "招聘完成"
                }
                if( res.data.state == 5 ){
                    this.oldReStateText = "招聘取消"
                }

                console.log(this.pDList.collectEmail)
                this.findNodesByTemplate()
			} else {
				this.$message.error(res.msg);
			}
        },
        // 招聘具体流程
        async findNodesByTemplate(){
            const {
				data: res
			} = await this.$http.findNodesByTemplate({params:{num:this.pDList.workflowKey}})

			if (res.code == 200) {
				this.stepList = res.data
			} else {
				this.$message.error(res.msg);
			}
        },
  },
  mounted() {
      this.positionDetails()
      
  }
};
</script>

<style scoped>

.el-steps /deep/ .el-step{
        flex-basis: 1180px !important;
	}
</style>