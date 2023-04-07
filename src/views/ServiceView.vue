<template>
  <div v-if="isLoading" id="preloader">
    <div id="loader"></div>
  </div>
  <div v-else>
    <div>
    <p>Item ID: {{$route.params.serviceId}}</p>
    <p>User ID: {{$route.query.userId}}</p>
    <p>Название: {{$route.query.service}}</p>
    <p>Описание: {{$route.query.description}}</p>
    <p>Обмен: {{$route.query.trade}}</p>
    <p>Город: {{$route.query.city}}</p>
    <p>Категория: {{$route.query.selectedCategory}}</p>
    <p>Дата: {{$route.query.addDate}}</p>
    <p>Телефон: {{$route.query.phone}}</p>


    <img 
    class="image_service" 
    :src="$route.query.imageURL">

    </div>
</div>
</template>
<script>
import firebase from 'firebase/app'
export default{
  computed:{
    serviceInfo(){
      
    },
    

  },
  data(){
      return {
        isLoading: true

      }
    },
  mounted() {
    // Здесь можно выполнить асинхронный запрос к базе данных и изменить значение флага isLoading после получения данных
    // Например:
    setTimeout(() => {
      this.isLoading = false; // Устанавливаем флаг isLoading в false после задержки, чтобы имитировать получение данных
    }, 500);
  }
  
}
</script>
<style>
 .image_service{
  width: 20%;
 }





#preloader {
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
}
#loader {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 150px;
    height: 150px;
    margin: -75px 0 0 -75px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #E98074;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
}
#loader:before {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #e56e60;
    -webkit-animation: spin 3s linear infinite;
    animation: spin 3s linear infinite;
}
#loader:after {
    content: "";
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #e25b4c;
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite;
}
@-webkit-keyframes spin {
    0%   {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@keyframes spin {
    0%   {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>