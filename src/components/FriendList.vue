<template>
  <div id="friend-list" v-if = "currentPage">
    <h2>Friends:</h2>
    <br>
    <br>
    <br>
    <p class="friend" v-if="friends.length < 1">
        {{currentPage}} has no friends UwU
    </p>
    <p class="friend" v-for="friend in friends">
        <router-link :to="{name: 'UserPage', params: {username: friend}}">
            {{friend}}
        </router-link></p>
  </div>
</template>

<script>
import router from '@/router/index'
export default {
    name: 'friend-list',
    props: {
      currentPage: String
    },

    data() {
        return{
            friends: Array,
        }
    },

    mounted() {
       var tempfriends = []
            $.ajax({
                async: false,
                xhrFields:{
                    withCredentials: true
                },
                type: 'GET',
                url: 'http://127.0.0.1:4242/getfriends?username=' +this.currentPage,
                })
                .done(function(data){
                    tempfriends = data
                })
                .fail(function(jqXHR, exception){
                    console.log(jqXHR)
                })
            this.friends = tempfriends
        },
    }
</script>

<style>
.friend {
    border: 1px solid black;
    background-color: rgb(255, 0, 128);
    padding: 10px;
    margin: 10px;
    color: black;
}
</style>