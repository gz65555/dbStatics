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
        var postTop10 = (type)=> {
          this.$http.post(store.TOP10_URL, {type:type}).then((response)=> {
//            response.body.sort(function(a, b){
//              return b.count - a.count;
//            });
            var items = {XItems:[], YItems:[]};
            response.body.forEach(function(item) {
              items.YItems.push(item.count);
              items.XItems.push(item._id);
            });
            data[type] = items;
            this.$refs.chart1.draw(items);
          })
        }
        this.title = this.options[this.selected];
        this.$refs.chart1.title = this.title;
        var data = this.data;
        if(!data[this.selected]) {
          postTop10(this.selected);
        } else {
          this.$refs.chart1.draw(data[this.selected]);
        }
      }
    },
    ready: function(){
      this.title = this.options[this.selected];
      this.$refs.chart1.title = this.title;
      this.onChange();
    },
    components: {
      'new-template': require('../components/PageTemplate'),
      'date-picker': require('../components/date-picker'),
      'bar-chart': require('../components/bar-chart.vue')
    }
  }
</script>
