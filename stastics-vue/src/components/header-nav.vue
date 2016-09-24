<template>
  <div class="masthead clearfix">
    <div class="inner">
      <h3 class="masthead-brand">Data Center</h3>
      <ul class="nav masthead-nav">
        <li v-for="(index, item) in menuList" @click="toIndex(index)" :class="{'active': index == activeIndex}">
          <a style="cursor: pointer">{{item}}</a>
        </li>
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
    methods: {
      toIndex: function (index) {
        if(index == this.activeIndex) {
          return;
        }
        if(index == 0) {
          this.$route.router.go('/');
        } else if(index == 1) {
          this.$route.router.go('/account');
          console.log('true');
        }
      }
    },
    props:["activeIndex"],
    components: {}
  }
</script>
