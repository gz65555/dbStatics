<template>
  <head-nav></head-nav>
  <div class="container-fluid">
    <div class="row">
      <x-menu :active-index="activeIndex"></x-menu>
      <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        <!--<h1 class="page-header">Dashboard</h1>-->

        <!--<div class="row placeholders">-->
        <!--<div class="col-xs-6 col-sm-3 placeholder">-->
        <!--<img data-src="holder.js/200x200/auto/sky" class="img-responsive" alt="Generic placeholder thumbnail">-->
        <!--<h4>Label</h4>-->
        <!--<span class="text-muted">Something else</span>-->
        <!--</div>-->
        <!--<div class="col-xs-6 col-sm-3 placeholder">-->
        <!--<img data-src="holder.js/200x200/auto/vine" class="img-responsive" alt="Generic placeholder thumbnail">-->
        <!--<h4>Label</h4>-->
        <!--<span class="text-muted">Something else</span>-->
        <!--</div>-->
        <!--<div class="col-xs-6 col-sm-3 placeholder">-->
        <!--<img data-src="holder.js/200x200/auto/sky" class="img-responsive" alt="Generic placeholder thumbnail">-->
        <!--<h4>Label</h4>-->
        <!--<span class="text-muted">Something else</span>-->
        <!--</div>-->
        <!--<div class="col-xs-6 col-sm-3 placeholder">-->
        <!--<img data-src="holder.js/200x200/auto/vine" class="img-responsive" alt="Generic placeholder thumbnail">-->
        <!--<h4>Label</h4>-->
        <!--<span class="text-muted">Something else</span>-->
        <!--</div>-->
        <!--</div>-->

        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    },
    props: ["activeIndex"],
    components: {
      'head-nav': require("./header-nav.vue"),
      'x-menu': require('./menu.vue')
    }
  }
</script>
