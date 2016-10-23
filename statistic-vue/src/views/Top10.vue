<template>
  <new-template active-index="3">
    <h2 class="sub-header">OnlineCount</h2>
    <form onsubmit="return false;" class="form-inline" role="form" style="margin-bottom: 20px">
      <div class="form-group">
        <label>server_id</label>
        <select @change="onChange" v-model="selected" class="form-control">
          <option v-for="(index, item) in options" :value="index">{{item}}</option>
        </select>
      </div>
    </form>
    <bar-chart v-ref:chart1 chart_id="chart1"></bar-chart>
  </new-template>
</template>
<script type="text/javascript">
  export default{
    data: function() {
      return {
        selected: "0",
        title:"",
        options:["BuyItem", "CoinItem", "GoldItem", "SubGold"],
        data: {}
      }
    },
    methods: {
      onChange:function() {
        console.log(this.selected);
        this.title = this.options[this.selected];
        this.$refs.chart1.title = this.title;
        if(!data[this.selected]) {

        } else {

        }

        postTop10 = (type)=> {
          this.$http.post(store.TOP10_URL, {type:type}).then(function (response) {
            data[type] = response.body;
            
          })
        }
      }
    },
    ready: function(){
      this.title = this.options[this.selected];
      this.$refs.chart1.title = this.title;
    },
    components: {
      'new-template': require('../components/PageTemplate'),
      'date-picker': require('../components/date-picker'),
      'bar-chart': require('../components/bar-chart.vue')
    }
  }
</script>
