<template>
  <div class="container_add">       
        <button class="btn_back" @click="goBack">← Назад</button>
        <form class="form_add" @submit.prevent="submitHandler">
          <div class="grid_add">

          <div class="title_addView">
            <p class="title_addView_txt">Создать новое предложение</p>
          </div>
          <div class="name_addView">
            <input  type="text" id="service" placeholder="Введите название услуги" v-model="title" required>
          </div>
          <div class="category_add">
            <select  id="categories" v-model="selectedCategory" >
              <option class="categories_el" disabled value="Выберите категорию" >Выберите категорию</option>
              <option :item="item" v-for="item in allCategories">{{ item.title }}</option>
            </select>
          </div>
          <div class="description">
            <p class="description_label" >💬 Добавьте описание:</p>
            <textarea id="description" v-model="description" placeholder="Опишите более подробно, в чем заключается смысл вашей услуги" required></textarea>
          </div>
          <div class="links_add">
            <p class="links_txt">📞 Ваши контакты для связи:</p>
            <input type="tel" id="phone"  :value='`+${telPhone.phone}`' required readonly> 
            <input v-if="telPhone.vk" type="tel" id="phone"  :value='`${telPhone.vk}`' required readonly> 
            <input v-if="telPhone.telegram" type="tel" id="phone"  :value='`${telPhone.telegram}`' required readonly> 
            <input v-if="telPhone.whatsapp" type="tel" id="phone"  :value='`${telPhone.whatsapp}`' required readonly> 

          </div>

          <div class="trade">
            <p class="trade_txt">⚙️ Какие услуги хотите получить взамен?</p>
            <input type="text" placeholder="Напишите, что нужно Вам" id="trade" v-model="trade" required>
          </div>
          
          <div class="city">
            <p class="city_txt">🏠 Укажите Ваш город:</p>
            <input type="text" id="city" placeholder="Напишите город" v-model="city" required>
          </div>
                

          <br>
          <label class="img" for="image">📷 Теперь добавьте изображение:</label>
          <input class="img_btn" type="file" id="image" name="image" ref="image" @input="handleImageChange">
          
          <button  class="add_btn" type="submit" >Опубликовать объявление</button>
          </div>
        </form>
  </div> 
  </template>
  
  <script>
  import axios from 'axios';
import Cookies from 'js-cookie';
import router from '../router/index.js'; // Путь к вашему объекту router

  export default {
   
    name: 'AddView',
    data: ()=> ({
      
        title: "",
        description: "",
        trade: "",
        city: "",
        userId: "",
        image: null,         
      
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
        this.image = e.target.files[0]
      },

      test(){
        for(let i=0; this.allCategories.length > i; i++){
          if(this.allCategories[i].title === this.selectedCategory){
            return this.allCategories[i].id
          }
        }
      },

      test1(){
        console.log()
      },

      async submitHandler() {
        event.preventDefault()
  
        const formData = new FormData()
        formData.append('title', this.title)
        formData.append('description', this.description)
        formData.append('trade', this.trade)
        formData.append('city', this.city)
        formData.append('image', this.image)
        formData.append('userId', this.userId)
        formData.append('categoryId', this.test())

        const token = Cookies.get('token');
        console.log(token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        axios.post('http://localhost:5050/posts', formData)
          .then(response => {
            console.log(response)
            router.push('/AllServicesView');
          })
          .catch(error => {
            console.log(formData)
            console.log(error)
            // обработка ошибки
          });




      },
      
      
    }
  };
  </script>

  <style>
  body{
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;

  }
  .container_add{
    margin: 9vh 15vw 0 15vw;

  }
  
   .btn_back{
  font-size: 1.2em;
  padding: 10px;
  background-color: #f3f3f3;
  border: none;
  cursor: pointer;
}
   .grid_add{
    color: #f3f3f3;
    display: grid;
    grid-template: 
    [start] ' back         back      ' auto [row2   ]
    [row2 ] ' title        title     ' auto [row3   ]
    [row3 ] ' name         category  ' auto [row4   ]
    [row4 ] ' description  links     ' auto [row5   ]
    [row5 ] ' trade        city      ' auto [row6   ] 
    [row6 ] ' img          img_btn   ' auto [row7   ] 
    [row7 ] ' add_btn      add_btn   ' auto [row-end] /30vw 30vw
    ;
   }
   .form_add{
    background-color: #2a2a2a;
    padding: 50px;
    border-radius: 20px;
    margin-top: 20px;

   }

   .back{
  grid-area: back;
  
}
.title_addView{
  grid-area: title;
  width: 102%;
  background-color: #3b80b8;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  margin-top: -30px;
  padding: 20px 0;
  border-radius: 20px;
  
}
.title_addView_txt{
  font-size: 1.6em;
  color: #f3f3f3;
  font-weight: bold;
  text-align: center;
}
.name_addView{
  grid-area: name;
  

}
#service{
  width: 95%;
  border-radius: 20px;
  border: 2px solid #2a2a2a;
  height: 50px;
  font-size: 1.2em;
  text-align: center;
  margin-bottom: 20px;
}
.category_add{
  grid-area: category;

}
#categories{
  width: 100%;
  margin-left: 5%;
  height: 50px;
  border-radius: 20px;
  border: 2px solid #2a2a2a;
  text-align: center;
  font-size: 1.2em;
  background-color: #f3f3f3;
  -moz-appearance: none;
 -webkit-appearance: none;
}
.categories_el{
  text-align: center;
}
.description{
  grid-area: description;
  margin-bottom: 20px;
}
.description_label{
  margin-bottom: 10px;
}
#description{
  width: 95%;
  border-radius: 20px;
  border: 2px solid #2a2a2a;
  height: 200px;
  /* padding: 20px; */
  text-align: center;
  padding-top: 20px;
  font-size: 1em;
}
.links_add{
  grid-area: links;
  width: 100%;
  margin-left: 5%;
}
.links_txt{
  margin-bottom: 10px;
}
#phone{
  width: 100%;
  height: 40px;
  border-radius: 20px;
  border: 2px solid #2a2a2a;
  font-size: 1em;
  text-align: center;
  margin-bottom: 10px;
}
.trade{
  grid-area: trade;
  margin-bottom: 20px;
}
.trade_txt{
  margin-bottom: 3px;
}
#trade{
  margin-top: 10px;
  font-size: 1em;
  height: 40px;
  width: 95%;
  border-radius: 20px;
  border: 2px solid #2a2a2a;
}
.city{
  grid-area: city;
  width: 100%;
  margin-left: 5%;
}
.city_txt{
  margin-bottom: 10px;
}
#city{
  height: 40px;
  width: 100%;
  
  font-size: 1em;
  border-radius: 20px;
  margin-bottom: 20px;

  border: 2px solid #2a2a2a;
}
.img{
  grid-area: img;
  margin-bottom: 30px;
}
.img_btn{
  grid-area: img_btn;
  margin-left: 5%;

}
/* .add_btn_1{
  grid-area: add_btn;
  height: 60px;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 20px;
  border: none;
  font-size: 1.3em;
} */
.add_btn{
  grid-area: add_btn;

  background-color: #3b80b8;
  border-radius: 20px;
  margin-left: auto;
  margin-right: auto;
  height: 60px;
  width: 40%;
  border: none;
  font-size: 1.3em;
  color: #f3f3f3;
  text-align: center;
}
.add_btn:hover{
  background-color: #2a2a2a;
  border-radius: 20px;
  border: 4px solid #3b80b8;
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