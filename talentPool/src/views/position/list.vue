<template>

  <div class="wrapper">
		<div class="screen-wrap content-wrap">
			<div class="selected item">
				<em>已选</em>
				<ul v-for="(item,index) in chooseList" :key="index">
					<li @click="delChoose(item)">
						<span>{{item}}</span>
						<em>×</em>
					</li>
				</ul>
			</div>
			<div class="item">
				<em>状态</em>
				<ul v-for="(item,index) in stateList" :key="index">
					<li @click="onState(index,item)" :class="{cur:stateIndex==index}">
						{{item}}
					</li>
				</ul>
			</div>
			<div class="item">
				<em>招聘类别</em>
				<ul v-for="(item,index) in recruitList" :key="index">
					<li @click="onRecruit(index,item)" :class="{cur:recruitIndex==index}" >
						{{item}}
					</li>
				</ul>
			</div>
			<div class="item">
				<em>其他</em>
				<div class="itemInput">
					<!-- <el-select v-model="positionData.postName" placeholder="请选择职位模板">
						<el-option
						v-for="item in positionList"
						:key="item.id"
						:label="item.postName"
						:value="item.id">
						</el-option>
					</el-select> -->
					<el-select v-model="positionData.projectId" placeholder="请选择项目" @change="chooseProject" style="width:140px">
						<el-option
						v-for="item in projectsList"
						:key="item.id"
						:label="item.name"
						:value="item.id">
						</el-option>
					</el-select>
					<el-select v-model="positionData.departmentId" placeholder="请选择部门" @change="chooseDepartment" style="width:140px">
						<el-option
						v-for="item in departmentList"
						:key="item.id"
						:label="item.name"
						:value="item.id">
						</el-option>
					</el-select>
					<el-input v-model="positionData.postName" placeholder="请输入职位名称" style="width:140px"></el-input>
				</div>
			</div>
			<div class="item-btn">
				<el-button type="primary" size="medium" @click="searchList">搜索</el-button>
				<el-button type="warning" size="medium" @click="onReset">重置</el-button>
			</div>
			
		</div>

		<div class="table-wrap content-wrap">
			<div class="operate-btn">
				<el-button type="primary" size="mini" @click=addPosition>新建</el-button>
				<el-dropdown>
                    <el-button type="primary" size="mini">
                        更改职位状态
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item,index) in recruitmentStatus" :key="index">
                            <span @click="changeState(item)">{{item}}</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
			</div>

			<el-table
				ref="multipleTable"
				:data="jobListData"
				tooltip-effect="dark"
				style="width: 100%"
				:default-sort = "{prop: 'date', order: 'descending'}"
				@selection-change="handleSelectionChange" :row-key="getRowKey" class="hideHeadCheckbox">
				<el-table-column
				type="selection"
				width="55" :reserve-selection="true" prop="id">
				</el-table-column>
				<el-table-column prop="postName" label="职位名称" min-width="120">
					<template slot-scope="scope" >
						<span @click="toDetail(scope.row.id)" class="tableTextHover">{{ scope.row.postName }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="recruitUser" label="	招聘负责人" min-width="120"></el-table-column>
				<el-table-column prop="projectName" label="项目名称"></el-table-column>
				<el-table-column prop="departmentName" label="需求部门"></el-table-column>
				<el-table-column prop="num" label="需求人数">
					<template slot-scope="scope" >
						<span v-if="scope.row.num == -1">若干</span>
						<span v-else>{{scope.row.num}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="newQuantity" label="新增应聘者" min-width="100">
					<template slot-scope="scope" >
						<span @click="toCandidatesl(scope.row.id)" class="tableTextHover">{{ scope.row.newQuantity }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="allQuantity" label="所有应聘者" min-width="100">
					<template slot-scope="scope" >
						<span @click="toCandidatesl(scope.row.id)" class="tableTextHover">{{ scope.row.allQuantity }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="adsNumber" label="广告数量"></el-table-column>
				<el-table-column prop="insertUser" label="创建人姓名" min-width="100"></el-table-column>
				<el-table-column prop="insertTime" label="创建时间" min-width="160"></el-table-column>
				<el-table-column prop="state" label="状态"></el-table-column>
				<el-table-column prop="urgency" label="紧急程度"></el-table-column>
			</el-table>

			<div class="el-pagination-wrap">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="positionData.pageNum"
				:page-sizes="[10, 15, 20]" :page-size="positionData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>

		</div>

		<!-- 更改职位状态 -->
		<el-dialog title="更改职位状态" :visible.sync="positionDialog" class="positionDialog">
			<el-alert
				title="注意：更改职位状态对审批中和审批驳回的职位不生效"
				type="warning"
				show-icon>
			</el-alert>
			<p class="positionStateT">确定将职位状态改为<em>{{oldReStateText}}</em>？</p>
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
		// 招聘状态
		stateIndex:-1,
		stateList:["招聘中",'招聘结束','招聘取消'],
		// 招聘类型
		recruitIndex:-1,
		recruitList:['社会招聘','校园招聘','实习生招聘'],
		// 已选
		chooseList:[],
		// 职位列表搜索条件
		positionData:{
			state:'',
			recruitType:'',
			postName:'',
			jobTitleId:'',
			projectId:'',
			departmentId:'',
			pageNum:1,
			pageSize:10
		},
		total: 0,
	   	jobListData:[],
	   	positionList: "",
	   	projectsList:'',
		departmentList:'',
		// 更改职位状态 弹窗
	   	positionDialog:false,
		positionStateText:'',
		recruitmentStatus:["招聘中",'招聘结束','招聘取消'],
		reStateText:"更改状态",
		oldReStateText:'',
		reStateId:{
            jobId:'',
            state:''
        },
	   
    };
  },
  methods: {
	  getRowKey(row) {
              return row.id;
			},
	  // 更改职位状态
        changeState(item){
			if( this.reStateId.jobId == ''){
				this.$message.error("请先选择职位");
			}else{
				this.positionDialog = true
				this.oldReStateText = item
			}
        },
        // 提交更改职位状态
        async submitState(){
            if(this.oldReStateText == "招聘中"){
                this.reStateId.state = 3
            }
            if(this.oldReStateText == "招聘结束"){
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
				this.reStateId.jobId = ''
				this.onJobList()
			} else {
				this.$message.error(res.msg);
            }
             this.positionDialog = false
        },
		//跳转到职位详情
		toDetail(id){
			this.$router.push({
				path:"/position/detail?id="+id
			})
		},
		// 跳转到应聘者
		toCandidatesl(id){
			this.$router.push({
				path:"/applicant/applicantList?postId="+id
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
			this.positionData.state = index +3
			this.onSelect(item,this.stateList)
		},
		// 获取招聘类别
		onRecruit(index,item){
			this.recruitIndex = index
			this.positionData.recruitType = index +1
			this.onSelect(item,this.recruitList)
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
			this.stateList.forEach(el=>{
				if( el == item ){
					this.positionData.state = ""
					this.stateIndex = -1
				}
			})
			this.recruitList.forEach(el=>{
				if( el == item ){
					this.positionData.recruitType = ""
					this.recruitIndex = -1
				}
			})
			this.searchList()
		},
		chooseProject(){
			this.searchList()
		},
		chooseDepartment(){
			this.searchList()
		},
		// 搜索
		searchList(){
			this.positionData.pageNum = 1
			this.positionData.pageSize = 10
			this.onJobList()
		},
		// 重置
		onReset(){
			this.positionData = {
				state:'',
				recruitType:'',
				postName:'',
				jobTitleId:'',
				projectId:'',
				departmentId:'',
				pageNum:1,
				pageSize:10
			}
			this.chooseList = []
			this.stateIndex = -1
			this.recruitIndex = -1
			this.onJobList()
		},
		// 监听pagesize改变的事件
		handleSizeChange(newSize) {
			this.positionData.pageSize = newSize
			this.onJobList()
		},
		// 监听页码值改变的事件
		handleCurrentChange(newPage) {
			this.positionData.pageNum = newPage
			this.onJobList()
		},
		// 新建职位
		addPosition(){
			this.$router.push({
				path: '/position/add',
			})
		},
		// 获取职位id
		handleSelectionChange(val) {
			if( val.length>1 || val.length==10){
				this.$refs.multipleTable.clearSelection();
				this.$refs.multipleTable.toggleRowSelection(val.pop())
			}else{
				if( val.length == 1){
					this.reStateId.jobId = val[0].id
				}
			}
			// this.multipleSelection = val;
		},
		// 分页 表格数据
		async onJobList(){
			const {data:res} = await this.$http.getJobList({params:this.positionData})
			this.jobListData = res.rows
			this.total = res.total
		},
		// 查询职务列表
		async findPositionList() {
			const {
				data: res
			} = await this.$http.getTemplateList()

			if (res.code == 200) {
				this.positionList = res.data
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
				this.projectsList = res.data
			} else {
				this.$message.error(res.msg);
			}
		},
  	},
  	mounted() {
		this.onJobList()
		this.findPositionList()
		this.findAllDepartment()
		this.getListAll()
  	}
};
</script>
<style lang="scss" scoped>

</style>