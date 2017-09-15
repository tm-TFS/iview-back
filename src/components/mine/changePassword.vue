
<template>
  <div class="app">
    <i-form ref="formItem" :rules="ruleValidate" :model="formItem" :label-width="80">
      <FormItem label="姓名：" prop="name">
        <i-input v-model="formItem.name" placeholder="请输入" style="width: 300px"></i-input>
      </FormItem>
      <FormItem label="会员编号：" prop="customerId">
        <i-input v-model="formItem.customerId" placeholder="请输入" disabled style="width: 300px"></i-input>
      </FormItem>
      <FormItem label="一级密码：" prop="firstPassword" >
        <i-input v-model="formItem.firstPassword" type="password" placeholder="请输入" style="width: 300px"></i-input>
      </FormItem>
      <FormItem label="确认一级密码：" prop="cFirstPassword" >
        <i-input v-model="formItem.cFirstPassword" type="password" placeholder="请输入" style="width: 300px"></i-input>
      </FormItem>
      <FormItem label="二级密码：" prop="secondPassword" >
        <i-input v-model="formItem.secondPassword" type="password" placeholder="请输入" style="width: 300px"></i-input>
      </FormItem>
      <FormItem label="确认二级密码：" prop="cSecondPassword" >
        <i-input v-model="formItem.cSecondPassword" type="password" placeholder="请输入" style="width: 300px"></i-input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </i-form>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data (){
      const fPassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formItem.firstPassword) {
          callback(new Error('一级密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        formItem: {
          name: '阿强',
          customerId: 6189,
          firstPassword: "123123",
          cFirstPassword: '123123',
          secondPassword: '222222',
          cSecondPassword: '222222'
        }
      }
    },
    ruleValidate: {
      name: [
        { required: true, message: '姓名不能为空', trigger: 'blur' }
      ],
      firstPassword: [
        { required: true, message: '一级密码不能为空', trigger: 'blur' },
        { type: 'string', min: 6, message: '一级密码不能少于6个字符', trigger: 'blur' }
      ]
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>

<style >

</style>
