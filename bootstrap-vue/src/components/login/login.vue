<!--  -->
<template lang="html">
  <body class="bg-dark">
  <div class="container">
    <div class="card card-login mx-auto mt-5">
      <div class="card-header">登录</div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="name">登录名</label>
            <input class="form-control" v-model="user.name" type="text" aria-describedby="emailHelp" placeholder="用户名">
          </div>
          <div class="form-group">
            <label for="password">密码</label>
            <input class="form-control" v-model="user.password" type="password" placeholder="密码">
          </div>
          <div class="form-group">
            <div class="form-check">
              <label class="form-check-label">
                <input class="form-check-input" type="checkbox">记住密码</label>
            </div>
          </div>
          <a class="btn btn-primary btn-block" @click="login">登录</a>
        </form>
        <div class="text-center">
          <router-link class="d-block small mt-3" :to="{name: 'Register'}">注册账号</router-link>
          <router-link class="d-block small mt-3" :to="{name: 'ForgotPass'}">忘记密码</router-link>
        </div>
      </div>
    </div>
  </div>
</body>
</template>

<script>
import { AjaxLogin } from '@/config/getData'
export default {
  data () {
    return {
      user: { name: '彭国津', password: '123456' }
    }
  },
  methods: {
    login () {
      AjaxLogin(this.user).then(json=>{
        console.log(json)
        if(json.code === 200) {
          localStorage.setItem('token', json.data.token)
          this.$router.push('Main')
        } else {
          this.$message.error(json.data.msg)
        }
      })
    }
  }
}

</script>
<style lang="css" scoped>
</style>
