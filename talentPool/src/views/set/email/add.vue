<template>

  <div class="wrapper">
     <div class="content-wrap-mini">
        <div class="operate-btn">
            <el-button type="primary" size="mini" @click=goHistory>返回</el-button>
        </div>
         <el-divider content-position="left" class="divider-main">添加/编辑收取邮箱</el-divider>
          <el-form :model="addEmailData" :rules="addEmailrules" ref="addEmailRef" class="form-wrap1">
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="addEmailData.email" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item label="邮箱类型" prop="mailType">
                <el-select v-model="addEmailData.mailType" placeholder="请选择邮箱类型" @change="onMailType" ref="emailItem">
                    <el-option
                    v-for="item in emailList"
                    :key="item.type"
                    :label="item.name"
                    :value="item.type">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="端口号" prop="portNum">
                <el-input v-model="addEmailData.portNum" placeholder="端口号"></el-input>
            </el-form-item>
             <el-form-item label="服务器地址" prop="serverAddress">
                <el-input v-model="addEmailData.serverAddress" placeholder="服务器地址"></el-input>
            </el-form-item>
            <el-form-item label="协议类型" prop="protocolType">
                <el-select v-model="addEmailData.protocolType" placeholder="请选择协议类型">
                    <el-option
                    v-for="item in protocolList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="用户名" prop="userName">
                <el-input v-model="addEmailData.userName" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input v-model="addEmailData.pwd" placeholder="密码" type="password"></el-input>
            </el-form-item>
            <el-form-item label="日期" prop="receiveRule">
                <el-date-picker v-model="addEmailData.receiveRule" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
				</el-date-picker>
            </el-form-item>
           <el-form-item label="安全类型" prop="safeType">
                <el-select v-model="addEmailData.safeType" placeholder="请选择安全类型">
                    <el-option label="需要安全密码验证" :value="1"></el-option>
                    <el-option label="要求SSL安全连接" :value="2"></el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item class="submit-btn">
                <el-button type="primary" @click="submitEmail('addEmailRef')" size="medium">提交</el-button>
            </el-form-item>
         </el-form>
     </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
       addEmailData:{
           email:'',
           mailType:'',
           portNum:'',
           protocolType:'',
           pwd:'',
           receiveRule:'',
           safeType:'',
           serverAddress:'',
           userName:''
       },
       addEmailrules:{
            email: [{
                required: true,
                message: '必须填写邮箱地址',
                trigger: 'blur'
            },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
            mailType: {
                required: true,
                message: '必须选择邮箱类型',
                trigger: 'blur'
            },
            portNum: {
                required: true,
                message: '必须填写端口号',
                trigger: 'blur'
            },
            protocolType: {
                required: true,
                message: '必须选择协议类型',
                trigger: 'blur'
            },
            pwd: {
                required: true,
                message: '必须填写密码',
                trigger: 'blur'
            },
            receiveRule: {
                required: true,
                message: '必须接收日期',
                trigger: 'blur'
            },
            safeType: {
                required: true,
                message: '必须选择安全类型',
                trigger: 'blur'
            },
            serverAddress: {
                required: true,
                message: '必须填写服务器地址',
                trigger: 'blur'
            },
            userName: {
                required: true,
                message: '必须填写用户名',
                trigger: 'blur'
            },
       },
       emailList:[],
       protocolList:[]
    };
  },
    methods: {
        // 返回上一页
        goHistory(){
            this.$router.go(-1)
        },
        // 获取邮箱类型
        onMailType(e){
            this.emailList.forEach(item=>{
                if( item.type == e ){
                    this.addEmailData.portNum = item.port
                    this.addEmailData.serverAddress = item.server
                    this.addEmailData.protocolType = item.protocolType
                }
            })
        },
        // 添加、编辑邮箱
        submitEmail(ruleForm){
            this.$refs[ruleForm].validate(async valid => {
                if (valid) {
                    if( this.$route.query.id != undefined ){
                        this.addEmailData.id = this.$route.query.id
                        const {
                            data: res
                        } = await this.$http.updateEmail(this.addEmailData)

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
                        } = await this.$http.addEmail(this.addEmailData)

                        if (res.code == 200) {
                            this.$message.success("添加成功");
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
        // 邮件类型
		async emailTypes(){
			const {
				data: res
			} = await this.$http.emailTypes()

			if (res.code == 200) {
                this.emailList = res.data
			} else {
				this.$message.error(res.msg);
			}
        },
        // 协议类型
		async emailProtocolTypes(){
			const {
				data: res
			} = await this.$http.emailProtocolTypes()

			if (res.code == 200) {
                this.protocolList = res.data
			} else {
				this.$message.error(res.msg);
			}
        },
        // 获取详情
        async emailDetail(){
			const {
				data: res
			} = await this.$http.emailDetail({params:{id:this.$route.query.id}})

			if (res.code == 200) {
                this.addEmailData = res.data
                this.addEmailData.protocolType = Number(this.addEmailData.protocolType)
			} else {
				this.$message.error(res.msg);
			}
        },
       
    },
    mounted() {
        this.emailTypes()
        this.emailProtocolTypes()

        if( this.$route.query.id != undefined ){
            this.emailDetail()
        }

    }
};
</script>
<style lang="scss" scoped>

</style>