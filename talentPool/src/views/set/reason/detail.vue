<template>
  <div class="wrapper">
        <div class="positionDetail-wrap content-wrap-mini">
            <div class="operate-btn">
                <el-button type="primary" size="mini" @click=goHistory>返回</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="primary" size="mini" @click="editReason">编辑</el-button>
            </div>

            <div class="detail-ul-wrap">
                <el-divider content-position="left" class="divider-main">原因详情</el-divider>
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
        async flowReasonDetail(){
            const {
                data: res
            } = await this.$http.flowReasonDetail({params:{id:this.$route.query.id}})

            if (res.code == 200) {
                this.detailData = res.data
                
            } else {
                this.$message.error(res.msg);
            }
        },
  },
  mounted() {
      this.flowReasonDetail()
  }
};
</script>

<style scoped>
</style>