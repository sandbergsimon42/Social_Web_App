<template>
  <div id="Greeting">
    <div class="pagehead">
      <div v-if="userFound === false">
        <h1>
          Användaren {{ currentPage }} finns ej
        </h1>
      </div>

      <div v-else>
        <div v-if="username === currentPage">
          <h1 id="greet">
            Hello {{ username }}
          </h1>
        </div>
        <div v-else>
          <h1 id="current-page">
            {{ currentPage }}
          </h1>
          <button type="button" id="add" @click="addFriend()">Add Friend</button>
        </div>
      </div>
      </div>

      <div class="userpage">
        <div class="row">
          <div class="column"><message-list :currentPage = "currentPage" /></div>
          <div class="column"><friend-list :currentPage = "currentPage" /></div>
        </div>
      </div>
  </div>
</template>

<script>
import MessageList from '@/components/MessageList.vue'
import FriendList from '@/components/FriendList.vue'
import router from '@/router/index'

export default {
  name: 'Greeting',
  components:{
    MessageList,
    FriendList,
  },

  data(){
    return {
      username: "",
      currentPage: this.$route.params.username,
      messages: [],
      friends: [],
    }
  },

  created() {
    var tempUser = ""

    var userExists = true
  
    $.ajax({
      async: false,
      xhrFields:
      {
        withCredentials: true
      },
      type: 'GET',
      url: 'http://127.0.0.1:4242/userexist?username=' + this.$route.params.username,
      })
      .done(function(data){
         $.ajax({
          async: false,
          xhrFields:
          {
            withCredentials: true
          },
          type: 'GET',
          url: 'http://127.0.0.1:4242/validate',
          })
          .done(function(data){
            tempUser = data.username
          })
          .fail(function(jqXHR, exception){
            router.push('/')
            console.log(jqXHR)
          })
      })
      .fail(function(data){
        userExists = false
      })

    this.username = tempUser
    this.userFound = userExists

  },

   watch: {
      $route (to, from){
        window.location.reload()
      }
   },

  methods: {
    addFriend () {
      $.ajax({
        async: false,
        xhrFields:{
          withCredentials: true
        },
        type: 'GET',
        url: 'http://127.0.0.1:4242/addfriend?username='+this.username+'&friendname='+this.currentPage,
      })
      .fail(function(jqXHR, exception){
        console.log(jqXHR)
      })
    }

  },
}

</script>

<style scoped>
a {
    color: black;
}

h1 {
  color: rgb(0, 0, 0);
  text-shadow: 2px 2px 6px rgb(0, 0, 0);
}

#add{
  background-color: aqua;
}

.userpage {
  width: 75%;
  margin: auto ;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

.column {
  border: 1px solid black;
  background-color: grey;
  float: left;
  width: 45%;
  padding: 5px;
  margin: 5px;
  min-height: 300px;
}

.pagehead {
    margin: auto ;
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