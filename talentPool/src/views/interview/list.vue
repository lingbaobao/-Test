<template>

  <div class="wrapper">
		<div class="screen-wrap content-wrap">
			<div class="selected item">
				<em>已选</em>
				<ul>
					<li v-for="(item,index) in chooseList" :key="index" @click="delChoose(item)">
						<span>{{item}}</span>
						<em>×</em>
					</li>
				</ul>
			</div>
			<div class="item">
				<em>面试状态</em>
				<ul>
					<li v-for="(item,index) in interviewStateList" :key="index" @click="onInterviewState(index,item)" :class="{cur:interviewStateIndex==index}">
						{{item}}
					</li>
				</ul>
			</div>
			<div class="item">
				<em>招聘职位</em>
				<div :class="['postListShrink', { 'shrinkHeight': shrinkText !='展开'}]">
					<ul >
						<li v-for="(item,index) in postList" :key="index" @click="onPost(index,item)" :class="{cur:recruitIndex==index}" >
							{{item.postName}}
						</li>
						
					</ul>
					<em @click="onShrink" >{{shrinkText}}</em>
				</div>
				
			</div>
      		<div class="item">
				<em>签到状态</em>
				<ul>
					<li v-for="(item,index) in signList" :key="index" @click="onSign(index,item)" :class="{cur:signIndex==index}" >
						{{item}}
					</li>
				</ul>
			</div>
      		<div class="item">
				<em>评价状态</em>
				<ul>
					<li v-for="(item,index) in evaluateList" :key="index" @click="onEvaluate(index,item)" :class="{cur:evaluateIndex==index}" >
						{{item}}
					</li>
				</ul>
			</div>
			<div class="item-btn">
				<!-- <el-button type="primary" size="medium" @click="searchList">搜索</el-button> -->
				<el-button type="warning" size="medium" @click="onReset">重置</el-button>
			</div>
			
		</div>

		<div class="table-wrap content-wrap">
			<div class="operate-btn">
				<el-button type="primary" size="mini" @click="changeInterviewState(1,'已完成')">标记为已完成</el-button>
				<el-button type="primary" size="mini" @click="changeInterviewState(2,'取消面试')">取消面试</el-button>
				<el-dropdown>
                    <el-button type="primary" size="mini">
                        修改签到状态
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item,index) in signList" :key="index">
                            <span @click="changeSignState(item,index)">{{item}}</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
				
				<!-- <el-dropdown>
                    <el-button type="primary" size="mini">
                        修改面试状态
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item,index) in recruitmentStatus" :key="index">
                            <span @click="changeInterviewState(item,index)">{{item}}</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown> -->
			</div>

			<el-table
				ref="multipleTable"
				:data="interviewLtableData"
				tooltip-effect="dark"
				style="width: 100%"
				:default-sort = "{prop: 'date', order: 'descending'}"
				@selection-change="handleSelectionChange">
				<el-table-column
				type="selection"
				width="55">
				</el-table-column>
				<el-table-column prop="postName" label="招聘职位">
					<template slot-scope="scope" >
						<span @click="toDetail(scope.row.postId)" class="tableTextHover">{{ scope.row.postName }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="interviewTime" label="面试时间"></el-table-column>
				<el-table-column prop="interviewState" label="面试状态"></el-table-column>
				<el-table-column prop="insertUser" label="面试安排人"></el-table-column>
				<el-table-column prop="interviewer" label="面试官" min-width="100">
					<template slot-scope="scope" >
						<span v-for="(item,index) in scope.row.interviewer" :key="index">
							<em v-if="index>=1"> &nbsp; ,</em>
							{{ item }}
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="interviewTypeText" label="面试类型" ></el-table-column>
				<el-table-column prop="interviewTitle" label="面试主题">
					<template slot-scope="scope" >
						<span @click="toTopic(scope.row.id)" class="tableTextHover">{{ scope.row.interviewTitle }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="applicants" label="应聘者"></el-table-column>
				<el-table-column prop="isArrive" label="签到状态"></el-table-column>
				<el-table-column prop="isAppraise" label="评价状态"></el-table-column>
				
			</el-table>

			<div class="el-pagination-wrap">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="interviewData.pageNum"
				:page-sizes="[10, 15, 20]" :page-size="interviewData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>

		</div>

		<!-- 更改面试状态状态 -->
		<el-dialog :title="interviewDialogTitle" :visible.sync="interviewDialog" class="interviewDialog">
			<el-alert
				title="注意：仅对当前用户有操作权限且未完成的面试生效"
				type="warning"
				show-icon>
			</el-alert>
			<p class="positionStateT">确定将面试状态改为<em>{{oldReStateText}}</em>？</p>
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
		// 面试状态
		interviewStateIndex:-1,
		interviewStateList:['已完成',"已取消"],
		// 签到状态
		signIndex:-1,
		signList:['未签到','已签到','集体面试','未到场'],
		// 招聘类型
		recruitIndex:-1,
		recruitList:['社会招聘','校园招聘','实习生招聘'],
		// 评价状态
		evaluateIndex:-1,
		evaluateList:['未评价','已评价'],
		// 招聘职位
		postIdIndex:-1,
		// 已选
		chooseList:[],
		// 面试列表搜索条件
		interviewData:{
			interviewState:'',
			postId:'',
			signInState:'',
			evaluateState:'',
			pageNum:1,
			pageSize:10
		},
		total: 0,
	   	interviewLtableData:[],
	   	interviewList: "",
	   	projectsList:'',
		departmentList:'',
		// 更改面试状态 弹窗
	   	interviewDialog:false,
		interviewStateText:'',
		interviewDialogTitle:"修改面试状态",
		recruitmentStatus:["已完成",'取消面试'],
		reStateText:"更改状态",
		oldReStateText:'',
		reStateId:{
            id:[],
            state:''
        },
		postList:[],
		shrinkText:"展开",
	   
    };
  },
  methods: {
	  	//跳转到职位详情
		toDetail(id){
			this.$router.push({
				path:"/position/detail?id="+id
			})
		},
		// 跳转到面试主题
		toTopic(id){
			this.$router.push({
				path:"/interview/detail?id="+id
			})
		},
		onShrink(){
			if( this.shrinkText == "收起"){
				this.shrinkText = "展开"
			}else{
				this.shrinkText = "收起"
			}
		},
	  	// 更改面试状态
        changeInterviewState(index,text){
			this.interviewDialogTitle = "修改面试状态"
			if( this.reStateId.id == ''){
				this.$message.error("请先选择职位");
			}else{
				this.interviewDialog = true
				this.oldReStateText = text
				this.reStateId.state = index
			}
        },
        // 提交更改状态
        async submitState(){

			if( this.interviewDialogTitle == "修改面试状态" ){
				const {
					data: res
				} = await this.$http.interviewDone(this.reStateId)

				if (res.code == 200) {

					if( this.reStateId.state == 1 ){
						this.$message.success("状态修改完成");
						this.reStateId.id = ''
						this.onInterviewList()
					}else{
						this.$router.push({
							path:"/applicant/cancelInterview?interviewIds="+this.reStateId.id
						})
					}
				} else {
					this.$message.error(res.msg);
				}
			}else{
				const {
					data: res
				} = await this.$http.updateSignInState(this.reStateId)

				if (res.code == 200) {
					this.$message.success("状态修改完成");
					this.reStateId.id = ''
					this.onInterviewList()
				} else {
					this.$message.error(res.msg);
				}
			}
            
             this.interviewDialog = false
		},
		// 修改签到状态
		changeSignState(item,index){
			this.interviewDialogTitle = "修改签到状态"
			if( this.reStateId.id == ''){
				this.$message.error("请先选择职位");
			}else{
				this.interviewDialog = true
				this.oldReStateText = item
				this.reStateId.state = index
			}
		},
		//跳转到职位详情
		toDetail(postId){
			this.$router.push({
				path:"/position/detail?id="+postId
			})
		},
		// 已选数据的增删
		onSelect(item,clist){
			if( this.chooseList.length >0 ){
				this.chooseList.forEach((chooseItem,chooseIndex)=>{
					clist.forEach(stateItem=>{
						if( chooseItem == stateItem ){
							this.chooseList.splice(chooseIndex,1)
						}
					})	
				})
				this.chooseList.push(item)
			}else{
				this.chooseList.push(item)
			}

			this.searchList()
		},
		//获取招聘状态
		onState(index,item){
			this.stateIndex = index
			this.interviewData.state = index
			this.onSelect(item,this.stateList)
		},
		// 获取签到状态
		onSign(index,item){
			this.signIndex = index
			this.interviewData.signInState = index
			this.onSelect(item,this.signList)
		},
		// 获取面试状态
		onInterviewState(index,item){
			// 1已完成 2取消面试
			this.interviewStateIndex = index
			this.interviewData.interviewState = index +1
			this.onSelect(item,this.interviewStateList)
		},
		// 获取评价状态
		onEvaluate(index,item){
			this.evaluateIndex = index
			this.interviewData.evaluateState = index
			this.onSelect(item,this.evaluateList)
		},
		// 获取招聘职位
		onPost(index,item){
			this.postIdIndex = index
			this.interviewData.postId = item.id
			if( this.chooseList.length >0 ){
				this.chooseList.forEach((chooseItem,chooseIndex)=>{
					this.postList.forEach(stateItem=>{
						if( chooseItem == stateItem.postName ){
							this.chooseList.splice(chooseIndex,1)
						}
					})	
				})
				this.chooseList.push(item.postName)
			}else{
				this.chooseList.push(item.postName)
			}

			this.searchList()
		},
		// 清空删除数据向后台传送的值 并取消选中状态
		onInitial(list,state,activeIndex,item){
			// 清空参数值
			list.forEach(el=>{
				if( el == item ){
					state = ""
					activeIndex = -1
					console.log(item,activeIndex,el)
				}
			})
		},
		// 删除已选类别
		delChoose(item){
			// 删除已选的显示
			this.chooseList.forEach((el,index)=>{
				if( el == item ){
					this.chooseList.splice(index,1)
				}
			})
			// 清空参数值
			// this.onInitial(this.signList,this.interviewData.signInState,this.signIndex,item)
			
			this.signList.forEach(el=>{
				if( el == item ){
					this.interviewData.signInState = ""
					this.signIndex = -1
				}
			})
			this.interviewStateList.forEach(el=>{
				if( el == item ){
					this.interviewData.interviewState = ""
					this.interviewStateIndex = -1
				}
			})
			this.evaluateList.forEach(el=>{
				if( el == item ){
					this.interviewData.evaluateState = ""
					this.evaluateIndex = -1
				}
			})

			this.interviewData.postId = ''
			this.onInterviewList()
		},
		// 搜索
		searchList(){
			this.interviewData.pageNum = 1
			this.interviewData.pageSize = 10
			this.onInterviewList()
		},
		// 重置
		onReset(){
			this.interviewData = {
				interviewState:'',
				postId:'',
				signInState:'',
				evaluateState:'',
				pageNum:1,
				pageSize:10
			}
			this.chooseList = []
			this.interviewStateIndex = -1
			this.evaluateIndex = -1
			this.signIndex = -1
			this.onInterviewList()
		},
		// 监听pagesize改变的事件
		handleSizeChange(newSize) {
			this.interviewData.pageSize = newSize
			this.onInterviewList()
		},
		// 监听页码值改变的事件
		handleCurrentChange(newPage) {
			this.interviewData.pageNum = newPage
			this.onInterviewList()
		},
		// 新建职位
		addinterview(){
			this.$router.push({
				path: '/interview/add',
			})
		},
		// 获取职位id
		handleSelectionChange(val) {
			this.reStateId.id = []
			val.forEach(item=>{
				this.reStateId.id.push(item.id)
			})
			// this.multipleSelection = val;
		},
		// 分页 表格数据
		async onInterviewList(){
			const {data:res} = await this.$http.interviewList({params:this.interviewData})
			this.interviewLtableData = res.rows
			this.total = res.total
		},
		// 查询职务列表
		async findinterviewList() {
			const {
				data: res
			} = await this.$http.getTemplateList()

			if (res.code == 200) {
				this.interviewList = res.data
			} else {
				this.$message.error(res.msg);
			}
		},
		// 查询所有部门
		async findAllDepartment() {
			const {
				data: res
			} = await this.$http.getFindAll()

			if (res.code == 200) {
				this.departmentList = res.data
			} else {
				this.$message.error(res.msg);
			}
		},
		// 查询所有项目 
		async getListAll() {
			const {
				data: res
			} = await this.$http.getListAll()

			if (res.code == 200) {
				this.projectsList = res.data.rows
			} else {
				this.$message.error(res.msg);
			}
		},
		// 职位模板列表
		async getTemplateList() {
			const {
				data: res
			} = await this.$http.getTemplateList()

			if (res.code == 200) {
				this.postList = res.data
			} else {
				this.$message.error(res.msg);
			}
		},
  	},
  	mounted() {
		this.onInterviewList()
		this.getTemplateList()
		// this.findinterviewList()
		// this.findAllDepartment()
		// this.getListAll()
  	}
};
</script>
<style lang="scss" scoped>

</style>