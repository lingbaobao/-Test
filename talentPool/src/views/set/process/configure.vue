<template>

  <div class="wrapper">
        <div class="content-wrap-mini">
            <div class="operate-btn">
                <el-button type="primary" size="mini" @click=goHistory>返回</el-button>
            </div>

            <div class="configure-wrap">
                <el-divider content-position="left" class="divider-main">阶段配置</el-divider>
                <ul>
                    <li class="add">
                        <div class="addConfigure" @click="addConfigure">
                            +添加阶段
                        </div>  
                    </li>
                    <el-collapse v-model="activeNames" accordion  @change="handleChange">
                        <li v-for="(item,index) in nodeArr" :key="index" class="itemLi" >
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
  props: {},
  data() {
    return {
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
                }
            })
            this.$message.success("阶段删除成功");
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
            this.nodeItemArr = []
            this.nodeItemArr.push(item) 
        },
        // 选中的配置节点赋值
        async submitConfig(){
            this.nodeArr.push(this.nodeItemArr[0])
            this.nodeArr = Array.from(new Set(this.nodeArr))

            this.addDialog = false
        },
  },
  mounted() {
	  this.flowNodeAll()
  }
};
</script>
<style lang="scss" scoped>

</style>