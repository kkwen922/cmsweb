<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">數據列表</span>
      <el-button
        class="btn-add"
        @click="handleAddOrganization()"
        size="mini">
        新增
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="orgTable"
                style="width: 100%"
                :data="list"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                v-loading="listLoading" border>
        <el-table-column label="編號" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <!--        <el-table-column label="單位代碼" align="center">-->
        <!--          <template slot-scope="scope">{{scope.row.nameSn}}</template>-->
        <!--        </el-table-column>-->
        <el-table-column label="單位名稱" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="層級" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.level | levelFilter }}</template>
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
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.sort }}</template>
        </el-table-column>
        <el-table-column label="設置" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              :disabled="scope.row.level | disableNextLevel"
              @click="handleShowNextLevel(scope.$index, scope.row)">查看下級
            </el-button>
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
import {fetchList, updateStatus, updateOrganization, deleteOrganization} from '@/api/organization'

export default {
  name: "organizationList",
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      parentId: 0
    }
  },
  created() {
    this.resetParentId();
    this.getList();
  },
  watch: {
    $route(route) {
      this.resetParentId();
      this.getList();
    }
  },
  methods: {
    resetParentId() {
      this.listQuery.pageNum = 1;
      if (this.$route.query.parentId != null) {
        this.parentId = this.$route.query.parentId;
      } else {
        this.parentId = 0;
      }
    },
    handleAddOrganization() {
      this.$router.push('/oms/addOrganization');
    },
    getList() {
      this.listLoading = true;
      fetchList(this.parentId, this.listQuery).then(response => {
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
    handleShowNextLevel(index, row) {
      this.$router.push({path: '/oms/organization', query: {parentId: row.id}})
    },
    handleUpdate(index, row) {
      this.$router.push({path: '/oms/updateOrganization', query: {id: row.id}});
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除該單位', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOrganization(row.id).then(response => {
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
  filters: {
    levelFilter(value) {
      if (value === 0) {
        return '一級';
      } else if (value === 1) {
        return '二級';
      } else if (value == 2) {
        return '三級'
      }
    },
    disableNextLevel(value) {
      if (value === 0 || value === 1) {
        return false;
      } else {
        return true;
      }
    }
  }
}

</script>

<style scoped>

</style>
