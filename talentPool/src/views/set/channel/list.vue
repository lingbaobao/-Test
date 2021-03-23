<template>

  <div class="wrapper">
        <div class="content-wrap">
			<el-select v-model="listState.state" placeholder="请选择渠道来源状态" @change="changeChannelState">
                <el-option label="启用的渠道来源" :value="1"></el-option>
                <el-option label="停用的渠道来源" :value="0"></el-option>
            </el-select>

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
				<el-table-column prop="channelTypeName" label="渠道类型"></el-table-column>
				<el-table-column prop="channelWebsite" label="网址"></el-table-column>
				
				<el-table-column prop="state" label="是否启用">
					<template slot-scope="scope" >
						<span v-if="scope.row.state == 1">启用</span>
						<span v-else>停用</span>
					</template>
				</el-table-column>
				<el-table-column prop="insertUserName" label="创建人"></el-table-column>
				<el-table-column prop="insertTime" label="创建时间"></el-table-column>
				<el-table-column prop="remark" label="备注"></el-table-column>
				<el-table-column prop="data" label="操作">
				<template slot-scope="scope" >
						<el-button size="mini" type="primary"  @click="editChannel(scope.row)">编辑</el-button>
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
			<el-form :model="addChannelForm" ref="channelRef" :rules="channelRules" class="form-wrap1">
				<el-form-item label="渠道类型" prop="channelTypeId" >
					<el-select v-model="addChannelForm.channelTypeId" placeholder="请选择渠道类型" :disabled="typeDisabled">
						<el-option v-for="item in channelTypeData" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="名称" prop="channelName">
					<el-input v-model="addChannelForm.channelName"></el-input>
				</el-form-item>
				<el-form-item label="状态" prop="state">
				<el-select v-model="addChannelForm.state" placeholder="请选择状态">
					<el-option label="启用" :value="1"></el-option>
					<el-option label="停用" :value="0"></el-option>
				</el-select>
				</el-form-item>
				<el-form-item label="网址" prop="channelWebsite">
					<el-input v-model="addChannelForm.channelWebsite"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input v-model="addChannelForm.remark" type="textarea"></el-input>
				</el-form-item>
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
		channelTypeData:[],
		listState:{
			state:1,
			pageSize:10,
			pageNum:1,
			channelTypeId:'',
			name:''
		},
		listData:[],
		total:0,
		addChannelForm:{
			channelName:'',
			state:'',
			channelTypeId:'',
			channelWebsite:'',
			remark:''
		},
		dialogTitle:'添加渠道来源',
		channelDialog:false,
		channelRules:{
			channelName: {
				required: true,
				message: '必须填写名称',
				trigger: 'blur'
			},
			channelTypeId: {
				required: true,
				message: '必须选择类型',
				trigger: 'blur'
			},
			state: {
				required: true,
				message: '必须选择状态',
				trigger: 'blur'
			},
		},
		typeDisabled:false,
    };
  },
  methods: {
	  //跳转到详情
		toDetail(id){
			this.$router.push({
				path:"detail?id="+id
			})
		},
		// 查询渠道类型
		async channelType(){
			const {
				data: res
			} = await this.$http.channelType()

			if (res.code == 200) {
				this.channelTypeData = res.data
			} else {
				this.$message.error(res.msg);
			}
		},
		// 查询渠道列表
		async channelList(){
			const {
				data: res
			} = await this.$http.channelList({params:this.listState})

			if (res.code == 200) {
				this.listData = res.data.rows
				this.total = res.data.total
			} else {
				this.$message.error(res.msg);
			}
		},
		addChannel(){
			for(let key in this.addChannelForm){
				this.addChannelForm[key]  = ''
			}
			this.typeDisabled = false
			this.channelDialog = true
			this.dialogTitle = "添加渠道来源"
		},
		editChannel(item){
			this.typeDisabled = true
			this.channelDialog = true
			this.dialogTitle = "修改渠道来源"
				
			Object.keys(this.addChannelForm).forEach(key=>{
				this.addChannelForm[key] = item[key]
			})
			this.addChannelForm.channelTypeId = item.channelTypeName
			this.addChannelForm.id = item.id

		},
		submitChannel(formRef){
			this.$refs[formRef].validate(async valid => {
				if (valid) {
					// 新增
					if (this.dialogTitle == "添加渠道来源") {
						const {
							data: res
						} = await this.$http.addChannel(
							this.addChannelForm
						)

						if (res.code == 200) {
							this.$message.success("添加成功");
							this.channelDialog = false
							this.channelList()
						} else {
							this.$message.error(res.msg);
						}
					} else {
						// 更新
						const {
							data: res
						} = await this.$http.updateChannel(this.addChannelForm)

						if (res.code == 200) {
							this.$message.success("修改成功");
							this.channelDialog = false
							this.channelList()
						} else {
							this.$message.error(res.msg);
						}
					}
				} else {
					return false;
				}
			});
			
		},
		changeChannelState(val){
            this.listState.pageNum =1
            this.channelList()
		},
		// 监听pagesize改变的事件
		handleSizeChange(newSize) {
			this.listState.pageSize = newSize
			this.channelList()
		},
		// 监听页码值改变的事件
		handleCurrentChange(newPage) {
			this.listState.pageNum = newPage
			this.channelList()
		},
  },
  mounted() {
	  this.channelType()
	  this.channelList()
  }
};
</script>
<style lang="scss" scoped>

</style>