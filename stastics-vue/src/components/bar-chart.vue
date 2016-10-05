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
    data: function () {
      return {
        _title:""
      };
    },
    props: ["chart_id"],
    ready: function () {
      var myChart = echarts.init(document.getElementById(this.chart_id));
      this.myChart = myChart;
      // 绘制图表
      var option = {
        title: {
          text: ""
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: true,
          data: ['count', 'test']
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
          name: 'count',
          type: 'bar',
          data: []
        }]
      };
      myChart.setOption(option);
    },
    computed: {
      title: {
        set: function (v) {
          console.log('set');
          this.myChart.setOption({
            title: {
              text: v
            }
          })
        }
      }
    },
    methods: {
      draw: function (data) {
        this.myChart.setOption({
          xAxis: [{
            name: "itemName",
            type: 'category',
            data: data.XItems
          }],
          series: [{
            name: "count",
            type: 'bar',
            data: data.YItems
          }]
        })
      }
    },
    components: {}
  }
</script>
