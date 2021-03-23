<template>
    <el-form-item label="需求部门" :prop="departmentId">
        <el-select placeholder="请选择部门">
            <el-option
                v-for="item in departmentList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
        </el-select>
    </el-form-item>
</template>

<script>

export default {
  props: {
    departmentId:"" ,
    departmentList:''
  },
  data() {
    return {
        departmentList:'',
        departmentId:''
    };
  },
  methods: {
    // 查询所有部门
    async findAllDepartment() {
        const {
            data: res
        } = await this.$http.getFindAll()

        if (res.code == 200) {
            this.departmentList = res.data
        } else {
            this.$message.error(res.msg);
        }
    },
  },
  mounted() {
      this.findAllDepartment()
  }
};
</script>
<style lang="scss" scoped>

</style>