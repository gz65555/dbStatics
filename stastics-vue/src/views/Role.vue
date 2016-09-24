<template>
  <page-template active-index="null">
    <h2 class="sub-header">Role</h2>
    <form onsubmit="return false;" class="form-inline" role="form" style="margin-bottom: 20px">
      <button @click="onRefresh" class="btn btn-default">refresh</button>
    </form>
    <div v-if="role_data">
      <table class="table table-bordered table-striped">
        <caption>basic info</caption>
        <thead>
        <tr>
          <th>server_id</th>
          <th>role_id</th>
          <th>name</th>
          <th>platform</th>
          <th>log_time</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{role_data.role.server_id}}</td>
          <td>{{role_data.role.role_id}}</td>
          <td style="max-width: 100px">{{role_data.role.name}}</td>
          <td>{{role_data.role.platform}}</td>
          <td>{{formatTime(role_data.role.log_time)}}</td>
        </tr>
        </tbody>
      </table>

      <table class="table table-bordered table-striped">
        <caption>create city</caption>
        <thead>
        <tr>
          <th>x</th>
          <th>y</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{role_data.create_city.x}}</td>
          <td>{{role_data.create_city.y}}</td>
        </tr>
        </tbody>
      </table>
      <table class="table table-bordered table-striped">
        <caption>charge log</caption>
        <thead>
        <tr>
          <th>charge_rmb</th>
          <th>log_time</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="charge in role_data.charges">
          <td>{{charge.rmb}}</td>
          <td>{{formatTime(charge.log_time)}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </page-template>
</template>
<script>
  export default{
    data: function () {
      return {
        role_data: null
      }
    },
    components: {
      "page-template": require('../components/PageTemplate.vue')
    },
    ready: function () {
      this.onRefresh();
    },
    methods: {
      onRefresh: function () {
        var _this = this;
        var role_id = store.role_id;
        if (role_id == null) {
          return;
        }
        this.role_data = null;
        this.$http.post(store.ROLE_URL, {role_id: role_id}).then(function (response) {
          _this.role_data = response.body;
          console.log(response.body)
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
        return month + "-" + day + " " + hour + ":" + minutes;
      }
    }
  }
</script>
