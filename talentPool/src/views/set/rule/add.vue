<template>

  <div class="wrapper">
     <div class="content-wrap-mini">
        <div class="operate-btn">
            <el-button type="primary" size="mini" @click=goHistory>返回</el-button>
        </div>
         <el-divider content-position="left" class="divider-main">添加/编辑归档规则</el-divider>
          <el-form :model="addRuleData" :rules="addRules" ref="addRuleRef" class="form-wrap1">
               <el-form-item label="邮箱" prop="receiveId">
            <el-select v-model="addRuleData.receiveId" placeholder="请选择">
                    <el-option v-for="(item,index) in emailList" :key="index" :label="item.email" :value="item.id"></el-option>
                </el-select>
                </el-form-item>
            <el-form-item label="归档到职位" prop="postId">
                <el-select v-model="addRuleData.postId" placeholder="请选择">
                    <el-option v-for="(item,index) in positionList" :key="index" :label="item.postName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="满足归档条件" class="content100" prop="conditionsType">
                <div class="content-item">
                    <el-select v-model="addRuleData.conditionsType" placeholder="请选择" @change="changeCondition">
                        <el-option v-for="(item,index) in conditionsList" :key="index" :label="item.name" :value="item.type"></el-option>
                    </el-select>
                    <div v-show="hideResumes">
                        <el-select v-model="addRuleData.conditionsCronType" placeholder="请选择">
                            <el-option v-for="(item,index) in conditionsItem" :key="index" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                        <el-input v-model="addRuleData.conditionsCronValue" ></el-input>
                        <em class="mainCl" @click="showJob" v-show="!hideJob">添加</em>
                    </div>
                </div>
                <div class="content-item" v-show="hideJob">
                    <el-input v-model="addRuleData.postAddress" placeholder="工作地点" disabled></el-input>
                    <el-select v-model="addRuleData.addressCronType" placeholder="请选择">
                        <el-option v-for="(item,index) in conditionsItem" :key="index" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                    <el-input v-model="addRuleData.addressCronValue"></el-input>
                    <em class="mainCl" @click="delJob">删除</em>
                </div>
                
            </el-form-item>
            
            <el-form-item class="submit-btn">
                <el-button type="primary" @click="nextPosition('addRuleRef')" size="medium">提交</el-button>
            </el-form-item>
         </el-form>
     </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
       addRuleData:{
           addressCronType:'',
           addressCronValue:'',
           conditionsCronType:'',
           conditionsCronValue:'',
           conditionsType:'',
           postAddress:'',
           postId:'',
           receiveId:''
       },
       addRules:{
            receiveId: {
                required: true,
                message: '必须选择邮箱',
                trigger: 'blur'
            },
            postId: {
                required: true,
                message: '必须选择岗位id',
                trigger: 'blur'
            },
            conditionsType: {
                required: true,
                message: '必须选择归档规则',
                trigger: 'blur'
            },
            addressCronType:{
                required: true,
                message: '必须选择归档条件',
                trigger: 'blur'
            }
       },
       positionList:[],
       conditionsList:[],
       conditionsItem:[],
       emailList:[],
       hideJob:false,
       hideResumes:false,
    };
  },
    methods: {
        // 返回上一页
        goHistory(){
            this.$router.go(-1)
        },
        // 下一步
        nextPosition(ruleForm){
            this.$refs[ruleForm].validate(async valid => {
                if (valid) {
                    if( this.$route.query.id != undefined ){
                        this.addRuleData.id = this.$route.query.id
                        const {
                            data: res
                        } = await this.$http.updateRules(this.addRuleData)

                        if (res.code == 200) {
                            this.$message.success("编辑成功");
                            this.$router.push({
                                path:'list'
                            })
                        } else {
                            this.$message.error(res.msg);
                        }
                    }else{
                        const {
                            data: res
                        } = await this.$http.addRules(this.addRuleData)

                        if (res.code == 200) {
                            this.$router.push({
                                path:'list'
                            })
                        } else {
                            this.$message.error(res.msg);
                        }
                    }

                }
            })
        },
        showJob(){
            this.hideJob = true
            this.addRuleData.postAddress = "工作地点"
        },
        delJob(){
            this.hideJob = false
            this.addRuleData.postAddress = ""
            this.addRuleData.addressCronType = ''
            this.addRuleData.addressCronValue= ''
        },
        // 获取选择的归档条件
        changeCondition(id){
            // 判断是不是所有简历
            if( id != 3 ){
                this.hideResumes = true
            }else{
                this.hideResumes = false
                this.hideJob = false 
                this.addRuleData.addressCronType = ''
                this.addRuleData.addressCronValue = ''
                this.addRuleData.postAddress = ""
            }
            this.addRuleData.conditionsCronType = ''
            this.addRuleData.conditionsCronValue = ''
            this.conditionsList.forEach(item=>{
                if( item.type == id){
                    this.conditionsItem = item.cronTypes
                }
            })
        },
        // 归档规则
		async findConditionsTypes(){
			const {
				data: res
			} = await this.$http.findConditionsTypes()

			if (res.code == 200) {
                this.conditionsList = res.data
			} else {
				this.$message.error(res.msg);
			}
        },
        // 职位列表
		async getJobList(){
			const {
				data: res
			} = await this.$http.getJobList()

			this.positionList = res.rows
        },
        // 查询全部邮箱
        async findAllEmail(){
			const {
				data: res
			} = await this.$http.findAllEmail()

            if (res.code == 200) {
                this.emailList = res.data
			} else {
				this.$message.error(res.msg);
			}
			
        },
        // 规则详情
        async rulesDetail(){
            const {
                data: res
            } = await this.$http.rulesDetail({params:{id:this.$route.query.id}})

            if (res.code == 200) {

                Object.keys(this.addRuleData).forEach(key=>{
                    this.addRuleData[key] = res.data[key]
                })

                this.conditionsList.forEach(item=>{
                    if( item.type == this.addRuleData.conditionsType){
                        this.conditionsItem = item.cronTypes
                    }
                })
                if(this.addRuleData.conditionsType != 3 ){
                    this.hideResumes = true
                }
                if(this.addRuleData.addressCronType ){
                    this.hideJob = true
                }
            } else {
                this.$message.error(res.msg);
            }
        },
       
    },
    mounted() {
        this.findConditionsTypes()
        this.getJobList()
        this.findAllEmail()

        if( this.$route.query.id != undefined ){
            this.rulesDetail()
            
        }
    }
};
</script>
<style lang="scss" scoped>

</style>