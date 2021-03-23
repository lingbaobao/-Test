<template>

  <div class="wrapper">
	    <el-select v-model="listState.state" placeholder="请选择模版状态" @change="changeModelState" style="margin-bottom: 10px;">
	      <el-option label="启用的模版" :value="1"></el-option>
	      <el-option label="停用的模版" :value="0"></el-option>
	    </el-select>
        <div class="content-wrap">
			<el-select v-model="modelTypeChoose" placeholder="新建模版">
				 <el-option
				  @click.native="openAddModelDialog(item.id)"
				 v-for="item in modelTypeAll"
				 :key="item.id"
				 :label="item.name"
				 :value="item.id">
				 </el-option>
			</el-select>
            <!-- <el-button type="primary" size="mini" @click='delModel' style="margin-left: 10px;">删除</el-button>
			<el-button type="info" size="mini" @click='stopModel'>停用</el-button> -->
			
          <div class="table-wrap">
			<el-table
				ref="multipleTable"
				:data="modelData"
				tooltip-effect="dark">
				<!-- <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column> -->
				<el-table-column prop="modelName" label="模版名称"></el-table-column>
				<el-table-column prop="modelTypeName" label="模版类型"></el-table-column>
				<el-table-column prop="modelSelf" label="模版类别">
					<template slot-scope="scope" >
						<span v-if="scope.row.modelSelf == 1">公共</span>
						<span v-else>个人</span>
					</template>
				</el-table-column>
				<el-table-column prop="state" label="状态">
					<template slot-scope="scope" >
						<span v-if="scope.row.state == 1">启用</span>
						<span v-else>停用</span>
					</template>
				</el-table-column>
				<el-table-column prop="insertUserName" label="创建人"></el-table-column>
				<el-table-column prop="insertTime" label="创建时间"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="toEdit(scope.row.id)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>

			<div class="el-pagination-wrap">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listState.pageNum"
				:page-sizes="[10, 15, 20]" :page-size="listState.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div> 

		</div>
        </div> 


		<!--新增模版-->
		<div v-if="showAddModel">
			<el-dialog title="新增模版" width="800px" :visible.sync="addModelDialogVisible" @close="closeAddModelDialog">
				<addModel :modelId="modelId" @closeAddModelDialog="closeAddModelDialog" />
			</el-dialog>
		</div>
		
		<!--编辑模版-->
		<div v-if="showEditModel">
			<el-dialog title="编辑模版" width="1000px" :visible.sync="editModelDialogVisible" @close="closeEditModelDialog">
				<editModel :modelId="modelId" @closeEditModelDialog="closeEditModelDialog" />
			</el-dialog>
		</div>
  </div>
</template>

<script>
import addModel from '@/components/model/addModel.vue'//新增模版
import EditModel from '@/components/model/editModel.vue'//编辑模版
export default {
  props: {},
  data() {
    return {
		listState:{
            state:1,
            pageNum:1,
            pageSize:10,
        },
        total:0,
        modelData:[],//模版分页数据
		modelTypeAll:[],//所有模版数据
		modelTypeChoose:'',
		multipleSelection:[],//用来存储table中选中的数据
		addModelDialogVisible:false,
		editModelDialogVisible:false,
		modelId:'',
		modelTab:[],
		activeName:1,
		modelAddForm:{
			modelName:'',
			modelDesc:'',
			modelSelf:1,
			notifyContentTypes:[
				{
					category:0,
					sendUserType:1,//1操作用户 2自定义
					sendUser:'',//自定义发件人名称
					title:'',//标题
					content:'',//内容
				}
			]
		},
		lastStep:true,//上一步
		nextStep:false,//下一步
		mailDetail:{},//邮件相关内容
		showMail:true,
		modelAddFormArrFlag:0,//添加表单里面的notifyContentTypes
		showAddModel:false,
		showEditModel:false
    };
  },
  components: {
    addModel,EditModel
  },
  methods: {
        //获取流程状态
        changeModelState(val){
			this.listState.state = val;
            this.listState.pageNum =1
            this.findModelListPage()
        },
		// 分页查询列表数据
		async findModelListPage(){
			const {
				data: res
			} = await this.$http.modelListPage({params:this.listState})

			if (res.code == 200) {
                this.modelData = res.data.rows
                this.total = res.data.total
				console.log( this.modelData)
			} else {
				this.$message.error(res.msg);
			}
        },
        // 监听pagesize改变的事件
		handleSizeChange(newSize) {
			this.listState.pageSize = newSize
			this.findModelListPage()
		},
		// 监听页码值改变的事件
		handleCurrentChange(newPage) {
			this.listState.pageNum = newPage
			this.findModelListPage()
		},
		delModel(){
			//删除模版
		},
		stopModel(){
			//停用模版
		},
		getRowKey(row) {
		  //指定一个key标识这一行的数据
		    return row.vid;
		},
		handleSelectionChange(val) {
			//val表示选中的表格行数据
			console.log(val)
		},
		// 查询所有模版数据
		async findModelListAll(){
			const {
				data: res
			} = await this.$http.modelTypeAll()
		
			if (res.code == 200) {
		        this.modelTypeAll = res.data
			} else {
				this.$message.error(res.msg);
			}
		},
		closeAddModelDialog(){
			//关闭新增弹框
			this.addModelDialogVisible = false
			this.showAddModel = false
			this.findModelListPage()
			this.findModelListPage()
			this.findModelListAll()
		},
		openAddModelDialog(val){
			//打开新增弹框
			//加载模版配置详情
			this.modelId = val
			this.showAddModel = true
			this.addModelDialogVisible = true
		},
		closeEditModelDialog(){
			this.editModelDialogVisible = false
			this.showEditModel = false
			this.findModelListPage()
			this.findModelListAll()
		},
		toEdit(id){
			//编辑模版
			this.modelId = id
			this.editModelDialogVisible = true
			this.showEditModel = true
		},
		
  },
  mounted() {
	  this.findModelListPage()
	  this.findModelListAll()
  }
};
</script>
<style lang="scss">
</style>