<template>
    <div class="grid">
        <div class='menu'>
        <div class="menu_logotype"> <h1 class="menu_logotype_text">Logotype</h1></div>
        <div class="menu_search"><input class="menu_search_input" type="text" placeholder="      Найти..."></div>
        <div class="menu_services" @click="service"><p >Все услуги</p></div>
        <div class="menu_addServices"><router-link to="/addView"
                  custom
                  v-slot="{href, navigate}"
                  ><p :href="href" @click="navigate" class="menu_addServices_text">Добавить</p>
                  </router-link>
          
        </div>
        <div class="menu_profile">
            
            <div   @mouseover="showMenu = true" @mouseleave="showMenu = false" class="menu_profile_avatar">
              <div v-if="showMenu" class="vertical-menu">
                <ul>
                  <router-link to="/LoginView"
                  custom
                  v-slot="{href, navigate}"
                  >
                    <li><a :href="href" @click="navigate">{{name || `Войти`}}</a></li>
                  </router-link>
                  <li><a href="#" @click.prevent="logout">Выйти</a></li>
                </ul>
              </div>
            </div>
        
        
        </div>
        </div>
        
        <div class='content'>
            <RouterView/>
        </div>
    </div>
</template>

<script>

    export default{
      data() {
      return {
        showMenu: false,
        showModal: false
      }
      
    } ,
   async mounted(){
      if(!Object.keys(this.$store.getters.info).length){
        await this.$store.dispatch('fetchInfo')
      }
      this.$store.dispatch('idServices')
      // if(!Object.keys(this.$store.getters.service).length){
      //   await this.$store.dispatch('fetchServices')
      // }
    },
    computed: {
      name(){
        console.log(this.$store.getters.info.name)
        return this.$store.getters.info.name
      },
      service(){
        console.log(this.$store.getters.serviceInfo.service)
        return this.$store.getters.info.service
      }
    },
    methods: {
      async logout() {
        await this.$store.dispatch('logout')
        this.$router.push('/LoginView?message=logout')
      }, 
      

      
      
    }
    }
</script>

<style>
*{
    margin: 0;
    padding: 0;
    font-family: 'Montserrat';
    
    }
    body{
      background-color: #EAE7DC;
    }
  .grid{
    display: grid;
    grid-template-rows: 9% auto;
  }
  .menu{
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 25% 41% 13% 13% 8% ;
    background-color: #EAE7DC;
    /* box-shadow: 0 1px 3px -2px rgb(131, 129, 123); */
  }
    .menu_logotype{
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 100%;
      align-items: center;
    }
    .menu_logotype_text{
      color: #000000;
      font-size: 1.6em;
      font-weight: bold;
      text-align: center;
      
    }
    .menu_search{
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 100%;
      align-items: center;
    }
    .menu_search_input{
      background-color: #ffffff59;
      width: 50%;
      height: 50%;
      margin-left: auto;
      margin-right: auto;

      border-radius: 20px;
      border: 1px solid #E98074;
      font-size: 1em;
      font-weight: bold;
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
      background: #ffffff;
      border-radius: 50%;
    }
    .vertical-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  z-index: 1;
}

.vertical-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.vertical-menu li {
  margin-bottom: 8px;
}

.vertical-menu a {
  color: #333;
  text-decoration: none;
}

.vertical-menu a:hover {
  text-decoration: underline;
}
</style>