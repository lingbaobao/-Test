<template>

  <div class="wrapper">

        <!-- 反馈结果 -->
        <el-dialog title="提示" :visible.sync="replyDialog">
            <div class="addDialog-wrap">
                <div class="" v-show="replySucess">
                    <p>您已成功提交答复，感谢您的反馈！</p>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="replyDialog = false">关闭</el-button>
                    </span>
                </div>
                <div class="" v-show="!replySucess">
                    <!-- <el-checkbox-group v-model="reasons">
                        <el-checkbox v-for="item in ReasonData" :label="item.id" :key="item.id" :value="item.id" @change="onReasonItemList(item)">
                        <div class="radioId">
                                {{item.num}}-{{item.name}}
                            </div>
                            <span class="remark">({{item.remark}})</span>
                        </el-checkbox>
                    </el-checkbox-group> -->
                    <div>
                        <p style="margin-bottom:10px">请填写不参加面试的原因：</p>
                         <el-input type="textarea" placeholder="请输入原因" v-model="replayForm.reason" maxlength="150" show-word-limit :rows="6"></el-input>
                    </div>
                   
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="submitReply">提交</el-button>
                        <el-button @click="replyDialog = false">关闭</el-button>
                    </span>
                </div>

                
            </div>
            
        </el-dialog>


  </div>
</template>

<script>

export default {
  props: {},
  data() {
    return {
        replyDialog:true,
        replySucess:false,
        replayForm:{
            state:'',
            reason:''
        }
    };
  },
  methods: {
		// 选择发布渠道
		async submitChannel(){
			const {
				data: res
			} = await this.$http.selectChannel(this.selectChannelData)

			if (res.code == 200) {
				this.$message.success("发布成功");
			} else {
				this.$message.error(res.msg);
			}
        },
        submitReply(){

        }
  },
  mounted() {
	  
  }
};
</script>
<style lang="scss" scoped>

</style>