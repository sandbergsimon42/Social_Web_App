<template>
  <div id="registeruser-form">
    <form @submit.prevent="handleSubmit">
      <label>Username</label>
      <input
        ref="first"
        type="text"
        :class="{ 'has-error': submitting && invalidName }"
        v-model="user.name"
        @focus="clearStatus"
        @keypress="clearStatus"
      />
      <br>
      <label>Passwo0rd</label>
      <input
        type="password"
        :class="{ 'has-error': submitting && invalidPassword }"
        v-model="user.password"
        @focus="clearStatus"
      />
      <br>
      <p v-if="error && submitting" class="error-message">
        ! Please fill out all required fields
      </p>
      <p v-else-if="success" class="success-message">
        User successfully added
      </p>
      <br>
      <button>Register</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'registeruser-form',
    data() {
      return {
        submitting: false,
        error: false,
        success: false,
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
            this.submitting = true
            this.clearStatus()
            
            if (this.invalidName || this.invalidPassword) {
                this.error = true
                return
            }
            
            this.$emit('add:user', this.user)
            this.$refs.first.focus()
            this.user = {
                name: '',
                password: '',
            }
            this.error = false
            this.success = true
            this.submitting = false
        },

        clearStatus() {
            this.success = false
            this.error = false
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

  .success-message {
    color: #32a95d;
  }
</style>