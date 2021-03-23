<template>
  <div class="wrapper">
        <div class="interviewDetail-wrap content-wrap">
            <div class="operate-btn">
                <el-button type="primary" size="mini" @click=goHistory>返回</el-button>
            </div>

            <el-divider content-position="left" class="divider-main">职位主题详情</el-divider>

            <div class="detail-ul-wrap">
                <ul>
                    <li>
                        <em>职位名称</em>
                        <span>{{pDList.postName}}</span>
                    </li>
                    <li>
                        <em>面试类型</em>
                        <span>{{pDList.interviewTypeText}}</span>
                    </li>
                    <li>
                        <em>面试时间</em>
                        <span>{{pDList.interviewTime}}</span>
                    </li>
                    <li>
                        <em>面试时长</em>
                        <span>{{pDList.interviewHours}}</span>
                    </li><li>
                        <em>面试地点</em>
                        <span>{{pDList.interviewAddress}}</span>
                    </li>
                    <li>
                        <em>面试官</em>
                        <p v-for="(item,index) in pDList.interviewers" :key="index" class="list-p">
                            <span >{{item.interviewer}} -- {{item.email}}</span>
                        </p>
                    </li>
                    <li>
                        <em>面试说明</em>
                        <span>{{pDList.interviewDesc}}</span>
                    </li>
                    <li>
                        <em>应聘者</em>
                        <span>{{pDList.applicants}}</span>
                    </li>
                    <li>
                        <em>签到状态</em>
                        <span>{{pDList.isArrive}}</span>
                    </li>
                    <li>
                        <em>面试评价状态</em>
                        <span>{{pDList.isAppraise}}</span>
                    </li>
                </ul>
            </div>
            
        </div>

        <!-- 更改职位状态 -->
		<el-dialog title="更改职位状态" :visible.sync="interviewDialog" class="interviewDialog">
			<el-alert
				title="注意：更改职位状态对审批中和审批驳回的职位不生效"
				type="warning"
				show-icon>
			</el-alert>
			<p class="interviewStateT">确定将职位状态改为<em>{{reStateText}}</em>？</p>
			<span slot="footer" class="dialog-footer">
				<el-button @click="interviewDialog = false">取 消</el-button>
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
        pDList:[],
        interviewId:this.$route.query.id,
        recruitmentStatus:["招聘中",'招聘完成','招聘取消'],
        oldReStateText:"招聘中",
        reStateText:"招聘中",
        reStateId:{
            jobId:this.$route.query.id,
            state:''
        },
        // 更改职位状态 弹窗
	   	interviewDialog:false,
    };
  },
  methods: {
        // 返回上一页
        goHistory(){
            this.$router.go(-1)
        },
        // 更改面试状态
        changeInterviewState(item){
			this.interviewDialogTitle = "修改面试状态"
			if( this.reStateId.id == ''){
				this.$message.error("请先选择职位");
			}else{
				this.interviewDialog = true
				this.oldReStateText = item
			}
        },
        // 提交更改面试状态
        async submitState(){
            if(this.oldReStateText == "已完成"){
                this.reStateId.state = 1
            }
            if(this.oldReStateText == "取消面试"){
                this.reStateId.state = 2
            }

            const {
				data: res
			} = await this.$http.interviewDone(this.reStateId)

			if (res.code == 200) {
				this.$message.success("状态修改完成");
				this.reStateId.id = ''
				this.onInterviewList()
			} else {
				this.$message.error(res.msg);
            }
            this.interviewDialog = false
		},
        // 编辑职位
        editinterview(){
            this.$router.push({
                path:'/interview/add?id='+this.interviewId
            })
        },
        // 删除职位
        async delinterview(){
            const {
				data: res
			} = await this.$http.delinterview({jobId:this.interviewId})

			if (res.code == 200) {
				this.$router.push({
                    path:'/interview/list'
                })
			} else {
				this.$message.error(res.msg);
			}
        },
        // 面试详情
		async interviewDetails(){
			const {
				data: res
			} = await this.$http.interviewDetail({params:{id:this.$route.query.id}})

			if (res.code == 200) {
				this.pDList = res.data
			} else {
				this.$message.error(res.msg);
			}
		}
  },
    mounted() {
        this.interviewDetails()
    }
};
</script>

<style scoped>

.el-steps /deep/ .el-step{
        flex-basis: 1180px !important;
	}
</style>