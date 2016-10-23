<template>
  <form onsubmit="return false;" class="form-inline" role="form" style="margin-bottom: 20px">
    <select v-model="selected" class="form-control">
      <option value="0">void</option>
      <option value="1">equal</option>
      <option value="2">equal or less</option>
      <option value="3">equal or greater</option>
    </select>
    <input id="testInput" class="form-control" v-model="myDate" type="date">
  </form>
</template>
<script>
  export default{
    data: function () {
      return {
        selected: 0,
        myDate: ""
      }
    },
    ready: function () {
      this.myDate = store.getCurrentFormatDate();
    }
  }
</script>
