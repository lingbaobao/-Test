<template>

  <div class="wrapper">
     <div class="content-wrap-mini">
         <div class="operate-btn">
                <el-button type="primary" size="mini" @click=goHistory>返回</el-button>
            </div>
         <el-divider content-position="left" class="divider-main">添加/编辑原因</el-divider>
          <el-form :model="addProcessData" :rules="addPositionrules" ref="addPositionRef" class="form-wrap1">
            <el-form-item label="名称" prop="name">
                <el-input v-model="addProcessData.name" placeholder="请填写名称"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" prop="state">
                <el-select v-model="addProcessData.state" placeholder="请选择是否启用流程">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remark" class="textareaCon">
                <el-input type="textarea" v-model="addProcessData.remark" maxlength="100" show-word-limit></el-input>
            </el-form-item>
            <el-form-item class="submit-btn">
                <el-button type="primary" @click="nextPosition('addPositionRef')" size="medium">保存</el-button>
            </el-form-item>
         </el-form>
     </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
       addProcessData:{
           name:'',
           remark:'',
           state:''
       },
       addPositionrules:{
            name: {
                required: true,
                message: '必须填写原因',
                trigger: 'blur'
            },
            state: {
                required: true,
                message: '必须选择是否启用',
                trigger: 'blur'
            },
       }
    };
  },
    methods: {
        // 返回上一页
        goHistory(){
            this.$router.go(-1)
        },
        // 添加、编辑原因
        nextPosition(ruleForm){
            this.$refs[ruleForm].validate(async valid => {
                if (valid) {
                    if( this.$route.query.id != undefined ){
                        this.addProcessData.id = this.$route.query.id
                        const {
                            data: res
                        } = await this.$http.updateFlowReason(this.addProcessData)

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
                        } = await this.$http.addFlowReason(this.addProcessData)

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
        // 原因详情
        async flowReasonDetail(){
            const {
                data: res
            } = await this.$http.flowReasonDetail({params:{id:this.$route.query.id}})

            if (res.code == 200) {
                Object.keys(this.addProcessData).forEach(key=>{
                    this.addProcessData[key] = res.data[key]
                })
                
            } else {
                this.$message.error(res.msg);
            }
        },
       
    },
    mounted() {
        if( this.$route.query.id != undefined ){
            this.flowReasonDetail()
        }
    }
};
</script>
<style lang="scss" scoped>

</style>