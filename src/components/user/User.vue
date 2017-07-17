<style scoped>
  .page-style {
    text-align: center;
    margin: 10px auto;
  }
</style>
<template>
  <div class="app">
    <div class="layout-content-main">
      <Row class="s_search">
        <i-col span="20">
          <i-input v-model="mobile_model" placeholder="联系手机" style="width: 200px"></i-input>
          <i-input v-model="openId" placeholder="openId" style="width: 200px"></i-input>
          <i-input v-model="customerName" placeholder="客户名称" style="width: 200px"></i-input>
          <Select v-model="customerType" style="width:200px" placeholder="会员类型...">
            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </i-col>
        <i-col span="4">
          <i-button type="primary" style="text-align: right" @click="search(1)">查询</i-button>
        </i-col>
      </Row>
      <Row>
        <i-table stripe :columns="customerCol" :data="customerList" @on-sort-change="beSort"></i-table>
      </Row>
      <Row>
        <Page :total="totalPage" :page-size="10" :current="searchParams.pageId" @on-change="search"
              class="page-style"></Page>
      </Row>
    </div>
  </div>
</template>
<script>
  import ISelect from "../../../node_modules/iview/src/components/select/select";
  import m_img from "../../assets/moren.png";
  import api from '@/fetch/api';
  export default {
    beforeMount () {
      this.customerInfo = JSON.parse(api.getCookie('customerInfo'));
    },
    mounted() {
      this.search();
    },
    watch: {
      loading (val, oldVal) {
        if (val) {
          this.$Message.loading({
            content: '正在加载中...',
            duration: 0
          });
        } else {
          this.$Message.destroy();
        }
      }
    },
    methods: {
      search (pageId, sorts){
        this.searchParams.pageId = pageId || this.searchParams.pageId;
        //传入排序字段
        if (sorts) {
          this.searchParams.sortKey = sorts.key;
          this.searchParams.order = sorts.order;
        }
        this.getCustomerList();
      },
      getCustomerList () {
        this.searchParams.openId = this.openId;

        this.searchParams.mobile = this.mobile_model;

        this.searchParams.customerName = this.customerName;

        this.searchParams.customerType = this.customerType;

        api.fetchPost(api.path.getCustomerList, this.searchParams).then((data) => {
          //控制加载条
          this.loading = false;
          this.customerList = data.data;
          this.totalPage = data.total;
        }).catch(err => {
          this.$Message.error(err);
        })
      },
      showDetail(id){
        this.$router.push({path: '/user/detail/' + id});
      },
      beSort(data){
        this.search(1, data);
      }
    },
    data () {
      return {
        userInfo: {},
        loading: true,
        totalPage: 10,
        searchParams: {
          pageId: 1
        },
        mobile_model: '',
        openId: '',
        customerName: '',
        customerType: '',
        customerList: [],
        typeList: [
          {
            value: 0,
            label: '全部会员'
          },
          {
            value: 1,
            label: '普通会员'
          },
          {
            value: 2,
            label: '代练'
          },
          {
            value: 3,
            label: '优质代练'
          },
        ],
        customerCol: [
          {
            m_img: '',
            title: '头像',
            key: 'avatar',
            render: (h, params) => {
              return h('div', [
                h('img', {
                  attrs: {
                    src: params.row.avatar ? params.row.avatar : m_img
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
            key: 'customerName'
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
            key: 'mobile'
          },
          {
            title: '会员类型',
            key: 'type',
            render: (h, params) => {
              switch (params.row.type) {
                case 1:
                  return h('tag', {
                  }, '普通会员');
                  break;
                case 2:
                  return h('tag', {
                    props: {
                      color: 'blue'
                    },
                  }, '普通代练');
                  break;
                case 3:
                  return h('tag', {
                    props: {
                      color: 'red'
                    },
                  }, '优质代练');
                  break;
                default:
                  return '未知';
                  break;
              }
            }
          },
          {
            title: '钱包余额',
            key: 'balanceAmount'
          },
          {
            title: '冻结余额',
            key: 'frozenAmount'
          },
          {
            title: '上次登录时间',
            key: 'lastLoginTime'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.showDetail(params.row.id)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.id)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ]
      }
    },

    components: {ISelect}
  };
</script>
