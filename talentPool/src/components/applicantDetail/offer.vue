<template><!--offer已发送的时候更改offer状态-->
	<div>
		<div class="offerDiv clear" v-for="(item,index) in offerList">
			<p class="offerTips1">
				<span>{{item.postName}}</span>
			</p>
			<!--offer状态-->
			<div class="offerTips2">
				<!-- <p class="offerTips2-p1"><span>offer类型：</span><span>{{item.offerTypeId}}</span></p> -->
				<p class="offerTips2-p1">
					<span>offer状态：</span>
					<span v-if="item.offerState==0">审批中</span>
					<span v-if="item.offerState==1">审批通过</span>
					<span v-if="item.offerState==2">审批不通过</span>
					<span v-if="item.offerState==3">终止</span>
					<span v-if="item.offerState==4">已发送</span>
					<span v-if="item.offerState==5">接受</span>
					<span v-if="item.offerState==6">拒绝</span>
					<span v-if="item.offerState==7">失效</span>
					<span class="changeStatus">更改</span>
				</p>
				<p class="offerTips2-p1"><span>offer拒绝原因：</span><span>{{item.reason}}</span></p>
			</div>
			<!--审批状态-->
			<div class="offerTips3">
				<div class="offerTips3-div1" v-for="(itemApproval,indexApproval) in item.offerExamine">
					<p class="offerTips3-p1">
						<span>{{itemApproval.sort}}</span>
						<span>{{itemApproval.userName}}</span>
						<span>{{itemApproval.email}}</span>
						<span v-if="itemApproval.examineState==0">待审批</span>
						<span v-if="itemApproval.examineState==1">通过</span>
						<span v-if="itemApproval.examineState==2">淘汰</span>
						<span v-if="itemApproval.examineState==3">失效</span>
						<span>{{itemApproval.examineTime}}</span>
					</p>
					<p class="offerTips3-p2" v-show="itemApproval.reason!=null">
						<span>审批理由：</span>
						<span>{{itemApproval.reason}}</span>
					</p>
				</div>
			</div>
			<p class="offerTips4">
				<span>创建人：<b>上海舞泡网络科技有限公司</b></span>
				<span>创建时间：<b>2020-12-08</b></span>
				<span>状态更新时间：<b>2020-12-22</b></span>
			</p>
		</div>
		<p v-show="dataNull==true">暂无数据</p>
	</div>
</template>

<script>
	export default {
		name: 'offerVue',
		props:['vid'],
		data() {
			return{
				offerList:[],//筛选记录
				dataNull:false,
			}
		},
		methods: {
			async getAllOfferList(){
				const {
					data: res
				} = await this.$http.getOfferList({
					params:{
						vid:this.vid
					}
				})
				if (res.code !== 200) {
				    return this.$message.error("查询OFFER数据失败");
				} else {
					console.log(res.data)
					if(res.data=='' || res.data==null){
						this.dataNull=true
					}else{
						this.offerList=res.data;
					}
					
				} 
			},
		},
		created() {
			this.getAllOfferList()
		}
	}	
		
</script>

<style lang="scss" scoped="scoped">
	.offerDiv{
		width: 100%;
		background: #f9f9f9;
		border: 1px solid #cbcbcb;
		margin-bottom: 30px;
		padding: 20px;
		border-radius: 5px;
		margin-top: 10px;
		.offerTips1{
			font-size: 14px;
			font-weight: 700;
			color: #323232;
			span:nth-child(1){
				margin-right: 20px;
			}
		}
		.offerTips2{
			border-bottom: 1px #eee solid;
			padding: 10px 0;
			.offerTips2-p1{
				line-height: 26px;
			}
		}
		.offerTips3{
			padding: 10px 0;
			.offerTips3-div1{
				padding: 10px 0;
				border-bottom: 1px #eee dashed;
				
			}
			.offerTips3-div1:last-child{
				border-bottom: none;
			}
			.offerTips3-p1{
				line-height: 26px;
				span{
					margin-right: 20px;
				}
			}
			.offerTips3-p1{
				line-height: 26px;
			}
		}
		.offerTips4{
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
		.changeStatus{
			color: #1496c8;
			margin-left: 30px;
		}
	}
</style>
