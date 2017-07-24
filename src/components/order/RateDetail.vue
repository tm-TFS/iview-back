<template>

  <div class="app">
    <div class="layout-content-main">
      <div style="background:#eee;padding: 5px">

        <Card :bordered="false">

          <Row>
            <i-col span="16">
              <i-button type="error">撤下</i-button>
            </i-col>
            <i-col span="8" style="text-align: right">
              <i-button @click="goBack()">返回</i-button>
              <i-button type="info" @click="save()">保存</i-button>
            </i-col>
          </Row>
        </Card>

        <!-- 订单基本信息 -->
        <Card :bordered="true">
          <p slot="title">基本信息： </p>
          <Row>
            <i-col span="12">
              订单标题： {{ detail.title }}
            </i-col>
            <i-col span="12">
              发布人： {{ detail.customerName }}
            </i-col>
          </Row>
          <Row>
            <i-col span="12">
              发布价格： {{ detail.price }}
            </i-col>
            <i-col span="12">
              时间限制： {{ detail.timeLimit }} 小时
            </i-col>
          </Row>
          <Row>
            <i-col span="12">
              安全保证金： {{ detail.saveDeposit }} 元  <span style="color: red">(针对接单用户)</span>
            </i-col>
            <i-col span="12">
              效率保证金： {{ detail.efficiencyDeposit }} 元 <span style="color: red">(针对接单用户)</span>
            </i-col>
          </Row>
          <Row>
            <i-col span="12">
              发布频道： {{ detail.publishType === 2 ? '公共频道' : '优质订单' }}
            </i-col>
            <i-col span="12">
              发布时间： {{ detail.createTime }}
            </i-col>
          </Row>
          <Row>
            订单备注：
            <i-input v-model="detail.require" type="textarea"></i-input>
          </Row>
          <Row>
            其他要求：
            <i-input v-model="detail.other" type="textarea"></i-input>
          </Row>
        </Card>

        <!--账号信息-->
        <Card :bordered="true">
          <p slot="title">账号信息： </p>
          <Row>
            <i-col span="12">
              所在区服： {{ detail.serverName }}
            </i-col>
            <i-col span="12">
              游戏昵称： {{ detail.nickname }}
            </i-col>
          </Row>
          <Row>
            <i-col span="12">
              游戏账号： {{ detail.account }}
            </i-col>
            <i-col span="12">
              游戏密码： {{ detail.password }}
            </i-col>
          </Row>
          <Row>
            <i-col span="12">
              联系人手机： {{ detail.connectMobil }}
            </i-col>
            <i-col span="12">
              联系人微信： {{ detail.wechatNum }}
            </i-col>
          </Row>
          <Row>
            <i-col span="12">
              验证码手机： {{ detail.codeMobil }}
            </i-col>
          </Row>
        </Card>

        <!--发布人信息-->
        <Card :bordered="true">
          <p slot="title">发布人信息： </p>
          <Row>
            <i-col span="12">
              发布人编号： {{ detail.customerId }}
            </i-col>
            <i-col span="12">
              发布人： {{ detail.customerName }}
            </i-col>
          </Row>
          <Row>
            <i-col span="12">
              创建时间： {{ detail.createTime }}
            </i-col>
            <i-col span="12">
              更新时间： {{ detail.updateTime }}
            </i-col>
          </Row>
        </Card>
      </div>

    </div>
  </div>
</template>


<script>
  import api from '@/fetch/api';
  export default {
    mounted() {
      this.getServerList();
      this.getRateDetail();
    },
    data () {
      return {
        userInfo: {},
        loading: true,
        detail: {},
        serverList: [],
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
        requireModel: "",
        otherModel: ""
      }
    },
    methods: {
      goBack () {
        this.$router.push({path: '/home'});
      },
      save() {
        console.log(this.detail);
      },
      getRateDetail () {
        let orderId = this.$route.params.id;
        if(!orderId){
          this.$Message.error('订单编号错误');
          return;
        }
        let params = {
          orderId: orderId
        };

        api.fetchPost(api.path.getRateDetail, params).then((data) => {
          //控制加载条
          this.loading = false;
          this.detail = data;
        }).catch(err => {
          this.$Message.error(err);
          this.$router.replace({path: '/home'});
        })
      },
      getServerList () {
        let params = {};
        api.fetchPost(api.path.getServerList, params).then((data) => {
          this.serverList = data;
        }).catch(err => {
          this.$Message.error(err);
        })
      }
    }
  };
</script>
