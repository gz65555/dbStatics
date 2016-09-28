<template>
  <new-template active-index="2">
    <h2 class="sub-header">OnlineCount</h2>
    <form onsubmit="return false;" class="form-inline" role="form" style="margin-bottom: 20px">
   	    <div class="form-group">
   	    	<label>server_id</label>
    		<select v-model="selected" class="form-control">
      			<option value="1">1</option>
      			<option value="2">2</option>
    		</select>
    	</div>
    	<input class="form-control" v-model="myDate" type="date">
    	<button @click="onSend" class="btn btn-default">search</button>
    </form>
    <line-chart v-ref:chart1 chart_id="chart1"></line-chart>
  </new-template>
</template>
<script type="text/javascript">
	export default{
		data: function() {
			return {
				myDate:"",
				selected: 2
			}
		},
		methods: {
			onSend:function() {
				var params = {};
				params.server_id = this.selected;
				params.date = this.myDate;

        console.log('request for online_url');
				this.$http.post(store.ONLINE_URL, params).then(function(response){
          this.$refs.chart1.draw(response.body);
        }, function(response) {

				});
			}
		},
		ready: function(){
			this.myDate = store.getCurrentFormatDate();
		},
		components: {
			'new-template': require('../components/PageTemplate'),
			'date-picker': require('../components/date-picker'),
      'line-chart': require('../components/line-chart.vue')
		}
	}
</script>
