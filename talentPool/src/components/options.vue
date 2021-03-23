<template>
	<div>
		<!--详情页操作-->
		<ul class="operateTips" v-show="styleFlag==1">
			<li v-for="(item,index) in routineOperateList" @click="goOption(item.operateId)">{{item.name}}</li>
			<li v-for="(item,index) in includeOperateList" @click="moreOption(item.operateId)">{{item.name}}</li>
		</ul>
		<!--列表页操作-->
		<div v-show="styleFlag==2">
			<!--常规操作-->
			<el-button type="primary" size="mini" style="margin: 10px;" @click="goAddApplicant">新建应聘者</el-button>
			<el-button type="primary" size="mini" v-for="(item,index) in routineOperateList" style="margin: 10px;" @click="goOption(item.operateId)">{{item.name}}</el-button>
			
			<!--包含操作-->
			<el-dropdown v-show="includeOperateShow==true">
				<el-button type="primary" size="mini" class="optionBtn">
					更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
				</el-button>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item v-for="(item,index) in includeOperateList" @click.native="moreOption(item.operateId)">{{item.name}}</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
		
		
		<!--转移-->
		<el-dialog title="转移" width="680px" :visible.sync="changeDialogVisible" @close="closeChangeDialog">
			<el-form :inline="true">
				<el-form-item label="阶段">
					<template>
						<el-select v-model="changeForm.node" @change="getProcessNode">
							<el-option v-for="(item,index) in process" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="状态">
					<template>
						<el-select v-model="changeForm.stateId">
							<el-option v-for="(item,index) in processStates" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</template>
				</el-form-item>
			</el-form>
			<div class="item-btn">
				<el-button type="primary" size="medium" @click="changeUp">确定</el-button>
				<el-button type="info" size="medium" @click="closeChangeDialog">取消</el-button>
			</div>
		</el-dialog>
		
		<!--储备到人才库-->
		<el-dialog title="人才库" width="680px" :visible.sync="stockDialogVisible" @close="closeStockDialog" class="">
			<el-form :inline="true">
				<el-form-item label="人才库类型">
					<template>
						<el-select v-model="stockType" placeholder="请选择人才库类型">
							<el-option label="未分类" :value="0"></el-option>
							<el-option label="人才公海" :value="1"></el-option>
							<el-option label="精英库" :value="2"></el-option>
							<el-option label="基础" :value="3"></el-option>
						</el-select>
					</template>
				</el-form-item>
			</el-form>
			<div class="item-btn">
				<el-button type="primary" size="medium" @click="goAddStock(stockType)">确定</el-button>
				<el-button type="info" size="medium" @click="closeStockDialog">取消</el-button>
			</div>
		</el-dialog>
		
		<!--导出简历-->
		<el-dialog title="导出简历" width="500px" :visible.sync="exportDialogVisible" @close="closeExportDialog">
			<div style="text-align: center;">
				<el-radio-group v-model="exportType">
					<el-radio :label="1" :value="1">原始简历</el-radio>
					<el-radio :label="2" :value="2">标准简历</el-radio>
				</el-radio-group>
			</div>
			<div class="item-btn" style="text-align: center; margin-top: 20px;">
				<el-button type="primary" size="medium" @click="exportResume">确定</el-button>
				<el-button type="info" size="medium" @click="closeExportDialog">取消</el-button>
			</div>
		</el-dialog>
		
		<!--推荐到职位-->
		<el-dialog title="推荐到职位" width="700px" :visible.sync="addPostDialogVisible" @close="closeAddPostDialog">
			<el-tabs v-model="addPostActive" @tab-click="addPostHandleClick">
			    <el-tab-pane label="按职位搜索" name="1"></el-tab-pane>
			    <el-tab-pane label="按部门搜索" name="2"></el-tab-pane>
			</el-tabs>
			<div>
				<p>
					<input type="text" placeholder="请输入关键字" class="searchInput" v-model="searchIn" >
					<el-button icon="el-icon-search" type="primary" @click="positionList">搜索</el-button>
				</p>
				<el-table
				  :data="positionData"
				  ref="multipleTable"
				  highlight-current-row 
				  @row-click="rowClick"
				  border
				  height="200"
				  style="width: 100%"
				>
					<el-table-column label width="35">
						<template slot-scope="scope">
							<el-radio :label="scope.row.id" v-model="positionIds">&nbsp;</el-radio>
						</template>
					</el-table-column>
					<el-table-column label="名称" prop="postName"></el-table-column>
					<el-table-column label="部门" prop="departmentName" ></el-table-column>
					<el-table-column label="招聘类别" prop="recruitType"></el-table-column>
					<el-table-column label="招聘负责人" prop="recruitUser" ></el-table-column>
				</el-table>
			</div>
			<div class="item-btn" style="text-align: center; margin-top: 20px;">
				<el-button type="primary" size="medium" @click="recommendPost">推荐</el-button>
				<el-button type="info" size="medium" @click="closeAddPostDialog">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import operateArray from '../assets/js/public'
	
	export default {
		name: 'enclosureVue', 
		props:['styleFlag','RoutineOperate','includeOperate','vidArr','processId','cvIdArr','cvNumArr','postAndCvList','approvalOffer','sendOfferTrue'],
		data() {
			return {
				includeOperateShow:false,
				routineOperateList:[],//常规操作 type:1
				includeOperateList:[],//包含操作 type:2
				changeDialogVisible:false,//转移弹框
				process:[],
				processStates:[],
				changeForm:{
					vid:'',
					flag:1,
					node:0,//下一节点id
					stateId:0,//节点状态id
					state:'',//修改简历状态
				},
				stockDialogVisible:false,//人才库弹框
				stockType:0,//人才库类型 0未分类 1人才公海 2精英库 3基础
				exportDialogVisible:false,//导出简历
				exportType:1,//1、原始简历  2、标准简历
				addPostDialogVisible:false,
				addPostActive:'1',
				positionData:[],
				postName:'',
				department:'',
				searchIn:'',
				positionIds:'',//推荐到职位的职位id
			}
		},
		methods:{
			goAddApplicant(){
				//新建应聘者
				this.$router.push({
					path:"/applicant/addApplicant"
				})
			},
			goOption(val){
				//操作 3:转移 5：筛选简历 6：转发资料 7：发通知 15：推荐到职位 17：储备人才库 18：黑名单 19：删除 21：导出数据 23：导出简历
				if(val==3){
					
					console.log(this.vidArr)
					if(this.vidArr=='' || this.vidArr==undefined || this.vidArr==null){
						this.$message.error("请选择应聘者");
					}else{
						this.processDetail()
						this.changeDialogVisible=true;
					}
				}else if(val==19){
					if(this.vidArr=='' || this.vidArr==undefined || this.vidArr==null){
						this.$message.error("请选择应聘者");
					}else{
						this.delDialog(1)
					}
				}else if(val==18){
					if(this.vidArr=='' || this.vidArr==undefined || this.vidArr==null){
						this.$message.error("请选择应聘者");
					}else{
						this.delDialog(2)
					}
				}else if(val==17){
					if(this.vidArr=='' || this.vidArr==undefined || this.vidArr==null){
						this.$message.error("请选择应聘者");
					}else{
						this.stockDialogVisible = true
					}
				}else if(val==5){
					//简历筛选页面
					if(this.vidArr=='' || this.vidArr==undefined || this.vidArr==null){
						this.$message.error("请选择应聘者");
					}else{
						this.$router.push({
							path: '/applicant/resumeScreening', query: {postAndCvList: JSON.stringify(this.postAndCvList),processId:this.processId},
						}) 
					}
				}else if(val==21){
					if(this.vidArr=='' || this.vidArr==undefined || this.vidArr==null){
						this.$message.error("请选择应聘者");
					}else{
						this.exportData()
					}
				}else if(val==23){
					if(this.vidArr=='' || this.vidArr==undefined || this.vidArr==null){
						this.$message.error("请选择应聘者");
					}else{
						this.exportDialogVisible=true
					}
				}else if(val==15){
					if(this.cvIdArr=='' || this.cvIdArr==undefined || this.cvIdArr==null){
						this.$message.error("请选择应聘者");
					}else{
						this.addPostDialogVisible=true
						this.positionList()
					}
				}
			},
			moreOption(val){
				//更多操作
				if(val==6){
					//安排面试
					if(this.vidArr=='' || this.vidArr==undefined || this.vidArr==null){
						this.$message.error("请选择应聘者");
					}else{
						console.log(this.postAndCvList)
						this.$router.push({
							path: '/applicant/arrangeInterview', query: {postAndCvList: JSON.stringify(this.postAndCvList),cvIdArr:this.cvIdArr},
						}) 
					}
				}else if(val==9){
					//发送Offer
					if(this.vidArr=='' || this.vidArr==undefined || this.vidArr==null){
						this.$message.error("请选择应聘者");
					}else{
						if(this.sendOfferTrue==true){
							this.$router.push({
								path: '/applicant/sendOffer', query: {postAndCvList: JSON.stringify(this.postAndCvList)},
							}) 
						}else{
							this.$message.error("当前选中的应聘者中有存在已发送过的offer记录，不能再次发送offer");
						}
					}
				}else if(val==10){
					//offer审批
					if(this.vidArr=='' || this.vidArr==undefined || this.vidArr==null){
						this.$message.error("请选择应聘者");
					}else{
						if(this.approvalOffer==true){
							this.$router.push({
								path: '/applicant/offerApproval', query: {postAndCvList: JSON.stringify(this.postAndCvList)},
							}) 
						}else{
							this.$message.error("当前选中的应聘者中有存在已发送过的offer记录，不能再次发送offer审批");
						}
					}
				}
			},
			async processDetail(){
				console.log(this.processId)
				//流程详情
				const {
					data: res
				} = await this.$http.detailTemplate({
					params:{
						id:this.processId
					}
				})
				if (res.code !== 200) {
				    return this.$message.error(res.msg);
				} else {
					console.log(res.data)
					this.process = res.data.nodes;
					this.changeForm.node = this.process[0].id;
					this.getProcessNode(this.changeForm.node)
				} 
			},
			getProcessNode(val){
				//获取当前节点下的所有状态
				this.process.forEach((item,index)=>{
				    if(item.id == val){
				        this.processStates = item.states;
						this.changeForm.stateId = this.processStates[0].id
				    }
				})
			},
			goChange(){
				//打开转移弹框
				this.changeDialogVisible = true;
			},
			async changeUp(){
				//转移节点状态
				this.changeForm.vid=this.vidArr;
				this.changeForm.flag=1;
				console.log(this.changeForm)
				const {
					data: res
				} = await this.$http.updateCvState({
					params:this.changeForm
				})
				if (res.code !== 200) {
				    return this.$message.error(res.msg);
				} else {
					this.changeDialogVisible = false;
					this.$emit('reload',true);
					return this.$message.success("阶段状态转移成功");
				} 
			},
			closeChangeDialog(){
				 this.changeDialogVisible = false;
			},
			delDialog(flag){
				//1、删除简历 2、加入黑名单
				console.log(this.cvIdArr)
				var str=''
				if(flag==1){
					str='确定删除该简历？'
				}else if(flag==2){
					str='确定将此应聘者拉入黑名单？'
				}
				this.$confirm(str, '提示', {
					  confirmButtonText: '确定',
					  cancelButtonText: '取消',
					  type: 'warning'
				}).then(() => {
					if(flag==1){
						this.operateDel(1)
					}else if(flag==2){
						this.operateDel(2)
					}
				}).catch(() => {
					
				});
				
			},
			async operateDel(flag){
				const {
					data: res
				} = await this.$http.updateState({
					params:{
						id:this.cvIdArr,
						state:flag,
						flag:1  //1操作 0 不操作
					}
				})
				if (res.code !== 200) {
				    return this.$message.error(res.msg);
				} else {
					console.log(res.data)
					if(flag==1){
						this.$emit('reload',true);
						return this.$message.success("成功删除简历");
					}else{
						this.$emit('reload',true);
						return this.$message.success("成功加入黑名单");
					}
				} 
			},
			async goAddStock(flag){
				//stockType:0未分类 1人才公海 2精英库 3基础
				const {
					data: res
				} = await this.$http.addStock({
					params:{
						cvId:this.cvIdArr,
						type:flag
					}
				})
				if (res.code !== 200) {
				    return this.$message.error(res.msg);
				} else {
					this.stockDialogVisible=false;
					this.$emit('reload',true);
					return this.$message.success("成功储备到人才库");
				} 
			},
			closeStockDialog(){
				this.stockDialogVisible=false;
			},
			exportData(){
				//下载文件
				window.location.href="http://192.168.10.62:6060/talent/exportTalent?vid="+this.vidArr
			},
			async exportResume(){
				if(this.exportType==1){
					//原始简历
					window.location.href="http://192.168.10.62:6060/talent/downloadContent?cvId="+this.cvIdArr
				}else if(this.exportType==2){
					//标准简历
					window.location.href="http://192.168.10.62:6060/talent/downloadPDF?cvId="+this.cvIdArr
				}
			},
			async positionList(){
				if(this.addPostActive==1){
					this.postName = this.searchIn
				}else if(this.addPostActive==2){
					this.department = this.searchIn
				}
				const {
					data: res
				} = await this.$http.getPostList({
					params:{
						postName:this.postName,
						department:this.department,
					}
				})
				if (res.code !== 200) {
				    return this.$message.error(res.msg);
				} else {
					console.log(res.data)
					this.positionData = res.data
				} 
			},
			closeExportDialog(){
				this.exportDialogVisible=false;
			},
			rowClick(row){
				this.ids=row.id;
			},
			addPostHandleClick(){
				this.postName=''
				this.department=''
				this.searchIn=''
				this.positionList()
			},
			closeAddPostDialog(){
				//关闭推荐到职位弹框
				this.addPostDialogVisible=false
			},
			async recommendPost(){
				//推荐
				if(this.positionIds=='' || this.positionIds==null || this.positionIds==undefined){
					return this.$message.error("请选择推荐的职位");
				}else{
					const {
						data: res
					} = await this.$http.addPostCv({
						params:{
							ids:this.positionIds,
							cvId:this.cvIdArr,
							cvNum:this.cvNumArr
						}
					})
					if (res.code !== 200) {
					    return this.$message.error(res.msg);
					} else {
						this.$emit('reload',true);
						this.$message.success("成功推荐到职位");
						this.addPostDialogVisible=false;
					} 
				}
			}
		},
		created() {
			//常规操作
			console.log(this.RoutineOperate)
			this.RoutineOperate.forEach((btnId,index)=>{
			    operateArray.RoutineOperateMap.forEach((item,index)=>{
			        if(btnId == item.operateId){
						this.routineOperateList.push(item)
					}
			    })
			})
			//包含操作
			console.log(this.includeOperate)
			if(this.includeOperate.length==0){
				this.includeOperateShow=false
			}else{
				this.includeOperateShow=true
				this.includeOperate.forEach((btnId,index)=>{
				    operateArray.includeOperateMap.forEach((item,index)=>{
				        if(btnId == item.operateId){
							this.includeOperateList.push(item)
						}
				    })
				})
			}
			this.positionList()
		}
	}
</script>

<style lang="scss">
	.operateTips{
		width: 100%;
		li{
			width: 100%;
			height: 40px;
			line-height: 40px;
			text-align: center;
			border-bottom: 1px #eee solid;
			font-size: 14px;
			color: #3e4e59;
		}
		li:last-child{
			border-bottom: none;
		}
	}
	.searchInput{
		height: 40px;
		line-height: 40px;
		width: calc(100% - 130px);
		padding: 0 10px;
		border-radius: 4px;
		margin-right: 10px;
		border: 1px #ccc solid;
	}
</style>
