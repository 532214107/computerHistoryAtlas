<template>
  <div class="layout">
    <div class="layout-header">
      <img style="cursor: pointer;" :src="logoImgUrl" alt="logo" @click="$router.push('/show')">
      <header-menu ref="headerMenu"></header-menu>
    </div>

    <router-view ref="content" />
  </div>
</template>

<script>
import headerMenu from '@/components/headerMenu'
import logoImg from '@/assets/image/logo1.png'

export default {
  name: 'PageView',
  components: { headerMenu },
  props: {
    avatar: {
      type: String,
      default: null
    },
    title: {
      type: [String, Boolean],
      default: true
    },
    logo: {
      type: String,
      default: null
    },
    directTabs: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      logoImgUrl: logoImg
    }
  }
}
</script>

<style lang="less" scoped>
  .layout {
    height: 100%;
  }
  .layout-header {
    display: flex;
    align-items: center;
    height: 90px;
    width: 100%;
    padding: 0 60px;
    background: #2d2e42;
    z-index: 999;
    
  }
</style>
