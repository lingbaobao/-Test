<template>
  <div class="wrapper">
        <div class="positionDetail-wrap content-wrap-mini">
            <div class="operate-btn">
                <el-button type="primary" size="mini" @click=goHistory>返回</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="primary" size="mini" @click="editReason">编辑</el-button>
            </div>

            <div class="detail-ul-wrap">
                <el-divider content-position="left" class="divider-main">状态详情</el-divider>
                <ul>
                    <li>
                        <em>编号</em>
                        <span>{{detailData.num}}</span>
                    </li>
                    <li>
                        <em>名称</em>
                        <span>{{detailData.name}}</span>
                    </li>
                    <li>
                        <em>是否启用</em>
                        <span v-if="detailData.state==1">启用</span>
                        <span v-else>停用</span>
                    </li>
                    <li>
                        <em>备注</em>
                        <span>{{detailData.remark}}</span>
                    </li>
                    <li>
                        <em>原因</em>
                        <p v-for="(item,index) in detailData.reasons" :key="index" class="list-p">
                            <span >{{item.name}}</span>
                        </p>
                    </li>
                </ul>
            </div>
            
        </div>

  </div>
</template>

<script>

export default {
  props: {},
  data() {
    return {
        detailData:[]
    };
  },
  methods: {
        // 返回上一页
        goHistory(){
            this.$router.go(-1)
        },
        // 编辑原因
        editReason(){
            this.$router.push({
                path:'add?id='+this.$route.query.id
            })
        },
        // 原因详情
        async flowStateDetail(){
            const {
                data: res
            } = await this.$http.flowStateDetail({params:{id:this.$route.query.id}})

            if (res.code == 200) {
                this.detailData = res.data
                
            } else {
                this.$message.error(res.msg);
            }
        },
  },
  mounted() {
      this.flowStateDetail()
  }
};
</script>

<style scoped>
</style>