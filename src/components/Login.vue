<template>
  <div class="login-lay">
    <div class="login-block" style="background:#eee;padding: 20px; width: 500px; " >
      <Card :bordered="false" >
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline >
          <Row>
            <Form-item prop="user">
              <i-input type="text" v-model="formInline.user" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </i-input>
            </Form-item>
          </Row>

          <Row>
            <Form-item prop="password">
              <i-input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
              </i-input>
            </Form-item>
          </Row>

          <Row>
            <Form-item>
              <Button :loading="loading" type="primary" @click="handleSubmit('formInline')">登录</Button>
            </Form-item>
          </Row>

        </Form>
      </Card>
    </div>
  </div>

</template>
<style scoped>
  .login-block {
    width: 50%;
    height: 50%;
    overflow: auto;
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
  }
</style>
<script>
  import api from '@/fetch/api';

  let app = {};
  export default {
      mounted () {
        app = this;
      },
    data () {
      return {
        loading: false,
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写密码', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      loading (val, oldVal) {
        if(val){
          app.$Message.loading({
            content: '正在加载中...',
            duration: 0
          });
        } else {
          app.$Message.destroy();
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.loading = true;
        this.$refs[name].validate((valid) => {
          if (valid) {

            api.fetchPost('agoods/test', {}).then((data) => {
              setTimeout(() => {
                this.loading = false;
                this.$Message.success(data);
              }, 3000);
              api.setCookie('token',123123);
            }).catch(err => {
              this.$Message.error(err);
            })
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      }
    }
  }
</script>
