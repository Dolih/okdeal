/* eslint-disable */
<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Обмен услугами</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            required
        >
        <label for="email">Email</label>
        
      </div>
      <div class="input-field">
        <input
            id="phone"
            type="text"
            v-model.trim="phone"
            required
        >
        <label for="phone">Номер телефона</label>
        
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            required
        >
        <label for="password">Пароль</label>
        
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            required
        >
        <label for="name">Имя</label>
        
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" required/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/LoginView"
            custom
            v-slot="{href, navigate}"
            >
        <a :href="href" @click="navigate">Войти!</a>
        </router-link>
      </p>
    </div>
  </form>
</template>

<script>

export default {
  name: 'RegisterView',
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  
  methods: {
    async submitHandler() {
      

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/HomeView')
      } catch (e) {}
    }
  }
}
</script>