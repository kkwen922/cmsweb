<template>
  <div class="app-container">

    <h2>微服務架構圖</h2>

    <el-card class="operate-container" shadow="never">
      <br>
      <img width="80%" src="../.././assets/images/cloud.png" alt="">
    </el-card>

    <h2>服務架構圖</h2>
    <el-card class="operate-container" shadow="never">
      <br>
      <img width="80%" src="../.././assets/images/simple.png" alt="">
    </el-card>

    <h2>Spring Cloud Gateway & OAuth </h2>

    <el-card class="operate-container" shadow="never">
      <br>
      <img width="80%" src="../.././assets/images/white.png" alt="">
      <br>
      <img width="80%" src="../.././assets/images/normal.png" alt="">
    </el-card>

    <br>
    <h2>前端使用的框架/技術</h2>
    <div class="table-container">
      <el-table :data="tableData1"
                :header-cell-style="tableHeaderColor"
                ref="multipleTable"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index" width="100" align="center"></el-table-column>
        <el-table-column prop="frontend" label="框架" width="350" sortable align="center"></el-table-column>
        <el-table-column prop="desc1" label="說明" width="350" align="center"></el-table-column>
        <el-table-column prop="url" label="網站" width="350" align="center"></el-table-column>

      </el-table>

    </div>


    <h2>後端使用的框架/技術</h2>
    <div class="table-container">
      <el-table :data="tableData2"
                :header-cell-style="tableHeaderColor"
                ref="multipleTable"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index" width="100" align="center"></el-table-column>
        <el-table-column prop="backend" label="框架" width="350" sortable align="center"></el-table-column>
        <el-table-column prop="desc2" label="說明" width="350" align="center"></el-table-column>
        <el-table-column prop="url" label="網站" width="350" align="center"></el-table-column>

      </el-table>
    </div>

    <h2>ER Model</h2>
    <el-card class="operate-container" shadow="never">
      <br>
      <img width="100%" src="../.././assets/images/er.png" alt="">
    </el-card>


  </div>
</template>

<script>
export default {

  data() {
    return {

      tableData1: [{
        id: '1',
        frontend: 'Vue',
        desc1: '前端框架',
        url: 'https://vuejs.org/'
      }, {
        frontend: 'Vue-router	',
        desc1: '路由框架',
        url: 'https://router.vuejs.org/'
      }, {
        frontend: 'Vuex',
        desc1: '全局狀態管理框架',
        url: 'https://vuex.vuejs.org/'
      }, {
        frontend: 'Element',
        desc1: '前端UI框架',
        url: 'https://element.eleme.io/'
      }, {
        frontend: 'Axios',
        desc1: '前端HTTP框架',
        url: 'https://github.com/axios/axios'
      }, {
        frontend: 'v-charts',
        desc1: '基於Echarts的圖表框架',
        url: 'https://v-charts.js.org/'
      }, {
        frontend: 'Js-cookie',
        desc1: 'cookie管理工具',
        url: 'https://github.com/js-cookie/js-cookie'
      }],


      tableData2: [{
        id: '1',
        backend: 'SpringBoot',
        desc2: '容器+MVC框架',
        url: 'https://spring.io/projects/spring-boot'
      }, {
        backend: 'SpringSecurity',
        desc2: '認證和授權框架',
        url: 'https://spring.io/projects/spring-security'
      }, {
        backend: 'MyBatis',
        desc2: 'ORM框架',
        url: 'http://www.mybatis.org/mybatis-3/zh/index.html'
      }, {
        backend: 'RabbitMQ',
        desc2: '消息佇列',
        url: 'https://www.rabbitmq.com/'
      }, {
        backend: 'Swagger-UI',
        desc2: 'API文件產生工具',
        url: 'https://github.com/swagger-api/swagger-ui'
      }, {
        backend: 'PageHelper',
        desc2: 'MyBatis物理分頁插件',
        url: 'http://git.oschina.net/free/Mybatis_PageHelper'
      }, {
        backend: 'JWT',
        desc2: 'JWT登入支援',
        url: 'https://jwt.io/'
      }]
    };
  },
  methods: {

    //table的双色条纹
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    }

  }
}
</script>
