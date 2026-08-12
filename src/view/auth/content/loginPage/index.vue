<template>
  <div class="'login-container'">
    <h1>LOGIN</h1>

    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">USERNAME:</label>
          <input
          id="username"
          v-model="username"
          type="text"
          placeholder="Enter Username"
          required
          />
      </div>
      <div> 
        <label for="password">PASSWORD:</label>
        <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Enter Password"
        required/>
      </div>
      <p v-if="errorMessages" class="error">{{ errorMessages }}</p>

      <button type="submit">SUBMIT</button>
    </form>
  </div>
</template>

<script>
export default{
  name: 'LoginPage',
  data(){
    return{
      username:'',
      password:'',
      errorMessages:'', 
    }
  }, 

  methods: {
    async handleLogin(){
      this.errorMessages = '';

      if(!this.username || !this.password) { 
        this.errorMessages = 'wala pong laman lagyan ang usernamen or password';
        return;
      }
      const response = await this.$store.dispatch('authUser/login', {
        username: this.username,
        password: this.password
      });
      
      if( response && response.success ) {

      if(response.user.account_type === 'admin'){
        this.$router.push('/admin')
      }
      else{
        this.$router.push('/standardUser')
        }
      }
    }
  }
};
</script>
