<template>
  <div class="wrapper">
        <div class="positionDetail-wrap content-wrap-mini">
            <div class="operate-btn">
                <el-button type="primary" size="mini" @click=goHistory>返回</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="primary" size="mini" @click="editType">编辑</el-button>
            </div>

            <div class="detail-ul-wrap">
                <el-divider content-position="left" class="divider-main">面试类型详情</el-divider>
                <ul>
                    <li>
                        <em>名称</em>
                        <span>{{detailData.name}}</span>
                    </li>
                    <li>
                        <em>启用状态</em>
                        <span v-if="detailData.state == 1">启用</span>
                        <span v-if="detailData.state == 0">停用</span>
                    </li>
                    <li>
                        <em>备注</em>
                        <p><span>{{detailData.remark}}</span></p>
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
        // 编辑面试类型
        editType(){
            this.$router.push({
                path:'add?id='+this.$route.query.id
            })
        },
        // 面试类型详情
        async detailInterviewType(){
            const {
                data: res
            } = await this.$http.detailInterviewType({params:{id:this.$route.query.id}})

            if (res.code == 200) {
                this.detailData = res.data
            } else {
                this.$message.error(res.msg);
            }
        },
  },
  mounted() {
      this.detailInterviewType()
  }
};
</script>

<style scoped>
</style>