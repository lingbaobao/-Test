<template>

  <div class="wrapper">
     <div class="content-wrap-mini">
         <div class="operate-btn">
                <el-button type="primary" size="mini" @click=goHistory>返回</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="primary" size="mini" @click="editProcess" v-show="detailShow">编辑</el-button>
            </div>
         <el-divider content-position="left" class="divider-main">添加/编辑流程</el-divider>
          <el-form :model="addProcessData" :rules="addPositionrules" ref="addPositionRef" class="form-wrap1" v-show="formShow">
            <el-form-item label="名称" prop="name">
                <el-input v-model="addProcessData.name" placeholder="请填写流程名称"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" prop="state">
                <el-select v-model="addProcessData.state" placeholder="请选择是否启用流程">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remark" class="textareaCon">
                <el-input type="textarea" v-model="addProcessData.remark"></el-input>
            </el-form-item>
            <el-form-item class="submit-btn">
                <el-button type="primary" @click="submitProcess('addPositionRef')" size="medium">保存</el-button>
            </el-form-item>
         </el-form>

          <div class="detail-ul-wrap" v-show="detailShow">
                <ul  style="background: #f5f5f5;padding: 10px 1px 1px 40px;">
                    <li>
                        <em>编号</em>
                        <span>{{detailList.num}}</span>
                    </li>
                    <li>
                        <em>名称</em>
                        <span>{{detailList.name}}</span>
                    </li>
                    <li>
                        <em>是否启用</em>
                        <span v-if="detailList.state==1">启用</span>
                        <span v-else>停用</span>
                    </li>
                    <li>
                        <em>备注</em>
                        <span>{{detailList.remark}}</span>
                    </li>
                </ul>
            </div>


        <div class="configure-wrap">
                <el-divider content-position="left" class="divider-main">阶段配置</el-divider>
                <ul>
                    <li class="add">
                        <div class="addConfigure" @click="addConfigure">
                            +添加配置
                        </div>  
                    </li>
                    <el-collapse v-model="activeNames" accordion @change="handleChange">
                        <li v-for="(item,index) in nodeArr" :key="index" class="itemLi">
                            <el-collapse-item :name="index">
                                <template slot="title">
                                    阶段{{index+1}} : 
                                    <span> {{item.name}}</span> 
                                </template>
                                
                                <div class="item">
                                    <span>阶段状态：</span>
                                    <p>
                                        <span v-for="(item,index) in statesArr" :key="index">{{item.name}}</span>
                                    </p>  
                                </div>
                                <div class="item">
                                    <span>包含操作：</span>
                                    <p >
                                         <span v-for="(item,index) in operateArr" :key="index">{{item.name}}</span>
                                    </p>
                                </div>
                                <el-button type="danger" size="mini" class="delConfig" @click="delConfig(item)">删除</el-button>
                            </el-collapse-item>
                        </li>
                    </el-collapse>
                    <el-button type="primary" @click="nextPosition" size="medium">提交</el-button>
                </ul>
            </div>
     </div>

     <el-dialog title="添加阶段" :visible.sync="addDialog">
            <div class="addDialog-wrap">
                <el-radio-group v-model="configureData.nodes" size="small">
                    <el-radio :label="item.id" v-for="(item,index) in this.nodeAll" :key="index" @change="changeConfig(item)">
                        <div class="radioId">
                            {{item.num}}-{{item.name}}
                        </div>
                        <span class="remark">({{item.remark}})</span>
                        <span v-if="item.tips" style="color: #409EFF;"> -- {{item.tips}}</span>
                    </el-radio>
                </el-radio-group>
            </div>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false">取消</el-button>
                <el-button type="primary" @click="submitConfig">确 定</el-button>
            </span>
        </el-dialog>

  </div>
</template>

