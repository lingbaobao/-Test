<template>
	<div class="wrapper">
		<div class="poolContent_l application_l">
			<ul class="poolTab">
				<li @click="poolList(111)">全部(<span>{{countList.count}}</span>)</li>
				<li @click="poolList(11)">未分类(<span>{{countList.unclass}}</span>)</li>
				<li @click="poolList(1)">人才公海(<span>{{countList.talent}}</span>)</li>
				<li @click="poolList(2)">精英库(<span>{{countList.elite}}</span>)</li>
				<li @click="poolList(3)">基础人才库(<span>{{countList.basis}}</span>)</li>
			</ul>
		</div>
		<div class="poolContent_r application_r content-wrap">
			<div class="screen-wrap">
				<el-form :inline="true" class="searchType1">
					<el-form-item label="关键字">
						<el-input v-model="queryMap.keyword" placeholder="姓名/手机/邮箱/应聘者ID"></el-input>
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
						<el-input v-model="queryMap.major" placeholder="专业"></el-input>
					</el-form-item>
					<el-form-item label="应聘职位" prop="workPosition">
						<template>
							<el-select v-model="queryMap.workPosition">
								<el-option
								v-for="item in positionList"
								:key="item.id"
								:label="item.postName"
								:value="item.id">
								</el-option>
							</el-select>
						</template>
					</el-form-item>
					<el-form-item label="单位名称" prop="company">
						<el-input v-model="queryMap.company"></el-input>
					</el-form-item>
					<el-form-item label="人才动态">
						<template>
							<el-select v-model="queryMap.workStatus">
								<el-option label="不限" value></el-option>
								<el-option label="未知" :value="0"></el-option>
								<el-option label="想看机会" :value="1"></el-option>
								<el-option label="暂时不看" :value="2"></el-option>
								<el-option label="已离职在看" :value="3"></el-option>
								<el-option label="在职想看" :value="4"></el-option>
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
						<!-- <optionBtn :processId="processId" :vidArr="vidArr" :cvIdArr="cvIdArr" /> -->
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
					<el-table-column label="性别">
						<template slot-scope="scope">
							<span v-if="scope.row.gender == 0">女</span>
							<span v-if="scope.row.gender == 1">男</span>
						  </template>
						</el-table-column>
					</el-table-column>
					<el-table-column label="年龄" prop="age"></el-table-column>
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
					<el-table-column label="工作年限">
						<template slot-scope="scope">
							<span v-if="scope.row.workYearNorm == 99">在读学生</span>
							<span v-if="scope.row.workYearNorm == 98">应届毕业生</span>
							<span v-if="scope.row.workYearNorm == 1">1年</span>
							<span v-if="scope.row.workYearNorm == 2">2年</span>
							<span v-if="scope.row.workYearNorm == 3">3年</span>
							<span v-if="scope.row.workYearNorm == 4">4年</span>
							<span v-if="scope.row.workYearNorm == 5">5年</span>
							<span v-if="scope.row.workYearNorm == 6">6年</span>
							<span v-if="scope.row.workYearNorm == 7">7年</span>
							<span v-if="scope.row.workYearNorm == 8">8年</span>
							<span v-if="scope.row.workYearNorm == 9">9年</span>
							<span v-if="scope.row.workYearNorm == 10">10年及以上</span>
						  </template>
						</el-table-column>
					</el-table-column>
					<el-table-column label="最近单位" prop="jobCpy"></el-table-column>
					<el-table-column label="最近职位" prop="workPosition"></el-table-column>
					<el-table-column label="人才动态">
						<template slot-scope="scope">
							<span v-if="scope.row.workStatus == 0">未知</span>
							<span v-if="scope.row.workStatus == 1">想看机会</span>
							<span v-if="scope.row.workStatus == 2">暂时不看</span>
							<span v-if="scope.row.workStatus == 3">已离职在看</span>
							<span v-if="scope.row.workStatus == 4">在职想看</span>
						  </template>
						</el-table-column>
					</el-table-column>
					<el-table-column label="最近应聘职位" prop="workPosition"></el-table-column>
					<el-table-column label="最近人才库">
						<template slot-scope="scope">
							<span v-if="scope.row.talentType == 0">未分类</span>
							<span v-if="scope.row.talentType == 1">人才公海</span>
							<span v-if="scope.row.talentType == 2">精英库</span>
							<span v-if="scope.row.talentType == 3">基础</span>
						</template>
					</el-table-column>
					<el-table-column label="最近人才库储备时间" prop="insertTime" width="150"></el-table-column>
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
	</div>
