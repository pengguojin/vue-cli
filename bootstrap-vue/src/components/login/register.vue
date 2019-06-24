<!--  -->
<template lang="html">
  <body class="bg-dark">
    <div class="container">
      <div class="card card-register mx-auto mt-5">
        <div class="card-header">注册账号</div>
        <div class="card-body">
          <form>
            <div class="form-group">
              <div class="form-row">
                <div class="col-md-6">
                  <label for="firstName">姓名</label>
                  <input class="form-control" id="firstName" type="text" aria-describedby="nameHelp" placeholder="姓">
                </div>
                <div class="col-md-6">
                  <label for="sex">性别</label>
                  <select class="form-control" id="sex" aria-describedby="nameHelp">
                    <option>--请选择--</option>
                    <option value="1">男</option>
                    <option value="2">女</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email地址</label>
              <input class="form-control" id="email" type="email" aria-describedby="emailHelp" placeholder="输入email地址">
            </div>
            <div class="form-group">
              <div class="form-row">
                <div class="col-md-6">
                  <label for="password">密码</label>
                  <input class="form-control" id="password" type="password" placeholder="密码">
                </div>
                <div class="col-md-6">
                  <label for="confirmPassword">确认密码</label>
                  <input class="form-control" id="confirmPassword" type="password" placeholder="确认密码">
                </div>
              </div>
            </div>
            <a class="btn btn-primary btn-block" @click="register" href="#">注册</a>
          </form>
          <div class="text-center">
            <router-link class="d-block small mt-3" :to="{name: 'Login'}">登录页面</router-link>
            <router-link class="d-block small mt-3" :to="{name: 'ForgotPass'}">忘记密码</router-link>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  name: 'Register',
  methods: {
    register () {
      // 注册代码
    }
  }
}

</script>
<style lang="css" scoped>
</style>
