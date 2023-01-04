<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="company"
             :rules="rules"
             ref="companyFrom"
             label-width="150px">


      <el-form-item label="公司名稱：" prop="name">
        <el-input v-model="company.companyName"></el-input>
      </el-form-item>


      <el-form-item label="啟用狀態：">
        <el-radio-group v-model="company.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="統一編號：" prop="invoiceNumber">
        <el-input v-model="company.invoiceNumber"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('companyFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('companyFrom')">重置</el-button>
      </el-form-item>

    </el-form>
  </el-card>
</template>

<script>
import {fetchList, getCompany, updateCompany, createCompany} from '@/api/company';

const defaultCompany = {
  companyName: '',
  status: 0,
  invoiceNumber: ''
};
export default {
  name: "CompanyDetail",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      company: Object.assign({}, defaultCompany),
      selectCompanyList: [],

    }
  },
  created() {
    if (this.isEdit) {
      getCompany(this.$route.query.id).then(response => {
        this.company = response.data;
      });
    } else {
      this.company = Object.assign({}, defaultCompany);
    }
    this.getSelectCompanyList();
  },
  methods: {

    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否提交數據', '提示', {
            confirmButtonText: '確定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.isEdit) {
              updateCompany(this.$route.query.id, this.company).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              createCompany(this.company).then(response => {
                this.$refs[formName].resetFields();
                this.$message({
                  message: '提交成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            }
          });

        } else {
          this.$message({
            message: '驗證失敗',
            type: 'error',
            duration: 1000
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.company = Object.assign({}, defaultCompany);
      this.getSelectCompanyList();
    },
  }
}

</script>

<style scoped>

</style>
