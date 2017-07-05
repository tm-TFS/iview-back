<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
  }

  .layout-breadcrumb {
    padding: 10px 15px 0;
  }

  .layout-content {
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }

  .layout-content-main {
    padding: 10px;
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }

  .layout-menu-left {
    background: #464c5b;
  }

  .layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }

  .layout-ceiling {
    background: #464c5b;
    padding: 10px 0;
    overflow: hidden;
  }

  .layout-ceiling-main {
    float: right;
    margin-right: 15px;
  }

  .layout-ceiling-main a {
    color: #9ba7b5;
  }
</style>
<template>
  <div class="layout">
    <div class="layout-ceiling">
      <div class="layout-ceiling-main">
        <a href="#">注册登录</a> |
        <a href="#">帮助中心</a> |
        <a href="#">安全中心</a> |
        <a href="#">服务大厅</a>
      </div>
    </div>
    <Row type="flex">
      <i-col span="3" class="layout-menu-left">
        <Menu active-name="/home" theme="dark" width="auto" :accordion="true" :open-names="openNames" @on-select="goPath">
          <div class="layout-logo-left"></div>

          <Submenu v-for="nav in naveList" :key="nav.menu_name" :name="nav.menu_name" >
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              {{nav.title}}
            </template>
            <Menu-item :name="item.path" v-for="item in nav.item" :key="item.path" >
              {{ item.name }}
            </Menu-item>
          </Submenu>

          <!--<Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              订单管理
            </template>
            <Menu-item name="/home">任务大厅</Menu-item>
            <Menu-item name="/order">已接订单</Menu-item>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>
              导航二
            </template>
            <Menu-item name="2-1">选项 1</Menu-item>
            <Menu-item name="2-2">选项 2</Menu-item>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              导航三
            </template>
            <Menu-item name="3-1">选项 1</Menu-item>
            <Menu-item name="3-2">选项 2</Menu-item>
          </Submenu>-->
        </Menu>
      </i-col>
      <i-col span="21">
        <div class="layout-breadcrumb">
          <Breadcrumb>
            <Breadcrumb-item href="/home">首页</Breadcrumb-item>
            <Breadcrumb-item href="#">{{bread1[0].title}}</Breadcrumb-item>
            <Breadcrumb-item>{{bread2.name}}</Breadcrumb-item>
          </Breadcrumb>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <slot>
            </slot>
          </div>
        </div>
        <div class="layout-copy">
          2011-2016 &copy; TalkingData
        </div>
      </i-col>
    </Row>
  </div>
</template>
<script>
  export default {
      computed: {
        bread1 () {
            return this.naveList.filter(item => {
                return item.menu_name === this.openNames[0];
            })
        }
      },
    data () {
      return {
        current_menu: "",
        openNames: ['1'],
        activeName: '',
        bread2: {},
        naveList: [
          {
            menu_name: "1",
            title: '订单管理',
            item: [
              {
                path: '/home',
                name: '订单大厅'
              },
              {
                path: '/order',
                name: '已接订单'
              },
            ]
          },
          {
            menu_name: "2",
            title: '会员管理',
            item: [
              {
                path: '/user',
                name: '会员列表'
              },
              {
                path: '/user/role',
                name: '会员权限'
              },
            ]
          },
        ]
      }
    },
    methods: {
      goPath (name) {
        this.$router.push({path: name, params: {userId: 123}});
        this.bread1[0].item.map(item => {
            if(item.path === this.$route.path){
              this.bread2 = item
            }
        });
        console.log(JSON.stringify(this.bread2));

      }
    }

  }
</script>
