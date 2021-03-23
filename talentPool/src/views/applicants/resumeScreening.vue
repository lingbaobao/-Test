<template>
	<div class="wrapper">
		<div class="content-wrap-mini">
			<el-divider content-position="left" class="divider-main">筛选简历</el-divider>
			<el-form :model="screeningForm" :rules="resumeScreeningRules" ref="resumeScreeningRef" class="form-wrap1" >
				<el-form-item label="面试官" class="interviewerChoose-wrap">
					<div class="ic-list">
						<ul>
							<li v-for="(item,index) in selectedInterviewers" :key="index" @click="delInterviewers(item)">
								<p>{{item.username}} &nbsp; {{item.email}}</p>
								<em> &nbsp; ×</em>
							</li>
						</ul>   
						<el-input @focus="onInterviewer(2)" v-model="keyword" @input="changeInterviewer" placeholder="请选择"></el-input>
					</div>
					<i class="el-icon-circle-plus-outline" @click="addInterviewers"></i>
					<el-card class="box-card" v-show="showCard">
						<div v-for="(item,index) in interviewerCard" :key="index" class="item" @click="chooseInterviewer(item)">
							{{item.username}} &nbsp; {{item.email}}
						</div>
					</el-card>
				</el-form-item>
				<el-form-item label="筛选简历模板" prop="notifyInterviewerTemplateId">
				   <el-select v-model="screeningForm.notifyInterviewerTemplateId" placeholder="请选择" @change="onModel">
				        <el-option v-for="(item,index) in modelIdList" :key="index" :label="item.modelDesc" :value="item.id"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="邮件标题" prop="interviewerSubject">
				    <el-input v-model="screeningForm.interviewerSubject" placeholder="请填写标题"></el-input>
				</el-form-item>
				<div v-if="emailTemplateShow" class="emailWrap">
				    <emailTemplate ref="emailCon" :mailDetail="mailDetail" :destroyEditor="true" :emailIndex="emailIndex1" />
				</div>
				<el-form-item label="任务到期时间:" prop="dateStr">
					<!--日期-->
					<el-date-picker v-model="dateStr" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" @change="changeDate" :picker-options="expireDateOption">
					</el-date-picker>
					<!--时间-->
					<el-time-picker v-model="timeStr" placeholder="选择时间" value-format="HH:mm:ss" format="HH 时 mm 分 ss 秒" style="margin-top: 10px;" :picker-options="expireTimeOption">
					</el-time-picker>
				</el-form-item>
				<p style="height: 30px;"></p>
				<el-divider content-position="left" class="divider-main">筛选后将应聘者转移到</el-divider>
				<el-form-item label="阶段">
					<template>
						<el-select v-model="screeningForm.node" @change="getProcessNode" placeholder='请选择'>
							<el-option v-for="(item,index) in process" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="状态">
					<template>
						<el-select v-model="screeningForm.stateId" placeholder='请选择'>
							<el-option v-for="(item,index) in processStates" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</template>
				</el-form-item>
			</el-form>
			<div style="margin-left: 30px; margin-top: 20px;">
				<el-button type="primary" size="mini" @click="submitForm">确 定</el-button>
				<el-button type="info" size="mini" @click="goApplicantList">取 消</el-button>
			</div>
		</div>
		<!-- 添加面试官 -->
		<el-dialog title="添加面试官" :visible.sync="interviewerDialog">
		    <el-form :model="AddInterviewerForm" class="form-wrap1" ref="interviewerRef" :rules="interviewerRules">
		        <el-form-item label="姓名" prop="userName">
		            <el-input v-model="AddInterviewerForm.userName"></el-input>
		        </el-form-item>
		        <el-form-item label="邮箱" prop="email">
		            <el-input v-model="AddInterviewerForm.email"></el-input>
		        </el-form-item>
		        <el-form-item label="手机号" prop="mobile">
		            <el-input v-model="AddInterviewerForm.mobile"></el-input>
		        </el-form-item>
		    </el-form>
		    <div slot="footer" class="dialog-footer">
		        <el-button @click="interviewerDialog = false" size="mini">取 消</el-button>
		        <el-button type="primary" @click="submitAddInterviewer('interviewerRef')" size="mini">确 定</el-button>
		    </div>
		</el-dialog>	
	</div>
