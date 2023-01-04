<template>
  <div class="app-container">

    <div class="statistics-layout">

      <el-row>
        <el-col :span="8">
          <div class="out-border">
            <div class="layout-title">商品出貨失敗(TOP5)</div>
            <div style="padding: 10px;border-left:1px solid #DCDFE6">


              <div class="color-main address-content">
                <div id="DeliveryEventGraph" style="height: 350px;"></div>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="out-border">
            <div class="layout-title">機器溫度異常(TOP5)</div>
            <div style="padding: 10px;border-left:1px solid #DCDFE6">

              <div class="color-main address-content">
                <div id="TempEventGraph" style="height: 350px;"></div>
              </div>
            </div>
          </div>

        </el-col>

        <el-col :span="8">
          <div class="out-border">
            <div class="layout-title">機器離線30分鐘(TOP5)</div>
            <div style="padding: 10px;border-left:1px solid #DCDFE6">
              <div class="color-main address-content">
                <div id="OffLineGraph" style="height: 350px;"></div>
              </div>
            </div>
          </div>

        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div class="out-border">
            <div class="layout-title">事件次數</div>
            <div style="padding: 10px;border-left:1px solid #DCDFE6">
              <el-date-picker
                style="float: right;z-index: 1"
                size="small"
                v-model="orderCountDate"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="開始日期"
                end-placeholder="結束日期"
                @change="handleDateChange"
                :picker-options="pickerOptions">
              </el-date-picker>
              <div class="color-main address-content">
                <div id="EventCountGraph" style="height: 350px;"></div>
              </div>
            </div>
          </div>
        </el-col>


      </el-row>

    </div>
  </div>

</template>


<script>

import {fetchEventFail, fetchDeliverEventFail, fetchEventCount} from '@/api/event';

import echarts from "echarts";
import 'echarts/theme/shine.js'


export default {
  data() {

    return {
      charts_event: '',//事件統計
      deliveryList: null,
      tempList: null,
      offlineList: null,
      timeList: null,

      charts_deliver: '',//出貨失敗
      typeDeliverEvent: null,

      charts_temp: '',//溫度異常圓餅圖
      typeTempEvnt: null,

      charts_offline: '', //離線30分鐘
      typeOffLineEvent: null,


      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      img_home_order,
      img_home_today_amount,
      img_home_yesterday_amount
    }
  },
  created() {
    this.getEventCountList();
    this.getTempEvent();
    this.getOffLineEvent();
    this.getDeliveryEvent();
  },
  mounted() {

  },
  methods: {

    getDeliveryEvent() {
      fetchDeliverEventFail({eventType: '出貨失敗'}).then(response => {
        this.typeDeliverEvent = response.data;
        this.drawDeliveryEventPie("DeliveryEventGraph");
      });
    },

    getOffLineEvent() {
      fetchEventFail({eventType: '離線超過30分鐘'}).then(response => {
        this.typeOffLineEvent = response.data;
        this.drawOfflineEventPie("OffLineGraph");
      });
    },
    getTempEvent() { //溫度異常
      fetchEventFail({eventType: '溫度異常'}).then(response => {
        this.typeTempEvnt = response.data;
        this.drawTempEventPie("TempEventGraph");
      });
    },


    getEventCountList() { //事件次數
      fetchEventCount(this.listQuery).then(response => {
        this.deliveryList = response.data.deliveryList;
        this.offlineList = response.data.offlineList;
        this.tempList = response.data.tempList;
        this.timeList = response.data.timeList;
        console.log("this.deliveryList:" + this.deliveryList);
        console.log(this.offlineList);
        console.log(this.tempList);
        console.log(this.timeList);
        this.drawEventCount("EventCountGraph");
      });

    },


    drawEventCount(id) {
      this.charts_event = echarts.init(document.getElementById(id), 'shine');
      this.charts_event.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
          left: 'center',
          data: ['本年', '去年'],
          bottom: 0
        },
        xAxis: {
          type: 'category',
          name: 'x',
          splitLine: {show: false},
          data: this.timeList
        },
        grid: {
          left: '1%',
          right: '2%',
          bottom: '8%',
          containLabel: true
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: '出貨失敗',
            type: 'bar',
            stack: 'sum',
            data: this.deliveryList
          },
          {
            name: '溫度異常',
            type: 'bar',
            stack: 'sum',
            data: this.tempList
          },
          {
            name: '離線',
            type: 'bar',
            stack: 'sum',
            data: this.offlineList
          }
        ]
      })
    },


    drawTempEventPie(id) {
      this.charts_temp = echarts.init(document.getElementById(id), 'shine');
      this.charts_temp.setOption({

        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal',
          left: 'left',
          // data: ['直接存取', '郵件行銷', '聯盟廣告', '視訊廣告', '搜尋引擎']
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.typeTempEvnt,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },

    drawOfflineEventPie(id) {
      this.charts_offline = echarts.init(document.getElementById(id), 'shine');
      this.charts_offline.setOption({

        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal',
          left: 'left',
          // data: ['直接存取', '郵件行銷', '聯盟廣告', '視訊廣告', '搜尋引擎']
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.typeOffLineEvent,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },

    drawDeliveryEventPie(id) {
      this.charts_deliver = echarts.init(document.getElementById(id), 'shine');
      this.charts_deliver.setOption({

        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal',
          left: 'left',
          // data: ['直接存取', '郵件行銷', '聯盟廣告', '視訊廣告', '搜尋引擎']
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.typeDeliverEvent,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },

  }
}
</script>


<style scoped>
.app-container {
  margin-top: 1px;
  margin-left: 120px;
  margin-right: 120px;
}

.address-layout {
}

.total-layout {
  margin-top: 20px;
}

.total-frame {
  border: 1px solid #DCDFE6;
  padding: 20px;
  height: 100px;
}

.total-icon {
  color: #409EFF;
  width: 60px;
  height: 60px;
}

.total-title {
  position: relative;
  font-size: 16px;
  color: #909399;
  left: 70px;
  top: -50px;
}

.total-value {
  position: relative;
  font-size: 18px;
  color: #606266;
  left: 70px;
  top: -40px;
}

.un-handle-layout {
  margin-top: 20px;
  border: 1px solid #DCDFE6;
}

.layout-title {
  color: #606266;
  padding: 15px 20px;
  background: #F2F6FC;
  font-weight: bold;
}

.un-handle-content {
  padding: 20px 40px;
}

.un-handle-item {
  border-bottom: 1px solid #EBEEF5;
  padding: 10px;
}

.overview-layout {
  margin-top: 20px;
}

.overview-item-value {
  font-size: 24px;
  text-align: center;
}

.overview-item-title {
  margin-top: 10px;
  text-align: center;
}

.out-border {
  border: 1px solid #DCDFE6;
}

.statistics-layout {
  margin-top: 20px;
  border: 1px solid #DCDFE6;
}

.mine-layout {
  position: absolute;
  right: 140px;
  top: 107px;
  width: 250px;
  height: 235px;
}

.address-content {
  padding: 20px;
  font-size: 18px
}
</style>
