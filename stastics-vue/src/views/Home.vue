<template>
  <new-template active-index="0">
    <h2 class="sub-header">RoleCharge</h2>

    <date-picker v-ref:datepicker></date-picker>
    <form onsubmit="return false;" class="form-inline" role="form" style="margin-bottom: 20px">
      <div class="form-group">
        <label for="inputPassword2" class="sr-only">Password</label>
        <input type="text" class="form-control" id="inputPassword2" v-model="filter" placeholder="filter">
      </div>
      <button @click="onFilter" class="btn btn-default">filter</button>
      <button @click="onTotalCharge" class="btn btn-default">ChargeTotal</button>
      <button @click="onRefresh" class="btn btn-default">refresh</button>
    </form>
    <div class="table-responsive">
      <table class="table table-bordered table-striped table-hover">
        <thead>
        <tr>
          <th>#</th>
          <th>server_id</th>
          <th>role_id</th>
          <th>money</th>
          <th>log_date</th>
          <th>log_time</th>
        </tr>
        </thead>
        <tbody>
        <tr style="cursor: pointer" v-for="(index, item) in show_data" @click="toDetail(item.role_id)">
          <td>{{index + 1}}</td>
          <td>{{item.server_id}}</td>
          <td>{{item.role_id}}</td>
          <td>{{getMoney(item.money)}}</td>
          <td>{{item.log_date}}</td>
          <td>{{getTime(item.log_time)}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </new-template>
</template>
<script>
  export default{
    components: {
      'new-template': require('../components/PageTemplate.vue'),
      'date-picker': require('../components/date-picker.vue')
    },
    data(){
      return {
        charge_data: [],
        show_data: null,
        filter: ""
      }
    },
    ready: function () {
      this.onRefresh();
    },
    methods: {
      onRefresh: function () {
        var _this = this;
        this.show_data = [];
        console.log("aa");
        this.$http.get(store.CHARGE_URL).then(function (response) {
          _this.charge_data = response.body;
          _this.onFilter();
        }, function (response) {

        })
      },
      getMoney: function (money) {
        return parseInt(money) / 100;
      },
      getTime: function (time) {
        var date = new Date(time * 1000);
        var hour = date.getHours();
        hour = hour < 10 ? "0" + hour : hour.toString();
        var minutes = date.getMinutes();
        minutes = minutes < 10 ? "0" + minutes : minutes.toString();
        return hour + ":" + minutes;
      },
      onTotalCharge: function () {
        console.log(this.$refs.datepicker.myDate);
        var total = 0;
        this.show_data.forEach(function (item) {
          total += parseInt(item.money) / 100;
        });
        alert("total is " + total);
      },
      onFilter() {
        var filter;
        if (this.filter == "" || this.filter == null) {
          filter = {};
        } else {
          try {
            filter = JSON.parse(this.filter);
          }
          catch (e) {
            alert("filter error");
            return console.log(e);
          }
        }
        var selected = this.$refs.datepicker.selected;
        var date = this.$refs.datepicker.myDate;
        this.show_data = this.charge_data.filter(function (item) {
          var condition = true;
          for (var k in filter) {
            if (item[k].toString() != filter[k].toString()) {
              condition = false;
            }
          }
          //equal time
          var times;
          if (selected == 1) {
            times = store.getTimeStamp(date);
            if (item.log_time > times[1] || item.log_time < times[0]) {
              condition = false;
            }
          } else if (selected == 2) {
            times = store.getTimeStamp(date);
            if(item.log_time > times[1]) {
              condition = false;
            }
          } else if (selected == 3) {
            times = store.getTimeStamp(date);
            if(item.log_time < times[0]) {
              condition = false;
            }
          }
          return condition
        });
      },
      toDetail: function (role_id) {
        store.role_id = role_id;
        console.log(role_id);
        this.$route.router.go('role')
      }
    }
  }
</script>
