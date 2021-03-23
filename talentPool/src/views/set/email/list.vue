<template>

  <div class="wrapper">
        <div class="content-wrap">

          <div class="table-wrap" style="margin-top:0;border:none">
			<div class="operate-btn">
				<el-button type="primary" size="mini" @click=addProcess>新增</el-button>
			</div>

			<el-table
				
				:data="listData"
				tooltip-effect="dark">
				<el-table-column prop="userName" label="用户名">
                    <template slot-scope="scope" >
						<span @click="toDetail(scope.row.id)" class="tableTextHover">{{ scope.row.userName }}</span>
					</template>
                </el-table-column>
				<el-table-column prop="email" label="邮箱"></el-table-column>
				<el-table-column prop="protocolType" label="协议类型"></el-table-column>
				<el-table-column prop="rulesCount" label="规则数量"></el-table-column>
				<el-table-column prop="emailState" label="邮箱状态">
					<template slot-scope="scope" >
						<span v-if="scope.row.emailState == 1">正常</span>
						<span v-else>不正常</span>
					</template>
				</el-table-column>
                <el-table-column prop="receiveState" label="接收状态">
					<template slot-scope="scope" >
						<span v-if="scope.row.emailState == 1">自动</span>
						<span v-else>不自动</span>
					</template>
				</el-table-column>
				<el-table-column prop="data" label="操作" width="280">
					<template slot-scope="scope" >
						<el-button size="mini" type="primary" @click="editEmail(scope.row.id)">编辑</el-button>
						<el-button size="mini" type="primary" @click="receiveEmail(scope.row.id)" 
						v-loading="scope.row.filingLock"
						element-loading-text="收取中"
						element-loading-spinner="el-icon-loading"
						element-loading-background="rgba(0, 0, 0, 0.8)" 
						class="table-loading" :disabled="scope.row.filingLock ? true:false ">
						手动收取</el-button>
						<el-button size="mini" type="danger" @click="delEmail(scope.row.id)">删除</el-button>
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
		listData:[],
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
		// 编辑
		editEmail(id){
			this.$router.push({
				path:"add?id="+id
			})
		},
		async receiveEmail(id){
			
			this.emailListPage()
			const {
				data: res
			} = await this.$http.onReceiveEmail({params:{id:id}})
			
			if (res.code == 200) {
				this.$message.success(res.msg);
			} else {
				this.$message.error(res.msg);
			}
		},
		// 删除
		async delEmail(id){
			const {
				data: res
			} = await this.$http.emailDel({params:{id:id}})

			if (res.code == 200) {
				this.$message.success("删除成功");
				this.emailListPage()
			} else {
				this.$message.error(res.msg);
			}
		},
        // 监听pagesize改变的事件
		handleSizeChange(newSize) {
			this.listState.pageSize = newSize
			this.emailListPage()
		},
		// 监听页码值改变的事件
		handleCurrentChange(newPage) {
			this.listState.pageNum = newPage
			this.emailListPage()
		},
		// 分页查询列表数据
		async emailListPage(){
			const {
				data: res
			} = await this.$http.emailListPage({params:this.listState})

			if (res.code == 200) {
                this.listData = res.data.rows
				this.total = res.data.total
				
				this.listData.forEach(item=>{
					if( item.filingLock == 1 ){
						item.filingLock = true
					}else{
						item.filingLock = false
					}
				})
			} else {
				this.$message.error(res.msg);
			}
        },
  },
	mounted() {
		this.emailListPage()
	}
};
</script>
<style lang="scss" scoped>

</style>