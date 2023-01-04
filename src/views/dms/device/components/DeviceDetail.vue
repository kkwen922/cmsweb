<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="device"
             :rules="rules"
             ref="deviceForm"
             label-width="150px">


      <div v-if="this.isEdit===true">
        <el-form-item label="設備編號：">
          <el-input v-model="device.deviceSn" style="width: 250px" readonly="true"></el-input>
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item label="設備編號：">
          <el-input v-model="device.deviceSn" style="width: 250px"></el-input>
        </el-form-item>
      </div>

      <el-form-item label="歸屬單位：">
        <el-select v-model="device.orgId"
                   placeholder="請選擇單位">
          <el-option
            v-for="item in selectOrgList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="所屬縣市：">
        <el-select v-model="device.cityId"
                   @change="changeCity"
                   placeholder="請選擇縣市">
          <el-option
            v-for="item in selectCityList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="所屬行政區：">
        <el-select v-model="device.areaId"
                   placeholder="請選擇行政區">
          <el-option
            v-for="item in areaName"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="設備地址：" prop="name">
        <el-input v-model="device.address"></el-input>
      </el-form-item>

      <el-form-item label="設備類型：">
        <el-select v-model="device.deviceType"
                   placeholder="請選擇類型">
          <el-option
            v-for="item in selectDeviceCateList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否啟用：">
        <el-radio-group v-model="device.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('deviceForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('deviceForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {
  fetchList, createDevice, updateDevice,
  getDevice, fetchOrgList, fetchCityList,
  fetchDeviceCateList, fetchCityAreaList
} from '@/api/device';

const defaultDevice = {
  title: '',
  deviceSn: '',
  address: '',
  cityId: null,
  status: 1
};
export default {
  name: "DeviceDetail",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      device: Object.assign({}, defaultDevice),
      selectDeviceList: [],
      selectOrgList: [],
      selectCityList: [], //城市列表
      selectAreaList: [], //行政區列表
      selectDeviceCateList: [],
      areaName: [],
      cityId: 0,
      areaId: 0,
      cityFlag: false,
      areaFlag: false,
      rules: {}
    }
  },
  created() {
    if (this.isEdit) {
      getDevice(this.$route.query.id).then(response => {
        this.device = response.data;
        console.log("cityId====>" + this.device.cityId);
        this.areaName = [];
        fetchCityAreaList(this.device.cityId, {pageSize: 100, pageNum: 1}).then(response => {
          this.areaName = response.data.list;
        });
      });
    } else {
      this.device = Object.assign({}, defaultDevice);
    }
    this.getSelectDeviceList();
    this.getSelectDeviceCateList();
    this.getSelectOrgList();
    this.getSelectCityList();

  },
  methods: {
    //根據cityId獲取行政區列表
    changeCity(val) {
      console.log("val====>" + val);
      if (val === null) {

      } else {
        console.log(val);
        // const roles=[];
        this.areaName = [];
        fetchCityAreaList(val, {pageSize: 100, pageNum: 1}).then(response => {
          this.areaName = response.data.list;
        });
        // for(var i of this.selectAreaList){
        //   if(val === i.cityId){
        //     console.log(i.name);
        //     roles.push({id:i.id,name:i.name})
        //   }
        // }
        //this.areaName= roles;
      }
    },
    getSelectDeviceList() {
      fetchList(0, {pageSize: 100, pageNum: 1}).then(response => {
        this.selectDeviceList = response.data.list;
        this.selectDeviceList.unshift({id: 0, title: '無上級選單'});
      });
    },
    getSelectOrgList() {
      fetchOrgList({pageSize: 100, pageNum: 1}).then(response => {
        this.selectOrgList = response.data.list;
        this.selectOrgList.unshift({id: 0, name: '請設定單位'});
      });
    },
    getSelectCityList() {
      fetchCityList({pageSize: 100, pageNum: 1}).then(response => {
        this.selectCityList = response.data.list;
        this.selectCityList.unshift({id: 0, name: '請設定所屬縣市'});
      });
    },

    getSelectDeviceCateList() {
      fetchDeviceCateList({pageSize: 100, pageNum: 1}).then(response => {
        this.selectDeviceCateList = response.data.list;
        this.selectDeviceCateList.unshift({id: 0, name: '請選擇設備類型'});
      });
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否提交數據', '提示', {
            confirmButtonText: '確定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.isEdit) {
              updateDevice(this.$route.query.id, this.device).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              createDevice(this.device).then(response => {
                this.$refs[formName].resetFields();
                this.resetForm(formName);
                this.$message({
                  message: '新增成功',
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
      this.device = Object.assign({}, defaultDevice);
      this.getSelectDeviceList();
    },
  }
}

</script>

<style scoped>

</style>
