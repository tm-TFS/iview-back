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
    </div>
  </div>
</template>
<script>
  import ISelect from "../../../node_modules/iview/src/components/select/select";
  export default {
    mounted() {
      this.getServerList();
      this.getRateList();
    },
    data () {
      return {
        loading: true,
        server_model: '',
        price_model: 0,
        serverList: [
          {
            value: 'wx01',
            label: '微信一区'
          },
          {
            value: 'wx02',
            label: '微信二区'
          },
          {
            value: 'qq01',
            label: 'QQ一区'
          },
        ],
        rateCol: [
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '年龄',
            key: 'age'
          },
          {
            title: '地址',
            key: 'address'
          }
        ],
        rateList: []
      }
    },
    methods: {
      getRateList () {
        api.fetchPost(api.path.getRateList, params).then((data) => {
          //控制加载条
          this.loading = false;
          this.rateList = data.list;
        }).catch(err => {
          this.$Message.error(err);
        })
      },
      getServerList () {
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
