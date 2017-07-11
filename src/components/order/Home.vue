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
          <Cascader :data="serverList" v-model="checkServer" trigger="hover" style="width: 200px" placeholder="所在区服..." filterable></Cascader>
          <Select v-model="publish_model" style="width:200px" placeholder="发布频道...">
            <Option v-for="item in publishList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
          </Select>
          <i-input v-model="customer_model" placeholder="发布人昵称..." style="width: 200px"></i-input>
          <i-input v-model="title_model" placeholder="标题..." style="width: 200px"></i-input>
        </i-col>
        <i-col span="4">
          <i-button type="primary" @click="getRateList(1)">查询</i-button>
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
        customer_model: '',
        title_model: '',
        totalPage: 10,
        serverList: [],
        checkServer: [],
        publishList: [
          {
            value: 0,
            label: '全部频道'
          },
          {
            value: 1,
            label: '优质订单'
          },
          {
            value: 2,
            label: '公共频道'
          },
        ],
        publish_model: "",
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
                      this.showDetail(params.index)
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
        let params = {
          customerId: this.customerInfo.id,
          pageId: this.pageId
        };

        if(this.checkServer.length && this.checkServer.length === 2){
          params.serverId = this.checkServer[1];
        }

        if(this.publish_model){
          params.publishId = this.publish_model;
        }

        if(this.title_model){
          params.title = this.title_model;
        }

        if(this.customer_model){
          params.name = this.customer_model;
        }

        console.log('params' + JSON.stringify(this.checkServer));

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
          this.serverList = data;
        }).catch(err => {
          this.$Message.error(err);
        })
      },
      showDetail(){
        this.$router.push({path: name, params: {userId: 123}});
      }
    },
    components: {ISelect}
  };
</script>
