<template>
	<div class="content-wrap-mini">
    <el-form :model="interviewForm" class="form-wrap1">
        <el-divider content-position="left" class="divider-main">通知应聘者</el-divider>
        <div class="singleEmailCon">
            <el-checkbox v-model="interviewForm.emailNotifyApplicants" @change="changeEmail1">邮件：</el-checkbox>
            <div v-show="emailBox1">
                <el-form-item label="邮件标题" prop="applicantsSubject">
                    <el-input v-model="interviewForm.applicantsSubject" placeholder="请填写邮件标题"></el-input>
                </el-form-item>
                <div v-if="emailTemplateShow1" class="emailWrap">
                    <emailTemplate ref="emailCon1" :mailDetail="mailDetail1" :emailIndex="emailIndex1"/>
                </div>
            </div>
        </div>
        <div class="singleEmailCon">
            <el-checkbox v-model="interviewForm.smsNotifyApplicants" @change="changeMsg1">短信：</el-checkbox>
            <div v-show="msgBox1">
                <div v-if="msgTemplateShow1" class="emailWrap">
                    <msgTemplate ref="msgCon1" :msgDetail="msgDetail1" :msgIndex="msgIndex1"/>
                </div>
            </div>
        </div>
        <el-divider content-position="left" class="divider-main">通知面试官</el-divider>
        <div class="singleEmailCon">
            <el-checkbox v-model="interviewForm.emailNotifyInterviewer" @change="changeEmail2">邮件：</el-checkbox>
            <div v-show="emailBox2">
                <el-form-item label="邮件标题" prop="interviewerSubject">
                    <el-input v-model="interviewForm.interviewerSubject" placeholder="请填写邮件标题"></el-input>
                </el-form-item>
                <div v-if="emailTemplateShow2" class="emailWrap">
                    <emailTemplate ref="emailCon2" :mailDetail="mailDetail2" :emailIndex="emailIndex2" />
                </div>
            </div>
        </div>
        <div class="singleEmailCon">
            <el-checkbox v-model="interviewForm.smsNotifyInterviewer" @change="changeMsg2">短信：</el-checkbox>
            <div v-show="msgBox2">
                <div v-if="msgTemplateShow2" class="emailWrap">
                    <msgTemplate ref="msgCon2" :msgDetail="msgDetail2" :msgIndex="msgIndex2"/>
                </div>
            </div>
        </div>

        <el-form-item class="submit-btn" style="margin-left: 96px !important;">
            <el-button type="primary" @click="submitInterview" size="medium">保存</el-button>
            <el-button @click="cancelInterview" size="medium">取消</el-button>
        </el-form-item>
    </el-form>
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
                interviewForm:{
                    notifyTemplateId:4,
                    emailNotifyApplicants:false,
                    applicantsSubject:'您的面试安排已取消',
                    applicantsContent:'',
                    smsNotifyApplicants:false,
                    notifyApplicantsSmsContent:'',
                    emailNotifyInterviewer:false,
                    interviewerSubject:'您的面试安排已取消',
                    interviewerContent:'',
                    smsNotifyInterviewer:false,
                    notifyInterviewerSmsContent:'',
                },
                interviewIds:[],
                // 应聘者
                emailBox1:false,
                emailTemplateShow1:false,
                mailDetail1:{
                    fields:[],//按钮
                    content:'',//默认模板内容
                },
                emailIndex1:'',

                msgBox1:false,
                msgTemplateShow1:false,
                msgDetail1:{
                    fields:[],//按钮
                    content:'',//默认模板内容
                },
                msgIndex1:'',
                // 面试官
                emailBox2:false,
                emailTemplateShow2:false,
                mailDetail2:{
                    fields:[],//按钮
                    content:'',//默认模板内容
                },
                emailIndex2:'',

                msgBox2:false,
                msgTemplateShow2:false,
                msgDetail2:{
                    fields:[],//按钮
                    content:'',//默认模板内容
                },
                msgIndex2:'',
                count:0,
			}
        },
        methods: {
            // 获取邮件内容
            // async publicContent(mailDetail,_emailIndex,templateShow){
            //     if( mailDetail.content == '' ){
            //         console.log(_emailIndex)
            //         console.log(_box)
            //         _emailIndex = this.count
            //         this.count++
            //         console.log(_emailIndex)
            //         const {
            //             data: res
            //         } = await this.$http.modelContent({params:{notifyId:4,category:1}})

            //         if (res.code == 200) {
            //             mailDetail.content = res.data.content
            //             mailDetail.fields = res.data.modelFields
            //             templateShow = false
            //             this.$nextTick(() => {
            //                 templateShow = true
            //             })
            //         } else {
            //             this.$message.error(res.msg);
            //         }  
            //     }
            // },
            // 应聘者邮件
            async changeEmail1(){
                if( this.interviewForm.emailNotifyApplicants ){
                    this.emailBox1 = true
                    if( this.mailDetail1.content == '' ){
                        this.emailIndex1 = this.count
                        this.count++
                        const {
                            data: res
                        } = await this.$http.modelContent({params:{notifyId:5,category:1}})

                        if (res.code == 200) {
                            this.mailDetail1.content = res.data.content
                            this.mailDetail1.fields = res.data.modelFields
                            this.emailTemplateShow1 = false
                            this.$nextTick(() => {
                                this.emailTemplateShow1 = true
                            })
                        } else {
                            this.$message.error(res.msg);
                        }  
                    }
                }else{
                    this.emailBox1 = false
                }
                
            },
            // 应聘者短信
            async changeMsg1(){
                if( this.interviewForm.smsNotifyApplicants ){
                    if( this.msgDetail1.content == '' ){
                        this.msgIndex1 = this.count
                        this.count++
                        const {
                            data: res
                        } = await this.$http.modelContent({params:{notifyId:4,category:2}})

                        if (res.code == 200) {
                            this.msgDetail1.content = res.data.content
                            this.msgDetail1.fields = res.data.modelFields
                            this.msgTemplateShow1 = false
                            this.$nextTick(() => {
                                this.msgTemplateShow1 = true
                            })
                        } else {
                            this.$message.error(res.msg);
                        }  
                    }
                    this.msgBox1 = true
                }else{
                    this.msgBox1 = false
                }
            },
            // 面试官邮件
            async changeEmail2(){
                if( this.interviewForm.emailNotifyInterviewer ){
                    if( this.mailDetail2.content == '' ){
                        this.emailIndex2 = this.count
                        this.count++
                        const {
                            data: res
                        } = await this.$http.modelContent({params:{notifyId:4,category:3}})

                        if (res.code == 200) {
                            this.mailDetail2.content = res.data.content
                            this.mailDetail2.fields = res.data.modelFields
                            this.emailTemplateShow2 = false
                            this.$nextTick(() => {
                                this.emailTemplateShow2 = true
                            })
                        } else {
                            this.$message.error(res.msg);
                        }  
                    }
                    this.emailBox2 = true
                }else{
                    this.emailBox2 = false
                }
            },
            // 面试官短信
            async changeMsg2(){
                if( this.interviewForm.smsNotifyInterviewer ){
                    if( this.msgDetail2.content == '' ){
                        this.msgIndex2 = this.count
                        this.count++
                        const {
                            data: res
                        } = await this.$http.modelContent({params:{notifyId:4,category:4}})

                        if (res.code == 200) {
                            this.msgDetail2.content = res.data.content
                            this.msgDetail2.fields = res.data.modelFields
                            this.msgTemplateShow2 = false
                            this.$nextTick(() => {
                                this.msgTemplateShow2 = true
                            })
                        } else {
                            this.$message.error(res.msg);
                        }  
                    }
                    this.msgBox2 = true
                }else{
                    this.msgBox2 = false
                }
            },
            // 提交
            async submitInterview(){
                if( this.interviewForm.emailNotifyApplicants ){
                    this.interviewForm.applicantsContent = this.$refs.emailCon1.saveA()
                }else{
                    this.interviewForm.applicantsContent =  ''
                    this.interviewForm.applicantsSubject = ''
                }

                if( this.interviewForm.smsNotifyApplicants ){
                    this.interviewForm.notifyApplicantsSmsContent = this.$refs.msgCon1.saveA()
                }else{
                    this.interviewForm.notifyApplicantsSmsContent = ''
                }

                if( this.interviewForm.emailNotifyInterviewer ){
                    this.interviewForm.interviewerContent = this.$refs.emailCon2.saveA()
                }else{
                    this.interviewForm.interviewerContent = ''
                    this.interviewForm.interviewerSubject = ''
                }

                if( this.interviewForm.smsNotifyInterviewer ){
                    this.interviewForm.notifyInterviewerSmsContent = this.$refs.msgCon2.saveA()
                }else{
                    this.interviewForm.notifyInterviewerSmsContent = ''
                }

                var formData = new FormData();
                for(let key in this.interviewForm){
                    formData.append(key,this.interviewForm[key]);	
                }
                this.interviewIds.forEach((item,index)=>{
                    formData.append("interviewIds["+index+"]",item);
                })
            
                let config = {headers: {'Content-Type': 'multipart/form-data'}}
                const {
                    data: res
                } = await this.$http.cancelInterview(formData,config)

                if (res.code == 200) {
                    this.$message.success("成功");
                    this.$router.push({
                        path:"/interview/list"
                    })
                } else {
                    this.$message.error(res.msg);
                }

            },
            // 取消
            cancelInterview(){
                this.$router.push({
                    path:"/interview/list"
                })
            },
        },
		created() {

		},
        mounted() {
            this.interviewIds = this.$route.query.interviewIds.split(',')
        },
	}
</script>