</template>

<script>
	import emailTemplate from '@/components/email/emailTemplate.vue'//邮件模版
	export default {
		components: {
			emailTemplate
		},
		data() {
			return {
				expireDateOption: {
					disabledDate(date) {
						return date.getTime() < Date.now() - 24 * 60 * 60 * 1000;
					}
				},
				expireTimeOption:{
					selectableRange: '00:00:00 - 23:59:59'
				},
				screeningForm:{
					emailNotifyInterviewer:true,//是否邮件通知面试官
					smsNotifyInterviewer:false,//是否短信通知面试官
					taskDueTime:'',//任务到期时间
					notifyInterviewerTemplateId:'',//模版id
					interviewerSubject:'',//邮件主题
					interviewerContent:'',//邮件内容
					node:'',//转移阶段id
					stateId:'',//转移状态id
				},
				dateStr:'',//日期
				timeStr:'',//时间
				interviewerId:[],//面试官ID数组
				postAndCvList:[{
				   cvId:4,//应聘者id
				   postId:8,//应聘者应聘的职位id
				   postCvId:5//简历岗位中间表主键id
				}],
				modelIdList:[],
				resumeScreeningRules:{
					interviewerSubject: [
					    {required: true, message: "请输入邮件主题", trigger: "blur"},
					    {min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur"}
					],
				},
				selectedInterviewers:[],
				keyword:'',
				showCard:false,
				interviewerCard:[],
				interviewerDialog:false,
				AddInterviewerForm:{
				    userName:'',
				    email:'',
				    mobile:''
				},
				interviewerRules:{
				    userName: {
				        required: true,
				        message: '必须填写名称',
				        trigger: 'blur'
				    },
				    email: {
				        required: true,
				        message: '必须填写邮箱',
				        trigger: 'blur'
				    },
				    mobile: {
				        required: true,
				        message: '必须填写手机号',
				        trigger: 'blur'
				    },
				},
				emailTemplateShow:false,
				process:[],//阶段数组
				processStates:[],//状态数组
				processId:'',//流程ID
				mailDetail:{
					fields:[],//按钮
					content:'',//默认模板内容
				},
				emailIndex1:'',
				count:0,
			}
		},
		methods: {
			async changeInterviewer(){
			    const {
					data: res
				} = await this.$http.interviewerList({params:{keyword:this.keyword}})
			
				this.showCard = true
				this.interviewerCard = res
			},
			addInterviewers(){
			    this.interviewerDialog = true
			},
			chooseInterviewer(item){
				//点击选中面试官
			    this.keyword = ''
			    let flag
			    if( this.selectedInterviewers.length ){
			        this.selectedInterviewers.forEach(el=>{
			            if( el.username == item.username ){
			                flag = 0
			            }
			        })
			        if( flag != 0 ){
			            this.selectedInterviewers.push(item)
			            this.interviewerId.push(item.id)
			        }
			    }else{
			        this.selectedInterviewers.push(item)
			        this.interviewerId.push(item.id)
			    }
			   
			    this.showCard = false
			},
			delInterviewers(item){
				//点击删除选中的面试官
				this.selectedInterviewers.forEach((el,index)=>{
					if(el.username == item.username){
						this.selectedInterviewers.splice(index,1)
						this.interviewerId.splice(index,1)
					}
				})
			},
			// 获取面试官
			async onInterviewer(id){
			    this.keyword = ''
			    const {
					data: res
			    } = await this.$http.interviewerList({params:{keyword:this.keyword}})
			
			    if( id == 2 ){
			        this.showCard = true
			    }
			    
			    this.interviewerCard = res
			    this.recruitList = res
			},
			submitAddInterviewer(ref){
				//添加面试官
			    this.$refs[ref].validate(async valid => {
			        if (valid) {
			            const {
			                data: res
			            } = await this.$http.addUser(this.AddInterviewerForm)
			
			            if (res.code == 200) {
			                this.interviewerDialog = false
			               this.$message.success("添加成功");
			            } else {
			                this.$message.error(res.msg);
			            }
			        }
			    })
			},
			async processDetail(){
				console.log(this.processId)
				//流程详情
				const {
					data: res
				} = await this.$http.detailTemplate({
					params:{
						id:this.processId
					}
				})
				if (res.code !== 200) {
				    return this.$message.error(res.msg);
				} else {
					console.log(res.data)
					this.process = res.data.nodes;
				} 
			}, 
			getProcessNode(val){
				//获取当前节点下的所有状态
				this.process.forEach((item,index)=>{
				    if(item.id == val){
				        this.processStates = item.states;
						this.screeningForm.stateId = ''
				    }
				})
			},
			async modelListAll() {
				const {
					data: res
				} = await this.$http.modelListAll({params:{typeCode:"SELECTCV"}})
			
				if (res.code == 200) {
					console.log(res.data)
			        this.modelIdList = res.data
				} else {
					this.$message.error(res.msg);
				}
			},
			async onModel(e){
				this.emailIndex1=this.count
				this.count++
			    const {
					data: res
				} = await this.$http.modelContent({params:{notifyId:e,category:5}})
			
				if (res.code == 200) {
					this.mailDetail.content = res.data.content
					this.mailDetail.fields = res.data.modelFields
					this.emailTemplateShow = false
					this.$nextTick(() => {
						this.emailTemplateShow = true
					}) 
				} else {
					this.mailDetail.content = ''
					this.mailDetail.fields = []
					this.emailTemplateShow = false
					this.$message.error(res.msg);
			    }  
			},
			async submitForm(){ 
				var formOk = true
				this.screeningForm.interviewerContent = this.$refs.emailCon.saveA()
				this.screeningForm.taskDueTime = this.dateStr+" "+this.timeStr
				if(this.interviewerId.length==0){
				    this.$message.error("请选择面试官");
				    formOk=false
					return false
				}
				if(this.screeningForm.taskDueTime == ''){
				    this.$message.error("请选择任务到期时间");
				    formOk=false
					return false
				}
				if(this.screeningForm.notifyInterviewerTemplateId == ''){
				    this.$message.error("请选择模板");
				    formOk=false
					return false
				}
			    
			    if(this.screeningForm.interviewerSubject == ''){
			        this.$message.error("邮件主题不得为空");
			        formOk=false
					return false
			    }
				
				if(this.screeningForm.interviewerContent == ''){
				    this.$message.error("邮件内容不得为空");
				    formOk=false
					return false
				} 
				
				if(formOk==true){
					var formData = new FormData();
					for(let key in this.screeningForm){
					    formData.append(key,this.screeningForm[key]);	
					}
					this.postAndCvList.forEach((item,index)=>{
					    formData.append("postAndCvList["+index+"].cvId",item.cvId);
					    formData.append("postAndCvList["+index+"].postId",item.postId);
					    formData.append("postAndCvList["+index+"].postCvId",item.postCvId);
					})
					this.interviewerId.forEach((item,index)=>{
						 formData.append("interviewerId",item);
					})
					
					let config = {headers: {'Content-Type': 'multipart/form-data'}}
					const {
						data: res
					} = await this.$http.resumeScreening(formData,config)
					if (res.code == 200) {
						this.$message.success("筛选简历任务创建成功");
						this.goApplicantList()
					} else {
						this.$message.error(res.msg);
					} 
				}
				    
			},
			goApplicantList(){
				//取消 跳转回列表页
				this.$router.push({
					path: '/applicant/applicantList'
				})
			},
			changeDate(val){
				var now = new Date();
				var date = now.getDate();
				var dateArr = val.split('-');
				var hours = now.getHours(); 
				var minutes = now.getMinutes(); 
				var seconds = now.getSeconds(); 
				if(date==dateArr[2]){
					this.expireTimeOption.selectableRange = hours + ':' + minutes + ':' + seconds + ' - 23:59:59'
				}else{
					this.expireTimeOption.selectableRange = '00:00:00 - 23:59:59'
				} 
			}
		},
		created() {
			this.onInterviewer(1)
			this.processDetail()
			this.modelListAll()
			this.postAndCvList = JSON.parse(this.$route.query.postAndCvList)
			this.processId =  this.$route.query.processId
			console.log(this.postAndCvList)
			console.log(this.processId)
		}
	}
</script>

<style>
</style>
