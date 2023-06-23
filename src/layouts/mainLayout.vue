<template>
    <div class="grid" @click="hideSearchResults">
        <div class='menu' >
          <router-link to="/"
                    custom
                    v-slot="{href, navigate}">
            <div class="img_lgtp"><img class="img_lgtp_img" src="../img/logo_menu.svg"></div>
            <div :href="href" @click="navigate" class="menu_logotype"> <h1 class="menu_logotype_text">Спасибо.</h1></div>
          </router-link>
          <div class="menu_search"><input class="menu_search_input" type="text" placeholder="Найти услугу..." v-model="query" @input="performSearch">
            <div class="search_results" v-if="showResults">
            <ul>
              <li class="search_result_item" v-for="result in searchResults" :key="result.id" 
              @click="openServicePage(result)"
              @mouseover="select_ad(result)"
              @mouseout="unselect_ad(result)"
              v-bind:class="{active_result: result.isActive, premium_result: result.premium}">
                {{ result.title }}
              </li>
            </ul>
          </div></div>
          
          <div class="menu_services" @click="service">
            <router-link to="/AllServicesView"
                    custom
                    v-slot="{href, navigate}"
                    ><p :href="href" @click="navigate">Все услуги</p>
            </router-link>      
          </div>
          <div class="menu_addServices"><router-link to="/addView"
                    custom
                    v-slot="{href, navigate}"
                    ><p :href="href" @click="navigate" class="menu_addServices_text">Добавить</p>
                    </router-link>
          </div>

          <div class="menu_profile">
              <div   @click="showMenu = !showMenu"  class="menu_profile_avatar">
                <img class="menu_profile_avatar_img" v-if="infoUser.name" src="../img/groot.png">
                <div v-if="showMenu" class="vertical-menu">
                  <ul>
                      <li><a :href="href" @click="navigator">{{"Профиль" || `Войти`}}</a></li>
                    <li><a href="#" @click="username">Выйти</a></li>
                  </ul>
                </div>
              </div>
          </div>
        </div>
        
        <div class='content'>
            <RouterView/>
        </div>
      <footer class="footer">
        <div class="container_main">
          <div class="footer_inner">
            <div class="c-footer">
              <div class="layout">
                <div class="layout_item w-50">
                  <div class="newsletter">
                    <h3 class="newsletter_title">Ищите услуги быстро и легко с помощью нашего сервиса.</h3>
                    
                  </div>
                </div>

                <div class="layout_item w-25">
                  <nav class="c-nav-tool">
                    <h4 class="c-nav-tool_title">Меню</h4>
                    <ul class="c-nav-tool_list">
                      <li>
                        <a href="../" class="c-link">Главная</a>
                      </li>

                      <li>
                        <a href="../AllServicesView" class="c-link">Все услуги</a>
                      </li>

                      <li>
                        <a href="../UserView" class="c-link">Личный кабиент</a>
                      </li>
                      <li>
                        <a href="#" class="c-link">О нас</a>
                      </li>
                    </ul>
                  </nav>

                </div>

                <div class="layout_item w-25">
                  <nav class="c-nav-tool">
                    <h4 class="c-nav-tool_title">Помощь</h4>
                    <ul class="c-nav-tool_list">


                      <li class="c-nav-tool_item">
                        <a href="/pages/help" class="c-link">FAQ</a>
                      </li>

                      <li class="c-nav-tool_item">
                        <a href="/pages/privacy-policy" class="c-link">Политика конфидициальности</a>
                      </li>

                      <li class="c-nav-tool_item">
                        <a href="/pages/contact" class="c-link">Контакты</a>
                      </li>

                      <li class="c-nav-tool_item">
                        <a href="/LoginView" class="c-link">
                          Войти
                        </a>
                      </li>
                    </ul>
                  </nav>

                </div>
              </div>
              
            </div>
          </div>
          <div class="footer_copyright">
            <p>&copy; 2023 За cпасибо.</p>
          </div>
        </div>
      </footer>
    </div>
    
</template>

