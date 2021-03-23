<template>
    <div class="wrapper">
		<div class="application_l">
			<el-select v-model="searchType" @change="handelSearchType">
				<el-option label="全部应聘者" :value="0"></el-option>
				<el-option label="按职位查看" :value="1"></el-option>
				<el-option label="按流程查看" :value="2"></el-option>
			</el-select>
			
			<div class="processDiv" v-show="showProcessMap">
				<el-collapse accordion>
					<div v-for="(item,index) in processMap" @click="changeOuterProcess(item.id)">
						<el-collapse-item :title="item.name+'('+item.count+')'" :name="index">
							<div>
								<el-steps direction="vertical">
									<el-step v-for="(steps,i) in item.states" @click.native="changeInterProcess(steps.id)" :title="steps.name+'('+steps.count+')'"></el-step>
								</el-steps>
							</div>
						</el-collapse-item>
					</div>
				</el-collapse>
			</div>
		</div>
		<div class="application_r content-wrap">
			<div class="screen-wrap">
				<el-form :inline="true" class="searchType1">
					<el-form-item label="关键字">
						<el-input v-model="queryMap.keyword" placeholder="姓名/手机/邮箱/应聘者ID"></el-input>
					</el-form-item>
					<el-form-item label="性别">
						<template>
							<el-select v-model="queryMap.gender">
								<el-option label="女" :value="0"></el-option>
								<el-option label="男" :value="1"></el-option>
								<el-option label="不限" value></el-option>
							</el-select>
						</template>
					</el-form-item>
					<el-form-item label="年龄">
						<el-col :span="11">
							<el-input v-model="queryMap.MinAge"></el-input>
						</el-col>
						<el-col :span="2" style="text-align: center;">
						<span>--</span>
						</el-col>
						<el-col :span="11">
							<el-input v-model="queryMap.MaxAge"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="工作年限">
						<el-col :span="11">
							<template>
								<el-select v-model="queryMap.MinWorkYearNorm">
									<el-option label="不限" value></el-option>
									<el-option label="在读学生" :value="99"></el-option>
									<el-option label="应届毕业生" :value="98"></el-option>
									<el-option label="1年" :value="1"></el-option>
									<el-option label="2年" :value="2"></el-option>
									<el-option label="3年" :value="3"></el-option>
									<el-option label="4年" :value="4"></el-option>
									<el-option label="5年" :value="5"></el-option>
									<el-option label="6年" :value="6"></el-option>
									<el-option label="7年" :value="7"></el-option>
									<el-option label="8年" :value="8"></el-option>
									<el-option label="9年" :value="9"></el-option>
									<el-option label="10年及以上" :value="10"></el-option>
								</el-select>
							</template>
						</el-col>
						<el-col :span="2" style="text-align: center;">
						<span>--</span>
						</el-col>
						<el-col :span="11">
							<template>
								<el-select v-model="queryMap.MaxWorkYearNorm">
									<el-option label="不限" value></el-option>
									<el-option label="在读学生" :value="99"></el-option>
									<el-option label="应届毕业生" :value="98"></el-option>
									<el-option label="1年" :value="1"></el-option>
									<el-option label="2年" :value="2"></el-option>
									<el-option label="3年" :value="3"></el-option>
									<el-option label="4年" :value="4"></el-option>
									<el-option label="5年" :value="5"></el-option>
									<el-option label="6年" :value="6"></el-option>
									<el-option label="7年" :value="7"></el-option>
									<el-option label="8年" :value="8"></el-option>
									<el-option label="9年" :value="9"></el-option>
									<el-option label="10年及以上" :value="10"></el-option>
								</el-select>
							</template>
						</el-col>
					</el-form-item>
					<el-form-item label="毕业院校">
						<template>
							<el-select v-model="queryMap.collegeType">
								<el-option label="不限" value></el-option>
								<el-option label="普通院校" :value="0"></el-option>
								<el-option label="985" :value="1"></el-option>
								<el-option label="211" :value="2"></el-option>
								<el-option label="港澳台院校" :value="3"></el-option>
								<el-option label="海外院校" :value="4"></el-option>
								<el-option label="中学" :value="5"></el-option>
								<el-option label="职业教育" :value="6"></el-option>
								<el-option label="培训机构" :value="7"></el-option>
							</el-select>
						</template>
					</el-form-item>
					<el-form-item label="最高学历">
						<el-col :span="11">
							<template>
								<el-select v-model="queryMap.MinEducation">
									<el-option label="小学" :value="1"></el-option>
									<el-option label="初中" :value="2"></el-option>
									<el-option label="高中" :value="3"></el-option>
									<el-option label="中技(中专/技校/职高)" :value="4"></el-option>
									<el-option label="大专" :value="5"></el-option>
									<el-option label="本科" :value="6"></el-option>
									<el-option label="硕士研究生" :value="7"></el-option>
									<el-option label="MBA" :value="8"></el-option>
									<el-option label="博士研究生" :value="9"></el-option>
									<el-option label="保密" :value="10"></el-option>
								</el-select>
							</template>
						</el-col>
						<el-col :span="2" style="text-align: center;">
						<span>--</span>
						</el-col>
						<el-col :span="11">
							<template>
								<el-select v-model="queryMap.MaxEducation">
									<el-option label="小学" :value="1"></el-option>
									<el-option label="初中" :value="2"></el-option>
									<el-option label="高中" :value="3"></el-option>
									<el-option label="中技(中专/技校/职高)" :value="4"></el-option>
									<el-option label="大专" :value="5"></el-option>
									<el-option label="本科" :value="6"></el-option>
									<el-option label="硕士研究生" :value="7"></el-option>
									<el-option label="MBA" :value="8"></el-option>
									<el-option label="博士研究生" :value="9"></el-option>
									<el-option label="保密" :value="10"></el-option>
								</el-select>
							</template>
						</el-col>
					</el-form-item>
					<el-form-item label="专业类别" prop="major">
						<el-input v-model="queryMap.major" placeholder="专业" @focus="chooseMajor"></el-input>
					</el-form-item>
					<el-form-item label="应聘职位" prop="postId" v-show="showPosition==true">
						<template>
							<el-select v-model="queryMap.postId">
								<el-option
								v-for="item in positionList"
								:key="item.id"
								:label="item.postName"
								:value="item.id">
								</el-option>
							</el-select>
						</template>
					</el-form-item>
					<el-form-item label="流程选择" prop="workflow" v-show="showProcessList==true">
						<template>
							<el-select v-model="queryMap.workflow">
								<el-option
								v-for="item in processList"
								:key="item.num"
								:label="item.name"
								:value="item.num">
								</el-option>
							</el-select>
						</template>
					</el-form-item>
				</el-form>
				<div class="item-btn" style="padding-left: 100px; padding-top: 0;">
					<el-button type="primary" size="medium" @click="search">搜索</el-button>
					<el-button type="warning" size="medium" @click="onReset">重置</el-button>
				</div>
			</div>
		
			<div class="table-wrap">
				<div class="table-operate-btn">
					<div class="operate-btn">
						<optionBtn 
							:styleFlag="2"
							:key="timer" 
							:RoutineOperate="RoutineOperate" 
							:includeOperate="includeOperate" 
							:processId="processId" 
							:vidArr="vidArr" 
							:cvIdArr="cvIdArr"
							:cvNumArr="cvNumArr"
							:postAndCvList="postAndCvList"
							:approvalOffer="approvalOffer"
							:sendOfferTrue="sendOfferTrue"
							@reload='reload'
						/>
					</div>
				</div>
				<el-table
				  :data="tableData"
				  :row-key="getRowKey"
				  ref="multipleTable"
				  @selection-change="handleSelectionChange"
				  border
				  style="width: 100%"
				>
					<el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
					<el-table-column label="姓名" prop="name"></el-table-column>
					<el-table-column label="应聘者ID" prop="cvNum" ></el-table-column>
					<el-table-column label="性别">
						<template slot-scope="scope">
							<span v-if="scope.row.gender == 0">女</span>
							<span v-if="scope.row.gender == 1">男</span>
						  </template>
						</el-table-column>
					</el-table-column>
					<el-table-column label="年龄" prop="age"></el-table-column>
					<el-table-column label="现居住地" prop="livingAddress" ></el-table-column>
					<el-table-column label="最高学历">
						<template slot-scope="scope">
							<span v-if="scope.row.education == 1">小学</span>
							<span v-if="scope.row.education == 2">初中</span>
							<span v-if="scope.row.education == 3">高中</span>
							<span v-if="scope.row.education == 4">中技(中专/技校/职高)</span>
							<span v-if="scope.row.education == 5">大专</span>
							<span v-if="scope.row.education == 6">本科</span>
							<span v-if="scope.row.education == 7">硕士研究生</span>
							<span v-if="scope.row.education == 8">MBA</span>
							<span v-if="scope.row.education == 9">博士研究生</span>
							<span v-if="scope.row.education == 10">保密</span>
						  </template>
						</el-table-column>
					</el-table-column>
					<el-table-column label="毕业院校" prop="college" ></el-table-column>
					<el-table-column label="专业类别" prop="major"></el-table-column>
					<el-table-column label="工作年限" prop="workYearNorm" ></el-table-column>
					<el-table-column label="最近职位" prop="workPosition"></el-table-column>
					<el-table-column label="渠道" prop="cvSource" ></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="toDetail(scope.row)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
			
				<!-- 分页 -->
				<div class="el-pagination-wrap">
					<el-pagination
							style="margin-top:10px;"
							background
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="this.queryMap.pageNum"
							:page-sizes="[5, 10, 15, 20]"
							:page-size="this.queryMap.pageSize"
							layout="total, sizes, prev, pager, next, jumper"
							:total="total"
					></el-pagination>
				</div>
			
			</div>
		</div>
		
		<!--选择专业-->
		<el-dialog title="选择专业" width="680px" :visible.sync="majorDialogVisible" @close="closeMajorDialog">
			<div class="clear">
				<div class="majorDialog_l">
					<el-checkbox-group v-model="checkedMajor" @change="handlecheckeMajorChange" @close="closeMajorDialog">
						<el-checkbox v-for="item in majorArr" :label="item.label" :key="item.id"></el-checkbox>
					</el-checkbox-group>
				</div>
				<div class="majorDialog_r">
					<p class="mainColor">已选择<b>{{checkedMajorNum}}</b>/10个</p>
					<div class="checkedBox">
						<span>体育学<b>×</b></span>
						<span>经济学<b>×</b></span>
					</div>
				</div>
			</div>
		</el-dialog>
		
	</div>
