<template>
	<div>
		<div class="pickList" v-for="(item,index) in pickList">
			<p class="pickList-p1">
				<span>{{item.userName}}</span>
				<span>筛选简历</span>
			</p>
			<p class="pickList-p2">
				<span>筛选结果：</span>
				<span v-if="item.pickResult==0">未处理</span>
				<span v-if="item.pickResult==1">待定</span>
				<span style="color: green;" v-if="item.pickResult==2">通过</span>
				<span style="color: red;" v-if="item.pickResult==3">淘汰</span>
			</p>
			<p class="pickList-p2">
				<span>筛选时间：</span>
				<span>{{item.insertTime}}</span>
			</p>
			<p class="pickList-p2 borderBottom">
				<span>筛选意见：</span>
				<span>{{item.pickRemark}}</span>
			</p>
			<p class="pickList-p2">
				<span>到期时间：</span>
				<span>{{item.dueTime}}</span>
			</p>
			<p class="pickList-p2">
				<span>申请职位：</span>
				<span>{{item.workPosition}}</span>
			</p>
		</div>
		<p v-show="dataNull==true">暂无数据</p>
	</div>
</template>

<script>
	export default {
		name: 'screenVue',
		props:['cvId','vid'],
		data() {
			return{
				pickList:[],//筛选记录
				dataNull:false,
			}
		},
		methods: {
			async getAllPickList(){
				const {
					data: res
				} = await this.$http.getPickList({
					params:{
						cvId:this.cvId,
						vid:this.vid
					}
				})
				if (res.code !== 200) {
				    return this.$message.error("查询筛选数据失败");
				} else {
					console.log(res.data)
					if(res.data=='' || res.data==null){
						this.dataNull=true
					}else{
						this.pickList=res.data;
					}
				} 
			},
		},
		created() {
			this.getAllPickList()
		}
	}	
		
</script>

<style lang="scss" scoped="scoped">
	.pickList{
		background: #f5fdff;
		width: 100%;
		margin-bottom: 30px;
		padding: 20px;
		border-radius: 5px;
		margin-top: 10px;
		.pickList-p1{
			font-size: 14px;
			line-height: 24px;
			color: #0a131a;
			margin-bottom: 20px;
			span:nth-child(1){
				margin-right: 20px;
			}
		}
		.pickList-p2{
			width: 100%;
			font-size: 12px;
			line-height: 20px;
			padding-left: 10px;
			margin-bottom: 10px;
			color: #3e4e59;
			span:nth-child(1){
				color: #8f9ca6;
				width: 125px;
				margin-right: 15px;
			}
		}
		.borderBottom{
			border-bottom: 1px #eee dashed;
			padding-bottom: 10px;
		}
	}
</style>
