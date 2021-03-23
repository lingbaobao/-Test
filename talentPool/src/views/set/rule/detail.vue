<template>
  <div class="wrapper">
        <div class="positionDetail-wrap content-wrap-mini">
            <div class="operate-btn">
                <el-button type="primary" size="mini" @click=goHistory>返回</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="primary" size="mini" @click="editReason">编辑</el-button>
            </div>

            <div class="detail-ul-wrap">
                <el-divider content-position="left" class="divider-main">规则详情</el-divider>
                <ul>
                    <li>
                        <em>收取邮箱</em>
                        <span>{{detailData.email}}</span>
                    </li>
                    <li>
                        <em>归档到职位</em>
                        <span>{{detailData.postName}}</span>
                    </li>
                    <li>
                        <em>归档规则</em>
                        <p><span>{{detailData.conditionsName}}{{detailData.conditionsCronName}}{{detailData.conditionsCronValue}}</span></p>
                        <p style="margin-left:10px"><span>{{detailData.postAddress}}{{detailData.addressCronName}}{{detailData.addressCronValue}}</span></p>
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
        // 编辑规则
        editReason(){
            this.$router.push({
                path:'add?id='+this.$route.query.id
            })
        },
        // 规则详情
        async rulesDetail(){
            const {
                data: res
            } = await this.$http.rulesDetail({params:{id:this.$route.query.id}})

            if (res.code == 200) {
                this.detailData = res.data
            } else {
                this.$message.error(res.msg);
            }
        },
  },
  mounted() {
      this.rulesDetail()
  }
};
</script>

<style scoped>
</style>