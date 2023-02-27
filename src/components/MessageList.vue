<template>
  <div id="message-list">
    <h2>Messages:</h2>
    <input type="text" class="form-control" id="comment"> 
      <button class="submit" type="submit" @click="postMessage()" id="submit-comment">Comment</button>
    <p class="message" v-if="messages.length < 1">
        {{currentPage}} has no messages (o´ω`o)
    </p>
    <p class="message" v-for="message in messages.slice().reverse()">
        {{message}}
    </p>
  </div>
</template>

<script>
var msg = Array
import router from '@/router/index'
export default {
  name: 'message-list',
  props: {
    currentPage: String
  },

  data() {
    return{
      messages: Array,
    }
  },

  mounted() {
    var tempmessages = []
    $.ajax({
      async: false,
      xhrFields:{
        withCredentials: true
      },
      type: 'GET',
      url: 'http://127.0.0.1:4242/getmessages?username=' +this.currentPage,
    })
    .done(function(data){
      tempmessages = data
    })
    .fail(function(jqXHR, exception){
      console.log(jqXHR)
    })    
    this.messages = tempmessages
  },

  methods: {
    postMessage () {
      var commentValue = document.getElementById("comment").value
      this.messages.push(commentValue)
      $.ajax({
        async: false,
        xhrFields:{
          withCredentials: true
        },
        type: 'GET',
        url: 'http://127.0.0.1:4242/addmessage?username=' + this.currentPage + '&message=' + commentValue, //+ submitform resultatet
      })
      .fail(function(jqXHR, exception){
        console.log(jqXHR)
      })  
    } 
  }
}
</script>

<style>
.message {
    border: 1px solid black;
    background-color: rgba(94, 255, 0, 0.78);
    padding: 10px;
    margin: 10px;
    color: black;
}

.submit {
  display: inline;
  float: right;
  margin: 10px;
  padding: 10px;

}

.form-control {
  width: 70%;
  display: inline;
  margin: 10px;
  padding: 10px;
  height: 35px;
}

button{
 border:1px solid #2a2c2f;
 height: 35px;
 widows: 40%;
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