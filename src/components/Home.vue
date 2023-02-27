<template>
  <div id="app" class="small-container">
    <img src="@/assets/logo.png" class="logo">
    <h1>Register</h1>
    <register-user/>
    <h1>Login</h1>
    <login-form/>
    <br>
  </div>
</template>

<script>
import RegisterUser from '@/components/RegisterForm.vue'
import LoginForm from '@/components/LoginForm.vue'
import router from '@/router/index'
export default {
  name: 'app',
  components: {
    LoginForm,
    RegisterUser,
  },

  data() {
    return {}
  },

  beforeMount(){
    $.ajax({
      //async: false,
      xhrFields:{
        withCredentials: true
      },
      type: 'GET',
      url: 'http://127.0.0.1:4242/validate',
    })    
    .done(function(data){
      router.push('user/' + data.username)
    })
    .fail(function(jqXHR, exception){
      console.log(jqXHR)
    })
  }
}
</script>

<style>
  .small-container {
    max-width: 100%;
  }


button{
 border:1px solid #2a2c2f;
 -webkit-border-radius: 3px;
 -moz-border-radius: 3px;
 border-radius: 3px;
 padding: 10px 10px 10px 10px;
 text-decoration:none;
 display:inline-block;text-shadow: -1px -1px 0 rgba(0,0,0,0.3);
 font-weight:bold; 
 color: #FFFFFF;
 background-color: #45484d;
 background-image: -webkit-gradient(linear, left top, left bottom, from(#45484d), to(#000000));
 background-image: -webkit-linear-gradient(top, #45484d, #000000);
 background-image: -moz-linear-gradient(top, #45484d, #000000);
 background-image: -ms-linear-gradient(top, #45484d, #000000);
 background-image: -o-linear-gradient(top, #45484d, #000000);
 background-image: linear-gradient(to bottom, #45484d, #000000);filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#45484d, endColorstr=#000000);
 }

button:hover{
 border:1px solid #151617;
 background-color: #2d2f32;
 background-image: -webkit-gradient(linear, left top, left bottom, from(#2d2f32), to(#1a1a1a));
 background-image: -webkit-linear-gradient(top, #2d2f32, #1a1a1a);
 background-image: -moz-linear-gradient(top, #2d2f32, #1a1a1a);
 background-image: -ms-linear-gradient(top, #2d2f32, #1a1a1a);
 background-image: -o-linear-gradient(top, #2d2f32, #1a1a1a);
 background-image: linear-gradient(to bottom, #2d2f32, #1a1a1a);filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#2d2f32, endColorstr=#1a1a1a);
}

.logo {
  width: 100px;
}

</style>