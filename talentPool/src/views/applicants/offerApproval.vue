<template>

  <div class="wrapper">
        <div class="content-wrap-mini">
			<el-divider content-position="left" class="divider-main">创建审批</el-divider>
			<el-form :model="offerForm" :rules="addOfferrules" ref="addOfferRef" class="form-wrap1" >
            <el-form-item label="offer审批模板" prop="offerTypeId">
                <el-select v-model="offerForm.offerTypeId" placeholder="请选择" @change="onRecruMethods">
                    <el-option label="社会招聘" :value="1"></el-option>
                    <el-option label="校园招聘" :value="2"></el-option>
                </el-select>
            </el-form-item>
			<el-form-item label="部门名称" prop="departmentId">
                <el-select v-model="offerForm.departmentId" placeholder="请选择">
                    <el-option v-for="(item,index) in departmentList" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
			<el-form-item label="工作地点" prop="workAddress">
                <el-input v-model="offerForm.workAddress" placeholder="请填写工作地点"></el-input>
            </el-form-item>
			<el-form-item label="开始日期" prop="startTime">
				<el-date-picker v-model="offerForm.startTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
				</el-date-picker>
            </el-form-item>
			<el-form-item label="结束日期" prop="endTime">
				<el-date-picker v-model="offerForm.endTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
				</el-date-picker>
            </el-form-item>
			<!-- -社招-->
			<div v-show="!recruMethods">
				<el-form-item label="直接上级" prop="superior">
					<el-input v-model="offerForm.superior" placeholder="请填写直接上级"></el-input>
				</el-form-item>
				<el-form-item label="基本工资" prop="salary">
					<el-input v-model="offerForm.salary" placeholder="请填写基本工资"></el-input>
				</el-form-item>
				<el-form-item label="试用期" prop="probation">
                	<el-input v-model="offerForm.probation" placeholder="请填写试用期"></el-input>
				</el-form-item>
				<el-form-item label="试用期工资" prop="probationSalary">
					<el-input v-model="offerForm.probationSalary" placeholder="请填写名称"></el-input>
				</el-form-item>
			</div>
			<!-- 校招 -->
			<div v-show="recruMethods">
				<el-form-item label="上级领导" prop="superior">
					<el-input v-model="offerForm.superior" placeholder="请填写上级领导"></el-input>
				</el-form-item>
				<el-form-item label="月薪" prop="salary">
					<el-input v-model="offerForm.salary" placeholder="请填写月薪"></el-input>
				</el-form-item>
				<el-form-item label="毕业生补贴" prop="graduateSubsidy">
					<el-input v-model="offerForm.graduateSubsidy" placeholder="请填写补贴"></el-input>
				</el-form-item>
				<el-form-item label="上研补贴" prop="postgraduateSubsidy">
					<el-input v-model="offerForm.postgraduateSubsidy" placeholder="请填写补贴"></el-input>
				</el-form-item>
			</div>
			 <el-form-item label="福利" prop="welfare" class="textareaCon">
                <el-input type="textarea" v-model="offerForm.welfare" maxlength="1000" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remarks" class="textareaCon">
                <el-input type="textarea" v-model="offerForm.remarks" maxlength="1000" show-word-limit></el-input>
            </el-form-item>
			
			<el-form-item label="附件" prop="file">
                <!-- <el-upload  :on-success="importEmployees" :limit="1" :action="uploadApiFile">
					<el-button size="small" type="primary">附件</el-button>
            	</el-upload> -->
				<input type="file" @change="onFile" name="file">
				<!-- <el-input type="file" @change="onFile" v-model="offerForm.file" name="file" multiple="multiple"></el-input> -->
            </el-form-item>
			<el-divider content-position="left" class="divider-main">审批流程</el-divider>

			<el-form-item label="第1审批人" class="interviewerChoose-wrap">
				<div v-for="(pitem,pindex) in approverList" :key="pindex" class="approverList">
					<div class="ic-list">
						<ul>
							<li @click="delInterviewers(pitem)">
								<p>{{pitem.email}}</p>
							</li>
						</ul>   
						<el-input @focus="onInterviewer(pitem)" v-model="pitem.keyword" @input="changeInterviewer(pitem)" placeholder="请选择"></el-input>
					</div>
					<i class="el-icon-circle-plus-outline" @click="addInterviewers"></i>
					<i class='delApprover' @click="delApprover(pitem.id)" >删除</i>
					<el-card class="box-card" v-show="pitem.cardShow">
						<div v-for="(item,index) in interviewerCard" :key="index" class="item" @click=chooseInterviewer(item,pindex,pitem)>
							{{item.username}} &nbsp; {{item.email}}
						</div>
					</el-card>
				</div>
				<el-button type="primary" @click="addApprover" size="medium">添加新一轮审批</el-button>
            </el-form-item>
			<el-form-item label="通知方式" >
                <el-checkbox label="邮件" v-model="offerForm.emailNotifyApprover"></el-checkbox>
    			<el-checkbox label="短信" v-model="offerForm.smsNotifyApprover"></el-checkbox>
            </el-form-item>
			<el-form-item label="任务到期时间" prop="taskExpire">
                <el-date-picker v-model="offerForm.taskExpire" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss">
				</el-date-picker>
            </el-form-item>
            <el-form-item class="submit-btn">
                <el-button type="primary" @click="submitOffer('addOfferRef')" size="medium">提交</el-button>
            </el-form-item>
         </el-form>
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
import Global from "../../assets/js/baseUrl.js";
export default {
  props: {},
  data() {
    return {
		offerForm:{
			approverIdList:[],
			emailNotifyApprover:true,
			smsNotifyApprover:false,
			taskExpire:"",
			offerTypeId:1,
			salary:'',
			departmentId:'',
			superior:'',
			workAddress:'',
			startTime:'',
			endTime:'',
			probation:'',
			probationSalary:'',
			graduateSubsidy:'',
			postgraduateSubsidy:'',
			welfare:'',
			remarks:'',
		},
		file:'',
		postAndCvList:[
			{
			   cvId:4,
			   postId:8,
			   postCvId:5
			},
		],
		addOfferrules:{
			taskExpire:{
				required: true,
                message: '必须填写任务到期时间',
                trigger: 'blur'
			}
		},
		recruMethods:false,
		departmentList:[],
		uploadApiFile:Global.base.baseUrl.email+'createOfferApproval',
		// uploadApiFile:'Global.base.baseUrl.urlxl',
		//上传请求头
		headerObject: {
			Authorization: window.localStorage.getItem("JWT_TOKEN")
		}, 
		selectedInterviewers:[],
		interviewerCard:[],
		showCard:false,
		keyword:'',
        AddInterviewerForm:{
            userName:'',
            email:'',
            mobile:''
		},
		interviewerDialog:false,
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
		approverList:[{
			id:'',
			keyword:'',
			cardShow:false,
			email:''
			},
		]
    };
  },
  methods: {
		//选择审批模板
		onRecruMethods(e){
			if( e == 1){
				this.recruMethods = false
			}else{
				this.recruMethods = true
			}
		},
		addApprover(){
			this.approverList.push({
				id: this.approverList.length+1,
				keyword:'',
				cardShow:false,
				email:''
			});
		},
		delApprover(id){
			if( this.approverList.length>1 ){
				this.approverList.forEach((el,index)=>{
					if( el.id == id ){
						this.approverList.splice(index,1)
					}
				})
			}else{
				this.$message.error("必须选择审批人");
			}	
		},
		onFile(e){
			this.file = e.target.files[0]
		},
		async submitOffer(){
			if( this.approverList[0].id == ''){
				this.$message.error("必须选择审批人");
				return;
			}else{
				this.approverList.forEach(item=>{
					this.offerForm.approverIdList.push(item.id)
				})
			}

			if( this.offerForm.taskExpire == ''){
				this.$message.error("必须选择任务到期时间");
				return;
			}

			var formData = new FormData();
			for(let key in this.offerForm){
				formData.append(key,this.offerForm[key]);	
			}
			this.postAndCvList.forEach((item,index)=>{
				formData.append("postAndCvList["+index+"].cvId",item.cvId);
				formData.append("postAndCvList["+index+"].postId",item.postId);
				formData.append("postAndCvList["+index+"].postCvId",item.postCvId);
			})

			if( this.file != '' ){
				formData.append("file",this.file);	
			}

			let config = {headers: {'Content-Type': 'multipart/form-data'}}
			const {
				data: res
			} = await this.$http.createOfferApproval(formData,config)

			if (res.code == 200) {
				this.$message.success("添加成功");
				this.$router.push({
					path:"/applicant/applicantList"
				})
			} else {
				this.$message.error(res.msg);
			}
		},
		importEmployees(response, file, fileList){
			if(response.code == 200 ){
				this.$message.success("导入成功,请去员工信息管理查看");
			}else{
				this.$message.error("导入失败");
			}
		},
		// 获取面试官
        async onInterviewer(item){
			
            this.keyword = ''
            const {
				data: res
            } = await this.$http.interviewerList({params:{keyword:item.keyword}})

            item.cardShow = true
            this.interviewerCard = res
            this.recruitList = res
        },
        async changeInterviewer(item){
			
            const {
				data: res
			} = await this.$http.interviewerList({params:{keyword:item.keyword}})

			item.cardShow = true
			this.interviewerCard = res
		},
		onCloseHide(item){
			item.cardShow = false
		},
        chooseInterviewer(item,index,pitem){
			let flag
			this.approverList.forEach(el=>{
				if( item.id == el.id ){
					flag = 0	
				}	
			})

			if( flag != 0 ){
				pitem.email = item.username + item.email +" × "
				pitem.id = item.id
				pitem.cardShow = false
			}else{
				this.$message.error("不能选择重复的审批人哦！");
				return;
			}
        },
        delInterviewers(pitem){
			console.log(pitem,"pitem")
			pitem.email = ''
        },
        addInterviewers(){
            this.interviewerDialog = true
        },
        submitAddInterviewer(ref){
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
		// 选择发布渠道
		async submitChannel(){
			const {
				data: res
			} = await this.$http.selectChannel(this.selectChannelData)

			if (res.code == 200) {
				this.$message.success("发布成功");
			} else {
				this.$message.error(res.msg);
			}
		}
  },
  mounted() {
	  	this.findAllDepartment()
	  	this.postAndCvList = JSON.parse(this.$route.query.postAndCvList)
	}
};
</script>
<style lang="scss" scoped>

</style>