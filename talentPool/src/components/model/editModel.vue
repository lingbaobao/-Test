<template>
	<div class="clear">
		<div class="con_l">
			<el-menu>
				<el-menu-item v-for="(item,index) in modelTab" @click="tabChange(item,index)">
					<span>{{item.title}}</span>
				</el-menu-item>
			</el-menu>
		</div>
		<div class="con_r">
			<div v-if="modelCategoryForm==0">
				<el-form :inline="true" class="searchType1 searchType2">
					<p>
						<el-form-item label="模版名称">
							<el-input v-model="baseInfo.modelName"></el-input>
						</el-form-item>
					</p>
					<p>
						<el-form-item label="模版描述">
							<el-input type="textarea" height="100px" v-model="baseInfo.modelDesc"></el-input>
						</el-form-item>
					</p>
					<p style="margin-top: 22px;">
						<el-form-item label="类别">
							<template>
								<el-select v-model="baseInfo.modelSelf">
									<el-option label="公共" :value="1"></el-option>
									<el-option label="个人" :value="2"></el-option>
								</el-select>
							</template>
						</el-form-item>
					</p>
					<p>
						<el-form-item label="状态">
						    <el-radio-group v-model="baseInfo.state">
						      <el-radio :label="1">启用</el-radio>
						      <el-radio :label="0">停用</el-radio>
						    </el-radio-group>
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
			<div class="item-btn" style="text-align: center; margin-top: 20px;">
				<el-button type="primary" size="medium" @click="goSave">保存</el-button>
				<el-button type="info" size="medium" @click="goClose">关闭</el-button>
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
				baseInfo:{
					id:'',
					modelName:'',
					modelDesc:'',
					modelSelf:'',
					state:1,
				},//基本信息
				modelTab:[],//侧栏导航
				modelCategoryForm:0,
				applicantMail:{//应聘者邮箱
					id:'',// 1、应聘者邮箱  2、应聘者短信  3、面试官邮箱 4、面试官短信5 筛选简历 6 筛选网络人才
					sendUserType:2,// 1 操作人 2 自定义
					sendUser:'',//发件人
					title:'',//邮件标题
					content:'',//内容
					fields:[]
				},
				applicantMessage:{//应聘者短信
					id:'',
					sendUserType:'',
					sendUser:'',//发件人
					title:'',//邮件标题
					content:'',//内容
					fields:[]
				},
				interviewerMail:{//面试官邮箱
					id:'',
					sendUserType:2,
					sendUser:'',//发件人
					title:'',//邮件标题
					content:'',//内容
					fields:[]
				},
				interviewerMessage:{//面试官短信
					id:'',
					sendUserType:'',
					sendUser:'',//发件人
					title:'',//邮件标题
					content:'',//内容
					fields:[]
				},
				screeningResumes:{//筛选简历
					id:'',
					sendUserType:2,
					sendUser:'',//发件人
					title:'',//邮件标题
					content:'',//内容
					fields:[]
				},
				internetScreening:{//筛选网络人才
					id:'',
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
				plugins:'',
				toolbar:'',
				mailDetail:{},//邮件相关内容
				activeItem:{},//当前tab
				emailIndex1:0,
			}
		},
		components: {
		  emailTemplate
		},
		methods:{
			tabChange(item,index){
				//tab选择
				console.log(item)
				this.activeItem = item;//记录下来方便保存tab时候数据更新
				if(index==0){
					this.modelCategoryForm=0
				}else{
					this.modelTabDetail(item)
				}
			},
			async modelTabDetail(item){//打开弹框获取模板数据
				//模版tab对应的内容  
				console.log(item)
				/* this.emailIndex1 = this.count
				this.count++ */
				console.log(this.emailIndex1,"index值")
				const {
					data: res
				} = await this.$http.detailNotify({
					params:{
						id:item.id
					}
				})
				if (res.code == 200) {
					console.log(res.data)
					//配置tinymcetoolbar（如果是短信就不需要菜单栏）
					//2应聘者短信模板  4面试官短信模板
					if(item.modelCategory==2 || item.modelCategory==4){
						this.plugins = ''
						this.toolbar = ''
					}else{
						this.plugins = 'lists image media table wordcount'
						this.toolbar = 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
					} 
					
					if(item.modelCategory==1){
						this.applicantMail = res.data;
						this.mailDetail = res.data;
						this.modelCategoryForm=1
					}else if(item.modelCategory==2){
						this.applicantMessage = res.data;
						this.mailDetail = res.data;
						this.modelCategoryForm=2
					}else if(item.modelCategory==3){
						this.interviewerMail = res.data;
						this.mailDetail = res.data;
						this.modelCategoryForm=3
					}else if(item.modelCategory==4){
						this.interviewerMessage = res.data;
						this.mailDetail = res.data;
						this.modelCategoryForm=4
					}else if(item.modelCategory==5){
						this.screeningResumes = res.data;
						this.mailDetail = res.data;
						this.modelCategoryForm=5
					}else if(item.modelCategory==6){
						this.internetScreening = res.data;
						this.mailDetail = res.data;
						this.modelCategoryForm=6
					} 
					
				}
				
			},		
			async baseInfoDetail(id){//模板id
				const {
					data: res
				} = await this.$http.detailBase({
					params:{
						id:id
					}
				})
				if (res.code == 200) {
					this.baseInfo = res.data;
					var item = {id:"",title:"基本信息"}
					this.baseInfo.notifyContentTypes.unshift(item)
					this.modelTab = this.baseInfo.notifyContentTypes;
					
				} else {
					this.$message.error(res.msg);
				}
			},
			goSave(){
				//保存
				if(this.modelCategoryForm==0){
					//保存基本信息
					console.log(this.baseInfo)
					if(this.baseInfo.modelName!=''){
						this.saveBase()
					}else{
						this.$message.error("模板名称不得为空");
					}
				}else{
					//保存通知信息
					var changeContent=""
					changeContent = this.$refs.childRef.saveA()
					console.log(changeContent)
					if(this.modelCategoryForm==1){
						//应聘者邮箱模板
						this.applicantMail.content = changeContent;  
						if (this.applicantMail.sendUser!='' && this.applicantMail.title!='' && this.applicantMail.content!='') {
							this.saveNotify(this.applicantMail)
						}else{
							return this.$message.error("请完善应聘者邮箱表单相关信息");
						}
					}else if(this.modelCategoryForm==2){
						//应聘者短信模板
						this.applicantMessage.content = changeContent; 
						if (this.applicantMessage.content!='') {
							this.saveNotify(this.applicantMessage)
						}else{
							return this.$message.error("请完善应聘者短信表单相关信息");
						}
					}else if(this.modelCategoryForm==3){
						//面试者邮箱模板
						this.interviewerMail.content = changeContent; 
						if (this.interviewerMail.sendUser!='' && this.interviewerMail.title!='' && this.interviewerMail.content!='') {
							this.saveNotify(this.interviewerMail)
						}else{
							return this.$message.error("请完善面试者邮箱表单相关信息");
						}
					}else if(this.modelCategoryForm==4){
						//面试者短信模板
						this.interviewerMessage.content = changeContent; 
						if (this.interviewerMessage.content!='') {
							this.saveNotify(this.interviewerMessage)
						}else{
							return this.$message.error("请完善面试者短信表单相关信息");
						}
					}else if(this.modelCategoryForm==5){
						//筛选简历模板
						this.screeningResumes.content = changeContent; 
						if (this.screeningResumes.sendUser!='' && this.screeningResumes.title!='' && this.screeningResumes.content!='') {
							this.saveNotify(this.screeningResumes)
						}else{
							return this.$message.error("请完善筛选简历表单相关信息");
						}
					}else if(this.modelCategoryForm==5){
						//筛选网络人才
						this.internetScreening.content = changeContent; 
						if (this.internetScreening.sendUser!='' && this.internetScreening.title!='' && this.internetScreening.content!='') {
							this.saveNotify(this.internetScreening)
						}else{
							return this.$message.error("请完善筛选网络人才表单相关信息");
						}
					} 
				}
			},
			async saveBase(){
				const {
					data: res
				} = await this.$http.updateBase(this.baseInfo)
				if (res.code == 200) {
					this.baseInfoDetail(this.modelId)
					this.$message.success("模板基本信息更改成功");
				} else {
					this.$message.error(res.msg);
				}
			},
			async saveNotify(upForm){
				console.log(upForm)
				const {
					data: res
				} = await this.$http.updateNotify(upForm)
				if (res.code == 200) {
					this.modelTabDetail(this.activeItem)
					this.$message.success("模板通知信息更改成功");
				} else {
					this.$message.error(res.msg);
				}
			},
			goClose(){
				//关闭
				this.$emit('closeEditModelDialog');
			},
		},
		created() {
			this.baseInfo.id = this.modelId
			this.baseInfoDetail(this.modelId)
		}
	}
</script>

<style lang="scss">
	.con_l{
		background: #f5f7f8 none repeat scroll 0 0;
		border: 1px solid #a9c4d1;
		display: inline;
		float: left;
		margin: 0 10px 0 10px;
		height: 340px;
		width:170px;
		.el-menu-item, .el-submenu__title {
		    height: 35px;
		    line-height: 35px;
		}
		
	}
	.con_r{
		width: calc(100% - 190px);
		float: right;
	}
</style>
