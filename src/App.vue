<template>
<div>
  <!--Bootstrap-->
  <div v-if="this.$route.path != '/'">
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
       <div class="navbar-header">
          <p class="navbar-brand">Ansiktsbok</p>
        </div>
        <ul class="nav navbar-nav">
         <li><router-link :to="{name: 'Home'}">Home</router-link></li>
          <li><router-link :to="{name: 'Search'}">Search</router-link></li>
          <li><a v-on:click="logout">Log out</a></li>
       </ul>
      </div>
   </nav>
  </div>

  <router-view/>

</div>


</template>

<script>
import router from '@/router/index'
export default {
  name: 'App',
  methods: {
    logout() {
       $.ajax({
          xhrFields:
          {
            withCredentials: true
          },
          type: 'GET',
          url: 'http://127.0.0.1:4242/logout',
      })
      .done(function(){
        router.push('/')
      })
      .fail(function(jqXHR, exception){
        console.log("logout fail!")
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.active-pink-4 input[type=text]:focus:not([readonly]) {
border: 1px solid #f48fb1;
box-shadow: 0 0 0 1px #f48fb1;

}
</style>
