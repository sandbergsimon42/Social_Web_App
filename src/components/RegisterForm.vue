<template>
  <div id="registeruser-form">
    <form @submit.prevent="handleSubmit">
      <label>Username</label>
      <input
        ref="first"
        type="text"
        id="register-username"
        :class="{ 'has-error': submitting && invalidName }"
        v-model="user.name"
        @focus="clearStatus"
        @keypress="clearStatus"
      />
      <br>
      <label>Password</label>
      <input
        type="password"
        id="register-password"
        :class="{ 'has-error': submitting && invalidPassword }"
        v-model="user.password"
        @focus="clearStatus"
      />
      <br>
      <p v-if="notDone" class="error-message">
        ! Fyll i alla fält
      <p v-else-if="error" class="error-message">
        Användarnamnet finns redan
      </p>
      <p v-else-if="invalidCharacters" class="error-message">
        Användarnamnet får bara innehålla tecknena a-ö0-9
      </p>
      <p v-else-if="registered" class="registered-message">
        Användaren tillagd!
      </p>
      <br>
      <button id="register-button">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'registeruser-form',
  data() {
  return {
      notDone: false,
      error: false,
      invalidCharacters: false,
      registered: false,
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
      var success = false
          
      if (this.invalidName || this.invalidPassword) {
        this.notDone = true
        return
      }

      var isvalid = /^([A-ZÅÄÖa-zåäö0-9])+$/.test(this.user.name);
      if (!isvalid)
      {
        this.invalidCharacters = true
        return
      }
            
      $.ajax({
        async: false,
        type: 'GET',
        url: 'http://127.0.0.1:4242/register?username=' + this.user.name + '&password=' + this.user.password,
      })
      .done(function(data){
        success = true
      })
      .fail(function(jqXHR, exception){
        console.log(jqXHR)
        fail = true
      })

      this.$refs.first.focus()
      this.user = {
        name: '',
        password: '',
      }

      this.error = fail
      this.registered = success
    },

    clearStatus() {
      this.registered = false
      this.error = false
      this.notDone = false
      this.invalidCharacters = false
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

  .registered-message {
    color: #32a95d;
  }
</style>