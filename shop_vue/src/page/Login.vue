<template>
    <div>
        <van-nav-bar
            title="用户登录"
            left-text="返回"
            left-arrow
            @click-left="goBack"
         />
         <div class="register-panel">
            <van-field 
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username=''"
                :error-message="usernameErrorMsg"
            />

            <van-field 
                v-model="password"
                type="password"
                label="密码" 
                placeholder="请输入密码"
                required
                :error-message="passwordErrorMsg"
               
            />
            <div class="register-button">
                <van-button type="primary" @click="loginAction" size="large" :loading="openLoading">马上登录</van-button>
                <van-button type="primary" @click="registerAction" size="large" class="register-button">去注册</van-button>
            </div>
         </div>
    </div>
</template>
<script>
    import { Toast } from 'vant'
    export default {
        data() {
            return {
                username: '',
                password: '',
                openLoading:false, //是否开启用户注册的Loading状态
                usernameErrorMsg:'',  //当用户名出现错误时的提示信息
                passwordErrorMsg:'',  //当密码出现错误时的提示信息
            }
        },
       methods: {
           goBack() {
               this.$router.go(-1)
           },
            loginAction(){
                this.checkForm() && this.axiosLoginUser()  //验证通过后才可以发送请求
            },
           async axiosLoginUser(){
               this.openLoading=true;
                let response = await this.$axios.post('/user/login',{
                    username:this.username,
                    password:this.password
                })
                let {code,message,data={}} = response.data;
                // console.log(data);
                let {userid,username,token} = data;
                // console.log(token);
                if(code==200 && token){
                    localStorage.setItem('token',token);
                    localStorage.setItem('userinfo',JSON.stringify({
                        username:username,
                        userid:userid
                    }))
                    // console.log(this.$store);
                    this.$store.dispatch('actions_userinfo',{  //获取用户信息
                        username,
                        userid
                    })
                    this.$store.dispatch('actions_cart_init',userid);  //获取购物车信息
                    this.$store.dispatch('actions_ordersList_init',userid); //获取订单信息
                    Toast.success('登录成功');
                    this.$router.push('/');
                }else{
                    Toast.fail(message);
                    this.openLoading = false; //关闭加载状态
                }
           },
           //****表单验证方法
           checkForm(){
              let isOk = true
              if(this.username.length<5){
                  this.usernameErrorMsg = "用户名不能少于5位"
                  isOk=false
              }else{
                  this.usernameErrorMsg = ''
              } 
              if(this.password.length<6){
                  this.passwordErrorMsg = '密码不能少于6位'
                  isOk = false
              }else{
                  this.passwordErrorMsg = ''
              }
              return isOk
           },
           registerAction(){
               this.$router.push({
                   name:"register"
               })
           } 
       },
       created() {
           if(this.$store.state.userinfo.username){  //利用localStorage存储登录信息
               Toast.success('您已经登录');
               this.$router.push('/');
           }
       }, 
    }
</script>

<style scoped>
    .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:80px;
    }
    .register-button{
       margin-top:20px
    }
</style>