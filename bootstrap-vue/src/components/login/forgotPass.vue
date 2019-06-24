<!--  -->
<template lang="html">
    <body class="bg-dark">
        <div class="container">
            <div class="card card-login mx-auto mt-5">
            <div class="card-header">重置密码</div>
            <div class="card-body">
                <div class="text-center mt-4 mb-5">
                <h4>忘记密码?</h4>
                <p>输入您的电子邮件地址，我们将发送您如何重置您的密码的说明.</p>
                </div>
                <form>
                <div class="form-group">
                    <input class="form-control" id="email" type="email" aria-describedby="emailHelp" placeholder="输入Email地址">
                </div>
                <a class="btn btn-primary btn-block" @click="retsetPass" href="#">重置密码</a>
                </form>
                <div class="text-center">
                <router-link class="d-block small mt-3" :to="{name: 'Register'}">注册账号</router-link>
                <router-link class="d-block small mt-3" :to="{name: 'Login'}">登录页面</router-link>
                </div>
            </div>
            </div>
        </div>
    </body>
</template>

<script>
export default {
  name: 'ForgotPass',
  methods: {
      retsetPass () {
          this.$router.push({path: '/'});
      }
  }
}

</script>
<style lang="css" scoped>
</style>
