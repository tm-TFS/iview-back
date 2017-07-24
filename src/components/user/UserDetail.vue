<style scoped>
  .page-style {
    text-align: center;
    margin: 10px auto;
  }
  .ivu-col {
    margin: 5px 0;
  }
</style>
<template>
  <div class="app">
    <div class="layout-content-main">
      <div style="background:#eee;padding: 5px">

        <Tabs :value="tabValue">
          <Tab-pane label="用户信息" name="1">

            <Card :bordered="false">

              <Row>
                <i-col span="16">
                  <i-button type="error" @click="disable()" :loading="loading" v-show="detail.status">禁用</i-button>
                  <i-button type="error" @click="enable()" :loading="loading" v-show="!detail.status">启用</i-button>
                  <i-button type="info" @click="rechargeModel = true" :loading="loading">充值</i-button>
                </i-col>
                <i-col span="8" style="text-align: right">
                  <i-button @click="goBack()">返回</i-button>
                  <i-button type="info" @click="save()">保存</i-button>
                </i-col>
              </Row>
            </Card>

            <Modal
              v-model="rechargeModel"
              title="请输入充值的金额"
              @on-ok="recharge()"
              @on-cancel="rechargeModel = false">
              <Input-number :min="1" v-model="rechargeAmount"></Input-number>
            </Modal>

            <!-- 用户基本信息 -->
            <Card :bordered="true">
              <p slot="title">基本信息： </p>
              <Row>
                <i-col span="12">
                  用户编号： {{ detail.id }}
                </i-col>
                <i-col span="12">
                  用户昵称： {{ detail.customerName }}
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  当前状态： {{ detail.status ?  '启用' : '禁用'}}
                </i-col>
                <i-col span="12">
                  用户角色：
                  <i-select v-model="detail.type" style="width:120px" placeholder="会员类型...">
                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </i-select>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  openID： {{ detail.openid }}
                </i-col>
                <i-col span="12">
                  QQ号： {{ detail.QQNo }}
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  上次登录时间： {{ detail.lastLoginTime }}
                </i-col>
                <i-col span="12">
                  手机号码： {{ detail.mobile }}
                </i-col>
              </Row>
              <Row>
                用户头像： <img :src="detail.avatar ? detail.avatar : avatar" alt="header_img">
              </Row>
            </Card>

            <!--钱包信息-->
            <Card :bordered="true">
              <p slot="title">钱包信息： </p>
              <Row>
                <i-col span="12">
                  用户余额： {{ detail.balanceAmount }}
                </i-col>
                <i-col span="12">
                  冻结余额： {{ detail.frozenAmount }}
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  可用余额： {{ detail.enableAmount }}
                </i-col>
                <i-col span="12">
                  <Button type="primary" @click="showWallet">查看钱包流水</Button>
                </i-col>
              </Row>
            </Card>

          </Tab-pane>
          <Tab-pane label="钱包流水" name="2">
            <Row>
              <i-table stripe :columns="settlementCol" :data="settlementList"></i-table>
            </Row>
            <Row>
              <Page :total="totalPage" :page-size="10" :current="searchParams.pageId" @on-change="search"
                    class="page-style"></Page>
            </Row>
          </Tab-pane>
        </Tabs>
      </div>

    </div>
  </div>
</template>


