<template>
  <div class="masthead clearfix">
    <div class="inner">
      <h3 class="masthead-brand">Data Center</h3>
      <ul class="nav masthead-nav">
        <li v-for="item in menuList"><a href="#">{{item}}</a></li>
        <!--<li class="active"><a href="#">Charge</a></li>-->
        <!--<li><a href="#">Account</a></li>-->
      </ul>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        menuList:[
          "Charge",
          "Account"
        ]
      }
    },
    props:["activeIndex"],
    components: {}
  }
</script>
