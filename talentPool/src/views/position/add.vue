<template>

  <div class="wrapper">
     <div class="content-wrap-mini">
         <div class="operate-btn">
                <el-button type="primary" size="mini" @click=goHistory>返回</el-button>
            </div>
         <el-divider content-position="left" class="divider-main">添加/编辑职位</el-divider>
          <el-form :model="addPositionData" :rules="addPositionrules" ref="addPositionRef" class="form-wrap1">
                <!-- <el-form-item label="职位模板" v-show="editModelShow">
                    <el-select v-model="templateId" placeholder="请选择职位模板" @change="changetemplate">
                        <el-option
                        v-for="item in positionList"
                        :key="item.id"
                        :label="item.postName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item> -->
            <el-form-item label="职位名称" prop="postName">
                <el-input v-model="addPositionData.postName" placeholder="请填写职位名称"></el-input>
            </el-form-item>
             <el-form-item label="招聘人数" class="some">
                <el-input v-model="recruitsNum" @focus="onRecruitNum" type="number" placeholder="请填写人数"></el-input>
                <el-checkbox @change="someNum" v-model="numChecked">若干</el-checkbox>
            </el-form-item>
             <el-form-item label="招聘类别" prop="recruitType">
                <el-select v-model="addPositionData.recruitType" placeholder="请选择招聘类别">
                    <el-option label="社会招聘" :value="1"></el-option>
                    <el-option label="校园招聘" :value="2"></el-option>
                    <el-option label="实习生招聘" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="工作性质" prop="workNature">
                <el-select v-model="addPositionData.workNature" placeholder="请选择工作性质">
                    <el-option label="全职" :value="1"></el-option>
                    <el-option label="外派" :value="2"></el-option>
                    <el-option label="兼职" :value="3"></el-option>
                    <el-option label="实习" :value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="需求项目" prop="projectId">
                <el-select v-model="addPositionData.projectId" placeholder="请选择项目">
                    <el-option v-for="(item,index) in projectsList" :key="index" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="需求部门" prop="departmentId">
                <el-select v-model="addPositionData.departmentId" placeholder="请选择部门">
                    <el-option v-for="(item,index) in departmentList" :key="index" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="工作省份" prop="workProvince">
                <el-select v-model="addPositionData.workProvince" placeholder="请选择部门">
                    <el-option v-for="(item,index) in provinceList" :key="index" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="详细地址" prop="workAddress" class="textareaCon">
                <el-input v-model="addPositionData.workAddress" placeholder="请填写详细地址" type="textarea"></el-input>
            </el-form-item>
             <el-form-item label="薪资范围" prop="salaryRangeId">
                <el-select v-model="addPositionData.salaryRangeId" placeholder="请选择薪资福利">
                   <el-option :value="1" label="1000以下">1000以下</el-option>
                   <el-option :value="2" label="1000~2000">1000~2000</el-option>
                   <el-option :value="3" label="2001~4000">2001~4000</el-option>
                   <el-option :value="4" label="4001~6000">4001~6000</el-option>        
                   <el-option :value="5" label="6001~8000">6001~8000</el-option>        
                   <el-option :value="6" label="8001~10000">8001~10000</el-option>        
                   <el-option :value="7" label="10001~15000">10001~15000</el-option>        
                   <el-option :value="8" label="15001~25000">15001~25000</el-option>        
                   <el-option :value="9" label="25000~30000">25000~30000</el-option>        
                   <el-option :value="10" label="30000~50000">30000~50000</el-option>        
                   <el-option :value="11" label="50000~70000">50000~70000</el-option>        
                   <el-option :value="12" label="70000~100000">70000~100000</el-option>        
                   <el-option :value="13" label="100000以上">100000以上</el-option>   
                   <el-option :value="-1" label="面议">面议</el-option>  
                </el-select>
            </el-form-item>
             <el-form-item label="工作经验" prop="workYear">
                <el-select v-model="addPositionData.workYear" placeholder="请选择工作经验">
                    <el-option label="应届" :value="1"></el-option>
                    <el-option label="1-3年" :value="2"></el-option>
                    <el-option label="3-5年" :value="3"></el-option>
                    <el-option label="5-10年" :value="4"></el-option>
                    <el-option label="10-15年" :value="5"></el-option>
                    <el-option label="15-20年" :value="6"></el-option>
                    <el-option label="20年以上" :value="7"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-select v-model="addPositionData.gender" placeholder="请选择性别">
                    <el-option label="男" :value="1"></el-option>
					<el-option label="女" :value="0"></el-option>
                    <el-option label="无" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="学历要求" prop="education">
                <el-select v-model="addPositionData.education" placeholder="请选择学历">
                    <el-option label="无/没有学历要求/不限" :value="1"></el-option>
                    <el-option label="小学" :value="2"></el-option>
                    <el-option label="初中" :value="3"></el-option>
                    <el-option label="高中" :value="4"></el-option>
                    <el-option label="中专" :value="5"></el-option>
                    <el-option label="职校" :value="6"></el-option>
                    <el-option label="中技" :value="7"></el-option>
                    <el-option label="专科" :value="8"></el-option>
                    <el-option label="本科" :value="9"></el-option>
                    <el-option label="硕士研究生" :value="10"></el-option>
                    <el-option label="博士研究生" :value="10"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="紧急程度" prop="urgency">
                <el-select v-model="addPositionData.urgency" placeholder="请选择紧急程度">
                    <el-option label="一般" :value="1"></el-option>
                    <el-option label="紧急" :value="2"></el-option>
                    <el-option label="非常紧急" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否内推" prop="isReferral">
                <el-select v-model="addPositionData.isReferral" placeholder="请选择是否内推">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="否" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="薪资福利" prop="welfare" class="textareaCon">
                 <el-input type="textarea" v-model="addPositionData.welfare"></el-input>
            </el-form-item>
            <el-form-item label="工作职责" prop="jobDescription" class="textareaCon">
                <el-input type="textarea" v-model="addPositionData.jobDescription"></el-input>
            </el-form-item>
            <el-form-item label="任职资格" prop="jobRequire" class="textareaCon">
                <el-input type="textarea" v-model="addPositionData.jobRequire"></el-input>
            </el-form-item>
            <el-form-item label="简历收取邮箱" prop="collectEmail"  class="checkbox-wrap">
                <el-checkbox-group v-model="addPositionData.collectEmail">
                    <el-checkbox v-for="item in emailList" :label="item.id" :key="item.id" :value="item.id">{{item.email}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="简历共享人" prop="sharedUserId" class="checkbox-wrap">
                <span @click="onResumeUser" class="mainClPointer">+添加</span>
                <ul class="shareList">
                    <li v-for="(item,index) in this.multipleSelection" :key="index" @click="delShare(item)">
                        {{item.username}} &nbsp; ×
                    </li>
                </ul>
            </el-form-item>
            <el-form-item label="面试官" prop="talentUid" class="interviewerChoose-wrap">
                <div class="ic-list">
                    <ul>
                        <li v-for="(item,index) in selectedInterviewers" :key="index" @click="delInterviewers(item)">
                            <p>{{item.username}} &nbsp; {{item.email}}</p>
                            <em> &nbsp; ×</em>
                        </li>
                    </ul>   
                    <el-input @focus="onInterviewer(2)" v-model="keyword" @input="changeInterviewer" placeholder="请选择" @blur="closeInterviewer"></el-input>
                </div>
                <i class="el-icon-circle-plus-outline" @click="addInterviewers"></i>
                <el-card class="box-card" v-show="showCard">
                    <div v-for="(item,index) in interviewerCard" :key="index" class="item" @click=chooseInterviewer(item)>
                        {{item.username}} &nbsp; {{item.email}}
                    </div>
                </el-card>
            </el-form-item>
            <el-form-item label="招聘流程id" prop="workflowKey">
               <el-select v-model="addPositionData.workflowKey" placeholder="请选择招聘流程模板"  @change="changeKey" :disabled="workfkDisabled">
                    <el-option v-for="(item,index) in templateList" :key="index" :value="item.num" :label="item.name+item.num"></el-option>
                </el-select>
            </el-form-item>
            <div class="process-transverse-wrap form-step">
                <el-steps finish-status="success">
                    <el-step :title="item.name" v-for="(item,index) in stepList" :key ="index"></el-step>
                </el-steps>
            </div>
            <el-form-item label="招聘负责人" prop="recruitUid">
                <el-select v-model="addPositionData.recruitUid" placeholder="请选择招聘负责人">
                    <el-option v-for="(item,index) in recruitList" :key="index" :value="item.id" :label="item.username"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="submit-btn">
                <el-button type="primary" @click="submitPosition('addPositionRef')" size="medium">提交</el-button>
                 <el-button type="primary" @click="nextPosition('addPositionRef')" size="medium">下一步</el-button>
            </el-form-item>
         </el-form>
     </div>

    <!-- 查询全部用户信息 -->
    <!-- <el-dialog :title="userDialogTitle" :visible.sync="userDialog">
        <el-tree empty-text="暂无数据" :props="treeProps" :data="peopleTree" node-key="id" show-checkbox accordion ref="tree" check-strictly
            highlight-current @check-change="handleCheckChange" :default-expanded-keys="treeList" :default-checked-keys="treeList" >
        </el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button @click="userDialog = false">关闭</el-button>
        </span>
    </el-dialog> -->

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

    <!-- 添加共享人 -->
    <el-dialog title="添加共享人" :visible.sync="sharedDialog">
        <div class="tableHeight">
            <el-table :data="tableData"  ref="multipleTable"
            @selection-change="handleSelectionChange" :row-key="getRowKey">
                <el-table-column type="selection" :reserve-selection="true" prop="id"> </el-table-column>
                <el-table-column label="姓名" prop="username">
                </el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column label="部门">默认部门</el-table-column>
            </el-table>
        </div>
        
        <div slot="footer" class="dialog-footer">
            <el-button @click="sharedDialog = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="submitShared" size="mini">确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>

<script>
import department from '@/components/department.vue' 

export default {
  props: {},
  components: {
    department
  },
  data() {
    return {
        addPositionData:{
            id:"",
            postName:"",
            num:"",
            recruitType:"",
            workNature:"",
            projectId:"",
            departmentId:"",
            workProvince:"",
            workAddress:"",
            salaryRangeId:"",
            workYear:"",
            gender:"",
            education:"",
            urgency:"",
            jobRequire:"",
            jobDescription:"",
            welfare:"",
            collectEmail:[],
            sharedUserId:[],
            talentUid:[],
            workflowKey:"",
            isReferral:"",
            recruitUid:""
        },
        addPositionrules:{
            recruitUid: {
                required: true,
                message: '必须选择招聘人',
                trigger: 'blur'
            },
            postName: {
                required: true,
                message: '必须填写职位名称',
                trigger: 'blur'
            },
            num: {
                required: true,
                message: '必须填写招聘人数',
                trigger: 'blur'
            },
            recruitType: {
                required: true,
                message: '必须填写招聘类别',
                trigger: 'blur'
            },
            workNature: {
                required: true,
                message: '必须填写工作性质',
                trigger: 'blur'
            },
            projectId: {
                required: true,
                message: '必须填写需求项目',
                trigger: 'blur'
            },
            departmentId: {
                required: true,
                message: '必须填写需求部门',
                trigger: 'blur'
            },
            workProvince: {
                required: true,
                message: '必须填写工作省份',
                trigger: 'blur'
            },
            salaryRangeId: {
                required: true,
                message: '必须填写薪资范围',
                trigger: 'blur'
            },
            urgency: {
                required: true,
                message: '必须填写紧急程度',
                trigger: 'blur'
            },
            jobDescription: {
                required: true,
                message: '必须填写工作职责',
                trigger: 'blur'
            },
            jobRequire: {
                required: true,
                message: '必须填写任职资格',
                trigger: 'blur'
            },
            collectEmail: {
                required: true,
                message: '必须填写简历收信箱',
                trigger: 'blur'
            },
            
        },
        recruitsNum:'',
        positionList: "",
	    projectsList:'',
        departmentList:'',
        // 职位模板id
        templateId:'',
        numChecked:false,
        email:'',
        emailList:[],
        provinceList:[],
        peopleTree:[],
        treeProps: {
            label: 'name',
            children: 'children',
        },
        userDialog:false,
        userDialogTitle:"简历共享人添加",
        treeList:[],
        // 招聘流程模板
        templateList:[],
        stepList:[],
        keyword:'',
        interviewerCard:[],
        showCard:false,
        selectedInterviewers:[],
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
        recruitList:[],
        // 招聘流程编号 编辑的时候不能修改
        workfkDisabled:false,
        // 共享人弹窗
        sharedDialog:false,
        tableData:[],
        multipleSelection:[],
        temporarySelection:[],
        editModelShow:true
    };
  },
    methods: {
        // 返回上一页
        goHistory(){
            this.$router.go(-1)
        },
        // 下一步
        nextPosition(ruleForm){
            if( this.numChecked == true ){
                this.recruitsNum = -1
            }

            this.$refs[ruleForm].validate(async valid => {
                if( this.numChecked == true ){
                    this.addPositionData.num = this.recruitsNum
                }
                if (valid) {
                    const {
                        data: res
                    } = await this.$http.editDetails(this.addPositionData)

                    if (res.code == 200) {
                        this.$router.push({
                            path:'channel?id='+res.data
                        })
                    } else {
                        this.$message.error(res.msg);
                    }
                }else{
                   this.$message.error("还有必填项未填写哦！"); 
                }
            })
        },
        // 若干招聘人数
        someNum(){
            this.addPositionData.num = ''
        },
        // 输入框输入时 取消复选框选中
        onRecruitNum(){
            this.numChecked = false
        },
        // 简历收件箱
        async postReceiveEmail(){
            const {data: res} = await this.$http.postReceiveEmail()
            if (res.code == 200) {
                   this.emailList = res.data
            } else {
                this.$message.error(res.msg);
            }
        },
        // 获取简历共享人
        onResumeUser(){
            this.sharedDialog = true

            this.multipleSelection.forEach(el=>{
                this.tableData.forEach((item,index)=>{
                    if(el.id == item.id){
                        this.$nextTick(() => {
                            this.$refs.multipleTable.toggleRowSelection(this.tableData[index],true);
                        }) 
                    }
                })  
            })
        },
        submitShared(){
            this.sharedDialog = false
            this.multipleSelection = this.temporarySelection
            
            this.multipleSelection.forEach(el=>{
                this.addPositionData.sharedUserId.push(el.id)
            })
        },
        handleSelectionChange(val){
            this.addPositionData.sharedUserId = []
            this.temporarySelection = val
        },
        delShare(item){
            this.addPositionData.sharedUserId.forEach((el,index)=>{
                if(el == item.id){
                    this.multipleSelection.splice(index,1)
                    this.addPositionData.sharedUserId.splice(index,1)
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
            this.tableData = res
        },
        async changeInterviewer(){
            const {
				data: res
			} = await this.$http.interviewerList({params:{keyword:this.keyword}})

			this.showCard = true
			this.interviewerCard = res
        },
        
        chooseInterviewer(item){
            console.log("选择")
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
                    this.addPositionData.talentUid.push(item.id)
                }
            }else{
                this.selectedInterviewers.push(item)
                this.addPositionData.talentUid.push(item.id)
            }
            this.showCard = false
        },
        // 关闭面试官的下拉面板
        closeInterviewer(){
            setTimeout(() => {
                this.showCard = false	
            },100);	
        },
        delInterviewers(item){
            this.selectedInterviewers.forEach((el,index)=>{
                if(el.username == item.username){
                    this.selectedInterviewers.splice(index,1)
                    this.addPositionData.talentUid.splice(index,1)
                }
            })
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
        
        //  添加编辑职位详情
        submitPosition(ruleForm){
            if( this.numChecked == true ){
                this.recruitsNum = -1
            }
            this.$refs[ruleForm].validate(async valid => {
                if( this.numChecked == true ){
                    this.addPositionData.num = this.recruitsNum
                }
                if (valid) {
                    
                    const {
                        data: res
                    } = await this.$http.editDetails(this.addPositionData)

                    if (res.code == 200) {
                        this.$router.push({
                            path: 'list',
                        })
                    } else {
                        this.$message.error(res.msg);
                    }
                }else{
                   this.$message.error("还有必填项未填写哦！"); 
                }
            })
        },
        // 查询职务列表
		async findPositionList() {
			const {
				data: res
			} = await this.$http.getTemplateList()

			if (res.code == 200) {
                this.positionList = res.data
			} else {
				this.$message.error(res.msg);
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
		// 查询所有项目 
		async getListAll() {
			const {
				data: res
			} = await this.$http.getListAll()

			if (res.code == 200) {
				this.projectsList = res.data
			} else {
				this.$message.error(res.msg);
			}
        },
        // 查询所有省份
        async queryProvince(){
            const {
				data: res
			} = await this.$http.queryProvince()

			if (res.code == 200) {
				this.provinceList = res.data
			} else {
				this.$message.error(res.msg);
			}
        },
        // 查询所有员工信息
        // async empDepartTree(){
        //     const {
		// 		data: res
		// 	} = await this.$http.empDepartTree()

		// 	if (res.code == 200) {
		// 		this.peopleTree = res.data
		// 	} else {
		// 		this.$message.error(res.msg);
		// 	}
        // },
        // handleCheckChange(data, checked, deep) {
        //     console.log(data)
        //     if (checked) {
        //         if (!data.disabled) {
        //             if( this.userDialogTitle == "简历共享人添加" ){
        //                 this.addPositionData.sharedUserId.push(data.id)
        //             }
        //         }
        //     } else {
        //         this.addPositionData.sharedUserId.forEach((item,index)=>{
        //             if(item == data.id){
        //                 this.addPositionData.sharedUserId.splice(index,1)
        //             }
        //         })
        //     }
        // },
        // 简历收信箱赋值
        onCollectEmail(){
            // console.log(this.addPositionData.collectEmail,"邮箱数组")
            let emailIdList=[]
            if( this.addPositionData.collectEmail.length ){
                this.addPositionData.collectEmail.forEach((item,index)=>{
                    this.emailList.forEach(emailItem=>{
                        if( item.email == emailItem.email){
                            emailIdList.push(emailItem.id)
                        }
                    }) 
                })
            }else{

            }
            this.addPositionData.collectEmail = emailIdList 
        },
        // 根据职位模板ID查询职位详情
        async changetemplate(event){
            this.positionDetails(event)
        },
        // 获取职位详情
		async positionDetails(id){
            let routeId
            if( this.$route.query.id != undefined ){
                routeId = this.$route.query.id
            }else{
                routeId = id
            }
            
			const {
				data: res
			} = await this.$http.positionDetails({id:routeId})

			if (res.code == 200) {
                let positionDetailsData = res.data

                Object.keys(this.addPositionData).forEach(key=>{
                    this.addPositionData[key] = positionDetailsData[key]
                })
                this.addPositionData['sharedUserId'] = []
                this.addPositionData['talentUid'] = []
                this.addPositionData.recruitUid = res.data.recruitUid
                
                if( res.data.collectEmail == null ){
                    this.addPositionData.collectEmail = []
                }else{
                    this.addPositionData.collectEmail = res.data.collectEmail
                    this.addPositionData.collectEmail.forEach((item,index)=>{
                        if( !item ){
                            this.addPositionData.collectEmail.splice(index, 1);
                        }
                    })
                }

                this.onCollectEmail()
                // 给面试官赋值展示
                if( res.data.interviewerEmail == null ){
                    this.selectedInterviewers = []
                }else{
                    this.selectedInterviewers = res.data.interviewerEmail
                    this.selectedInterviewers.forEach(el=>{
                        this.addPositionData.talentUid.push(el.id)
                    })
                }

                // 若干人数
                if( res.data.num == -1 ){
                    this.numChecked = true
                    this.addPositionData.num = ''
                }
                
                // 简历共享人
                if( res.data.sharersEmail == null ){
                    this.multipleSelection = []
                }else{
                    this.multipleSelection = res.data.sharersEmail
                    this.multipleSelection.forEach(el=>{
                        this.addPositionData.sharedUserId.push(el.id)
                    })
                }
                this.findNodesByTemplate()
                // this.peopleTree.forEach((item,index)=>{
                //     if(item.children.length >0){
                //         item.children[0].children.forEach(el=>{
                //             childrenData.push(el)
                //         })
                //     }
                // })
                // sharersEmail.forEach(item=>{
                //     childrenData.forEach(el=>{
                //         if( item.userName == el.name ){
                //             this.addPositionData.sharedUserId.push(el.id)
                //         }
                //     })
                // })
			} else {
				this.$message.error(res.msg);
			}
        },
        getRowKey(row) {
            return row.id;
        },
        // 招聘具体流程
        async findNodesByTemplate(){
            const {
				data: res
			} = await this.$http.findNodesByTemplate({params:{num:this.addPositionData.workflowKey}})

			if (res.code == 200) {
				this.stepList = res.data
			} else {
				this.$message.error(res.msg);
			}
        },
        // 招聘流程模板id
        async flowTemplate(){
            const {
				data: res
			} = await this.$http.flowTemplate()

			if (res.code == 200) {
				this.templateList = res.data
			} else {
				this.$message.error(res.msg);
			}
        },
        
        // 通过职位模板id获取具体流程
        changeKey(){
            this.findNodesByTemplate()
        }
    },
    mounted() {
        if( this.$route.query.id != undefined ){
            this.positionDetails(this.$route.query.id)
            this.workfkDisabled = true
            this.editModelShow = false
        }
        this.findPositionList()
	    this.findAllDepartment()
        this.getListAll()
        this.queryProvince()
        this.postReceiveEmail()
        // this.empDepartTree()
        this.flowTemplate()
        this.onInterviewer(1)

        
    }
};
</script>
<style lang="scss" scoped>

</style>