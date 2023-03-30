<template>
    <div>
    <p>Item ID: {{$route.params.serviceId}}</p>
    <p>User ID: {{$route.query.userId}}</p>
    <p>Название: {{$route.query.service}}</p>
    <p>Описание: {{$route.query.description}}</p>
    <p>Обмен: {{$route.query.trade}}</p>
    <p>Город: {{$route.query.city}}</p>
    <p>Категория: {{$route.query.selectedCategory}}</p>
    <img 
    class="image_service" 
    :src="$route.query.imageURL">

  </div>
</template>
<script>
import firebase from 'firebase/app'
export default{
  computed:{
    serviceInfo(){
      
    }
  }
}
</script>
<style>
 .image_service{
  width: 20%;
 }
</style>