<script>
import Cookies from 'js-cookie'
import {getUserInfo} from '../store/userInfo.js'
import { mapState } from 'vuex';
import axios from 'axios'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'



    export default{
      
      data() {
        
        return {
          showMenu: false,
          isActive: false,
          showModal: false,
          prevScrollPos: 0, 
          menuVisible: true,
          username: '',
          query: '',
          searchResults: [],
          showResults: false // Показывать или скрывать результаты

          
        }
      } ,

   

      async mounted(){
          if(!Object.keys(this.$store.getters.info).length){
            await this.$store.dispatch('fetchInfo')
          }
            this.$store.dispatch('allServices')
            


          
      },
      computed: {
        service(){
    for(let i = 0; this.$store.getters.serviceInfo.length> i; i++){
      const imageName = this.$store.getters.serviceInfo[i].image;
      const imageUrl = `http://localhost:5050/${imageName}`;
      this.$store.getters.serviceInfo[i].image = imageUrl

    }
    let services = [];
    for(let i=0;  this.$store.getters.serviceInfo.length> i; i++){
      if(this.$store.getters.serviceInfo[i].approved){
        const service = this.$store.getters.serviceInfo[i]
        const dateString = service.createdAt; // Получаем строку с датой

        const date = new Date(dateString); // Создаем объект Date из строки

        const year = date.getFullYear();
        const month = date.toLocaleString("default", { month: "long" });
        const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1); // Написание месяца с большой буквы
        const day = date.getDate();

        const formattedDate = `${formattedMonth}, ${day}`; // Формируем строку в нужном формате

        service.createdAt = formattedDate;
        services.push(service)
      }
    }
    console.log(services.reverse())
    return services.reverse()
  },
        infoUser(){
          return this.$store.getters.info
        },


      },

      

      methods: {
        select_ad(result) {
          result.isActive = true
        },
        unselect_ad(result) {
          result.isActive = false
        },

        openServicePage(result){
          this.showResults = false;
          this.query =''
          this.$router.push({
          path: `/ServiceView/${result.serviceId}`,
          query:{
            userId:result.userId,
            title: result.title,
            city: result.city,
            description: result.description,
            selectedCategory: result.category.title,
            image: result.image,
            trade: result.trade,
            addDate: result.addDate,
            name: result.author.name,
            phone: result.author.phone,
            vk: result.author.vk,
            telegram: result.author.telegram,
            whatsapp: result.author.whatsapp,
            createdAt:result.createdAt

              }
            })
        },
       
        test(){
          console.log(this.service)
        },
        logincheck(){
          console.log(this.infoUser)
          

        },
        hideSearchResults(event) {
      const clickedInsideSearch = event.target.closest('.menu_search') !== null;
      if (!clickedInsideSearch) {
        // Клик был сделан вне области формы поиска, скрываем результаты
        this.searchResults = [];
        this.showResults = false;
        this.query =''
      }
    },

        performSearch() {
          this.showResults = true;
          const searchQuery = this.query.toLowerCase(); // Приводим запрос к нижнему регистру

      // Фильтрация элементов, соответствующих запросу
      this.searchResults = this.service.filter(item => {
        return item.title.toLowerCase().includes(searchQuery);
      });

      // Обработка результатов поиска
      console.log(this.searchResults);
    },

        navigator(){
          if(this.infoUser.name){
            this.$router.push('/UserView')
          } else {
            this.$router.push('/LoginView')
          }
        },
        async logout() {
          Cookies.remove()
        }, 
  
      }
    }
</script>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Noto+Serif+Display:wght@300&family=Rubik:wght@400;500;700&display=swap");

  *{
    margin: 0;
    padding: 0;
    }
    body{
      margin-top: 20px;
      background-color: #f3f3f3;
      font-family: 'Open Sans', sans-serif;
    }
  .grid{
    display: grid;
    min-height: 100vh; 

  }
  .search_results {
    margin-left: auto;
    margin-right: auto;
  /* background-color: #f3f3f3; */
  text-align: center;
  padding: 5px;
   border-radius: 20px;
  /* border: 1px solid #2a2a2a;  */
  font-size: 1em;
  width: 60%;

}
.active_result{

  background-color: #3b80b8;


}

.search_result_item {
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 20px;
  background-color: #f3f3f3;
  border: 2px solid #2a2a2a;
  color: #2a2a2a;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;

}

