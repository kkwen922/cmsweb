<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">數據列表</span>
      <el-button
        class="btn-add"
        @click="handleAddDevice()"
        size="mini">
        新增
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="menuTable"
                style="width: 100%"
                :data="list"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                v-loading="listLoading" border>
        <el-table-column label="編號" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="設備類別" align="center">
          <template slot-scope="scope">{{ scope.row.deviceTypeName }}</template>
        </el-table-column>
        <el-table-column label="設備編號" align="center">
          <template slot-scope="scope">{{ scope.row.deviceSn }}</template>
        </el-table-column>
        <el-table-column label="歸屬單位" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.orgName }}</template>
        </el-table-column>
        <el-table-column label="縣市" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.cityName }}</template>
        </el-table-column>
        <el-table-column label="地址" width="300" align="center">
          <template slot-scope="scope">{{ scope.row.fullAddress }}</template>
        </el-table-column>
        <el-table-column label="創建時間" width="200" align="center">
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column label="狀態" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleUpdate(scope.$index, scope.row)">編輯
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {fetchList, updateStatus, deleteDevice} from '@/api/device'

export default {
  name: "deviceList",
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },

    }
  },
  created() {
    this.getList();
  },
  watch: {
    $route(route) {
      this.getList();
    }
  },
  methods: {

    handleAddDevice() {
      this.$router.push('/dms/addDevice');
    },
    handleUpdate(index, row) {
      this.$router.push({path: '/dms/updateDevice', query: {id: row.id}});
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },

    handleStatusChange(index, row) {
      updateStatus(row.id, {status: row.status}).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
      });
    },

    handleDelete(index, row) {
      this.$confirm('是否要删除該設備', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDevice(row.id).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          });
          this.getList();
        });
      });
    }
  },
  filters: {}
}

</script>

<style scoped>

</style>
