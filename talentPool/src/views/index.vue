<template>
	<div class="wrapper index-wrap">
		<el-row :gutter="20">
  			<el-col :span="16">
					<el-card shadow="always" class="leftTopCol">
						<div class="index-head">
							<ul>
								<li>筛选简历	<i class="el-icon-question"></i></li>
								<li>面试反馈	<i class="el-icon-question"></i></li>
								<li>offer发送	<i class="el-icon-question"></i></li>
							</ul>
							<el-select v-model="getTalentForm.timeFlag" placeholder="请选择" class="index-select" @change="changeFlag">
								<el-option :value="1" label="本周">本周</el-option>
								<el-option :value="2" label="近7天">近7天</el-option>
								<el-option :value="3" label="近30天">近30天</el-option>
								<el-option :value="4" label="本月">本月</el-option>
							</el-select>
						</div>
						<ul class="indexSelected">
							<li>
								<a href="">
									<span>{{indexData.talentPickNum}}</span>
									<p>待筛选</p>
								</a>
							</li>
							<li>
								<a href="">
									<span>{{indexData.talentInterviewNum}}</span>
									<p>待反馈</p>
								</a>
							</li>
							<li>
								<a href="">
									<span>{{indexData.talentOfferNum}}</span>
									<p>待发offer</p>
								</a>
							</li>
							<li>
								<a href="">
									<span>{{indexData.offerExamineNum}}</span>
									<p>待审批</p>
								</a>
							</li>
						</ul>
					</el-card>
					<el-card shadow="always">
						<div class="interviewToday">
							<div class="tit">
								<el-divider content-position="left">今日面试</el-divider>
							</div>
							<el-select v-model="getTalentForm.todayFlag" class="index-select select-bg" @change="changeFlag">
								<el-option :value="2" label="我负责的"></el-option>
								<el-option :value="1" label="我安排的"></el-option>
								<el-option :value="0" label="全部"></el-option>
							</el-select>

							<!-- 没有面试 -->
							<div class="noInterview" v-show="noInterview">
								<img src="../assets/images/todayinterview.png" alt="">
								<span>今天一个面试都没有哦，休息一下吧～</span>
							</div>

							<!-- 有面试 -->
							<div class="indexInterview" v-show="!noInterview">
								<el-timeline>
									<el-timeline-item v-for="(item,index) in indexData.interviewList" :key="index" :timestamp="item.interviewTime" placement="top">
										<el-card>
											<h4>{{item.postName}} <a href="">{{item.isAppraise}}</a></h4>
											<p>面试官：
												<span v-for="(item,index) in item.interviewer" :key="index">{{item}}</span>
												{{item.insertUser}}   应聘者：{{item.applicants}}</p>
											<p>面试地点：{{item.interviewAddress}}</p>
										</el-card>
									</el-timeline-item>
								</el-timeline>
							</div>
						</div>
					</el-card>
			</el-col>
  			<el-col :span="8">
				<div class="">
	  				<el-card shadow="always">
						<div class="interviewToday">
							<div class="tit">
								<el-divider content-position="left">面试已反馈</el-divider>
							</div>
							<el-select v-model="getTalentForm.fkFlag" class="index-select select-bg" @change="changeFlag">
								<el-option :value="1" label="我安排的"></el-option>
								<el-option :value="0" label="全部"></el-option>
							</el-select>

							<!-- 没有面试反馈 -->
							<div class="noInterview" v-show="noApprais">
								<img src="../assets/images/todayinterview.png" alt="">
								<span>暂无面试反馈哦，休息一下吧～</span>
							</div>

							<!-- 有面试反馈 -->
							<div class="indexApplicants" v-show="!noApprais">
								<ul>
									<li v-for="(item,index) in indexData.appraiseList" :key="index">
										<p class="Interviewers">
											{{item.applicants}} - {{item.postName}} 
											<span v-if="item.interviewResultState == '通过'" class="applicantsSuccess">{{item.interviewResultState}}</span>
											<span v-if="item.interviewResultState == '待定'" class="applicantsWarning">{{item.interviewResultState}}</span>
											<span v-if="item.interviewResultState == '淘汰'" class="applicantsError">{{item.interviewResultState}}</span>
										</p>
										<p class="interviewerTit">
											<i class="el-icon-user"></i>
											面试官：{{item.insertUser}}
										</p>
										<p class="interviewerTit">
											<i class="el-icon-date"></i>
											反馈时间：{{item.interviewTime}}
										</p>
									</li>
								</ul>
							</div>
						</div>
					</el-card>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'Home',
		data() {
			return {
				getTalentForm:{
					timeFlag:4,
					todayFlag:0,
					fkFlag:1
				},
				indexData:{
					offerExamineNum:0,
					talentInterviewNum:0,
					talentOfferNum:0,
					talentPickNum:0,
					appraiseList:{
						applicants: "",
						id: '',
						insertUser: "",
						interviewAddress: "",
						interviewResultState: "",
						interviewState: "",
						interviewTime: "",
						interviewTitle: "",
						interviewTypeText: "",
						interviewer: "",
						isAppraise: "",
						isArrive: "",
						postName: ""
					},
					interviewList:{
						applicants: "",
						id: '',
						insertUser: "",
						interviewAddress: "",
						interviewResultState: "",
						interviewState: "",
						interviewTime: "",
						interviewTitle: "",
						interviewTypeText: "",
						interviewer: [],
						isAppraise: "",
						isArrive: "",
						postName: "",
					}
				},
				noInterview:false,
				noApprais:false
			}
		},
		methods: {
			async getTalentHome(){
				const {
					data: res
				} = await this.$http.getTalentHome({params:this.getTalentForm})

				if (res.code == 200) {
					this.indexData = res.data

					if( this.indexData.interviewList ){
						this.noInterview = false
					}else{
						this.noInterview = true
					}

					if( this.indexData.appraiseList ){
						this.noApprais = false
					}else{
						this.noApprais = true
					}

				} else {
					this.$message.error(res.msg);
				}
			},
			// 根据日期筛选
			changeFlag(){
				this.getTalentHome()
			},
			// 筛选今日面试
			// changeTodayFlag(val){
			// 	console.log(val)
			// },
			// 筛选面试已反馈
			// changeFkFlag(val){
			// 	console.log(val)
			// }
		},
		components: {
		
		},
		created() {
			this.getTalentHome()
		}
	}
</script>
