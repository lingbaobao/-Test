<template>
	<div class="wrapper">
		<div class="content-wrap-mini">
			<el-divider content-position="left" class="divider-main">面试安排</el-divider>
			<div>
				<el-form :model="arrangeForm" :rules="arrangeRules" ref="arrangeRef" class="form-wrap1" >
					<el-form-item label="面试类型" prop="interviewType">
					   <el-select v-model="arrangeForm.interviewType" placeholder="请选择">
					        <el-option v-for="(item,index) in interviewTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
					    </el-select>
					</el-form-item>
					<p style="line-height: 30px;">
						<el-form-item label="面试时长" prop="interviewHours">
							<el-input v-model="arrangeForm.interviewHours"></el-input>
						</el-form-item>
						<span style="margin-left: 10px;">分钟</span>
					</p>
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
					<el-form-item label="面试主题" prop="interviewTitle">
					   <el-input v-model="arrangeForm.interviewTitle"></el-input>
					</el-form-item>
					<el-form-item label="面试说明" prop="interviewDesc">
					   <el-input type="textarea" v-model="arrangeForm.interviewDesc"></el-input>
					</el-form-item>
					<div class="interview">
						<el-divider content-position="left" class="divider-main">面试场次</el-divider>
						<div v-for="(item,index) in postAndCvList" class="interviewDiv1">
							<p>第<span>{{index+1}}</span>场</p>
							<p>
								<el-form-item>
									<!--日期-->
									<el-date-picker v-model="item.dateStr" type="date" placeholder="选择面试日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" @change="changeDate" :picker-options="expireDateOption">
									</el-date-picker>
								</el-form-item>
							</p>
							<p>
								<el-form-item>
									<!--时间-->
									<el-time-picker v-model="item.timeStr" placeholder="选择面试时间" value-format="HH:mm:ss" format="HH 时 mm 分 ss 秒" :picker-options="expireTimeOption">
									</el-time-picker>
								</el-form-item>
							</p>
							<p>
								<el-form-item>
									<el-input placeholder="面试地点" v-model="item.interviewAddress"></el-input>
								</el-form-item>
								<span style="margin-left: 10px; color: #1496c8;" @click="changeAddress(index)">选择已有面试地点</span>
							</p>
						</div>
					</div>
					
				</el-form>
			</div>
		</div>
		<div class="content-wrap-mini modelDiv" style="margin-top: 30px;">
			<el-form :model="arrangeForm" :rules="arrangeRules" ref="arrangeRef" class="form-wrap1" style="margin-top: 20px;">
				<el-form-item label="面试模板" prop="notifyApplicantsTemplateId">
				   <el-select v-model="arrangeForm.notifyApplicantsTemplateId" placeholder="请选择" @change="onModel">
						<el-option v-for="(item,index) in modelIdList" :key="index" :label="item.modelDesc" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<p style="margin-left: 30px; margin-top: 20px;"></p>
				<el-divider content-position="left" class="divider-main">通知应聘者</el-divider>
					<div class="interviewDiv2 clear">
						<p class="interviewDiv2-p1">
							<el-checkbox @change="changeEmail1">
								邮件通知
								<span v-show="noEmailNum!=0">
									<span class="interviewDiv2-span1"><b>{{noEmailNum}}</b>人邮件地址有误</span>
									<span class="interviewDiv2-span2" @click="contactInfoDialog = true">查看名单</span>
								</span>
							</el-checkbox>
						</p>
						<div v-show="arrangeForm.emailNotifyApplicants==true">
							<p class="interviewDiv2-p2">
								<span></span>是否答复
								<el-radio-group v-model="arrangeForm.answerEmail">
									<el-radio :label="true">需要应聘者答复</el-radio>
									<el-radio :label="false">不需要应聘者答复</el-radio>
								</el-radio-group>
							</p>
							<el-form-item label="邮件标题" prop="applicantsSubject">
								<el-input v-model="arrangeForm.applicantsSubject" placeholder="请填写标题"></el-input>
							</el-form-item>
							<div v-if="arrangeForm.emailNotifyApplicants" class="clear">
								<emailTemplate ref="emailApplicants" :mailDetail="applicantsEmailString" :emailIndex="emailIndex1" />
							</div>
							<div style="margin-left: 40px;">
								<p>附件上传：</p>
								<el-upload
								  class="upload-demo"
								  style="margin: 20px 20px 40px 20px;"
								  drag
								  action="1111"
								  :before-upload="beforeUploadApplicants"
								  multiple>
								  <ul class="fileTips">
									  <li v-for="(item,index) in notifyApplicantsFiles">{{item.name}}<i class="el-icon-close" @click.stop="delFileArr(1,index)"></i></li>
								  </ul>
								  <i class="el-icon-upload"></i>
								  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
								</el-upload>
							</div>
						</div>
					</div>
					<div class="interviewDiv2 clear">
						<p class="interviewDiv2-p1">
							<el-checkbox @change="changeMsg1">短信通知
								<span v-show="noPhoneNum!=0">
									<span class="interviewDiv2-span1"><b>{{noPhoneNum}}</b>人手机号码有误</span>
									<span class="interviewDiv2-span2" @click="contactInfoDialog = true">查看名单</span>
								</span>
							</el-checkbox>
						</p>
						<div v-show="arrangeForm.smsNotifyApplicants==true">
							<p class="interviewDiv2-p2">
								<span></span>是否答复
								<el-radio-group v-model="arrangeForm.answerSms">
									<el-radio :label="true">需要应聘者答复</el-radio>
									<el-radio :label="false">不需要应聘者答复</el-radio>
								</el-radio-group>
							</p>
							<div v-if="arrangeForm.smsNotifyApplicants" class="emailWrap">
								<msgTemplate ref="msgApplicants" :msgDetail="applicantsMsgString" :msgIndex="msgIndex1"/>
							</div>
						</div>
					</div>
				<el-divider content-position="left" class="divider-main">通知面试官</el-divider>
					<div class="interviewDiv2 clear">
						<p class="interviewDiv2-p1">
							<el-checkbox @change="changeEmail2" :disabled="checkOk">邮件通知</el-checkbox>
						</p>
						<div v-show="arrangeForm.emailNotifyInterviewer==true">
							<el-form-item label="邮件标题" prop="interviewerSubject">
								<el-input v-model="arrangeForm.interviewerSubject" placeholder="请填写标题"></el-input>
							</el-form-item>
							<div v-if="arrangeForm.emailNotifyInterviewer" class="clear">
								<emailTemplate ref="emailInterviewer" :mailDetail="interviewerEmailString" :emailIndex="emailIndex2" />
							</div>
							<div style="margin-left: 40px;">
								<p>附件上传：</p>
								<el-upload
								  class="upload-demo"
								  style="margin: 20px 20px 40px 20px;"
								  drag
								  action="1111"
								  :before-upload="beforeUploadInterviewer"
								  multiple>
								  <ul class="fileTips">
									  <li v-for="(item,index) in files">{{item.name}}<i class="el-icon-close" @click.stop="delFileArr(2,index)"></i></li>
								  </ul>
								  <i class="el-icon-upload"></i>
								  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
								</el-upload>
							</div>
						</div>
					</div>
					<div class="interviewDiv2 clear">
						<p class="interviewDiv2-p1">
							<el-checkbox @change="changeMsg2" :disabled="checkOk">短信通知</el-checkbox>
						</p>
						<div v-show="arrangeForm.smsNotifyInterviewer==true">
							<div v-if="arrangeForm.smsNotifyInterviewer" class="emailWrap">
								<msgTemplate ref="msgInterviewer" :msgDetail="interviewerMsgString" :msgIndex="msgIndex2"/>
							</div>
						</div>
					</div>
					
					<el-divider content-position="left" class="divider-main">安排面试后将应聘者转移到</el-divider>
					<el-form-item label="阶段">
						<template>
							<el-select v-model="arrangeForm.node" @change="getProcessNode">
								<el-option v-for="(item,index) in process" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</template>
					</el-form-item>
					<el-form-item label="状态">
						<template>
							<el-select v-model="arrangeForm.stateId">
								<el-option v-for="(item,index) in processStates" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</template>
					</el-form-item>
					
					<el-form-item class="submit-btn" style="margin-left: 40px !important; margin-top: 40px;">
					    <el-button type="primary" @click="submitInterview" size="medium">保存</el-button>
					    <el-button @click="cancelInterview" size="medium">取消</el-button>
					</el-form-item>
			</el-form>	
		</div>
		
		<!--已有面试地点-->
		<el-dialog title="选择已有面试地点" width="500px" :visible.sync="showAddressCard" @close="closeAddressDialog">
			<div>
				<el-radio-group v-model="addressChoose">
					<el-radio v-for="(item,index) in interviewerAddressCard" :label="item.addressDesc" :value="item.addressDesc" style="width: 100%;display: block;margin-bottom: 10px;">{{item.addressDesc}}</el-radio>
				</el-radio-group>
			</div>
			<div class="item-btn" style="text-align: center; margin-top: 20px;">
				<el-button type="primary" size="medium" @click="sureAddress">确定</el-button>
				<el-button type="info" size="medium" @click="closeAddressDialog">取消</el-button>
			</div>
		</el-dialog>
		
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
		
		<!-- 查看联系方式 -->
		<el-dialog title="联系方式有误" width="600px" :visible.sync="contactInfoDialog">
		    <el-table
		        :data="contactInfoData"
		        style="width: 100%">
					<el-table-column prop="name" label="姓名"></el-table-column>
					<el-table-column prop="email" label="邮箱"></el-table-column>
					<el-table-column prop="phone" label="手机号"></el-table-column>
		    </el-table>
		    <div slot="footer" class="dialog-footer">
		        <el-button type="primary" @click="contactInfoDialog = false">关闭</el-button>
		    </div>
		</el-dialog>
	</div>
