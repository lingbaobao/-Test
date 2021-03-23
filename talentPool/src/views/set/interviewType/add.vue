<template>

  <div class="wrapper">
     <div class="content-wrap-mini">
        <div class="operate-btn">
            <el-button type="primary" size="mini" @click=goHistory>返回</el-button>
        </div>
         <el-divider content-position="left" class="divider-main">添加/编辑面试类型</el-divider>
          <el-form :model="addTypeData" :rules="addRules" ref="addRuleRef" class="form-wrap1">
               <el-form-item label="名称" prop="name">
                <el-input v-model="addTypeData.name" placeholder="请填写名称"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" prop="state">
                <el-select v-model="addTypeData.state" placeholder="请选择是否启用流程">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remark" class="textareaCon">
                <el-input type="textarea" v-model="addTypeData.remark" maxlength="100" show-word-limit></el-input>
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
       addTypeData:{
           name:'',
           sortNum:0,
           state:1,
           remarkL:''
       },
       addRules:{
            name: {
                required: true,
                message: '必须填写名称',
                trigger: 'blur'
            },
       },
    };
  },
    methods: {
        // 返回上一页
        goHistory(){
            this.$router.go(-1)
        },
        // 提交
        nextPosition(ruleForm){
            this.$refs[ruleForm].validate(async valid => {
                if (valid) {
                    if( this.$route.query.id != undefined ){
                        this.addTypeData.id = this.$route.query.id
                        const {
                            data: res
                        } = await this.$http.updateInterviewType(this.addTypeData)

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
                        } = await this.$http.addInterviewType(this.addTypeData)

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
        // 查询详情
		async detailInterviewType(){
			const {
				data: res
			} = await this.$http.detailInterviewType({params:{id:this.$route.query.id}})

			if (res.code == 200) {
                Object.keys(this.addTypeData).forEach(key=>{
                    this.addTypeData[key] = res.data[key]
                })
			} else {
				this.$message.error(res.msg);
			}
		},
    },
    mounted() {
        if( this.$route.query.id != undefined ){
            this.detailInterviewType()
        }
    }
};
</script>
<style lang="scss" scoped>

</style>