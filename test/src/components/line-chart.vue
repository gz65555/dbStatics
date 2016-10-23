<template>
  <div :id="chart_id" style="height: 500px;width: 900px">

  </div>
</template>

<script>
  var echarts = require('echarts/lib/echarts');
  // 引入柱状图
  require('echarts/lib/chart/line');
  require('echarts/lib/chart/bar');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');

  export default{
    data:function() {
      return {};
    },
    props:["chart_id"],
    ready:function () {
      var myChart = echarts.init(document.getElementById(this.chart_id));
      this.myChart = myChart;
      // 绘制图表
      var option = {
        title: {
          text: 'Line Graph of Online Count'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: true,
          data: ['OnlineCount','test']
        },
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: false
            },
            magicType: {
              show: true,
              type: ['line', 'bar']
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          splitArea: {
            show: true
          },
          data: []
        }],
        yAxis: [{
          type: 'value',
          splitArea: {
            show: true
          }
        }],
        series: [{
          name: 'OnlineCount',
          type: 'line',
          data: []
        }]
      };
      myChart.setOption(option);
    },
    methods: {
      draw:function (items) {
        var times = [];
        var counts = [];
        items.forEach(function (item) {
          times.push(store.formatServerTime(item.log_time));
          counts.push(item.count);
        });
        this.myChart.setOption({
          xAxis: [{
            type: 'category',
            data: times
          }],
          series: [{
            name: '在线人数',
            type: 'line',
            data: counts
          }]
        })
      }
    },
    components: {}
  }
</script>
