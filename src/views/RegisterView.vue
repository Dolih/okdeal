/* eslint-disable */
<template>
  <form class="card_rg auth-card_rg" @submit.prevent="submitHandler">
    <div class="card-content_rg">
      <p class="card-title">Регистрация</p>
      <div class="input-field">
        <input
            class="validate"
            id="email"
            type="text"
            v-model.trim="email"
            placeholder="Email"
            required
        >
        
      </div>
      <div class="input-field">
        <input
            class="validate"
            id="phone"
            type="tel"
            placeholder="Номер телефона"
            v-model.trim="phone"
            required
        >
        
      </div>
      <div class="input-field">
        <input
            class="validate"

            id="password"
            type="password"
            placeholder="Пароль"
            v-model.trim="password"
            required
        >
        
      </div>
      <div class="input-field">
        <input
        class="validate"

            id="name"
            type="text"
            v-model.trim="name"
            placeholder="Имя"
            required
        >
        
      </div>
      <div class="input-field">
        <input
        class="validate"

            id="name"
            type="text"
            v-model.trim="name"
            placeholder="Ваш ВК (не обязательно)"
            required
        >
        
      </div>
      <div class="input-field">
        <input
        class="validate"

            id="name"
            type="text"
            v-model.trim="name"
            placeholder="Ваш Telegram (не обязательно)"
            required
        >
        
      </div>
      <div class="input-field">
        <input
        class="validate"

            id="name"
            type="text"
            v-model.trim="name"
            placeholder="Ваш WhatsApp (не обязательно)"
            required
        >
        
      </div>
      <div class="input-field">
        <input
        class="validate"

            id="name"
            type="text"
            v-model.trim="name"
            placeholder="Расскажите о себе"
            required
        >
        
      </div>
      <p>
        <label class="agree">
          <input type="checkbox" v-model="agree" required/>
          <span class="agree_txt">С правилами согласен</span>
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
          <i class="material-icons right"></i>
        </button>
      </div>

      <p class="center_rg">
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
import axios from 'axios';
import Cookies from 'js-cookie'

export default {

  name: 'RegisterView',
  data: () => ({
    email: '',
    password: '',
    name: '',
    phone: '',
    token: '',
    agree: false
  }),
  
  methods: {

    async submitHandler() {
      

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
        phone: this.phone,
        agree: true

      }

      const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        axios.post('http://localhost:5050/auth/registration', formData, config)
          .then(response => {
            this.token = response.data.token
            // Cookies.set(this.token, token, { expires: 7 })
            this.$router.push('/HomeView')
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
}
</script>
<style>
body{
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
    background-color: #f3f3f3;
}

.card_rg{
    margin: 100px auto 100px auto;
    height: 950px;
    width: 400px;
    background-color: #2a2a2a;
    padding: 50px;
    border-radius: 20px;
    box-shadow: 0 0 5px #151515;
    box-shadow: 0 0 5px #151515;
    
}
.agree{
  color: #f3f3f3;
  margin-bottom: 20px;
}
.agree_txt{
  padding-left: 10px;
}
.card-title{
    
    text-align: center;
    font-size: 1.6em;
    padding-bottom: 40px;
    color: #f3f3f3;
}
.input-field{
    padding-bottom: 40px;

}
.validate{
    background-color: #f3f3f3;
    height: 50px;
    width: 100%;
    border: 2px solid #f3f3f3;
    border-radius: 20px;
    text-align: center;
    font-size: 16px;

}
.btn{
    font-size: 16px;
    font-weight: bold;
    color: white;
    border: none;
    border-radius: 20px;
    background-color: #3b80b8;
    height: 50px;
    width: 100%;
    margin-top: 20px;
}
.btn:hover{
    background-color: rgb(229, 107, 94)
}
.center_rg{
    text-align: center;
    margin-top: 20px;
    color: #f3f3f3;

}
.hide_sign-up{
    font-size: 16px;
    color: #3b80b8;
}
.hide_sign-up:hover{
    color: rgb(229, 107, 94)

}
</style>