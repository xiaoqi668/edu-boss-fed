<template>
  <div class="login">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="top">
      <h2>登陆</h2>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="isLoginLoading">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/services/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      // 存储表单数据的对象
      form: {
        phone: '18201288771',
        password: '111111'
      },
      // 存储校验规则的对象
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // 正则规则
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度应为6-18位', trigger: 'blur' }
        ]
      },
      // 用于保存加载状态
      isLoginLoading: false
    }
  },
  methods: {
    // 登陆功能
    async onSubmit () {
      // this.$refs.form.validate(val => {
      //   console.log(val)
      // })
      try {
        // 处理校验成功后的功能（发送请求）
        // 1.设置校验
        await this.$refs.form.validate()
        // 发送请求
        this.isLoginLoading = true
        // const { data } = await request({
        //   method: 'POST',
        //   // headers: { 'content-type': 'application/x-www/form-urlencoded' },
        //   url: '/front/user/login',
        //   //urlencoded 格式： 名=值&名=值
        //   //使用qs对数据格式转换
        //   data: qs.stringify(this.form)
        // })
        const { data } = await login(this.form)
        this.isLoginLoading = false
        // 相应数据处理
        if (data.state === 1) {
          this.$message.success('登陆成功')
          // 将登陆成功的用户信息存储到Vuex中
          this.$store.commit('setUser', data.content)
          // 根据可能存在的redirect数据进行跳转设置
          console.log(this.$route.query.redirect)
          this.$router.push(this.$route.query.redirect || '/')
        } else {
          this.$message.error('登陆失败')
        }
      } catch (err) {
        // 处理校验失败后的功能
        console.log('没有通过校验')
      }
    }
  }
}
</script>

<style lang="scss" scoped >
.login {
  height: 100vh;
  display: flex;
  //设置内部元素水平垂直居中
  justify-content: center;
  align-items: center;
  .el-form{
    background-color: #fff;
    padding: 20px;
    width: 300px;
    border-radius: 10px;
    .el-button {
      width: 100%;
    }
  }
}
</style>
