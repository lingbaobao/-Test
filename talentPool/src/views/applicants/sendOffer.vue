<template>

  <div class="wrapper">
        <div class="content-wrap-mini">
			<el-divider content-position="left" class="divider-main">为test测试创建offer</el-divider>
			<el-form :model="offerForm" :rules="addOfferrules" ref="addOfferRef" class="form-wrap1" >
			<el-form-item label="录用人员">
                <p>张三</p>
            </el-form-item>
            <el-form-item label="部门名称" prop="departmentId">
                <el-select v-model="offerForm.departmentId" placeholder="请选择">
                    <el-option v-for="(item,index) in departmentList" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="直接上级" prop="superior">
					<el-input v-model="offerForm.superior" placeholder="请填写直接上级"></el-input>
				</el-form-item>
			<el-form-item label="开始日期" prop="startTime">
				<el-date-picker v-model="offerForm.startTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd" :picker-options="pickerOptions">
				</el-date-picker>
            </el-form-item>
			<el-form-item label="结束日期" prop="endTime">
				<el-date-picker v-model="offerForm.endTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
				</el-date-picker>
            </el-form-item>
            <el-form-item label="工作地点" prop="workAddress">
                <el-input v-model="offerForm.workAddress" placeholder="请填写工作地点"></el-input>
            </el-form-item>
            <el-form-item label="基本工资" prop="salary">
                <el-input v-model="offerForm.salary" placeholder="请填写基本工资"></el-input>
            </el-form-item>
            <el-form-item label="试用期" prop="probation">
            <el-input v-model="offerForm.probation" placeholder="请填写"></el-input>
            </el-form-item>
            <el-form-item label="试用期工资" prop="probationSalary">
                <el-input v-model="offerForm.probationSalary" placeholder="请填写试用期工资"></el-input>
            </el-form-item>
			 <el-form-item label="福利" prop="welfare" class="textareaCon">
                <el-input type="textarea" v-model="offerForm.welfare" maxlength="1000" show-word-limit></el-input>
            </el-form-item>
			<el-divider content-position="left" class="divider-main">通知应聘者</el-divider>
            <el-form-item label="offer通知模板" prop="notifyApplicantsTemplateId">
               <el-select v-model="offerForm.notifyApplicantsTemplateId" placeholder="请选择" @change="onModel">
                    <el-option v-for="(item,index) in modelIdList" :key="index" :label="item.modelDesc" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="邮件标题" prop="applicantsSubject">
                <el-input v-model="offerForm.applicantsSubject" placeholder="请填写标题"></el-input>
            </el-form-item>
            <div v-if="emailTemplateShow" class="emailWrap">
                <emailTemplate ref="emailCon" :mailDetail="mailDetail" :emailIndex="0" :destroyEditor = "true"/>
            </div>
            <el-form-item label="附件" prop="notifyApplicantsFiles">
                <!-- <el-upload  :on-success="importEmployees" :limit="1" :action="uploadApiFile">
					<el-button size="small" type="primary">附件</el-button>
            	</el-upload> -->
				<input type="file" name="file" @change="onFile" >
				<!-- <el-input type="file" @change="onFile" v-model="offerForm.file" name="file" multiple="multiple"></el-input> -->
            </el-form-item>
            <el-form-item label="短信通知">
                <el-checkbox @change="showMsgBox" :disabled="checkboxDisabled" v-model="offerForm.smsNotifyApplicants"></el-checkbox>
            </el-form-item>
            <div v-show="msgBox">
                <div v-if="msgTemplateShow" class="emailWrap">
                    <msgTemplate ref="msgCon" :msgDetail="msgDetail" :msgIndex="1" :destroyEditor = "true"/>
                </div>
            </div>
            <el-form-item class="submit-btn">
                <el-button type="primary" @click="submitOffer" size="medium">发送</el-button>
            </el-form-item>
         </el-form>
        </div> 
        
  </div>
</template>

<script>

