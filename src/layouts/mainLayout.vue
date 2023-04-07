<template>
    <div class="grid" >
        <div class='menu' >
          <router-link to="/HomeView"
                    custom
                    v-slot="{href, navigate}">
            <div :href="href" @click="navigate" class="menu_logotype"> <h1 class="menu_logotype_text">Logotype</h1></div>
          </router-link>
          <div class="menu_search"><input class="menu_search_input" type="text" placeholder="Найти услугу..."></div>
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
                <div v-if="showMenu" class="vertical-menu">
                  <ul>
                      <li><a :href="href" @click="navigator">{{name || `Войти`}}</a></li>
                    <li><a href="#" @click="logout">Выйти</a></li>
                  </ul>
                </div>
              </div>
          </div>
        </div>
        
        <div class='content'>
            <RouterView/>
        </div>
        <footer class="footer">
  

  <div class="container">
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
                  <a href="../views/HomeView" class="c-link">Главная</a>
                </li>

                <li>
                  <a href="/pages/about-us" class="c-link">Все услуги</a>
                </li>

                <li>
                  <a href="/blogs/community" class="c-link">Личный кабиент</a>
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
      <p>&copy; 2023 Наше название сайта.</p>
    </div>
  </div>
</footer>
    </div>
    
</template>

<script>
    export default{
      data() {
        return {
          showMenu: false,
          showModal: false,
          prevScrollPos: 0, 
          menuVisible: true
        }
      } ,

      async mounted(){
          if(!Object.keys(this.$store.getters.info).length){
            await this.$store.dispatch('fetchInfo')
          }
          this.$store.dispatch('idServices')
          
      },
      computed: {
        name(){
          return this.$store.getters.info.name
        },
        service(){
          return this.$store.getters.info.service
        },

      },
      methods: {
        navigator(){
          if(this.name){
            this.$router.push('/ServiceView')
          } else {
            this.$router.push('/LoginView')
          }
        },
        async logout() {
          await this.$store.dispatch('logout')
          this.$router.push('/LoginView?message=logout')
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
      background-color: #EAE7DC;
      font-family: 'Open Sans', sans-serif;
    }
  .grid{
    display: grid;
    min-height: 100vh; 

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
    grid-template-columns: 25% 41% 13% 13% 8% ;
    background-color: #ffffff;
    margin-left: 5%;
    border-radius: 0 0 20px 20px;
    box-shadow: 0 0 5px #37373720;
    box-shadow: 0 0 5px #37373720;
  }

    .menu_logotype{
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 100%;
      text-align: center;
      align-items: center;
    }
    .menu_logotype_text{
      color: #000000;
      font-size: 1.6em;
      font-weight: bold;
      text-align: center;
      align-items: center;
      cursor: pointer;


    }
    .menu_search{
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 100%;
      align-items: center;
    }
    .menu_search_input{
      background-color: #ffffff59;
      width: 60%;
      height: 50%;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      border-radius: 20px;
      border: 1px solid #D8C3A5;
      font-size: 1em;
      color: #000000;
      
    }
    .menu_services{
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 100%;
      font-size: 1em;
      /* font-weight: bold; */
      text-align: center;
      align-items: center;
      color: #000000;
    }
    .menu_services p {
      /* margin: 0 5px 0 5px;
      border-radius: 10px;
      border: 1px solid black;
      padding: 8px; */
    }
    .menu_addServices{
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 100%;
      align-items: center;
      font-size: 1em;
      /* font-weight: bold; */
      text-decoration-line: underline;
      text-decoration-color: #F6F3F3;
      /* text-decoration-thickness: 2px; */
      text-align: center;
      color: #000000;
      animation-name: menu_addServices_animation;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      animation-direction: alternate-reverse;

    }

    .menu_addServices_text{
      margin: 0 5px 0 5px;
      border: 1px solid black;
      background-color: #ffffff59;
      padding: 8px;
      border-radius: 10px;
      cursor: pointer;

    }
    
    .menu_profile{
      display: grid;
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
      background: #000000;
      border-radius: 50%;
    }

    .vertical-menu {
  position: absolute;
  margin-top: 20px;
  top: 100%;
  left: -25px;
  min-width: 60px;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  z-index: 1;
  box-shadow: 0 0 5px #37373720;
  box-shadow: 0 0 5px #37373720;
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
  color: #333;
  text-decoration: none;
}



:root {
  --light: #ffffff;
  --dark: #000;
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
  color: black;
}

</style>