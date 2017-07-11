<style scoped>
</style>
<template>
  <div class="app">
    <div class="layout-content-main">
      <i-col span="24" class="content">
        <div >
          <Row>
            <i-button @click="save()" :disabled="ifdisabled" icon="checkmark-round"
                      type="primary" icon="checkmark-round">保存
            </i-button>
          </Row>
        </div>
        <Card class="mt-15">
          <Row>
            <!--左边-->
            <i-col span="12">
              <Row>
                <i-col span="5">
                  ID:
                </i-col>
                <i-col span="19">
                  {{ '自动生成'}}
                </i-col>
              </Row>
              <Row>
                <i-col span="5">
                  *轮播图名称：
                </i-col>
                <i-col span="19">
                  <i-input
                    class="input-80p"
                  >
                  </i-input>
                </i-col>
              </Row>

              <Row>
                <i-col span="5">
                  *所在城市:
                </i-col>
                <i-col span="19">
                  <div >
                    <i-button @click="select_city_model = true">{{123}}</i-button>
                    <i-button icon="plus-round" @click="city_model = true" :disabled="1"></i-button>
                  </div>
                </i-col>
              </Row>

              <Row>
                <i-col span="5">
                  *图片:
                </i-col>
                <i-col span="19">
                  <Row>
                    <i-col span="6">
                      <img :src="" alt="" style="width: 90%;min-height:110px;border:solid 1px #d7dde4"
                           alt="还未上传"/>
                    </i-col>
                    <i-col span="4" style="position:relative;">
                      <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png"
                             style="position: absolute;opacity: 0.01;width: 100%;z-index: 10;"
                             @change="imgChange($event)"/>
                      <i-button :disabled="1">上传</i-button>
                    </i-col>
                    <i-col span="12">
                      建议尺寸: 100 * 100
                    </i-col>
                  </Row>

                </i-col>
              </Row>

            </i-col>
            <!--右边-->
            <i-col span="12">

              <Row>
                <i-col span="5">
                  状态：
                </i-col>
                <i-col span="19">
                  <tag color="red">{{123}}</tag>
                </i-col>
              </Row>

              <Row>
                <i-col span="5">
                  *轮播图类型:
                </i-col>
                <i-col span="19">
                  <i-select  style="width:200px">
                    <i-option >{{123}}</i-option>
                  </i-select>
                </i-col>
              </Row>

              <Row>
                <i-col span="5">
                  创建人:
                </i-col>
                <i-col span="19">
                  123
                </i-col>
              </Row>
              <Row>
                <i-col span="5">
                  修改人:
                </i-col>
                <i-col span="19">
                  3123
                </i-col>
              </Row>

              <Row>
                <i-col span="5">
                  审核人:
                </i-col>
                <i-col span="19">
                  123
                </i-col>
              </Row>
              <Row>

                <i-col span="5">
                  审核时间:
                </i-col>
                <i-col span="19">
                  13
                </i-col>
              </Row>

              <Row >
                <i-col span="5">
                  理由:
                </i-col>
                <i-col span="19">
                  123
                </i-col>
              </Row>

            </i-col>

          </Row>
          <!--<Row>
            <Tabs type="card" style="margin-top: 25px;">
              <Tab-pane label="商品信息">
                <div v-show="queryResult.CarouselType == 1 || queryResult.CarouselType == 2">
                  <div style="margin-bottom: 10px;">
                    <i-button size="large" icon="plus-round" @click="add_model = true">添加商品</i-button>
                    <i-button size="large" icon="close-round" @click="delGoods()">删除商品</i-button>
                  </div>
                  <i-table
                    v-bind:border="showBorder"
                    v-bind:stripe="showStripe"
                    v-bind:show-header="showHeader"
                    v-bind:size="tableSize"
                    v-bind:data="items"
                    v-bind:content="self"
                    v-bind:columns="theader1"
                    @on-selection-change="goodsSelectChange">
                  </i-table>
                </div>
                <div v-show="queryResult.CarouselType == 3">
                  <Row>
                    <i-col span="3">
                      请输入链接:
                    </i-col>
                    <i-col span="18">
                      <i-input :value.sync="queryResult.LinkUrl"></i-input>
                    </i-col>
                  </Row>
                </div>
              </Tab-pane>
              <Tab-pane label="操作日志">
                <i-table
                  v-bind:border="showBorder"
                  v-bind:stripe="showStripe"
                  v-bind:show-header="showHeader"
                  v-bind:size="tableSize"
                  v-bind:data="logItems"
                  v-bind:content="self"
                  v-bind:columns="theader2">
                </i-table>
              </Tab-pane>
            </Tabs>
          </Row>-->
        </Card>
      </i-col>

    </div>
  </div>
</template>
<script>
  import api from '@/fetch/api';
  export default {

  };
</script>
