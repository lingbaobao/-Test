<template><!--未反馈跳转评价表单页面，已反馈跳转评价详情页面-->
	<div>
		<div class="evaluateList clear" v-for="(item,index) in appraiseList">
			<p class="evaluateList-p1">
				<span>{{item.userName}}</span>
				<span>评价</span>
			</p>
			<p class="evaluateList-p2">
				
				<el-button type="info" icon="el-icon-info" size="mini" v-if="item.interviewState==0">未反馈</el-button>
				<el-button type="success" icon="el-icon-success" size="mini" v-if="item.interviewState==1">通过</el-button>
				<el-button type="warning" icon="el-icon-warning" size="mini" v-if="item.interviewState==2">待定</el-button>
				<el-button type="danger" icon="el-icon-error" size="mini" v-if="item.interviewState==3">淘汰</el-button>
			</p>
			<p class="evaluateList-p3">{{item.appraiseContent}}</p>
			<p class="evaluateList-p4">{{item.appraiseTime}}</p>
			<p class="evaluateList-p5">
				<span>面试类型：<b>{{item.interviewType}}</b></span>
				<span>面试主题：<b class="mainColor pointer" @click="goInterviewDeatil(item.targetId)">{{item.interviewTitle}}</b></span>
				<span>面试时间：<b>{{item.interviewTime}}</b></span>
				<span>面试官：<b>{{item.userName}}</b></span>
				<span>
					面试结果：
					<b v-if="item.interviewState==0">未反馈</b>
					<b v-if="item.interviewState==1">通过</b>
					<b v-if="item.interviewState==2">待定</b>
					<b v-if="item.interviewState==3">淘汰</b>
				</span>
			</p>
		</div>
		<p v-show="dataNull==true">暂无数据</p>
	</div>
</template>

<script>
	export default {
		name: 'evaluationVue',
		props:['vid'],
		data() {
			return{
				appraiseList:[],//评价数组
				dataNull:false,
			}
		},
		methods: {
			async getAllAppraiseList(){
				const {
					data: res
				} = await this.$http.getAppraiseList({
					params:{
						vid:this.vid
					}
				})
				if (res.code !== 200) {
				    return this.$message.error("查询评价数据失败");
				} else {
					console.log(res.data)
					if(res.data=='' || res.data==null){
						this.dataNull=true
					}else{
						this.appraiseList=res.data;
					}
					
				} 
			},
			goInterviewDeatil(id){
				//去评价详情
				this.$router.push({
					path:"/interview/detail?id="+id
				})
			}
		},
		created() {
			console.log(this.vid)
			this.getAllAppraiseList();
		}
	}	
		
</script>

<style lang="scss" scoped="scoped">
	.evaluateList{
		width: 100%;
		background: #f9f9f9;
		border: 1px solid #cbcbcb;
		margin-bottom: 30px;
		padding: 20px;
		border-radius: 5px;
		margin-top: 10px;
		.evaluateList-p1{
			font-size: 14px;
			font-weight: 700;
			color: #323232;
			span:nth-child(1){
				margin-right: 20px;
			}
		}
		.evaluateList-p2{
			.el-button--mini, .el-button--mini.is-round {
			    padding: 4px 5px;
			}
			margin: 10px 0;
		}
		.evaluateList-p3{
			line-height: 26px;
		}
		.evaluateList-p4{
			line-height: 26px;
			margin-bottom: 5px;
		}
		.evaluateList-p5{
			padding-top: 15px;
			color: #9a9a9a;
			border-top: 1px #eee dashed;
			b{
				font-weight: normal;
			}
			span{
				margin-right: 30px;
			}
		}
	}
</style>
