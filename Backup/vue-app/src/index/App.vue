<template>
  <div id="app" class="small-container">
    <h1>Register</h1>

    <register-user @add:user="addUser" />

    <h1>Login</h1>
    <login-form @login:user="loginUser" />

    </div>
</template>

<script>
  import RegisterUser from '@/components/RegisterForm.vue'
  import LoginForm from '@/components/LoginForm.vue'
  export default {
    name: 'app',
    components: {
      LoginForm,
      RegisterUser,
    },
    data() {
    return {}
  },
  methods: {
    addUser(user) {
      $.ajax({
          type: 'GET',
          url: 'http://localhost:4242/register?username=' + user.name + '&password=' + user.password,
        })
    },
    loginUser(user) {
      $.ajax({
          type: 'GET',
          url: 'http://localhost:4242/login?username=' + user.name + '&password=' + user.password,
        })
    },
    /*
    deleteUser(id) {
      this.users = this.users.filter(
        user => user.id !== id
      )
    },
    editUser(id, updatedUser) {
      this.users = this.users.map(
        user => user.id === id ? updatedUser : user
      )}*/
    }
  }

</script>

<style>
  button {
    background: #01aa2b;
    border: 1px solid #db3e0e;
  }

  .small-container {
    max-width: 100%;
  }
</style>