<script>
  import api from '@/fetch/api';
  import m_img from "../../assets/moren.png";
  export default {
    beforeMount () {
      this.userInfo = JSON.parse(api.getCookie('userInfo'));
    },
    mounted() {
      this.getCustomerDetail();
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
    data () {
      return {
        rechargeModel: false,
        rechargeAmount: 0,
        tabValue: '1',
        typeList: [
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
        avatar: m_img,
        userInfo: {},
        loading: true,
        detail: {},
        settlementList: [],
        searchParams: {
          pageId: 1,
          walletId: 1
        },
        totalPage: 10,
        settlementCol: [
          {
            title: '流水编码',
            key: 'id',
            width: 120,
            align: 'center'
          },
          {
            title: '操作类型',
            width: 120,
            render: (h, params) => {
              switch (params.row.tradeType){
                case 1:
                  return '支付';
                  break;
                case 2:
                  return '充值';
                  break;
                case 3:
                  return '提现';
                  break;
                case 4:
                  return '转账';
                  break;
                case 5:
                  return '退款';
                  break;
                default:
                  return '未知';
                  break;
              }
            }
          },
          {
            title: '来源',
            width: 120,
            render: (h, params) => {
              if(params.row.walletFromId){
                return params.row.fromName;
              } else {
                return '系统';
              }
            }
          },
          {
            title: '操作对象',
            render: (h, params) => {
              if(params.row.walletToId){
                return params.row.toName;
              } else {
                return '系统';
              }
            }
          },
          {
            title: '交易金额',
            key: 'amount',
            render: (h,params) => {
              return '￥' + params.row.amount;
            }
          },
          {
            title: '交易描述',
            key: 'tradeDescription'
          },
          {
            title: '支付方式',
            render: (h, params) => {
              switch (params.row.paymentType) {
                case 1:
                  return '线下';
                  break;
                case 2:
                  return '支付宝';
                  break;
                case 3:
                  return '微信';
                  break;
                case 4:
                  return '余额支付';
                  break;
                default:
                  return '未知';
                  break;
              }
            }
          },
          {
            title: '钱包余额',
            render: (h, params) => {
              switch (params.row.tradeType){
                case 1: //支付
                  return '￥' + params.row.fromAmount;
                  break;
                case 2: //充值
                  return '￥' + params.row.toAmount;
                  break;
                case 3: //提现
                  return '￥' + params.row.fromAmount;
                  break;
                case 4: //转账
                  return '￥' + params.row.fromAmount;
                  break;
                case 5: //退款
                  return '￥' + params.row.toAmount;
                  break;
                default:
                  return '未知';
                  break;
              }
            }
          },
          {
            title: '支付订单号',
            key: 'tradeOrderId'
          },
          {
            title: '交易流水号',
            key: 'tradeNo'
          },
          {
            title: '创建时间',
            key: 'createTime'
          }
        ]
      }
    },
    methods: {
      disable () {
        this.loading = true;
        let params = {
          customerId : this.detail.id
        };
        api.fetchPost(api.path.disableCustomer, params).then((data) => {
          //控制加载条
          this.loading = false;
          this.$Message.success('操作成功');
          //重新查询详情
          this.getCustomerDetail();
        }).catch(err => {
          this.$Message.error(err);
          this.loading = false;
        })
      },
      enable () {
        this.loading = true;
        let params = {
          customerId : this.detail.id
        };
        api.fetchPost(api.path.enableCustomer, params).then((data) => {
          //控制加载条
          this.loading = false;
          this.$Message.success('操作成功');
          this.getCustomerDetail();
        }).catch(err => {
          this.$Message.error(err);
          this.loading = false;
        })
      },
      recharge (){
        this.loading = true;
        let params = {
          walletId: this.detail.id,
          amount: this.rechargeAmount
        };
        api.fetchPost(api.path.recharge, params).then((data) => {
          //控制加载条
          this.loading = false;
          this.detail = data;
          this.getCustomerDetail();
        }).catch(err => {
          this.$Message.error(err);
          this.$router.replace({path: '/user'});
        })
      },
      goBack () {
        this.$router.push({path: '/user'});
      },
      showWallet(){
        this.tabValue = '2';
      },
      getCustomerDetail () {
        let customerId = this.$route.params.id;
        if(!customerId){
          this.$Message.error('客户编号错误');
          return;
        }
        let params = {
          customerId: customerId,
          uid: this.userInfo.id
        };

        api.fetchPost(api.path.getCustomerDetail, params).then((data) => {
          //控制加载条
          this.loading = false;
          this.detail = data;
          //请求钱包详情
          this.searchParams.walletId = data.walletId;
          this.getSettlementList();
        }).catch(err => {
          this.$Message.error(err);
          this.$router.replace({path: '/user'});
        })
      },
      getSettlementList(){
        let params = this.searchParams;
        api.fetchPost(api.path.getSettlementList, params).then((data) => {
          //控制加载条
          this.loading = false;
          this.settlementList = data.data;
          this.totalPage = data.total;
        }).catch(err => {
          this.$Message.error(err);
          //this.$router.replace({path: '/user'});
        })
      },
      search(pageId){
        this.searchParams.pageId = pageId || this.searchParams.pageId;
        this.getSettlementList();
      }
    }
  };
</script>
