/* eslint-disable */
<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <p class="card-title">Авторизация</p>
            <div class="content-form">
            <div class="input-field">
            <input
                id="email"
                type="text"
                class="validate"
                placeholder="Email"
                v-model.trim="email"
           
            >
            
            </div>
            <div class="input-field">
            <input
                id="password"
                type="password"
                class="validate"
                placeholder="Пароль"
                v-model.trim="password"

            >
            </div>
        </div>
        <div class="card-action">
            <div>
            <button
                class="btn waves-effect waves-light auth-submit"
                type="submit"
                
            >
                Войти
            </button>
            </div>

            
        </div>
    </div>
    </form>
    <p class="center">
            Нет аккаунта?
            <router-link to="/RegisterView"
            custom
            v-slot="{href, navigate}"
            >
            <a class="hide_sign-up" :href="href" @click="navigate">Зарегистрироваться</a>
            </router-link>
            </p>
</template>

<script>
// import {email, required, minLength} from '@vuelidate/validators'
    export default{
        name: 'LoginView',
        data: ()=> ({
            email: '',
            password: ''
        }),
        methods: {
            async submitHandler() {
                
                const formData = {
                    email: this.email,
                    password: this.password
                }
                console.log(formData)
                    try{
                        await this.$store.dispatch('login', formData)
                        this.$router.push('/HomeView')
                    } catch (error){
                       
                    }
            },
            
        },
        

    }
</script>

<style>
body{
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
    background-color: #f3f3f3;
}

.card{
    margin: 100px auto 0 auto;
    height: 350px;
    width: 400px;
    background-color: #2a2a2a;
    padding: 50px;
    border-radius: 20px;
    box-shadow: 0 0 5px #151515;
    box-shadow: 0 0 5px #151515;
    
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
}
.btn:hover{
    background-color: rgb(229, 107, 94)
}
.center{
    text-align: center;
    margin-top: 20px;

}
.hide_sign-up{
    font-size: 16px;
    color: #3b80b8;
}
.hide_sign-up:hover{
    color: rgb(229, 107, 94)

}
</style>