import emailTemplate from '@/components/email/emailTemplate.vue'//邮件模版
import msgTemplate from '@/components/email/msgTemplate.vue'//短信模版
export default {
  props: {},
  components: {
	    	emailTemplate,msgTemplate
	  	},
  data() {
    return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        }, 
        postAndCvList:[{
            cvId:4,
            postId:8,
            postCvId:5
        }],
		offerForm:{
            departmentId:'',
            superior:'',
            startTime:'',
            endTime:'',
            workAddress:'',
            salary:'',
            probationSalary:'',
            probation:'',
            welfare:'',
            notifyApplicantsTemplateId:'',
            applicantsSubject:'',
            applicantsContent:'',
            smsNotifyApplicants:false,
            notifyApplicantsSmsContent:'',
        },
        notifyApplicantsFiles:"",
		addOfferrules:{
			notifyApplicantsTemplateId:{
				required: true,
                message: '必须选择offer模板',
                trigger: 'blur'
			}
        },
        departmentList:[],
        mailDetail:{
			fields:[],//按钮
			content:'',//默认模板内容
        },
        msgDetail:{
			fields:[],//按钮
			content:'',//默认模板内容
        },
        modelIdList:[],
        emailTemplateShow:false,
        msgTemplateShow:false,
        notifyId:'',
        checkboxDisabled:true,
        msgBox:false,
    };
  },
  methods: {
      onFile(e){
			this.notifyApplicantsFiles = e.target.files[0]
		},
        async submitOffer(){
            if( this.offerForm.notifyApplicantsTemplateId == ''){
                this.$message.error("必须选择模板");
            }else{
                if( this.offerForm.smsNotifyApplicants ){
                    this.offerForm.notifyApplicantsSmsContent = this.$refs.msgCon.saveA()
                }
                this.offerForm.applicantsContent = this.$refs.emailCon.saveA()
                
                var formData = new FormData();
                for(let key in this.offerForm){
                    formData.append(key,this.offerForm[key]);	
                }
                this.postAndCvList.forEach((item,index)=>{
                    formData.append("postAndCvList["+index+"].cvId",item.cvId);
                    formData.append("postAndCvList["+index+"].postId",item.postId);
                    formData.append("postAndCvList["+index+"].postCvId",item.postCvId);
                })

                if( this.notifyApplicantsFiles != '' ){
                    formData.append("notifyApplicantsFiles",this.notifyApplicantsFiles);	
                }
            
                let config = {headers: {'Content-Type': 'multipart/form-data'}}
                const {
                    data: res
                } = await this.$http.sendOffer(formData,config)

                if (res.code == 200) {
                    this.$message.success("成功");
                } else {
                    this.$message.error(res.msg);
                }
            }   
            
      },
      // 查询所有部门
		async findAllDepartment() {
			const {
				data: res
			} = await this.$http.getFindAll()

			if (res.code == 200) {
				this.departmentList = res.data
			} else {
				this.$message.error(res.msg);
			}
        },
        async modelListAll() {
			const {
				data: res
			} = await this.$http.modelListAll({params:{typeCode:"OFFER"}})

			if (res.code == 200) {
                this.modelIdList = res.data
			} else {
				this.$message.error(res.msg);
			}
        },
        async onModel(e){
            this.notifyId = e
            this.checkboxDisabled = false
            this.changeEmail()
            this.changeMsg()
        },
        async changeEmail(){
            const {
				data: res
			} = await this.$http.modelContent({params:{notifyId:this.notifyId,category:1}})

			if (res.code == 200) {
                this.mailDetail.content = res.data.content
                this.mailDetail.fields = res.data.modelFields
                this.emailTemplateShow = false
                this.$nextTick(() => {
                    this.emailTemplateShow = true
                })
			} else {
				this.$message.error(res.msg);
            }  
        },
        async changeMsg(){
            const {
                data: res
            } = await this.$http.modelContent({params:{notifyId:this.notifyId,category:2}})

            if (res.code == 200) {
                this.msgDetail.content = res.data.content
                this.msgDetail.fields = res.data.modelFields
                this.msgTemplateShow = false
                this.$nextTick(() => {
                    this.msgTemplateShow = true
                })
            } else {
                this.$message.error(res.msg);
            }
        },
        showMsgBox(){
            if( !this.checkboxDisabled ){
                this.msgBox = !this.msgBox
            }
        },
  },
  mounted() {
        this.findAllDepartment()
        this.modelListAll()
	    this.postAndCvList = JSON.parse(this.$route.query.postAndCvList)
  }
};
</script>
<style lang="scss" scoped>

</style>