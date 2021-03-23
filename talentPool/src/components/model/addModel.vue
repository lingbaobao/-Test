<template>
	<div>
		<div class="clear">
			<el-steps :active="activeName" simple>
			  <el-step v-for="(item,index) in modelTab" :title="item.emailTitle"></el-step>
			</el-steps>
			<div class="tabDiv" v-show="activeName==0">
				<el-form :inline="true" class="searchType1 searchType2">
					<p>
						<el-form-item label="模版名称">
							<el-input v-model="modelAddForm.modelName"></el-input>
						</el-form-item>
					</p>
					<p>
						<el-form-item label="模版描述">
							<el-input type="textarea" v-model="modelAddForm.modelDesc" height="100px"></el-input>
						</el-form-item>
					</p>
					<p style="margin-top: 22px;">
						<el-form-item label="类别">
							<template>
								<el-select v-model="modelAddForm.modelSelf">
									<el-option label="公共" :value="1"></el-option>
									<el-option label="个人" :value="2"></el-option>
								</el-select>
							</template>
						</el-form-item>
					</p>
				</el-form>
			</div>
			<div class="tabDiv" v-if="modelCategoryForm==1"><!--应聘者邮件模版-->
			应聘者邮件模版
				<el-form :inline="true" :rules="addMailRules" class="searchType1 searchType2">
					<p>
						<el-form-item label="发件人">
							<el-input v-model="applicantMail.sendUser"></el-input>
						</el-form-item>
					</p>
					<p>
						<el-form-item label="邮件标题">
							<el-input v-model="applicantMail.title"></el-input>
						</el-form-item>
					</p>
					<p>
						<emailTemplate ref="childRef" :mailDetail="mailDetail" :plugins="plugins" :toolbar="toolbar" :destroyEditor="true" :emailIndex="emailIndex1" />
					</p>
				</el-form>
			</div>
			<div class="tabDiv" v-if="modelCategoryForm==2"><!--应聘者短信模版-->
			应聘者短信模版
				<el-form :inline="true" :rules="addMessageRules" class="searchType1 searchType2">
					<p>
						<emailTemplate ref="childRef" :mailDetail="mailDetail" :plugins="plugins" :toolbar="toolbar" :destroyEditor="true" :emailIndex="emailIndex1" />
					</p>
				</el-form>
			</div>
			<div class="tabDiv" v-if="modelCategoryForm==3"><!--面试官邮件模版-->
			面试官邮件模版
				<el-form :inline="true" :rules="addMailRules" class="searchType1 searchType2">
					<p>
						<el-form-item label="发件人">
							<el-input v-model="interviewerMail.sendUser"></el-input>
						</el-form-item>
					</p>
					<p>
						<el-form-item label="邮件标题">
							<el-input v-model="interviewerMail.title"></el-input>
						</el-form-item>
					</p>
					<p>
						<emailTemplate ref="childRef" :mailDetail="mailDetail" :plugins="plugins" :toolbar="toolbar" :destroyEditor="true" :emailIndex="emailIndex1" />
					</p>
				</el-form>
			</div>
			<div class="tabDiv" v-if="modelCategoryForm==4"><!--面试官短信模版-->
			面试官短信模版
				<el-form :inline="true" :rules="addMessageRules" class="searchType1 searchType2">
					<p>
						<emailTemplate ref="childRef" :mailDetail="mailDetail" :plugins="plugins" :toolbar="toolbar" :destroyEditor="true" :emailIndex="emailIndex1" />
					</p>
				</el-form>
			</div>
			<div class="tabDiv" :rules="addMailRules" v-if="modelCategoryForm==5"><!--筛选简历模版-->
			筛选简历模版
				<el-form :inline="true" class="searchType1 searchType2">
					<p>
						<el-form-item label="发件人">
							<el-input v-model="screeningResumes.sendUser"></el-input>
						</el-form-item>
					</p>
					<p>
						<el-form-item label="邮件标题">
							<el-input v-model="screeningResumes.title"></el-input>
						</el-form-item>
					</p>
					<p>
						<emailTemplate ref="childRef" :mailDetail="mailDetail" :plugins="plugins" :toolbar="toolbar" :destroyEditor="true" :emailIndex="emailIndex1" />
					</p>
				</el-form>
			</div>
			<div class="tabDiv" :rules="addMailRules" v-if="modelCategoryForm==6"><!--筛选网络人才模版-->
			筛选网络人才模版
				<el-form :inline="true" class="searchType1 searchType2">
					<p>
						<el-form-item label="发件人">
							<el-input v-model="internetScreening.sendUser"></el-input>
						</el-form-item>
					</p>
					<p>
						<el-form-item label="邮件标题">
							<el-input v-model="internetScreening.title"></el-input>
						</el-form-item>
					</p>
					<p>
						<emailTemplate ref="childRef" :mailDetail="mailDetail" :plugins="plugins" :toolbar="toolbar" :destroyEditor="true" :emailIndex="emailIndex1" />
					</p>
				</el-form>
			</div>
			<div class="item-btn" style="float: right; margin-top: 20px;">
				<el-button type="primary" size="medium" :disabled="lastStep" @click="goStep(1)">上一步</el-button>
				<el-button type="primary" size="medium" v-show="haveNext==true"  @click="goStep(2)">下一步</el-button>
				<el-button type="primary" size="medium" v-show="haveNext==false" @click="goComplete">完成</el-button>
				<el-button type="info" size="medium" @click="goDelete">取消</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import emailTemplate from '@/components/email/emailTemplate.vue'//邮件模版
	export default {
		props:['modelId'],
		data() {
			return {
				modelTab:[],
				activeName:0,
				modelAddForm:{
					modelTypeId:'',
					modelName:'',
					modelDesc:'',
					modelSelf:1,
					state:1,//启用
					notifyContentTypes:[]
				},
				lastStep:true,//上一步
				haveNext:true,//下一步
				mailDetail:{},//邮件相关内容
				modelCategoryForm:0,
				applicantMail:{//应聘者邮箱
					category:1,// 1、应聘者邮箱  2、应聘者短信  3、面试官邮箱 4、面试官短信5 筛选简历 6 筛选网络人才
					sendUserType:2,// 1 操作人 2 自定义
					sendUser:'',//发件人
					title:'',//邮件标题
					content:'',//内容
					fields:[]
				},
				applicantMessage:{//应聘者短信
					category:2,
					sendUserType:'',
					sendUser:'',//发件人
					title:'',//邮件标题
					content:'',//内容
					fields:[]
				},
				interviewerMail:{//面试官邮箱
					category:3,
					sendUserType:2,
					sendUser:'',//发件人
					title:'',//邮件标题
					content:'',//内容
					fields:[]
				},
				interviewerMessage:{//面试官短信
					category:4,
					sendUserType:'',
					sendUser:'',//发件人
					title:'',//邮件标题
					content:'',//内容
					fields:[]
				},
				screeningResumes:{//筛选简历
					category:5,
					sendUserType:2,
					sendUser:'',//发件人
					title:'',//邮件标题
					content:'',//内容
					fields:[]
				},
				internetScreening:{//筛选网络人才
					category:6,
					sendUserType:2,
					sendUser:'',//发件人
					title:'',//邮件标题
					content:'',//内容
					fields:[]
				},
				addMailRules:{
					sendUser: [
					    {required: true, message: "请输入发件人", trigger: "blur"},
					    {min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur"}
					],
					title: [
					    {required: true, message: "请输入邮件标题", trigger: "blur"},
					    {min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur"}
					],
					content: [
					    {required: true, message: "邮件内容不得为空", trigger: "blur"},
					    {min: 1, message: "邮件不得为空", trigger: "blur"}
					],
				},
				addMessageRules:{
					content: [
					    {required: true, message: "邮件内容不得为空", trigger: "blur"},
					    {min: 1, message: "邮件不得为空", trigger: "blur"}
					],
				},
				modelCategoryId:0,
				plugins:'',
				toolbar:'',
				getMailFlag:0,//0 基础表单->邮件模板表单   不需要调用子组件save方法
				emailIndex1:0,
			}
		},
		components: {
		  emailTemplate
		},
		methods: {
			// 模版配置详情
			async modelDetailTab(id){//模板id
				const {
					data: res
				} = await this.$http.modelFindAll({
					params:{
						typeId:id
					}
				})
				if (res.code == 200) {
					this.modelTab = res.data;
					var item = {id:"",emailTitle:"设置基本信息"}
					this.modelTab.unshift(item)
					console.log(this.modelTab)
					
					//提前获取对应模块的内容
					this.modelTab.forEach((item,index) => {
						if(item.id != ''){
							this.modelTabDetail(item)
						}
						
					})
					
				} else {
					this.$message.error(res.msg);
				}
			},
			goStep(flag){
				var changeContent=""
				//保存数据 （基本信息下一步操作的时候不用保存操作,其他保存到对应的表单对象中）
				if(this.getMailFlag==1){
					this.saveForm()
				}
				//1上一步 2下一步
				if(flag==1){
					this.activeName--
					this.haveNext = true
					if(this.activeName==0){
						this.lastStep = true
						this.getMailFlag=0
					}else{
						this.lastStep = false
					}
				}else{
					this.activeName++
					this.getMailFlag=1
					this.lastStep = false
					if(this.activeName>=this.modelTab.length-1){
						this.haveNext = false
					}else{
						this.haveNext = true
					}
				}
				
				//显示对应表单 取对应模板数据
				if(this.activeName!=0){
					
					this.modelCategoryId = this.modelTab[this.activeName].modelCategory
					console.log(this.modelTab[this.activeName].modelCategory)
					if(this.modelCategoryId==1){
						//应聘者邮箱模板
						this.modelCategoryForm = 1;
						this.mailDetail = this.applicantMail;
					}else if(this.modelCategoryId==2){
						//应聘者短信模板
						this.modelCategoryForm = 2;
						this.mailDetail = this.applicantMessage;
					}else if(this.modelCategoryId==3){
						//面试者邮箱模板
						this.modelCategoryForm = 3;
						this.mailDetail = this.interviewerMail;
					}else if(this.modelCategoryId==4){
						//面试者短信模板
						this.modelCategoryForm = 4;
						this.mailDetail = this.interviewerMessage;
					}else if(this.modelCategoryId==5){
						//筛选简历模板
						this.modelCategoryForm = 5;
						this.mailDetail = this.screeningResumes;
					}else if(this.modelCategoryId==6){
						//筛选网络人才
						this.modelCategoryForm = 6;
						this.mailDetail = this.internetScreening;
					}
					
					//配置tinymcetoolbar（如果是短信就不需要菜单栏）
					//2应聘者短信模板  4面试官短信模板
					if(this.modelCategoryId==2 || this.modelCategoryId==4){
						this.plugins = ''
						this.toolbar = ''
					}else{
						this.plugins = 'lists image media table wordcount'
						this.toolbar = 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
					}
					
					//获取对应模板的参数（id，名称，内容等）初次进入调用这个方法，有用户操作行为的要回显
					//this.modelAddForm.notifyContentTypes
					//this.modelTabDetail(this.modelTab[this.activeName].id)
					
				}else{
					this.modelCategoryForm = 0;
				}
				
				
			},
			saveForm(){
				//操作下一步、上一步、完成之后保存相关表单信息
				var changeContent=""
				changeContent = this.$refs.childRef.saveA()
				this.modelCategoryId = this.modelTab[this.activeName].modelCategory
				if(this.modelCategoryId==1){
					//应聘者邮箱模板
					this.applicantMail.content = changeContent;  
				}else if(this.modelCategoryId==2){
					//应聘者短信模板
					this.applicantMessage.content = changeContent;
				}else if(this.modelCategoryId==3){
					//面试者邮箱模板
					this.interviewerMail.content = changeContent;
				}else if(this.modelCategoryId==4){
					//面试者短信模板
					this.interviewerMessage.content = changeContent;
				}else if(this.modelCategoryId==5){
					//筛选简历模板
					this.screeningResumes.content = changeContent;
				}else if(this.modelCategoryId==6){
					//筛选网络人才
					this.internetScreening.content = changeContent;
				}
			},
			goDelete(){
				//取消  完成  重置表单
				this.$emit('closeAddModelDialog');
			},
			goComplete(){
				var downFlag = 1
				this.saveForm()
				//添加完成 
				if(this.modelAddForm.modelName!=''){
					downFlag = 1
					this.modelTab.forEach((item,index) => {
						if(item.id != ''){
							if(item.modelCategory==1){
								//应聘者邮箱模板
								if (this.applicantMail.sendUser!='' && this.applicantMail.title!='' && this.applicantMail.content!='') {
									this.modelAddForm.notifyContentTypes.push(this.applicantMail)
									downFlag = 1
									
								}else{
									downFlag = 0
									return this.$message.error("请完善应聘者邮箱表单相关信息");
								}
								
							}else if(item.modelCategory==2){
								//应聘者短信模板
								if (this.applicantMessage.content!='') {
									downFlag = 1
									this.modelAddForm.notifyContentTypes.push(this.applicantMessage)
								}else{
									downFlag = 0
									return  this.$message.error("请完善应聘者短信内容不得为空");
								}
								
							}else if(item.modelCategory==3){
								//面试者邮箱模板
								if (this.interviewerMail.sendUser!='' && this.interviewerMail.title!='' && this.interviewerMail.content!='') {
									downFlag = 1
									this.modelAddForm.notifyContentTypes.push(this.interviewerMail)
								}else{
									downFlag = 0
									return this.$message.error("请完善面试官邮箱表单相关信息");
								}
								
							}else if(item.modelCategory==4){
								//面试者短信模板
								if (this.interviewerMessage.content!='') {
									downFlag = 1
									this.modelAddForm.notifyContentTypes.push(this.interviewerMessage)
								}else{
									downFlag = 0
									return  this.$message.error("请完善面试官短信内容不得为空");
								}
								
							}else if(item.modelCategory==5){
								//筛选简历模板
								if (this.screeningResumes.sendUser!='' && this.screeningResumes.title!='' && this.screeningResumes.content!='') {
									downFlag = 1
									this.modelAddForm.notifyContentTypes.push(this.screeningResumes)
								}else{
									downFlag = 0
									return this.$message.error("请完善简历模板表单相关信息");
								}
								
							}else if(item.modelCategory==6){
								//筛选网络人才
								if (this.internetScreening.sendUser!='' && this.internetScreening.title!='' && this.internetScreening.content!='') {
									downFlag = 1
									this.modelAddForm.notifyContentTypes.push(this.internetScreening)
								}else{
									downFlag = 0
									return this.$message.error("请完善筛选网络人才表单相关信息");
								}
								
							}
						}
						
					})
					
					
					console.log(downFlag)
					if(downFlag == 1){
						this.upAddModel()	//OFFER答复
						this.goDelete()
					}
				}else{
					downFlag=0
					this.$message.error("模板名称不得为空");
				}
				
			},
			async upAddModel(){
				//提交新增模板信息
				console.log(this.modelAddForm)
				const {
					data: res
				} = await this.$http.addModel(this.modelAddForm)
				if (res.code == 200) {
					this.$message.success("通知模板添加成功");
				}else {
					this.$message.error(res.msg);
				}
			},
			async modelTabDetail(item){//打开弹框第一次取模板数据
				//模版tab对应的内容  
				var id = item.id
				const {
					data: res
				} = await this.$http.modelDetail({
					params:{
						id:id
					}
				})
				if (res.code == 200) {
					if(item.modelCategory==1){
						//应聘者邮箱模板
						this.applicantMail.content = res.data.modelContent;   
						this.applicantMail.fields = res.data.fields;
						this.mailDetail = this.applicantMail;
					}else if(item.modelCategory==2){
						//应聘者短信模板
						this.applicantMessage.content = res.data.modelContent;   
						this.applicantMessage.fields = res.data.fields;
						this.mailDetail = this.applicantMessage;
					}else if(item.modelCategory==3){
						//面试者邮箱模板
						this.interviewerMail.content = res.data.modelContent;   
						this.interviewerMail.fields = res.data.fields;
						this.mailDetail = this.interviewerMail;
					}else if(item.modelCategory==4){
						//面试者短信模板
						this.interviewerMessage.content = res.data.modelContent;  
						this.interviewerMessage.fields = res.data.fields;
						this.mailDetail = this.interviewerMessage;
					}else if(item.modelCategory==5){
						//筛选简历模板
						this.screeningResumes.content = res.data.modelContent;
						this.screeningResumes.fields = res.data.fields;
						this.mailDetail = this.screeningResumes;
					}else if(item.modelCategory==6){
						//筛选网络人才
						this.internetScreening.content = res.data.modelContent;
						this.internetScreening.fields = res.data.fields;
						this.mailDetail = this.internetScreening;
					}
				} else {
					this.$message.error(res.msg);
				} 
			},
		},
		created() {
			console.log(this.modelId)
			this.modelAddForm.modelTypeId = this.modelId
			this.modelDetailTab(this.modelId)
		}
	}
</script>

<style lang="scss">
	.tabDiv{
		margin-top: 20px;
	}
	.searchType2 .el-form-item {
	    width: 100%;
	}
	.searchType2 .el-form-item .el-form-item__content {
	    width: calc(100% - 200px);
	}
	.el-step.is-simple .el-step__title {
	    font-size: 14px;
	}
</style>