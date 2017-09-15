<style scoped>
</style>

<template>
  <div class="app">
    <i-form ref="formItem" :rules="ruleValidate" :model="formItem" :label-width="80">
      <FormItem label="姓名：" prop="name">
        <i-input v-model="formItem.name" placeholder="请输入" style="width: 300px"></i-input>
      </FormItem>
      <FormItem label="会员编号：" prop="customerId">
        <i-input v-model="formItem.customerId" placeholder="请输入" disabled style="width: 300px"></i-input>
      </FormItem>
      <FormItem label="性别：" prop="sex">
        <RadioGroup v-model="formItem.sex">
          <Radio label="1">男</Radio>
          <Radio label="2">女</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="开户银行：" prop="bankName">
        <i-input v-model="formItem.bankName" placeholder="请输入" style="width: 300px"></i-input>
      </FormItem>
      <FormItem label="开户账号：" prop="bankAccount">
        <i-input v-model="formItem.bankAccount" placeholder="请输入" style="width: 300px"></i-input>
      </FormItem>
      <FormItem label="开户姓名：" prop="accountName">
        <i-input v-model="formItem.accountName" placeholder="请输入" style="width: 300px"></i-input>
      </FormItem>
      <FormItem label="手机号码：" prop="mobile">
        <i-input v-model="formItem.mobile" placeholder="请输入" style="width: 300px"></i-input>
      </FormItem>
      <FormItem label="微信号：" prop="wechat">
        <i-input v-model="formItem.wechat" placeholder="请输入" style="width: 300px"></i-input>
      </FormItem>
      <FormItem label="详细地址：">
        <i-input v-model="formItem.address" placeholder="请输入" style="width: 300px"></i-input>
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
      return {
        formItem: {
          name: '阿强1',
          customerId: 6189,
          sex: "1",
          bankName: '中国工商银行新昌支行新昌太平洋分理处',
          bankAccount: '6212261211005253234',
          accountName: '张元强',
          mobile: '15967546189',
          wechat: '15967546189',
          address: '绍兴市'
        }
      }
    },
    ruleValidate: {
      name: [
        { required: true, message: '姓名不能为空', trigger: 'blur' }
      ],
      sex: [
        { required: true, message: '请选择性别', trigger: 'blur' }
      ],
      bankName: [
        { required: true, message: '开户银行不能为空', trigger: 'change' }
      ],
      bankAccount: [
        { required: true, message: '开户账号不能为空', trigger: 'change' }
      ],
      accountName: [
        { required: true, message: '开户姓名不能为空', trigger: 'change' }
      ],
      mobile: [
        { required: true, message: '手机号码不能为空', trigger: 'change' }
      ],
      wechat: [
        { required: true, message: '微信号不能为空', trigger: 'change' }
      ],
      address: [
        { required: true, message: '详细地址不能为空', trigger: 'change' }
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
