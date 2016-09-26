<template>
  <page-template active-index="1">
    <h2 class="sub-header">Account</h2>
    <date-picker v-ref:datepicker></date-picker>
    <form onsubmit="return false;" class="form-inline" role="form" style="margin-bottom: 20px">
      <div class="form-group">
        <label for="inputPassword2" class="sr-only">Password</label>
        <input type="text" class="form-control" id="inputPassword2" v-model="filter" placeholder="filter">
      </div>
      <button @click="onFilter" class="btn btn-default">filter</button>
      <button @click="total" class="btn btn-default">total</button>
      <button @click="onRefresh" class="btn btn-default">refresh</button>
    </form>
    <table class="table table-bordered table-striped table-hover">
      <thead>
      <tr>
        <th>#</th>
        <th>server_id</th>
        <th>role_id</th>
        <th>name</th>
        <th>platform</th>
        <th>log_time</th>
        <th>ip</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(index,item) in show_data" style="cursor: pointer" @click="toDetail(item.role_id)">
        <td>{{index+1}}</td>
        <td>{{item.server_id}}</td>
        <td>{{item.role_id}}</td>
        <td style="max-width: 100px">{{item.name}}</td>
        <td>{{item.platform}}</td>
        <td>{{formatTime(item.log_time)}}</td>
        <td>{{item.ip}}</td>
      </tr>
      </tbody>
    </table>
  </page-template>
</template>
<script>
  import PageTemplate from '../components/PageTemplate.vue';
  export default{
    components: {
      PageTemplate,
      'date-picker': require('../components/date-picker.vue')
    },
    data: function () {
      return {
        charge_data: [],
        show_data: [],
        filter: ""
      }
    },
    ready: function () {
      this.onRefresh();
    },
    methods: {
      onRefresh: function () {
        var _this = this;
        this.charge_data = [];
        this.show_data = [];
        this.$http.get(store.ACCOUNT_URL).then(function (response) {
          _this.charge_data = response.body;
          _this.onFilter();
        }, function (response) {

        })
      },
      formatTime: function (time) {
        var date = new Date(time * 1000);
        var hour = date.getHours();
        hour = hour < 10 ? "0" + hour : hour.toString();
        var minutes = date.getMinutes();
        minutes = minutes < 10 ? "0" + minutes : minutes.toString();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return month + "-" + day + "    " + hour + ":" + minutes;
      },
      total: function () {
        alert("total is " + this.show_data.length);
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
      toDetail(role_id) {
        store.role_id = role_id;
        console.log(role_id);
        this.$route.router.go('role')
      }
    }
  }
</script>