</template>

<script>
	import optionBtn from '@/components/options.vue'//评价
	export default {
		inject:['reload'],
	  data() {
		  return{
			  timer:'',
			  vidArr:'',//中间表id
			  cvIdArr:'',//简历id
			  cvNumArr:'',//简历编号
			  processId:'',//流程模板ID
			  postAndCvList:[],//包含：cvId应聘者id   postId应聘者应聘的职位id  postCvId简历岗位中间表主键id
			  approvalOffer:true,//offer审批
			  sendOfferTrue:true,//offer发送
			  searchType:0,//查询类别 0:全部应聘者 1：按职位查看 2：按流程查看
			  showPosition:false,//职位条件选择
			  showProcessList:false,//流程模板条件选择
			  showProcessMap:false,//流程图展示
			  activeNames:1,
			  queryMap:{
				  pageNum: 1,
				  pageSize: 5,
				  keyword:'',
				  gender:'',
				  MinAge:'',
				  MaxAge:'',
				  MinWorkYearNorm:'',
				  MaxWorkYearNorm:'',
				  collegeType:'',
				  MinEducation:'',
				  MaxEducation:'',
				  major:'',
				  postId:'',
				  nodeId:'',
				  stateId:'',
				  workflow:'',
				  cvSource:''
			  },
			  total:0,
			  tableData:[],
			  majorDialogVisible:false,
			  majorArr:[
				{
					id:1,
					label:"全部"  
				}, 
				{
					id:2,
					label:"社会学"  
				}, 
				{
					id:3,
					label:"计算机"  
				}, 
				{
					id:4,
					label:"经济学"  
				}, 
			  ],//专业数据
			  checkedMajor:[],
			  checkedMajorNum:0,
			  processMap:[
				  
					  {
						  "id":1,
						  "name":"简历初筛",
						  "count":1,
						  "states":[
							  {
								  "id":4,
								  "name":"进行中",
								  "count":1
							  },
							  {
								  "id":5,
								  "name":"待定",
								  "count":0
							  },
							  {
								  "id":6,
								  "name":"淘汰",
								  "count":0
							  }
						  ]
					  },
					  {
						  "id":8,
						  "name":"HR面试",
						  "count":1,
						  "states":[
							  {
								  "id":1,
								  "name":"进行中",
								  "count":1
							  },
							  {
								  "id":2,
								  "name":"待定",
								  "count":0
							  }
						  ]
					  },
			  ],
			  positionList: [],//职位列表
			  processList:[],//流程模板列表
			  clickNodes:'',//当前点击的节点
			  clickStates:'',//当前点击的状态
			  multipleSelection:[],//用来存储table中选中的数据
			  RoutineOperate:[3,24,17,18,19,21,23],//常规操作
			  includeOperate:[],//包含操作
		  }
	  },
	  components: {
	  	optionBtn,
	  },
	  methods: {
		    handelSearchType(val){
			  //0:全部 1：职位 2：流程
			  this.searchType=val
			  this.queryMap = {
			  	pageNum: 1,
			  	pageSize: 5,
			  	keyword:'',
			  	gender:'',
			  	MinAge:'',
			  	MaxAge:'',
			  	MinWorkYearNorm:'',
			  	MaxWorkYearNorm:'',
			  	collegeType:'',
			  	MinEducation:'',
			  	MaxEducation:'',
			  	major:'',
			  	postId:'',
			  	nodeId:'',
			  	stateId:'',
			  	workflow:'',
			  	cvSource:''
			  };
			  if(val==0){
				  this.showPosition = false;
				  this.showProcessList = false;
				  this.showProcessMap = false;
				  this.search()
				  
				  //显示对应的操作按钮
				  this.RoutineOperate=[3,24,17,18,19,21,23]
				  this.includeOperate=[]
				  this.timer = new Date().getTime()  //重新加载操作按钮
			  }else if(val==1){
				  this.showPosition = true;
				  this.showProcessList = false;
				  this.showProcessMap = true;
				  this.queryMap.postId = this.positionList[0].id;
				  this.search();
			  }else if(val==2){
				  this.showPosition = false;
				  this.showProcessList = true;
				  this.showProcessMap = true;
				  this.queryMap.workflow = this.processList[0].num;
				  this.search();
			  }
		    },
			search(flag) {
		        //搜索
				this.queryMap.pageNum = 1;
				
				if(this.searchType==0){
					this.queryMap.postId='';
					this.queryMap.workflow='';
				}else if(this.searchType==1){
					this.queryMap.workflow='';
				}else if(this.searchType==2){
					this.queryMap.postId='';
				}
				
				this.getList();
				
				//如果改变了职位和流程 要改变侧边的流程
				if(this.queryMap.postId!=''){
					 this.goflowNodes(1);
				}
				if(this.queryMap.workflow!=''){
					 this.goflowNodes(2);
				}
		    },
			onReset(){
				//重置
				this.queryMap = {
					pageNum: 1,
					pageSize: 5,
					keyword:'',
					gender:'',
					MinAge:'',
					MaxAge:'',
					MinWorkYearNorm:'',
					MaxWorkYearNorm:'',
					collegeType:'',
					MinEducation:'',
					MaxEducation:'',
					major:'',
					postId:'',
					nodeId:'',
					stateId:'',
					workflow:'',
					cvSource:''
				};
				this.getList();
				
			},
			addApplication(){
				//新建应聘者
				
			},
			getRowKey(row) {
			  //指定一个key标识这一行的数据
			    return row.vid;
			},
			handleSelectionChange(val) {
				//val表示选中的表格行数据
				//简历ID和中间表id
				console.log(val)
				this.vidArr='';
				this.cvIdArr='';
				this.cvNumArr='';
				this.postAndCvList=[];
				this.multipleSelection = val;
				this.approvalOffer=true
				this.sendOfferTrue=true
				
				//处理中间表id 和 postAndCvList  
				this.multipleSelection.forEach(row => {
					if(this.vidArr!=''){
						this.vidArr = this.vidArr + ',' + row.vid;	
					}else{
						this.vidArr = row.vid
					}
					if(this.cvNumArr!=''){
						this.cvNumArr = this.cvNumArr + ',' + row.cvNum;	
					}else{
						this.cvNumArr = row.cvNum
					}
					
					var item = {cvId:row.id, postId:row.postId, postCvId:row.vid}
					this.postAndCvList.push(item)
					
					//处理操作按钮权限
					//offer审批
					if(row.approvalOffer==true){
						this.approvalOffer=true
					}else{
						this.approvalOffer=false
					}
					//offer发送
					if(row.sendOfferTrue==true){
						this.sendOfferTrue=true
					}else{
						this.sendOfferTrue=false
					}
				})
				
				//处理简历id
				var flag=''
				this.multipleSelection.forEach(row => {
					if(flag==''){
						flag=row
						this.cvIdArr = row.id
					}else{
						if(flag.id != row.id){
							//如果元素不重复
							flag=row
							this.cvIdArr = this.cvIdArr + ',' + row.id;	
						}
					}
				})
				
				
			},
			//改变页码
			handleSizeChange(newSize) {
			    this.queryMap.pageSize = newSize;
				this.getList()
			},
			//翻页
			handleCurrentChange(current) {
			    this.queryMap.pageNum = current;
				this.getList()
			},
			changeOuterProcess(val){
				//点击流程节点
				if(val != this.clickNodes){//判断是否重复点击
					this.clickNodes = val;
					this.queryMap.nodeId=val;
					this.queryMap.stateId='';
					this.search();
					
					//获取对应操作
					this.getOperateBtn(val)
				}
				
			},
			changeInterProcess(val){
				//点击流程状态
				if(val != this.clickStates){
					this.clickStates = val;
					this.queryMap.stateId=val;
					this.search();
				}
			},
			chooseMajor(){
				//this.majorDialogVisible=true
			},
			closeMajorDialog(){
				//关闭专业选择弹框
				this.majorDialogVisible=false
			},
			handlecheckeMajorChange(){
				
			},
			async getList(){
				
				const { data: res } = await this.$http.getTalentList({
				   params: this.queryMap
				});
				if (res.code !== 200) {
				    return this.$message.error("获取应聘者列表失败");
				} else {
					console.log(res.data)
					this.total = res.data.total;
					this.tableData = res.data.rows;
					
					//添加操作按钮的判断
					this.tableData.forEach((item,index)=>{
						//是否可以offer审批操作
						if(item.interviewCount==0 && item.expireCount==0){
							this.$set(item,'approvalOffer',true);
						}else{
							this.$set(item,'approvalOffer',false);
						}
						//是否可以发送offer操作
						if(item.offerCount==0){
							this.$set(item,'sendOfferTrue',true);
						}else{
							this.$set(item,'sendOfferTrue',false);
						}
					})
					
				} 
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
			// 查询流程模板列表
			async findProcessList() {
				const {
					data: res
				} = await this.$http.flowTemplate()
			
				if (res.code == 200) {
					this.processList = res.data
				} else {
					this.$message.error(res.msg);
				}
			},
			toDetail(data){ 
				//去详情页
				var detailUrl=''
				if(data.postId==null){
					detailUrl = this.$router.resolve({name:'applicantDetail', params: {cvId:data.id, postId:'noPost'} })
				}else{
					detailUrl = this.$router.resolve({name:'applicantDetail', params: {cvId:data.id, postId:data.postId} })
				}
				window.open(detailUrl.href, '_blank');
			},
			async goflowNodes(flag) {
				//查询流程状态以及流程统计
				console.log(this.queryMap)
				console.log(flag)
				const {
					data: res
				} = await this.$http.flowNodes({
					params: this.queryMap
				})
				console.log(res.data)
				if (res.code == 200) {
					/* if(flag==1){//职位
						
					}else if(flag==2){//流程
						
					} */
					this.queryMap.workflow = res.data.num;
					this.processId =  res.data.id;
					this.processMap = res.data.nodes;
					if(this.processMap.length!=0){
						this.getOperateBtn(this.processMap[0].id)
					}else{
						//如果node为空则没有阶段，操作按钮置空
						this.RoutineOperate=[]
						this.includeOperate=[]
						this.timer = new Date().getTime()  //重新加载操作按钮
					}
				} else {
					this.$message.error(res.msg);
				} 
			},
			
			async getOperateBtn(val){
				//阶段详情
				this.RoutineOperate=[]
				this.includeOperate=[]
				const {
					data: res
				} = await this.$http.flowNodeDetail({
					params:{
						id:val,
					}
				})
				if (res.code !== 200) {
				    return this.$message.error(res.msg);
				} else {
					console.log(res.data.opts)
					res.data.opts.forEach((item,index)=>{
					    if(item.state == 1){
							if(item.type==1){
								//常规操作
								this.RoutineOperate.push(item.docId)
							}else if(item.type==2){
								//包含操作
								this.includeOperate.push(item.docId)
							}
						}
					})
					
					this.timer = new Date().getTime()  //重新加载操作按钮
				} 
			}
	  },
	  created() {
		//判断是否是从职位列表跳转
		if(this.$route.query.postId==undefined || this.$route.query.postId==null || this.$route.query.postId==''){
			this.queryMap.postId=''
			this.searchType=0
			this.getList();
		}else{
			this.queryMap.postId=this.$route.query.postId
			this.searchType=1
			this.showPosition = true;
			this.showProcessList = false;
			this.showProcessMap = true;
			this.search();
		}
		
		this.findPositionList();
		this.findProcessList();
	    
	  }
	} 
</script>

<style lang="scss">
	.application_l{
		float: left;
		width: 170px;
		height: 120px;
		margin-right: -170px;
	}
	.application_r{
		float: right;
		width: calc(100% - 180px);
	}
	
	.majorDialog_l{
		float: left;
		width: 400px;
		padding: 10px;
		height: 320px;
		overflow-y: scroll;
		border-right: 1px solid #cbcccb;
	}
	.majorDialog_r{
		float: left;
		width: 238px;
		padding: 10px;
		height: 320px;
	}
	.checkedBox{
		width: 100%;
		span{
			float: left;
			margin: 10px 10px 0 0;
			padding: 0 4px;
			background: #fff0d2;
			line-height: 24px;
			border-radius: 2px;
			b{
				font-weight: normal;
				display: inline-block;
				margin-left: 5px;
			}
		}
	}
	.processDiv {
		margin-top: 20px;
		.el-collapse-item__content {
		    padding-bottom: 0px;
			padding-top: 10px;
		}
		.el-collapse-item__header {
			padding-left: 15px;
		}
		.el-step.is-vertical {
		    padding-left: 15px;
			height: 35px;
		}
		.el-step__icon {
		    width: 18px;
		    height: 18px;
			background: #C0C4CC;
		}
		.el-step__title {
		    font-size: 14px;
			color: #666;
			line-height: 22px !important;
		}
		.el-step.is-vertical .el-step__line {
			left: 8px;
			top: 22px;
		}
		.el-step__icon.is-text {
		    border: none; 
		    border-radius: 50%;
		}
		.el-step__icon-inner {
			color: #fff;
		}
		.el-collapse-item__header.is-active {
			border-left: 2px #1496c8 solid;
			color: #1496c8;
		}
		
	}
</style>