</template>

<script>
	import optionBtn from '@/components/options.vue'//评价
	export default {
	    data() {
		    return{
				vidArr:'',//中间表id
				cvIdArr:'',//简历id
				queryMap:{
					pageNum: 1,
					pageSize: 5,
				    flag:'',//''全部 0未分类 1人才公海 2精英库 3基础
					keyword:'',
					MinWorkYearNorm:'',
					MaxWorkYearNorm:'',
					collegeType:'',//0:普通院校  1:985  2:211  3:港澳台院校  4:海外院校  5:中学  6:职业教育  7:培训机构
					MinEducation:'',
					MaxEducation:'',
					major:'',
					workPosition:'',
					company:'',
					workStatus:'',//0未知；1想看机会；2暂时不看；3已离职在看；4在职想看
				},
				countList:{
					count:0,//全部
					unclass:0,//0未分类 
					talent:0,//1人才公海
					elite:0,//2精英库
					basis:0//3基础
				},
				positionList:[],
				tableData:[],
				multipleSelection:[],//用来存储table中选中的数据
				total:0,
		  }
		},
		components: {
			optionBtn
		},
		methods: {
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
			async poolList(flag){
				//''全部 0未分类 1人才公海 2精英库 3基础
				if(flag==111){
					this.queryMap.flag=''
				}else if(flag==11){
					this.queryMap.flag=0
				}else if(flag==1){
					this.queryMap.flag=1
				}else if(flag==2){
					this.queryMap.flag=2
				}else if(flag==3){
					this.queryMap.flag=3
				}
				
				const {
					data: res
				} = await this.$http.getStockList({
					params: this.queryMap
				})
				if (res.code !== 200) {
				    return this.$message.error(res.msg);
				} else {
					this.total = res.data.total;
					this.tableData = res.data.rows;
				} 
			},
			onReset(){
				//重置
				this.queryMap = {
					pageNum: 1,
					pageSize: 5,
					flag:'',
					keyword:'',
					MinWorkYearNorm:'',
					MaxWorkYearNorm:'',
					collegeType:'',
					MinEducation:'',
					MaxEducation:'',
					major:'',
					workPosition:'',
					company:'',
					workStatus:'',
				};
				this.poolList(0);
			},
			search(){
				//查询
				this.queryMap.pageNum = 1;
				this.poolList(0);
			},
			getRowKey(row) {
			  //指定一个key标识这一行的数据
			    return row.vid;
			},
			handleSelectionChange(val) {
				//val表示选中的表格行数据
				//简历ID和中间表id
				this.vidArr='';
				this.cvIdArr='';
				this.multipleSelection = val;
				
				//处理中间表id
				this.multipleSelection.forEach(row => {
					if(this.vidArr!=''){
						this.vidArr = this.vidArr + ',' + row.vid;	
					}else{
						this.vidArr = row.vid
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
			async poolCount(){
				//人才库数量统计
				const {
					data: res
				} = await this.$http.getStockCount()
				if (res.code !== 200) {
				    return this.$message.error(res.msg);
				} else {
					this.countList.count = res.data.count;
					this.countList.unclass = res.data.unclass;
					this.countList.talent = res.data.talent;
					this.countList.elite = res.data.elite;
					this.countList.basis = res.data.basis;
				} 
			},
		},
		created() {
			this.findPositionList();
			this.poolCount();
			this.poolList();
		}
	}
		
</script>

<style lang="scss" scoped="scoped">
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
	.poolContent_l{
		.poolTab{
			width: 100%;
			background: #fff;
			box-shadow: 0 2px 4px whitesmoke, 0 0 6px #cecece;
			li{
				width: 100%;
				line-height: 36px;
				border-bottom: 1px solid #eee;
				text-align: center;
				color: #606266;
			}
			li:last-child{
				border-bottom: none;
			}
		}
	}
</style>
