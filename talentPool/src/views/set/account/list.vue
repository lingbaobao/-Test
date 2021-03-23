<template>
  <div class="wrapper">
        <div class="content-wrap">

          <div class="table-wrap">
			<div class="operate-btn">
				<el-button type="primary" size="mini" @click=addChannel>新增</el-button>
			</div>

			<el-table
				ref="multipleTable"
				:data="listData"
				tooltip-effect="dark">
				
				<el-table-column prop="channelName" label="名称">
					<template slot-scope="scope" >
						<span @click="toDetail(scope.row.id)" class="tableTextHover">{{ scope.row.channelName }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="accountAlias" label="账号别名"></el-table-column>
				<el-table-column prop="account" label="账号"></el-table-column>
				<el-table-column prop="insertUserName" label="创建人"></el-table-column>
				<el-table-column prop="insertTime" label="创建时间"></el-table-column>
				<el-table-column prop="data" label="操作">
				<template slot-scope="scope" >
						<el-button size="mini" type="primary" @click="editChannel(scope.row)">编辑</el-button>
						<el-button size="mini" type="danger" @click="delChannel(scope.row)">删除</el-button>
					</template>
			</el-table-column>
			</el-table>
			
			<div class="el-pagination-wrap">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listState.pageNum"
				:page-sizes="[10, 15, 20]" :page-size="listState.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div> 
        </div> 

		<!-- 添加 -->
		<el-dialog :title=dialogTitle :visible.sync="channelDialog">
			<el-form :model="addAccountForm" class="form-wrap1" :rules="accountRules">
				<div v-if="dialogTitle == '编辑账号'">
					<el-form-item label="渠道名称" prop="channelId" >
						<el-select v-model="accountForm.channelId" placeholder="请选择渠道" @change="chooseChannel" disabled>
							<el-option v-for="item in channelNameData" :key="item.id" :label="item.channelName" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<div v-for="(item,index) in showData" :key="index" >
						<!-- <el-form-item :label="item.name" :prop="item.property" v-if="item.edit == 0 && item.name != '是否可用'">
							<el-input :type="item.type" v-model="addAccountForm[item.property]" :required = "item.required" disabled></el-input>
						</el-form-item>
						<el-form-item :label="item.name" :prop="item.property" v-if="item.edit == 1 && item.name != '是否可用' ">
							<el-input :type="item.type" v-model="addAccountForm[item.property]" :required = "item.required"></el-input>
						</el-form-item> -->
						<el-form-item :label="item.name" :prop="item.property" 
						v-if="item.name == '是否可用'"
						:rules="[{ required: true, message: '必须选择状态', trigger: 'blur' },]" >
							<el-select v-model="addAccountForm[item.property]" placeholder="请选择启用状态" disabled>
								<el-option label="启用" value="1"></el-option>
								<el-option label="停用" value="0"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item :label="item.name" :prop="item.property" v-else>
							<el-input :type="item.type" v-model="addAccountForm[item.property]" :required = "item.required"></el-input>
						</el-form-item>
					</div>
				</div>
				<div v-if="dialogTitle == '添加账号'">
					<el-form-item label="渠道名称" prop="channelId" >
						<el-select v-model="accountForm.channelId" placeholder="请选择渠道" @change="chooseChannel">
							<el-option v-for="item in channelNameData" :key="item.id" :label="item.channelName" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<div v-for="(item,index) in showData" :key="index" >
						<el-form-item :label="item.name" :prop="item.property" 
						v-if="item.name == '是否可用'"
						:rules="[{ required: true, message: '必须选择状态', trigger: 'blur' },]">
							<el-select v-model="addAccountForm[item.property]" placeholder="请选择启用状态">
								<el-option label="启用" :value="1"></el-option>
								<el-option label="停用" :value="0"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item :label="item.name" :prop="item.property" v-else>
							<el-input :type="item.type" v-model="addAccountForm[item.property]" :required = "item.required"></el-input>
						</el-form-item>
					</div>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="channelDialog = false">取 消</el-button>
				<el-button type="primary" @click="submitChannel('channelRef')">确 定</el-button>
			</div>
		</el-dialog>

  </div>
   </div>
</template>

<script>

export default {
  props: {},
  data() {
    return {
		channelNameData:[],
		listState:{
			channelAlias:'',
			pageSize:10,
			pageNum:1,
			channelId:'',
		},
		listData:[],
		total:0,
		addAccountForm:{
			accountAlias:'',
			UserName:'',
			Password:'',
			MemberName:'',
			ChannelAlias:'',
			ChannelName:'',
			IsEnabled:1
		},
		accountRules:{
			accountAlias: [
            	{ required: true, message: '请输入名称', trigger: 'blur' },
          	],
			Password:[
				{ required: true, message: '必须填写密码', trigger: 'blur' },
			],
			UserName:[
				{ required: true, message: '必须填写用户名', trigger: 'blur' },
			]
		},
		dialogTitle:'添加账号',
		channelDialog:false,
		showData:[],
		accountForm:{
			channelId:'',
			state:1,
			extAttr:[],
		}
    };
  },
  methods: {
	  //跳转到详情
		toDetail(id){
			this.$router.push({
				path:"detail?id="+id
			})
		},
		// 删除渠道账号
		async delChannel(row){
			const confirmResult = await this.$confirm('确定删除该账号, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).catch(err => err);

			if (confirmResult == "confirm") {
				const {
					data: res
				} = await this.$http.delChannelAccount({params:{id:row.id}})

				if (res.code == 200) {
					this.$message.success("删除成功");
					this.channelAccountList()
				} else {
					this.$message.error(res.msg);
				}
			}
		},
		// 查询渠道来源 
		async channelSourceAll(){
			const {
				data: res
			} = await this.$http.channelSourceAll()

			if (res.code == 200) {
				this.channelNameData = res.data
			} else {
				this.$message.error(res.msg);
			}
		},
		// 根据渠道来源获取账号属性
		async chooseChannel(){
			const {
				data: res
			} = await this.$http.channelAccountExtAttr({params:{channelId:this.accountForm.channelId}})

			if (res.code == 200) {
				this.showData = res.data
			} else {
				this.$message.error(res.msg);
			}
		},
		addChannel(){
			for(let key in this.addAccountForm){
				this.addAccountForm[key]  = ''
			}
			this.accountForm.channelId = ''
			this.showData = []
			this.channelDialog = true
			this.dialogTitle = "添加账号"
		},
		async editChannel(item){
			this.channelDialog = true
			this.dialogTitle = "编辑账号"

			const {
				data: res
			} = await this.$http.channelAccountDetail(
				{params:{id:item.id}}
			)

			if (res.code == 200) {
				this.showData = res.data.extAttr

				this.showData.forEach(el => {
					this.addAccountForm[el.property] = el.value
				});
				this.accountForm.channelId = item.channelName

			} else {
				this.$message.error(res.msg);
			}
			this.accountForm.id = item.id
		},
		async submitChannel(){
			this.accountForm.extAttr = []
			for(let key in this.addAccountForm){
				this.accountForm.extAttr.push({
					"property":key,
					"value":this.addAccountForm[key]
				})
			}
			if(this.accountForm.channelId == '' ){
				this.$message.error("必须选择渠道名称");
				return false
			}else{
				// 新增
				if (this.dialogTitle == "添加账号") {
					delete this.accountForm.id

					if( this.addAccountForm.accountAlias == "" ){
						this.$message.error("账户别名不能为空");
						return false
					}

					if( this.addAccountForm.Password == "" ){
						this.$message.error("密码不能为空");
						return false
					}
					if( this.addAccountForm.UserName == "" ){
						this.$message.error("用户名不能为空");
						return false
					}
					if( this.addAccountForm.IsEnabled == "" ){
						this.$message.error("启用状态必须选择");
						return false
					}

					const {
						data: res
					} = await this.$http.addChannelAccount(
						this.accountForm
					)

					if (res.code == 200) {
						this.$message.success("添加成功");
						this.channelDialog = false
						this.channelAccountList()
					} else {
						this.$message.error(res.msg);
					}
				} else {
					delete this.accountForm.channelId
					// 更新
					const {
						data: res
					} = await this.$http.channelAccountUpdate(this.accountForm
					)

					if (res.code == 200) {
						this.$message.success("修改成功");
						this.channelDialog = false
						this.channelAccountList()
					} else {
						this.$message.error(res.msg);
					}
				}
			}	
		},
		changeChannelState(val){
            this.listState.pageNum =1
            this.channelList()
		},
		// 监听pagesize改变的事件
		handleSizeChange(newSize) {
			this.listState.pageSize = newSize
			this.channelAccountList()
		},
		// 监听页码值改变的事件
		handleCurrentChange(newPage) {
			this.listState.pageNum = newPage
			this.channelAccountList()
		},
		// 渠道账号列表 
		async channelAccountList(){
			const {
				data: res
			} = await this.$http.channelAccountList({params:this.listState})

			if (res.code == 200) {
				this.listData = res.data.rows
				this.total = res.data.total
			} else {
				this.$message.error(res.msg);
			}
		},
  },
  mounted() {
	  this.channelAccountList()
	  this.channelSourceAll()
  }
};
</script>
<style lang="scss" scoped>

</style>