<script>
import operateArray from '../../../assets/js/public'
import qs from "qs"
export default {
  data() {
    return {
       addProcessData:{
           id:this.$route.query.id,
           name:'',
           remark:'',
           state:''
       },
       addPositionrules:{
            name: {
                required: true,
                message: '必须填写流程名称',
                trigger: 'blur'
            },
            state: {
                required: true,
                message: '必须选择是否启用',
                trigger: 'blur'
            },
       },
       addDialog:false,
        // 所有阶段节点
        nodeAll:[],
        nodeItemArr:[],
        nodeArr:[],
        configureData:{
            id:this.$route.query.id,
            nodes:''
        },
        activeNames: ['0'],
        statesArr:[],
        operateArr:[],
        routineOperateList:operateArray.RoutineOperateMap,
        includeOperateList:operateArray.includeOperateMap,
        detailList:{
            name:'',
            num:'',
            state:'',
            remark:'',
        },
        detailShow:true,
        formShow:false
    };
  },
    methods: {
        async handleChange(val) {
            this.statesArr = []
            this.operateArr = []

            val = val + 1
            if( val >= 1 ){
                const {
                    data: res
                } = await this.$http.flowNodeDetail({params:{id:this.nodeArr[val-1].id}})

                if (res.code == 200) {
                    this.statesArr = res.data.states

                    this.routineOperateList.forEach(item=>{
                        res.data.opts.forEach(el=>{
                            if( item.operateId == el.docId){
                                this.operateArr.push(item)
                            }
                        }) 
                    })

                    this.includeOperateList.forEach(item=>{
                        res.data.opts.forEach(el=>{
                            if( item.operateId == el.docId){
                                this.operateArr.push(item)
                            }
                        }) 
                    })
                } else {
                    this.$message.error(res.msg);
                }
            }
        },
        // 返回上一页
        goHistory(){
            this.$router.go(-1)
        },
        // 保存
        submitProcess(ruleForm){
            this.$refs[ruleForm].validate(async valid => {
                if (valid) {
                    const {
                        data: res
                    } = await this.$http.updateTemplate(this.addProcessData)

                    if (res.code == 200) {
                        this.$message.success("保存成功");
                        this.detailShow = true
                        this.formShow = false
                        this.detailTemplate()
                        
                    } else {
                        this.$message.error(res.msg);
                    }
                }
            })
        },
        // 编辑表单
        editProcess(){
            this.detailShow = false
            this.formShow = true
        },
        // 添加配置
        addConfigure(){
            this.addDialog = true

            this.nodeAll.forEach((item,index)=>{
                this.nodeArr.forEach(el=>{
                    if(item.id == el.id ){
                        this.nodeAll[index]['tips'] = '此阶段已选择'
                    }
                })
            })
        },
        // 删除阶段
        delConfig(item){
            this.nodeArr.forEach((el,index)=>{
                if( el.id == item.id){
                    this.nodeArr.splice(index,1)
                    this.$message.success("阶段删除成功");
                }
            })
        },
        // 提交所有阶段节点
        async nextPosition(){
            let configArr = []
            if( this.nodeArr.length ){
                this.nodeArr.forEach((item,index)=>{
                    configArr.push(item.id)
                })
                this.configureData.nodes = configArr.toString()
                const {
                    data: res
                } = await this.$http.configTemplate(qs.stringify(this.configureData))

                if (res.code == 200) {
                    this.$router.push({
                        path:'list'
                    })
                } else {
                    this.detailTemplate()
                    this.$message.error(res.msg);
                }
            }else{
                this.$message.error("必须选择阶段节点");
            }
            
        },
		// 所有阶段节点
		async flowNodeAll(){
			const {
				data: res
			} = await this.$http.flowNodeAll()

			if (res.code == 200) {
				this.nodeAll = res.data
			} else {
				this.$message.error(res.msg);
			}
        },
        // 获取选中的配置节点
        changeConfig(item){
            let flag
            this.nodeArr.forEach(el=>{
                if( el.id == item.id ){
                    flag = 1 
                }
            })

            if( flag == 1 ){
                this.$message.error("不能添加相同的阶段节点");
            }else{
                this.nodeItemArr = []
                this.nodeItemArr.push(item) 
            }
            
        },
        // 选中的配置节点赋值
        async submitConfig(){
            this.nodeArr.push(this.nodeItemArr[0])
            this.nodeArr = Array.from(new Set(this.nodeArr))
            
            this.addDialog = false
        },
        // 流程详情
		async detailTemplate(){
			const {
				data: res
			} = await this.$http.detailTemplate({params:{id:this.$route.query.id}})

			if (res.code == 200) {
				Object.keys(this.addProcessData).forEach(key=>{
                    this.addProcessData[key] = res.data[key]
                })
                Object.keys(this.detailList).forEach(key=>{
                    this.detailList[key] = res.data[key]
                })

                this.nodeArr = res.data.nodes

			} else {
				this.$message.error(res.msg);
			}
        },
       
    },
    mounted() {
        if( this.$route.query.id != undefined ){
            this.detailTemplate()
        }
        this.flowNodeAll()
    }
};
</script>
<style lang="scss" scoped>

</style>