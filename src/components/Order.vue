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
          <i-input v-model="server_model" placeholder="发布频道123" style="width: 200px"></i-input>
          <Input-numbert v-model="server_model" :min="1" placeholder="代练时限" style="width: 200px"></Input-numbert>
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
        rateList: [
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
