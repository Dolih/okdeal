<template>
    <div>
      <button @click="goBack">Назад</button>

      <form @submit.prevent="submitHandler">
        <label for="service">Услуга:</label>
        <input  type="text" id="service" v-model="service" required>
        
        <label for="trade">Услуги взамен:</label>
        <input type="text" id="trade" v-model="trade" required>
        
        <label for="description">Описание:</label>
        <textarea id="description" v-model="description" required></textarea>
        
        <label for="city">Город:</label>
        <input type="text" id="city" v-model="city" required>

        <label for="phone">Номер телефона:</label>
        <input type="tel" id="phone"  :value='`+7 ${telPhone.phone}`' required readonly>

        <label for="category">Категория:</label>
        <select id="categories" v-model="selectedCategory" required>
          <option disabled value="">Выберите категорию</option>
          <option :item="item" v-for="item in allCategories" >{{ item.nameCt }}</option>
        </select>

        <br>
        <label for="image">Изображение:</label>
        <input type="file" id="image" ref="image" @change="handleImageChange" required>
        
        <button type="submit" >Отправить</button>
      </form>
    </div>
  </template>
  
  <script>
  import firebase from 'firebase/app'
  import 'firebase/storage'
  
  export default {
   
    name: 'AddView',
    data: ()=> ({
      
        service: "",
        trade: "",
        description: "",
        city: "",
        imageFile: null,
        imageLink: "", 
        selectedCategory: "",
        phone:'',
        today: new Date(),
        
      
    }),
    async mounted (){
      this.$store.dispatch('allCategories')
      this.$store.dispatch('fetchInfo')

    },
    computed: {
      allCategories() {
        return this.$store.getters.categories
      },
      telPhone() {
        return this.$store.getters.info
      }
    },
    methods: {
      goBack() {
        window.history.back();
      },
      handleImageChange(e) {
        this.imageFile = e.target.files[0]
      },
      async uploadImage() {
        const storageRef = firebase.storage().ref('images')
        const fileRef = storageRef.child(this.imageFile.name)
        const snapshot = await fileRef.put(this.imageFile)
        const imageURL = await snapshot.ref.getDownloadURL()
        return imageURL
      },

      async submitHandler() {
        event.preventDefault()
        

        const formData = {
          service: this.service,
          trade: this.trade,
          description: this.description,
          city: this.city,
          selectedCategory: this.selectedCategory,
          imageURL: "",
          phone: this.telPhone.phone,
          addDate: `${this.today.getDate()}.${this.today.getMonth() + 1}.${this.today.getFullYear()}`

          
        }
        try {
        formData.imageURL = await this.uploadImage()
        await this.$store.dispatch('addService', formData)
        this.$router.push('/HomeView')
      } catch (e) {}


      },
      
      
    }
  };
  </script>

  <style>
   #categories{
    background-color: aqua;
   }
   select {
  display: block;
  width: 100%;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
  </style>