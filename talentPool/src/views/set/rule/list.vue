<template>

  <div class="wrapper">
        <div class="content-wrap">

          <div class="table-wrap" style="margin-top:0;border:none">
			<div class="operate-btn">
				<el-button type="primary" size="mini" @click=addProcess>新增</el-button>
			</div>

			<el-table
				ref="multipleTable"
				:data="listData"
				tooltip-effect="dark">
				<el-table-column prop="postName" label="职位名称">
                    <template slot-scope="scope" >
						<span @click="toDetail(scope.row.id)" class="tableTextHover">{{ scope.row.postName }}</span>
					</template>
                </el-table-column>
				<el-table-column prop="num" label="编号"></el-table-column>
				<el-table-column prop="condition" label="归档条件"></el-table-column>
				<el-table-column prop="insertTime" label="创建日期"></el-table-column>
				<el-table-column prop="data" label="操作">
					<template slot-scope="scope" >
						<el-button size="mini" type="primary" @click="editRule(scope.row.id)">编辑</el-button>
						<el-button size="mini" type="danger" @click="delRule(scope.row.id)">删除</el-button>
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
		async delRule(id){
			const confirmResult = await this.$confirm('确定删除该规则, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).catch(err => err);

			if (confirmResult == "confirm") {
				const {
					data: res
				} = await this.$http.delRules({params:{id:id}})

				if (res.code == 200) {
					this.$message.success(res.msg);
					this.emailListPage()
				} else {
					this.$message.error(res.msg);
				}
			}
		},
        //获取流程状态
        changeProcessState(val){
            this.listState.pageNum =1
            this.rulesListPage()
        },
        // 监听pagesize改变的事件
		handleSizeChange(newSize) {
			this.listState.pageSize = newSize
			this.rulesListPage()
		},
		// 监听页码值改变的事件
		handleCurrentChange(newPage) {
			this.listState.pageNum = newPage
			this.rulesListPage()
		},
		// 分页查询列表数据
		async rulesListPage(){
			const {
				data: res
			} = await this.$http.rulesListPage({params:this.listState})

			if (res.code == 200) {
                this.listData = res.data.rows
                this.total = res.data.total
			} else {
				this.$message.error(res.msg);
			}
		},
		
  },
	mounted() {
		this.rulesListPage()
		
	}
};
</script>
<style lang="scss" scoped>

</style>