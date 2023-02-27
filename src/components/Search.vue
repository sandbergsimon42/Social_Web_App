<template>
<div>
<!--Bootstrap-->
  <form class="form-inline md-form mr-auto mb-4">
    <input id="searchfield" class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
    <button type="submit" @click="getSearchResult()" id="search-button">Search</button>
  </form>
  <h2>Result:</h2>
  <p v-if="search_result.length < 1">
    No users found (/)(;,,;)(/)
  </p>
  <p class="search" v-for="username in search_result">
    <router-link :to="{name: 'UserPage', params: {username: username}}">
      {{username}}
    </router-link></p>
  </div>
</template>

<script>
import router from '@/router/index'
export default {
    name: 'search-list',
    props: {
      currentPage: String
    },

    data() {
        return{
            search_result: Array,
        }
    },
  created() {
    $.ajax({
      async: false,
      xhrFields:
      {
        withCredentials: true
      },
      type: 'GET',
      url: 'http://127.0.0.1:4242/validate',
      })
      .fail(function(jqXHR, exception){
        router.push('/')
        console.log(jqXHR)
      })
  },
    methods: {
      getSearchResult () {
        var searchParam = document.getElementById("searchfield").value
        var tempsearch_result = []
        $.ajax({
          async: false,
          xhrFields:{
            withCredentials: true
          },
          type: 'GET',
          url: 'http://127.0.0.1:4242/searchname?username=' + searchParam,
        })
        .done(function(data){
          tempsearch_result = data
        })
        .fail(function(jqXHR, exception){
          console.log(jqXHR)
        })
        this.search_result = tempsearch_result    
      }

    }
  }

</script>

<style>
a {
    color: black;
}
.search {
    border: 1px solid black;
    background-color: rgb(255, 0, 128);
    padding: 10px;
    margin: 10px;
    color: black;
}

.input-group.md-form.form-sm.form-2 input.amber-border {
border: 1px solid #ffca28;
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
</style>