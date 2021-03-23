<template>

  <div class="wrapper">
     <div class="content-wrap-mini">
         <div class="operate-btn">
                <el-button type="primary" size="mini" @click=goHistory>返回</el-button>
            </div>
         <el-divider content-position="left" class="divider-main">添加/编辑阶段</el-divider>
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
            <el-form-item label="阶段状态" class="textareaCon">
                <span @click="chooseState" class="testHover">请选择状态</span>
                <ul class="reasonList">
                    <li v-for="(item,index) in StateItemListNew " :key="index" @click="delState(item.id)">
                        <span>{{item.num}} - {{item.name}}</span>
                        <em>×</em>
                    </li>
                </ul>
            </el-form-item>
            <div class="operate-wrap-list">
                <el-divider content-position="left" class="divider-main">常规操作</el-divider>
                <ul>
                    <li v-for="(item,index) in routineOperateList" :key="index">
                        <span>{{item.name}}</span>
                        <el-switch
                            v-model="item.state"
                            active-text="启用"
                            inactive-text="停用" @change="changeRoutineOperate(item)">
                        </el-switch>
                    </li>
                </ul>
            </div>
            <div class="operate-wrap-list">
                <el-divider content-position="left" class="divider-main">包含操作</el-divider>
                <ul>
                    <li v-for="(item,index) in includeOperateList" :key="index">
                        <span>{{item.name}}</span>
                        <el-switch
                            v-model="item.state"
                            active-text="启用"
                            inactive-text="停用" @change="changeIncludeOperate(item)">
                        </el-switch>
                    </li>
                </ul>
            </div>
            <el-form-item class="submit-btn right-btn">
                <el-button type="primary" @click="nextPosition('addPositionRef')" size="medium">提交</el-button>
            </el-form-item>
         </el-form>
     </div>

     <!-- 添加状态 -->
    <el-dialog title="添加状态" :visible.sync="StateDialog">
        <div class="addDialog-wrap">
            <el-checkbox-group v-model="states">
                <el-checkbox v-for="item in StateData" :label="item.id" :key="item.id" :value="item.id" @change="onStateItemList(item)">
                   <div class="radioId">
                        {{item.num}}-{{item.name}}
                    </div>
                    <span class="remark">({{item.remark}})</span>
                </el-checkbox>
            </el-checkbox-group>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="StateDialog = false">关闭</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
import operateArray from '../../../assets/js/public'

export default {
    
  data() {
    return {
       addProcessData:{
           name:'',
           remark:'',
           state:'',
           states:'',
           opts:[]
       },
       addPositionrules:{
            name: [{
                required: true,
                message: '必须填写流程名称',
                trigger: 'blur'
            },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }],
            state: {
                required: true,
                message: '必须选择是否启用',
                trigger: 'blur'
            },
       },
       StateData:[],
       StateDialog:false,
       StateItemListNew:[],
       routineOperateList:operateArray.RoutineOperateMap,
       includeOperateList:operateArray.includeOperateMap,
       states:[]
    };
  },
    methods: {
        // 返回上一页
        goHistory(){
            this.$router.go(-1)
        },
        // 添加、编辑
        nextPosition(ruleForm){
            this.$refs[ruleForm].validate(async valid => {
                if (valid) {
                    if( !this.states.length ){
                        this.$message.error("必须选择阶段状态");
                    }else if(!this.addProcessData.opts.length){
                        this.$message.error("必须选择操作");
                    }else{
                        this.addProcessData.states = this.states.toString()

                        if( this.$route.query.id != undefined ){
                            this.addProcessData.id = Number(this.$route.query.id)
                            const {
                                data: res
                            } = await this.$http.flowNodeUpdate(this.addProcessData)

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
                            } = await this.$http.addFlowNode(this.addProcessData)

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
                    
                }
            })
        },
        // 获取常规操作状态
        changeRoutineOperate(item){
            if( item.state ){
                this.addProcessData.opts.push({
                    "docId":item.operateId,
                    "state":1,
                    "type":1
                })
            }else{
                this.addProcessData.opts.forEach((el,index)=>{
                    this.addProcessData.opts.splice(index,1)
                })
            }
        },
        // 获取包含操作状态
        changeIncludeOperate(item){
            if( item.state ){
                this.addProcessData.opts.push({
                    "docId":item.operateId,
                    "state":1,
                    "type":2
                })
            }else{
                this.addProcessData.opts.forEach((el,index)=>{
                    this.addProcessData.opts.splice(index,1)
                })
            }
        },
        // 查询全部状态列表
        chooseState(){
            this.StateDialog = true
        },
        // 删除选择的状态
        delState(id){
            this.StateItemListNew.forEach((item,index)=>{
                if( item.id == id ){
                    this.StateItemListNew.splice(index,1)
                }
            })

            this.states.forEach((item,index)=>{
                if( item == id ){
                    this.states.splice(index,1)
                }
            })
        },
        // 选择状态的具体内容展示
        onStateItemList(item){
            if( event.target.checked == true){
                this.StateItemListNew.push(item)
            }else{
                this.StateItemListNew.forEach((el,index)=>{
                    if( el.id == item.id){
                       this.StateItemListNew.splice(index,1)
                    }
                }) 
            }
        },
         // 状态详情
        async flowNodeDetail(){
            const {
                data: res
            } = await this.$http.flowNodeDetail({params:{id:this.$route.query.id}})

            if (res.code == 200) {
                Object.keys(this.addProcessData).forEach(key=>{
                    this.addProcessData[key] = res.data[key]
                })
                this.StateItemListNew = this.addProcessData.states

                this.addProcessData.states.forEach(item=>{
                    this.states.push(item.id)
                })

                this.routineOperateList.forEach(item=>{
                    this.addProcessData.opts.forEach(el=>{
                        if( item.operateId == el.docId){
                            item.state = true
                        }
                    }) 
                })

                this.includeOperateList.forEach(item=>{
                    this.addProcessData.opts.forEach(el=>{
                        if( item.operateId == el.docId){
                            item.state = true
                        }
                    }) 
                })
                
            } else {
                this.$message.error(res.msg);
            }
        },
        // 查询全部状态
        async flowStateAll(){
            const {
                data: res
            } = await this.$http.flowStateAll()

            if (res.code == 200) {
                this.StateData = res.data
            } else {
                this.$message.error(res.msg);
            }
        }
       
    },
    mounted() {
        this.routineOperateList.forEach(item=>{
            if( item.state ){
                item.state = false
            }
        })

        this.includeOperateList.forEach(item=>{
            if( item.state ){
                item.state = false
            }
        })

        if( this.$route.query.id != undefined ){
            this.flowNodeDetail()
        }
        this.flowStateAll()
    }
};
</script>
<style lang="scss" scoped>

</style>