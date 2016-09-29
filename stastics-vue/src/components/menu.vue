<template>
  <div class="col-sm-3 col-md-2 sidebar">
    <ul v-if="list1" class="nav nav-sidebar">
      <li @click="toIndex(index)" v-for="(index,item) in list1" :class="{'active':activeIndex == index}"><a style="cursor: pointer">{{item}}</a></li>
    </ul>
    <ul v-if="list2" class="nav nav-sidebar">
      <li v-for="item in list2" :class="active"><a style="cursor: pointer">{{item}}</a></li>
    </ul>
    <ul v-if="list3" class="nav nav-sidebar">
      <li v-for="item in list2" :class="active"><a style="cursor: pointer">{{item}}</a></li>
    </ul>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        list1:["RoleCharge", "Account", "OnlineCount", "Top10"]
      }
    },
    props:["activeIndex"],
    methods: {
      toIndex:function (index) {
        if(index == this.activeIndex) {
          return;
        }
        if(index == 0) {
          this.$route.router.go('/');
        } else if(index == 1) {
          this.$route.router.go('/account');
        } else if(index == 2) {
          this.$route.router.go('/online-count');
        } else if(index == 3) {
          this.$route.router.go('/top10')
        }
      }
    },
    components: {

    }
  }
</script>
