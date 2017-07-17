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
          <Cascader :data="serverList" v-model="checkServer" trigger="hover" style="width: 200px" placeholder="所在区服..."
                    filterable></Cascader>
          <Select v-model="publish_model" style="width:200px" placeholder="发布频道...">
            <Option v-for="item in publishList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="receive_model" style="width:200px" placeholder="是否被接手...">
            <Option v-for="item in receiveList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <i-input v-model="customer_model" placeholder="发布人昵称..." style="width: 200px"></i-input>
          <i-input v-model="title_model" placeholder="标题..." style="width: 200px"></i-input>
        </i-col>
        <i-col span="4">
          <i-button type="primary" style="text-align: right" @click="search(1)">查询</i-button>
        </i-col>
      </Row>
      <Row>
        <i-table stripe :columns="rateCol" :data="rateList" @on-sort-change="beSort"></i-table>
      </Row>
      <Row>
        <Page :total="totalPage" :page-size="10" :current="pageId" @on-change="search" class="page-style"></Page>
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
    },
    mounted() {
      this.getServerList();
      this.search();
    },
    data () {
      return {
        userInfo: {},
        searchParams: {},
        loading: true,
        customer_model: '',
        title_model: '',
        receive_model: '',
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
        receiveList: [
          {
            value: 0,
            label: '全部'
          },
          {
            value: 1,
            label: '未接手'
          },
          {
            value: 2,
            label: '已接手'
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
            key: 'publishName'
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
            title: '是否被接手',
            key: 'publishType',
            render: (h, params) => {
              if (params.row.isReceive === 1) {
                return h('span', {
                  style: {
                    color: '#2d8cf0'
                  }
                }, '未接手');
              } else {
                return h('span', {
                  style: {
                    color: '#2d8cf0'
                  }
                }, '已接手');
              }
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
            title: '发布价格',
            key: 'saveDeposit',
            sortable: 'custom'
          },
          {
            title: '效率保证金',
            key: 'efficiencyDeposit',
            sortable: 'custom'
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
        ],
        rateList: [],
        pageId: 1
      }
    },
    methods: {
      search (pageId, sorts){
        this.pageId = pageId || this.pageId;
        //传入排序字段
        if (sorts) {
          this.searchParams.sortKey = sorts.key;
          this.searchParams.order = sorts.order;
        }
        this.getRateList();
      },
      getRateList () {
        this.searchParams.customerId = this.customerInfo.id;
        this.searchParams.pageId = this.pageId;
        this.searchParams.receive_model = this.receive_model;
        this.searchParams.publishId = this.publish_model;

        if (this.checkServer.length && this.checkServer.length === 2) {
          this.searchParams.serverId = this.checkServer[1];
        } else {
          this.searchParams.serverId = 0;
        }

        if (this.title_model) {
          this.searchParams.title = this.title_model;
        }

        if (this.customer_model) {
          this.searchParams.name = this.customer_model;
        }

        api.fetchPost(api.path.getRateList, this.searchParams).then((data) => {
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
          //customerId: this.customerInfo.id,
          pageId: this.pageId
        };
        api.fetchPost(api.path.getServerList, params).then((data) => {
          this.serverList = data;
        }).catch(err => {
          this.$Message.error(err);
        })
      },
      showDetail(id){
        this.$router.push({path: '/home/detail/' + id});
      },
      beSort(data){
        this.search(1, data);
      }
    },
    components: {ISelect}
  };
</script>