</template>

<script>
	import emailTemplate from '@/components/email/emailTemplate.vue'//邮件模版
	import msgTemplate from '@/components/email/msgTemplate.vue'//短信模版
	export default {
		components: {
			emailTemplate,msgTemplate
		},
		data() {
			return {
				cvIdArr:'',
				postAndCvList:[
					/* {
					   cvId:4,//应聘者id
					   postId:8,//应聘者应聘的职位id
					   postCvId:5,//简历岗位中间表主键id
					   dateStr:'',
					   timeStr:'',
					   interviewTime:'',//面试时间
					   interviewAddress:''//面试地址
					}*/
				],
				interviewerId:[],//面试官ID数组
				arrangeForm:{
					interviewType:1,
					interviewHours:'',
					interviewTitle:'',
					interviewDesc:'',
					emailNotifyApplicants:false,
					smsNotifyApplicants:false,
					answerEmail:true,
					answerSms:true,
					emailNotifyInterviewer:false,
					smsNotifyInterviewer:false,
					notifyApplicantsTemplateId:'',
					applicantsSubject:'',//应聘者邮件标题
					applicantsContent:'',//应聘者邮件内容
					notifyApplicantsSmsContent:'',//应聘者短信内容
					interviewerSubject:'',//面试官邮件标题
					interviewerContent:'',//面试官邮件内容
					notifyInterviewerSmsContent:'',//面试官短信内容
					node:'',//阶段ID
					stateId:'',//状态id
				},
				notifyApplicantsFiles:[],//上传应聘者附件
				files:[],//上传面试官附件
				applicantsEmailString:{
					fields:[],
					content:''
				},
				applicantsMsgString:{
					fields:[],
					content:''
				},
				interviewerEmailString:{
					fields:[],
					content:''
				},
				interviewerMsgString:{
					fields:[],
					content:''
				},
				notifyApplicantsFiles:[],
				arrangeRules:{},
				isEmailInfoApplicants:false,
				isMessInfoApplicants:false,
				isEmailInfoInterview:false,
				isMessInfoInterview:false,
				checkListApplicants:[],
				checkListInterviewer:[],
				interviewTypeList:[],//面试类型
				showAddressCard:false,
				interviewerAddressCard:[],
				addressChoose:'',
				addressIndex:'',
				selectedInterviewers:[],
				showCard:false,
				interviewerCard:[],
				keyword:'',
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
				modelIdList:[],
				activeName:'1',
				noEmailNum:0,
				noPhoneNum:0,
				contactInfoDialog:false,
				contactInfoData:[],//联系方式数据
				emailIndex1:'',
				emailIndex2:'',
				msgIndex1:'',
				msgIndex2:'',
				count:0,
				checkOk:true,
				processId:33,//流程ID
				process:[],
				processStates:[],
				expireDateOption: {
					disabledDate(date) {
						return date.getTime() < Date.now() - 24 * 60 * 60 * 1000;
					}
				},
				expireTimeOption:{
					selectableRange: '00:00:00 - 23:59:59'
				},
			}
		},
		methods:{
			async interviewTypeAll(){
				//面试类型
				const {
					data: res
				} = await this.$http.interviewTypeAll()
				if (res.code !== 200) {
				    return this.$message.error(res.msg);
				} else {
					this.interviewTypeList = res.data
				} 
			},
			async interviewAddressListAll(){
				//面试地点
				const {
					data: res
				} = await this.$http.interviewAddressList()
				if (res.code !== 200) {
				    return this.$message.error(res.msg);
				} else {
					console.log(res.data)
					this.interviewerAddressCard = res.data
				} 
			},
			changeAddress(index){
				this.showAddressCard = true
				this.addressIndex = index
				console.log(index)
			},
			closeAddressDialog(){
				this.showAddressCard = false
			},
			sureAddress(){
				//选择已有面试地址
				this.postAndCvList[this.addressIndex].interviewAddress = this.addressChoose
				this.showAddressCard = false
			},
			delInterviewers(item){
				//点击删除选中的面试官
				this.selectedInterviewers.forEach((el,index)=>{
					if(el.username == item.username){
						this.selectedInterviewers.splice(index,1)
						this.interviewerId.splice(index,1)
					}
				})
				if(this.selectedInterviewers.length==0){
					this.checkOk=true
				}else{
					this.checkOk=false
				}
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
			   if(this.selectedInterviewers.length==0){
			   	this.checkOk=true
			   }else{
			   	this.checkOk=false
			   }
			    this.showCard = false
			},
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
			async modelListAll() {
				//模板列表
				const {
					data: res
				} = await this.$http.modelListAll({params:{typeCode:"INTERVIEW"}})
			
				if (res.code == 200) {
			        this.modelIdList = res.data
					this.arrangeForm.notifyApplicantsTemplateId = this.modelIdList[0].id
					this.arrangeForm.notifyInterviewerTemplateId = this.modelIdList[0].id
					this.onModel(this.modelIdList[0].id)
				} else {
					this.$message.error(res.msg);
				}
			},
			async onModel(e){
				//改变模板选择
				console.log(e)
				this.arrangeForm.notifyApplicantsTemplateId=e
			},
			// 应聘者邮件
			async changeEmail1(){
				if(this.arrangeForm.emailNotifyApplicants==false && this.noEmailNum==0){
					this.arrangeForm.emailNotifyApplicants=true
					if( this.applicantsEmailString.content == '' ){
					    this.emailIndex1 = this.count
					    this.count++
					    const {
					        data: res
					    } = await this.$http.modelContent({params:{notifyId:this.arrangeForm.notifyApplicantsTemplateId,category:1}})
					
					    if (res.code == 200) {
					        this.applicantsEmailString.content = res.data.content
					        this.applicantsEmailString.fields = res.data.modelFields
					        this.arrangeForm.emailNotifyApplicants = false
					        this.$nextTick(() => {
					            this.arrangeForm.emailNotifyApplicants = true
					        })
					    } else {
					        this.$message.error(res.msg);
					    }  
					}
				}else{
					this.arrangeForm.emailNotifyApplicants=false
				}
			},
			// 应聘者短信
			async changeMsg1(){
				if(this.arrangeForm.smsNotifyApplicants==false && this.noPhoneNum==0){
					this.arrangeForm.smsNotifyApplicants=true
					if( this.applicantsMsgString.content == '' ){
					    this.msgIndex1 = this.count
					    this.count++
					    const {
					        data: res
					    } = await this.$http.modelContent({params:{notifyId:this.arrangeForm.notifyApplicantsTemplateId,category:2}})
					
					    if (res.code == 200) {
					        this.applicantsMsgString.content = res.data.content
					        this.applicantsMsgString.fields = res.data.modelFields
					        this.arrangeForm.smsNotifyApplicants = false
					        this.$nextTick(() => {
					            this.arrangeForm.smsNotifyApplicants = true
					        })
					    } else {
					        this.$message.error(res.msg);
					    }  
					}
				}else{
					this.arrangeForm.smsNotifyApplicants=false
				}
			},
			// 面试官邮件
			async changeEmail2(){
				if(this.arrangeForm.emailNotifyInterviewer==false){
					this.arrangeForm.emailNotifyInterviewer=true
					if( this.interviewerEmailString.content == '' ){
					    this.emailIndex2 = this.count
					    this.count++
					    const {
					        data: res
					    } = await this.$http.modelContent({params:{notifyId:this.arrangeForm.notifyApplicantsTemplateId,category:3}})
					
					    if (res.code == 200) {
					        this.interviewerEmailString.content = res.data.content
					        this.interviewerEmailString.fields = res.data.modelFields
					        this.arrangeForm.emailNotifyInterviewer = false
					        this.$nextTick(() => {
					            this.arrangeForm.emailNotifyInterviewer = true
					        })
					    } else {
					        this.$message.error(res.msg);
					    }  
					}
				}else{
					this.arrangeForm.emailNotifyInterviewer=false
				}
			},
			// 面试官短信
			async changeMsg2(){
				if(this.arrangeForm.smsNotifyInterviewer==false){
					this.arrangeForm.smsNotifyInterviewer=true
					if( this.interviewerMsgString.content == '' ){
					    this.msgIndex2 = this.count
					    this.count++
					    const {
					        data: res
					    } = await this.$http.modelContent({params:{notifyId:this.arrangeForm.notifyApplicantsTemplateId,category:4}})
					
					    if (res.code == 200) {
					        this.interviewerMsgString.content = res.data.content
					        this.interviewerMsgString.fields = res.data.modelFields
					        this.arrangeForm.smsNotifyInterviewer = false
					        this.$nextTick(() => {
					            this.arrangeForm.smsNotifyInterviewer = true
					        })
					    } else {
					        this.$message.error(res.msg);
					    }  
					}
				}else{
					this.arrangeForm.smsNotifyInterviewer=false
				}
			},
			cancelInterview(){
				//取消
				this.$router.go(-1)
			},
			async submitInterview(){
				//提交表单
				var formOk = true
				if(this.arrangeForm.interviewHours == ''){
				    this.$message.error("请填写面试时长");
				    formOk=false
					return false
				}
				if(this.interviewerId.length==0){
				    this.$message.error("请选择面试官");
				    formOk=false
					return false
				}
				if(this.arrangeForm.interviewTitle == ''){
				    this.$message.error("请填写面试主题");
				    formOk=false
					return false
				}
				this.postAndCvList.forEach((item,index)=>{
					if(item.dateStr==''){
						this.$message.error("请填写面试日期");
						formOk=false
						return false
					}else{
						if(item.timeStr==''){
							this.$message.error("请填写面试时间");
							formOk=false
							return false
						}else{
							item.interviewTime = item.dateStr+" "+item.timeStr
							if(item.interviewAddress==''){
								this.$message.error("请填写面试地点");
								formOk=false
								return false
							}
						}
					}
				}) 
				if(this.arrangeForm.emailNotifyApplicants==true){
					this.arrangeForm.applicantsContent = this.$refs.emailApplicants.saveA()
				}else{
					this.arrangeForm.applicantsSubject = ''
					this.arrangeForm.applicantsContent=''
				}	
				
				if(this.arrangeForm.smsNotifyApplicants==true){  
					this.arrangeForm.notifyApplicantsSmsContent = this.$refs.msgApplicants.saveA()
				}else{
					this.arrangeForm.notifyApplicantsSmsContent=''
				}
				
				if(this.arrangeForm.emailNotifyInterviewer==true){
					this.arrangeForm.interviewerContent = this.$refs.emailInterviewer.saveA()
				}else{
					this.arrangeForm.interviewerSubject = ''
					this.arrangeForm.interviewerContent=''
				}	
				
				if(this.arrangeForm.smsNotifyInterviewer==true){  
					this.arrangeForm.notifyInterviewerSmsContent = this.$refs.msgApplicants.saveA()
				}else{
					this.arrangeForm.notifyInterviewerSmsContent=''
				}
				
				console.log(this.arrangeForm)
				 
				if(formOk==true){
					var formData = new FormData();
					for(let key in this.arrangeForm){
					    formData.append(key,this.arrangeForm[key]);	
					}
					this.postAndCvList.forEach((item,index)=>{
					    formData.append("postAndCvList["+index+"].cvId",item.cvId);
					    formData.append("postAndCvList["+index+"].postId",item.postId);
					    formData.append("postAndCvList["+index+"].postCvId",item.postCvId);
						formData.append("postAndCvList["+index+"].interviewTime",item.interviewTime);
						formData.append("postAndCvList["+index+"].interviewAddress",item.interviewAddress);
					})
					this.interviewerId.forEach((item,index)=>{
						 formData.append("interviewerId",item);
					})
					this.notifyApplicantsFiles.forEach((item,index)=>{
						 formData.append("notifyApplicantsFiles",item);
					})
					this.files.forEach((item,index)=>{
						 formData.append("files",item);
					})
					
					let config = {headers: {'Content-Type': 'multipart/form-data'}}
					
					const {
						data: res
					} = await this.$http.arrangeInterview(formData,config)
					if (res.code == 200) {
						this.$message.success("成功安排面试");
						this.$router.go(-1)
					} else {
						this.$message.error(res.msg);
					} 
				} 
				
			},
			async checkInfoMissing() {
				const {
					data: res
				} = await this.$http.checkContactInfoMissing({
					params:{
						cvId:this.cvIdArr
					}
				})
				if (res.code == 200) {
					this.contactInfoData = res.data
					res.data.forEach((item,index)=>{
					    if(item.email==''){
					      this.noEmailNum++
					    }
						if(item.phone==''){
						  this.noPhoneNum++
						}
					})
				} else {
					this.$message.error(res.msg);
				}
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
					this.arrangeForm.node = this.process[0].id;
					this.getProcessNode(this.arrangeForm.node)
				} 
			}, 
			getProcessNode(val){
				//获取当前节点下的所有状态
				this.process.forEach((item,index)=>{
				    if(item.id == val){
				        this.processStates = item.states;
						this.arrangeForm.stateId = this.processStates[0].id
				    }
				})
			},
			beforeUploadApplicants(file) {
				this.notifyApplicantsFiles.push(file);//添加文件
				console.log(this.notifyApplicantsFiles)
				return false//屏蔽了action的默认上传
			},
			beforeUploadInterviewer(file){
				this.files.push(file);//添加文件
				console.log(this.files)
				return false//屏蔽了action的默认上传
			},
			delFileArr(flag,index){
				//flag:1、应聘者文件this.notifyApplicantsFiles 2、面试官文件 this.file
				if(flag==1){
					this.notifyApplicantsFiles.splice(index,1)
					console.log(this.notifyApplicantsFiles)
				}else{
					this.files.splice(index,1)
				}
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
			this.postAndCvList = JSON.parse(this.$route.query.postAndCvList)
			this.cvIdArr = this.$route.query.cvIdArr
			
			
			this.interviewTypeAll()
			this.interviewAddressListAll()
			this.modelListAll()
			this.checkInfoMissing()
			this.processDetail()
		}
	}
</script>

<style lang="scss">
	.form-wrap1 .el-form-item {
		float: left;
	}
	.interviewDiv1{
		width: 100%;
		p{
			float: left;
			line-height: 32px;
			margin-left: 42px;
		}
	}
	.interviewDiv2-p1{
		margin-bottom: 10px;
		margin-left: 40px;
	}
	.interviewDiv2-span1{
		margin-left: 30px;
	}
	.interviewDiv2-span2{
		margin-left: 10px;
		color: blue;
	}
	.interviewDiv2-p2{
		margin: 20px 70px;
	}
	.fileTips{
		li{
			width: 100%;
			background: powderblue;
			margin-bottom: 10px;
			height: 26px;
			line-height: 26px;
			text-align: left;
			padding: 0 15px;
			color: #666;
			i{
				float: right;
				margin-top: 6px;
			}
		}
	}
	.modelDiv{
		.el-upload-dragger {
		    width: 700px;
			height: auto;
		    min-height: 200px;
			padding: 20px;
		    text-align: center;
		    position: relative;
			margin-left: 70px;
		}
	}
</style>
