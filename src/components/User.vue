<style scoped>
</style>
<template>
  <div class="app">
    <div class="layout-content-main">
      <Row class="s_search" >
        <i-col span="20">
            <span>
              所在区服
              <i-select v-model="server_model" size="small" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
              </i-select>
            </span>
          <i-input v-model="server_model" placeholder="openId" style="width: 200px"></i-input>
          <Input-numbert v-model="server_model" :min="1" placeholder="客户名称" style="width: 200px"></Input-numbert>
          <i-input v-model="server_model" placeholder="所在区服..." style="width: 200px"></i-input>
        </i-col>
        <i-col span="4">
          <i-button type="primary">Primary</i-button>
        </i-col>
      </Row>
      <Row >
        <i-table stripe :columns="rateCol" :data="rateList"></i-table>
      </Row>
    </div>
  </div>
</template>
<script>
  import ISelect from "../../node_modules/iview/src/components/select/select";
  export default {
    data () {
      return {
        server_model: '',
        rateCol: [
          {
            m_img: 'http://www.thinkphptest.com/public/static/img/moren.png',
            title: '头像',
            key: 'avatar',
            render: (h, params) => {
              return h('div', [
                h('img', {
                  attrs: {
                    src: params.row.avatar ? params.row.avatar : 'http://www.thinkphptest.com/public/static/img/moren.png'
                  },
                  style: {
                    width: '70px',
                    height: '70px'
                  },
                })
              ]);
            }
          },
          {
            title: '昵称',
            key: 'name'
          },
          {
            title: '手机号码',
            key: 'mobile'
          },
          {
            title: 'openid',
            key: 'openid'
          },
          {
            title: '联系手机',
            key: 'contactMobile'
          },
          {
            title: '绑定手机',
            key: 'contactMobile'
          },
          {
            title: '登录验证',
            key: 'checkFunc'
          }
        ],
        rateList: [
          {
            name: '王小明',
            avatar: 'http://linglong.mengdie.com/static/index/src/img/index/t6.png',
            address: '北京市朝阳区芍药居',

          },
          {
            name: '张小刚',
            age: 25,
            address: '北京市海淀区西二旗'
          },
          {
            name: '李小红',
            age: 30,
            address: '上海市浦东新区世纪大道'
          },
          {
            name: '周小伟',
            age: 26,
            address: '深圳市南山区深南大道'
          },
          {
            name: '王小明',
            age: 18,
            address: '北京市朝阳区芍药居'
          },
          {
            name: '张小刚',
            age: 25,
            address: '北京市海淀区西二旗'
          },
          {
            name: '李小红',
            age: 30,
            address: '上海市浦东新区世纪大道'
          },
          {
            name: '周小伟',
            age: 26,
            address: '深圳市南山区深南大道'
          }
        ]
      }
    },
    components: {ISelect}
  };
</script>