.search_result_item:hover{
  background-color: #3b80b8;
  border: none;
  color: #f3f3f3;

}

  .menu{
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: grid;
    z-index: 1000;
    position: fixed;
    width: 90%;
    height: 8vh;
    grid-template-rows: 100%;
    grid-template: 
    [start] 'img logotype search allServices addService profile' 100% [row-end] /10% 15% 41% 13% 13% 8%
    ;
    background-color: #2a2a2a;
    margin-left: 5%;
    border-radius: 0 0 20px 20px;
    box-shadow: 0 0 5px #151515;
    box-shadow: 0 0 5px #151515;
  }
    .img_lgtp{
      margin-left: 60px;
      grid-area: img;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      cursor: pointer;

    }
    .img_lgtp_img{
      
      height: 60%;
      margin: auto;
      

    }
    .menu_logotype{
      display: grid;
      grid-area: logotype;
      grid-template-columns: 100%;
      grid-template-rows: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .menu_logotype_text{
      color: #f3f3f3;
      font-size: 1.6em;
      font-weight: bold;
      text-align: center;
      align-items: center;
      cursor: pointer;


    }
    .menu_search{
      display: grid;
      grid-area: search;

      grid-template-columns: 100%;
      grid-template-rows: 100%;
      align-items: center;
    }
    .menu_search_input{
      background-color: #f3f3f3;
      width: 60%;
      height: 50%;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      border-radius: 20px;
      border: 1px solid #f3f3f3;
      font-size: 1em;
      color: #1c1c1c;
      
    }
    .menu_services{
      display: grid;
      grid-area: allServices;
      grid-template-columns: 100%;
      grid-template-rows: 100%;
      font-size: 1em;
      /* font-weight: bold; */
      text-align: center;
      align-items: center;
      color: #f3f3f3;
      cursor: pointer;
      transition: font-weight 0.3s ease;
      transition: font-size 0.3s ease;


    }
    .menu_services:hover{
      font-size: 1.2em;
      font-weight: bold;
      /* color: #3b80b8; */
    }
    .menu_services p {
      
    }
    .menu_addServices{
      display: grid;
      grid-area: addService;
      grid-template-columns: 100%;
      grid-template-rows: 100%;
      align-items: center;
      font-size: 1em;
      /* font-weight: bold; */
      /* text-decoration-thickness: 2px; */
      text-align: center;
      color: #f3f3f3;
      animation-name: menu_addServices_animation;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      animation-direction: alternate-reverse;

    }

    .menu_addServices_text{
      margin: 0 5px 0 5px;
      border: 1px solid #f3f3f3;
      padding: 8px;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      transition: border-color 0.3s ease;

    }
    .menu_addServices_text:hover{
      background-color: #3b80b8;
      border-color: #3b80b8;
    }
    
    .menu_profile{
      display: grid;
      grid-area: profile;

      grid-template-columns: 100%;
      grid-template-rows: 100%;
      align-items: center;
    }
    .menu_profile_avatar{
      position: relative;
      cursor: pointer;
      width: 45px; 
      height: 45px;
      margin-left: 20%;
      background: #f3f3f3;
      border-radius: 50%;
      /* overflow: hidden; */
    }
    .menu_profile_avatar_img{
      width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 50%;
    }

    .vertical-menu {
  position: absolute;
  margin-top: 20px;
  top: 100%;
  left: -25px;
  min-width: 60px;
  background-color: #2a2a2a;
  border-radius: 20px;
  padding: 20px;
  z-index: 1;
  box-shadow: 0 0 5px #151515;
  box-shadow: 0 0 5px #151515;
}
.vertical-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.vertical-menu li {
  margin-bottom: 8px;
  text-align: center;

}
.vertical-menu a {
  color: #f3f3f3;
  text-decoration: none;
}



:root {
  --light: #2a2a2a;
  --dark: #f3f3f3;
}

h3 {
  font-family: "Noto Serif Display", serif;
  font-size: 2.3rem;
  font-weight: 300;
  text-align: center;
}
a {
  text-decoration: none;
  color: var(--dark);
  font-weight: 500;
  
  transition: 0.3s ease-in;
  border-bottom: 1px solid transparent;
  margin-bottom: 0.5rem;
  display: inline-flex;
}
a:hover {
  border-bottom: 1px solid var(--dark);
}
ul {
  list-style-type: none;
  padding: 0;
}

.flex {
  display: flex;
}
.c-nav-tool_title{
  padding-bottom: 10px;
}

.footer_inner {
  background: var(--light);
  backdrop-filter: blur(50px);
  border: 0.1px solid rgba(233, 232, 232, 0.208);
  border-radius: 20px;
  padding: 2rem;
  margin: 1rem 0;
}

.footer {
  padding: 50px 50px 20px 50px;
  position: relative;
  display: flex;
  align-items: center;
  margin-top: auto; 
}
.footer_copyright{
  padding-left: 20px;
}
.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}
.newsletter_title{
  color: #f4f4f4;
}
.c-nav-tool_title{
  color: #f4f4f4;

}

@media (min-width: 675px) {
  .layout {
    display: flex;
    flex-wrap: nowrap;
    column-gap: 2rem;
  }
  .w-50 {
    width: 50%;
  }
  .w-25 {
    width: 25%;
  }
}


.c-2 {
  margin-top: 3.5rem;
}
.footer_copyright {
  color: #2a2a2a;
  padding-bottom: 20px;
}
@media (max-width:420px){
  .grid{
    margin-left: 0;
    margin-right: 0;
  }
  .menu{
    width: 100vw;
    margin-left: 0;
    margin-right: 0;
    border-radius: 0;
    grid-template: 
    [start] 'logotype search profile' 100% [row-end] /70% 15% 15%
    ;
  }

  .menu_logotype_text{
    padding-left: 25px;
    text-align: left;
    font-size: 0.8em;
  }
  .footer{
    width: 100vw;
    margin-left: 0;
    margin-right: 0;
    padding: 0;
  }
  .footer_inner{
    margin-left: 0%;
    margin-right: 0;
    border-radius: 0;
  }
  .container_main{
    margin-left: 0;
    margin-right: 0;
  }
}
</style>