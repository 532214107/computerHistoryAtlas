<template>
  <div class="menus">
    <div v-for="(menu, index) in menus" :key="index" class="menu-item">
      <router-link :to="{ name: menu.name }">{{ menu.label }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menus: [{
        label: '图谱展示',
        name: 'home'
      }, {
        label: '知识体系',
        name: 'system'
      }, {
        label: '数据统计',
        name: 'statistics'
      }, {
        label: '数据搜索',
        name: 'search'
      },{
        label: "信息抽取",
        name: "informationExtraction"
      }]
    }
  }
}
</script>

<style lang="less" scoped>
  .menus {
    flex: 1;
    display: flex;
    margin-left: 60px;
    .menu-item {
      color: #007acf;
      font-size: 24px;
      font-weight: bold;
      padding: 0 40px;
      cursor: pointer;
      a {
        color: #007acf;
        text-decoration:none;
        &.router-link-active {
          color: #fff;
        }
      }
    }
  }
</style>
