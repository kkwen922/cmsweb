<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">

      <div>
        <i class="el-icon-search"></i>
        <span>篩選搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查詢搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="輸入搜索：">
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="事件" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>歷史事件</span>

    </el-card>

    <div class="table-container">
      <el-table
        ref="companyTable"
        style="width: 100%"
        :data="list"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        v-loading="listLoading" border>
        <!--        <el-table-column label="編號" width="100" align="center">-->
        <!--          <template slot-scope="scope">{{ scope.row.id }}</template>-->
        <!--        </el-table-column>-->

        <el-table-column prop="result" label="燈號" width="70%">
          <template slot-scope="scope">
            <span slot="reference" v-if="scope.row.status == 1">
              <i class="dotClass" style="background-color: springgreen"></i>
            </span>
            <span slot="reference" v-if="scope.row.status == 0">
              <i class="dotClass" style="background-color: red"></i>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="帳號" align="center">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>

        <el-table-column label="事件" align="center">
          <template slot-scope="scope">{{ scope.row.event }}</template>
        </el-table-column>

        <el-table-column label="結果" align="center">
          <template slot-scope="scope">{{ scope.row.result }}</template>
        </el-table-column>

        <el-table-column label="日期" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | formatDateTime }}</template>
        </el-table-column>

        <el-table-column label="備註" align="center">
          <template slot-scope="scope">{{ scope.row.memo }}</template>
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
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {fetchList} from '@/api/event'

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null
};

export default {
  name: "companyList",
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: Object.assign({}, defaultListQuery),
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
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },

    resetParentId() {
      this.listQuery.pageNum = 1;
      if (this.$route.query.parentId != null) {
        this.parentId = this.$route.query.parentId;
      } else {
        this.parentId = 0;
      }
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
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

  },

}

</script>

<style scoped>

.dotClass {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: block;
  margin-left: 10px;
}
</style>
