<template>
    <div>
      <form @submit.prevent="submitHandler">
        <label for="service">Услуга:</label>
        <input type="text" id="service" v-model="service" required>
        
        <label for="trade">Услуги взамен:</label>
        <input type="text" id="trade" v-model="trade">
        
        <label for="description">Описание:</label>
        <textarea id="description" v-model="description"></textarea>
        
        <label for="city">Город:</label>
        <input type="text" id="city" v-model="city" required>
        
        <button type="submit" >Отправить</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddView',
    data: ()=> ({
      
        service: "",
        trade: "",
        description: "",
        city: ""
      
    }),
    methods: {
      async submitHandler() {
        const formData = {
          service: this.service,
          trade: this.trade,
          description: this.description,
          city: this.city
        }
        try {
        await this.$store.dispatch('addService', formData)
        this.$router.push('/HomeView')
      } catch (e) {}


      }
    }
  };
  </script>