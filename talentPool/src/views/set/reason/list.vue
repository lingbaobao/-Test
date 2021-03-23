<template>

  <div class="wrapper">
        <div class="content-wrap">

            <el-select v-model="listState.state" placeholder="请选择流程状态" @change="changeProcessState">
                <el-option label="启用的流程" :value="1"></el-option>
                <el-option label="停用的流程" :value="0"></el-option>
            </el-select>

          <div class="table-wrap">
			<div class="operate-btn">
				<el-button type="primary" size="mini" @click=addProcess>新增</el-button>
			</div>

			<el-table
				ref="multipleTable"
				:data="listData"
				tooltip-effect="dark">
				<el-table-column prop="num" label="编号"></el-table-column>
				<el-table-column prop="name" label="名称">
					<template slot-scope="scope" >
						<span @click="toDetail(scope.row.id)" class="tableTextHover">{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="remark" label="备注"></el-table-column>
				<el-table-column prop="state" label="是否启用">
					<template slot-scope="scope" >
						<span v-if="scope.row.state == 1">启用</span>
						<span v-else>停用</span>
					</template>
				</el-table-column>
				<el-table-column prop="insertUserName" label="创建人"></el-table-column>
				<el-table-column prop="insertTime" label="创建时间"></el-table-column>
			</el-table>

			<div class="el-pagination-wrap">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listState.pageNum"
				:page-sizes="[10, 15, 20]" :page-size="listState.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div> 

		</div>
        </div> 

  </div>
</template>

<script>

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
        listData:[]
    };
  },
  methods: {
        //添加流程
        addProcess(){
            this.$router.push({
                path:'add'
            })
		},
		//跳转到详情
		toDetail(id){
			this.$router.push({
				path:"detail?id="+id
			})
		},
        //获取流程状态
        changeProcessState(val){
            this.listState.pageNum =1
            this.flowReasonList()
        },
		// 分页查询列表数据
		async flowReasonList(){
			const {
				data: res
			} = await this.$http.flowReasonList({params:this.listState})

			if (res.code == 200) {
                this.listData = res.data.rows
				this.total = res.data.total
			} else {
				this.$message.error(res.msg);
			}
        },
        // 监听pagesize改变的事件
		handleSizeChange(newSize) {
			this.listState.pageSize = newSize
			this.flowReasonList()
		},
		// 监听页码值改变的事件
		handleCurrentChange(newPage) {
			this.listState.pageNum = newPage
			this.flowReasonList()
		},
  },
	mounted() {
		this.flowReasonList()
		
	}
};
</script>
<style lang="scss" scoped>

</style>