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
        <Menu active-name="/home" ref="leftMenu" theme="dark" width="auto" :accordion="true" :open-names="[nave_checked.openName]" @on-select="goPath">
          <div class="layout-logo-left" style="text-align: center; "><span >八角星网络</span></div>

          <Submenu v-for="nav in naveList" :key="nav.menu_name" :name="nav.menu_name" >
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              {{nav.title}}
            </template>
            <Menu-item :name="item.path" v-for="item in nav.item" :key="item.path" >
              {{ item.name }}
            </Menu-item>
          </Submenu>
        </Menu>
      </i-col>
      <i-col span="21">
        <div class="layout-breadcrumb">
          <Breadcrumb>
            <Breadcrumb-item href="/home">首页</Breadcrumb-item>
            <Breadcrumb-item :href="nave_checked.path1">{{nave_checked.title1}}</Breadcrumb-item>
            <Breadcrumb-item :href="nave_checked.path2">{{nave_checked.title2}}</Breadcrumb-item>
          </Breadcrumb>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <slot>
            </slot>
          </div>
        </div>
        <div class="layout-copy">
          2011-2016 &copy; 八角星网络
        </div>
      </i-col>
    </Row>
  </div>
</template>
<script>
  export default {
      computed: {
      },
    watch: {
      $route (val, oldVal) {
        //路由可能有 两种情况 /home 或 /home/detail/1 长度超过2
        let _route = val.path.split('/');
        let route = "";
        if(_route.length && _route.length !== 2){
          route = '/' + _route[1]; //取到home
        } else {
          route = val.path;
        }

        this.$refs.leftMenu.currentActiveName = route;
        this.naveList.map(item => {
          item.item.map(_item => {
            if(_item.path === route){
              this.nave_checked.openName = [item.menu_name];
              this.nave_checked.path1 = item.path;
              this.nave_checked.title1 = item.title;
              this.nave_checked.path2 = _item.path;
              this.nave_checked.title2 = _item.name;
              return;
            }
          })
        });
      }
    },
    data () {
      return {
        current_menu: "",
        nave_checked: {
          openName: ['1'],
          path1: '/home',
          title1: '订单管理',
          path2: '/home',
          title2: '订单大厅',
        },
        naveList: [
          {
            menu_name: "1",
            title: '订单管理',
            path: '/home',
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
            path: '/user',
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
          {
            menu_name: "3",
            title: '个人信息',
            path: '/mine',
            item: [
              {
                path: '/mine',
                name: '个人资料'
              },
              {
                path: '/changeMine',
                name: '修改资料'
              },
              {
                path: '/changePassword',
                name: '修改密码'
              },
            ]
          },
        ]
      }
    },
    methods: {
      goPath (name) {
        this.$router.push({path: name, params: {userId: 123}});
      }
    }

  }
</script>
