<template>

  <div class="wrapper">
     <div class="content-wrap-mini">
         <div class="operate-btn">
                <el-button type="primary" size="mini" @click=goHistory>返回</el-button>
            </div>
         <el-divider content-position="left" class="divider-main">添加/编辑状态</el-divider>
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
            <el-form-item label="原因" prop="reasons" class="textareaCon">
                <span @click="chooseReason" class="testHover">请选择原因</span>
                <ul class="reasonList">
                    <li v-for="(item,index) in reasonItemListNew " :key="index" @click="delReason(item.id)">
                        <span>{{item.name}}</span>
                        <em>×</em>
                    </li>
                </ul>
            </el-form-item>
            <el-form-item class="submit-btn">
                <el-button type="primary" @click="nextPosition('addPositionRef')" size="medium">提交</el-button>
            </el-form-item>
         </el-form>
     </div>

     <!-- 添加原因 -->
    <el-dialog title="添加原因" :visible.sync="reasonDialog">
        <div class="addDialog-wrap">
            <el-checkbox-group v-model="reasons">
                <el-checkbox v-for="item in ReasonData" :label="item.id" :key="item.id" :value="item.id" @change="onReasonItemList(item)">
                   <div class="radioId">
                        {{item.num}}-{{item.name}}
                    </div>
                    <span class="remark">({{item.remark}})</span>
                </el-checkbox>
            </el-checkbox-group>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="reasonDialog = false">关闭</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>

export default {
  data() {
    return {
       addProcessData:{
           name:'',
           remark:'',
           state:'',
           reasons:''
       },
       addPositionrules:{
            name: {
                required: true,
                message: '必须填写状态名称',
                trigger: 'blur'
            },
            state: {
                required: true,
                message: '必须选择是否启用',
                trigger: 'blur'
            },
       },
       ReasonData:[],
       reasonDialog:false,
       reasonItemListNew:[],
       reasons:[]
    };
  },
    methods: {
        // 返回上一页
        goHistory(){
            this.$router.go(-1)
        },
        // 下一步
        nextPosition(ruleForm){
            
            this.addProcessData.reasons = this.reasons.toString()
            this.$refs[ruleForm].validate(async valid => {
                if (valid) {
                    if( this.$route.query.id != undefined ){
                        this.addProcessData.id = this.$route.query.id
                        const {
                            data: res
                        } = await this.$http.updateFlowState(this.addProcessData)

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
                        } = await this.$http.addFlowState(this.addProcessData)

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
        // 查询全部原因列表
        chooseReason(){
            this.reasonDialog = true
        },
        // 删除选择的原因
        delReason(id){
            this.reasonItemListNew.forEach((item,index)=>{
                if( item.id == id ){
                    this.reasonItemListNew.splice(index,1)
                }
            })

            this.reasons.forEach((item,index)=>{
                if( item == id ){
                    this.reasons.splice(index,1)
                }
            })
        },
        // 选择原因的具体内容展示
        onReasonItemList(item){
            if( event.target.checked == true){
                this.reasonItemListNew.push(item)
            }else{
                this.reasonItemListNew.forEach((el,index)=>{
                    if( el.id == item.id){
                       this.reasonItemListNew.splice(index,1)
                    }
                }) 
            }
        },
         // 原因详情
        async flowStateDetail(){
            const {
                data: res
            } = await this.$http.flowStateDetail({params:{id:this.$route.query.id}})

            if (res.code == 200) {
                Object.keys(this.addProcessData).forEach(key=>{
                    this.addProcessData[key] = res.data[key]
                })

                this.reasonItemListNew = this.addProcessData.reasons

                this.addProcessData.reasons.forEach(item=>{
                    this.reasons.push(item.id)
                })

            } else {
                this.$message.error(res.msg);
            }
        },
        // 查询全部原因
        async flowReasonAll(){
            const {
                data: res
            } = await this.$http.flowReasonAll()

            if (res.code == 200) {
                this.ReasonData = res.data
            } else {
                this.$message.error(res.msg);
            }
        }
       
    },
    mounted() {
        if( this.$route.query.id != undefined ){
            this.flowStateDetail()
        }
        this.flowReasonAll()
    }
};
</script>
<style lang="scss" scoped>

</style>