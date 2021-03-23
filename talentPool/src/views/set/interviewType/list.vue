<template>

  <div class="wrapper">
        <div class="content-wrap">
			<el-select v-model="listState.state" placeholder="面试类型" @change="changeProcessState">
                <el-option label="启用的面试类型" :value="1"></el-option>
                <el-option label="停用的面试类型" :value="0"></el-option>
            </el-select>

          <div class="table-wrap" style="margin-top:0;border:none">
			<div class="operate-btn">
				<el-button type="primary" size="mini" @click=addProcess>新增</el-button>
			</div>

			<el-table
				ref="multipleTable"
				:data="listData"
				tooltip-effect="dark">
				<el-table-column prop="id" label="ID"></el-table-column>
				<el-table-column prop="name" label="名称">
                    <template slot-scope="scope" >
						<span @click="toDetail(scope.row.id)" class="tableTextHover">{{ scope.row.name }}</span>
					</template>
                </el-table-column>
				
				<el-table-column prop="state" label="是否启用">
					<template slot-scope="scope" >
						<span v-if="scope.row.state == 1">启用</span>
						<span v-else>停用</span>
					</template>
				</el-table-column>
				<el-table-column prop="insertUserName" label="创建人"></el-table-column>
				<el-table-column prop="insertTime" label="创建日期"></el-table-column>
				<el-table-column prop="data" label="操作">
					<template slot-scope="scope" >
						<el-button size="mini" type="primary" @click="editRule(scope.row.id)">编辑</el-button>
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

  </div>
</template>

<script>

export default {
  props: {},
  data() {
    return {
		listState:{
            pageNum:1,
			pageSize:10,
			state:1
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
		editRule(id){
			this.$router.push({
				path:"add?id="+id
			})
		},
        //获取流程状态
        changeProcessState(val){
            this.listState.pageNum =1
            this.interviewTypeListPage()
        },
        // 监听pagesize改变的事件
		handleSizeChange(newSize) {
			this.listState.pageSize = newSize
			this.interviewTypeListPage()
		},
		// 监听页码值改变的事件
		handleCurrentChange(newPage) {
			this.listState.pageNum = newPage
			this.interviewTypeListPage()
		},
		// 分页查询列表数据
		async interviewTypeListPage(){
			const {
				data: res
			} = await this.$http.interviewTypeListPage({params:this.listState})

			if (res.code == 200) {
                this.listData = res.data.rows
                this.total = res.data.total
			} else {
				this.$message.error(res.msg);
			}
		},
		
  },
	mounted() {
		this.interviewTypeListPage()
		
	}
};
</script>
<style lang="scss" scoped>

</style>