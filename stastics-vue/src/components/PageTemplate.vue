<template>
  <div class="site-wrapper">
    <div class="site-wrapper-inner">
      <div class="cover-container">
        <header-nav :active-index="activeIndex"></header-nav>
        <div class="inner cover">
          <slot></slot>
        </div>
        <x-footer></x-footer>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    props: ["activeIndex"],
    components: {
      'header-nav': require('./header-nav.vue'),
      'x-footer': require('./footer.vue')
    }
  }
</script>
