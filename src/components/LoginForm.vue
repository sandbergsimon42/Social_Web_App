<template>
  <div id="login-user">
    <form @submit.prevent="handleSubmit">
      <label>Username</label>
      <input
        ref="first"
        type="text"
        id="login-username"
        :class="{ 'has-error': invalidName }"
        v-model="user.name"
        @focus="clearStatus"
        @keypress="clearStatus"
      />
      <br>
      <label>Password</label>
      <input
        type="password"
        id="login-password"
        :class="{ 'has-error': invalidPassword }"
        v-model="user.password"
        @focus="clearStatus"
      />
      <br>
      <p v-if="notDone" class="error-message">
        ! Fyll i alla fält
      </p>
      <p v-else-if="error" class="error-message">
        Fel användarnamn eller lösenord
      </p>
      <br>
      <button id="login-button">login</button>
    </form>
  </div>
</template>

<script>
import router from '@/router/index'
export default {
  name: 'login-user',
  data() {
    return {
      notDone: false,
      error: false,
      user: {
        name: '',
        password: '',
      },
    }
  },

  computed: {
    invalidName() {
      return this.user.name === ''
    },
    invalidPassword() {
      return this.user.password === ''
    },
  },
  
  methods: {
    handleSubmit() {
      this.clearStatus()
      var fail = false
            
      if (this.invalidName || this.invalidPassword) {
        this.notDone = true
        return
      }

      $.ajax({
        async: false,
        type: 'GET',
        url: 'http://127.0.0.1:4242/login?username=' + this.user.name + '&password=' + this.user.password,
        xhrFields:{
          withCredentials: true
        },
        })
        .done(function(data){
          router.push('user/' + data.username)
        })
        .fail(function(jqXHR, exception){
          console.log(jqXHR)
          fail = true
        })


        //efter fail kommer usernamefältet markeras    
        this.$refs.first.focus()
        this.user = {
          name: '',
          password: '',
        }

        this.error = fail
        
    },

    clearStatus() {
      this.error = false
      this.notDone = false
    }
  },
}

</script>

<style scoped>
  form {
    margin-bottom: 2rem;
  }

  [class*='-message'] {
    font-weight: 500;
  }

  .error-message {
    color: #d33c40;
  }
</style>