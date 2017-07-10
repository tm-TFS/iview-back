<style scoped>
  .page-style {
    text-align: center;
    margin: 10px auto;
  }
</style>
<template>
  <div class="app">
    <div class="layout-content-main">
      <Row class="s_search" >
        <i-col span="20">
            <span>
              所在区服
              <i-select v-model="server_model" size="small" style="width:100px">
                <Option v-for="item in serverList" :value="item.value" :key="item">{{ item.label }}</Option>
              </i-select>
            </span>
          <i-input v-model="server_model" placeholder="发布频道" style="width: 200px"></i-input>
          <Input-number v-model="price_model" :min="1"  style="width: 200px"></Input-number>
          <i-input v-model="server_model" placeholder="所在区服..." style="width: 200px"></i-input>
        </i-col>
        <i-col span="4">
          <i-button type="primary">Primary</i-button>
        </i-col>
      </Row>
      <Row >
        <i-table stripe :columns="rateCol" :data="rateList"></i-table>
      </Row>
      <Row>
        <Page :total="totalPage" :page-size="10" @on-change="getRateList" class="page-style"></Page>
      </Row>

    </div>
  </div>
</template>
<script>
  import ISelect from "../../../node_modules/iview/src/components/select/select";
  import api from '@/fetch/api';
  export default {
    beforeMount () {
      this.customerInfo = JSON.parse(api.getCookie('customerInfo'));
      console.log(this.customerInfo);
    },
    mounted() {
      this.getServerList();
      this.getRateList();
    },
    data () {
      return {
        userInfo: {},
        loading: true,
        server_model: '',
        price_model: 0,
        totalPage: 10,
        serverList: [],
        rateCol: [
          {
            title: 'ID',
            key: 'id',
            width: 80,
          },
          {
            title: '发布人昵称',
            key: 'customerName'
          },
          {
            title: '发布时间',
            key: 'createTime'
          },
          {
            title: '发布频道',
            key: 'publishType',
            render: (h, params) => {
              return params.row.publishType === 1 ? '优质订单' : '公共频道';
            }
          },
          {
            title: '所在区服',
            key: 'serverName'
          },
          {
            title: '标题',
            key: 'title'
          },
          {
            title: '安全保证金',
            key: 'saveDeposit'
          },
          {
            title: '效率保证金',
            key: 'efficiencyDeposit'
          },
          {
            title: '联系手机号',
            key: 'contactMobile'
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
                      this.show(params.index)
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
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        rateList: [],
        pageId: 1
      }
    },
    methods: {
      getRateList (pageId) {
        this.pageId = pageId || this.pageId;
        alert(this.pageId);
        let params = {
          customerId: this.customerInfo.id,
          pageId: this.pageId
        };
        api.fetchPost(api.path.getRateList, params).then((data) => {
          //控制加载条
          this.loading = false;
          this.rateList = data.data;
          this.totalPage = data.total;
        }).catch(err => {
          this.$Message.error(err);
        })
      },
      getServerList () {
        let params = {
          customerId: this.customerInfo.id,
          pageId: this.pageId
        };
        api.fetchPost(api.path.getServerList, params).then((data) => {
          this.serverList = data.list;
        }).catch(err => {
          this.$Message.error(err);
        })
      }
    },
    components: {ISelect}
  };
</script>
