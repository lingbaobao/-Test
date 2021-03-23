<template>
	<div>
		<div class="processDiv">
			<el-timeline>
			    <el-timeline-item
			      v-for="(item, index) in recordList"
			      :key="index"
				  :color="item.color"
			      :timestamp="item.operateTime">
				  <p>{{item.operateContent}}</p>
			      <p style="color: #909399; font-size: 12px; margin-top: 12px;">{{item.userName}}</p>
			    </el-timeline-item>
			</el-timeline>
		</div>
		<p v-show="dataNull==true">暂无数据</p>
	</div>
</template>

<script>
	export default {
		name: 'processVue',
		props:['cvId'],
		data() {
			return{
				recordList:[],//操作记录
				dataNull:false,
			}
		},
		methods: {
			async getAllRecordList(){
				const {
					data: res
				} = await this.$http.getRecordList({
					params:{
						cvId:this.cvId
					}
				})
				if (res.code !== 200) {
				    return this.$message.error("操作记录数据失败");
				} else {
					if(res.data=='' || res.data==null){
						this.dataNull=true
					}else{
						this.recordList=res.data;
						this.$set(this.recordList[0],'color','#1496c8');
					}
					
					
				} 
			},
		},
		created() {
			this.getAllRecordList()
		}
	}	
		
</script>

<style lang="scss" scoped="scoped">
	.processDiv{
		margin: 20px 0 0 20px;
	}
</style>
