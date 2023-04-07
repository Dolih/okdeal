<template>
  <div v-if="isLoading" id="preloader">
    <div id="loader"></div>
  </div>
  <div v-else>
    <div class="container">
    <div  class="content_categories">
      <div ref="myEl" class="content_categories_el"
      v-bind:class="{active_categories: item.isActive}, {active_category: item.isActiveCt}"

      @mouseover="select_ad(item)"
      @mouseout="unselect_ad(item)"
      @click="viewCtgry(item)"
      :item="item"
      v-for="item in allCategories"
      >
      
        <img class="content_categories_el_img" :src="item.img">
        <p>{{item.nameCt}}</p>
      </div>
    </div>
    <div class="content_popular">
      <div class="content_popular_header">
        🔥 Популярные объявления 
      </div>
      
        <div class="content_popular_ads"
      > 
          <div class="content_popular_ad"
          :item="item"
          v-if="slctCtgry"
          v-for="item in services" :key="item.id"
          v-bind:class="{active_ad: item.isActive}"
          @mouseover="select_ad(item)"
          @mouseout="unselect_ad(item)"
          :href="href" @click="openServicePage(item)"
          >
            <div class="ad_name"
            v-bind:class="{active_ad_name: item.isActive}"
            >
              <div class="ad_name_text"
              v-bind:class="{active_name_text: item.isActive}"
              > {{ item.service }}</div>
            </div>
            <img class="ad_img" 
            :src="item.imageURL" 
            v-bind:class="{ad_display: !item.isActive} "
            
            />
            <div class="ad_hint"
            v-bind:class="{ad_display: item.isActive}"
            >
              <div class="ad_hint_header">Услуги взамен:</div>
              <div class="ad_hint_text"
              > 
                {{item.trade}} 
              </div>
            </div>
            <div class="ad_info"
            v-bind:class="{active_ad_info: item.isActive}"
            >
              <div class="ad_date"> {{ item.addDate }} </div>
            </div> 
            <div class="ad_like"
            v-bind:class="{active_ad_like: item.isActive}"
            >
              <img class="ad_like_img" src="../img/like.svg">
            </div>

          </div>
          <div class="content_popular_ad"
          :item="item"
          v-else
          v-for="item in service"
          v-bind:class="{active_ad: item.isActive}"
          @mouseover="select_ad(item)"
          @mouseout="unselect_ad(item)"
          :href="href" @click="openServicePage(item)"
          >
            <div class="ad_name"
            v-bind:class="{active_ad_name: item.isActive}"
            >
              <div class="ad_name_text"
              v-bind:class="{active_name_text: item.isActive}"
              > {{ item.service }}</div>
            </div>
            <img class="ad_img" 
            :src="item.imageURL" 
            v-bind:class="{ad_display: !item.isActive} "
            
            />
            <div class="ad_hint"
            v-bind:class="{ad_display: item.isActive}"
            >
              <div class="ad_hint_header">Услуги взамен:</div>
              <div class="ad_hint_text"
              > 
                {{item.trade}} 
              </div>
            </div>
            <div class="ad_info"
            v-bind:class="{active_ad_info: item.isActive}"
            >
              <div class="ad_date"> {{ item.addDate }} </div>
            </div> 
            <div class="ad_like"
            v-bind:class="{active_ad_like: item.isActive}"
            >
              <img class="ad_like_img" src="../img/like.svg">
            </div>

          </div>
        
        </div>
    </div>
  </div>
  </div>
</template>

<script>


export default {
components: { 
},
data(){
return {
  isActive: false,
  isActiveCt: false,
  slctCtgry: false,
  services: [
    
  ],
  isLoading: true
  
  
  
  }

},

async mounted (){
  Promise.all([
  this.$store.dispatch('allServices'),
  this.$store.dispatch('allCategories')
  ]).then(() => {
        // Все асинхронные действия выполнены успешно, устанавливаем флаг isLoading в false
        this.isLoading = false;
      })
      .catch((error) => {
        // Обработка ошибок, если необходимо
        console.error('Ошибка при загрузке данных:', error);
        this.isLoading = false; // Устанавливаем флаг isLoading в false в случае ошибки
      });
},

computed: {
  service(){
    const months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
      ];
    for(let i = 0; this.$store.getters.serviceInfo.length>i; i++){
      if (this.$store.getters.serviceInfo[i].addDate) {
    const dateParts = this.$store.getters.serviceInfo[i].addDate.split('.');
    const day = dateParts[0];
    const month = months[Number(dateParts[1]) - 1];
    this.$store.getters.serviceInfo[i].addDate = `${day} ${month}`
  
  }}
    return this.$store.getters.serviceInfo
    
  },
  allCategories() {
    return this.$store.getters.categories
  },
  idService(){
    return this.$store.getters.serviceId
  },
  
},

methods: {
select_ad(item) {
  item.isActive = true
},
unselect_ad(item) {
  item.isActive = false
},
viewCtgry(item){
  this.slctCtgry = true
  const el = this.$refs.myEl
  for(let i=0; el.length>i; i++){
    if(this.allCategories[i].isActiveCt == true){
      this.allCategories[i].isActiveCt = false
      item.isActiveCt = false
    }
  }
  this.services = []
  
  for(let i = 0; this.service.length > i; i++){
    if(item.nameCt == this.service[i].selectedCategory){
      this.isActiveCt = true
      let srv = {
        userId:this.service[i].userId,
        serviceId:this.service[i].serviceId,
        service: this.service[i].service,
        city: this.service[i].city,
        description: this.service[i].description,
        selectedCategory: this.service[i].selectedCategory,
        imageURL: this.service[i].imageURL,
        trade: this.service[i].trade,
        addDate: this.service[i].addDate,
        phone: this.service[i].phone
      }
      console.log(this.service[i].addDate)
      item.isActiveCt = true
      this.services.push(srv)
      
    } else if(item.nameCt=="Все объявления"){this.slctCtgry = false}
  }
},
openServicePage(item){
  this.$router.push({
    path: `/ServiceView/${item.serviceId}`,
    query:{
      userId:item.userId,
      service: item.service,
      city: item.city,
      description: item.description,
      selectedCategory: item.selectedCategory,
      imageURL: item.imageURL,
      trade: item.trade,
      addDate: item.addDate,
      phone: item.phone
    }
  })

}
}
}

</script>


<style>
::-webkit-scrollbar {
display: none;
}

body{
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;}
.container{
  margin-top: 12vh;
}

.content_categories{
margin-top: 50px;
margin-left: auto;
margin-right: auto;
width: 70vw;
overflow-x: scroll;
white-space: nowrap;
border-radius: 20px;
}
.content_categories_el{
display: inline-block;
flex-shrink: 0;
margin-left: 10px;
margin-right: 10px;
background-color: #D8C3A5;
cursor: pointer;
width: 165px;
height: 73px;
border-radius: 20px;

}
.active_categories{
background-color: #E98074;
animation-name: animation_active_categories;
animation-duration: 400ms;
}
.no_active_category{
background-color: #D8C3A5;
}
.active_category{
background-color: #E98074;
}
@keyframes animation_active_categories{
0%{
  background-color: #D8C3A5;
}
100%{
  background-color: #E98074;
}
}
.content_categories_el p{
color: #050505;
text-align: center;
font-size: 0.8em;
/* font-weight:600; */
}
.content_categories_el_img{
display: block;
margin: 5px auto 5px auto;
width: 40px;
}
.content_popular{
margin: 30px 12% 0 12%;
}
.content_popular_header{
color: #000000;
  font-size: 1.5em;
  /* font-weight: bold; */
}
.content_popular_ads{
display: grid;
grid-template-columns: 25% 25% 25% 25%;
grid-template-rows: auto;
margin-top: 20px;
height: 100%;

}
.content_popular_ad{
display: grid;
grid-template: 
[start] 'name name' 25% [row2   ]
[row2 ] 'img  img ' 58% [row3   ]
[row3 ] 'date like' 17% [row-end] /60% 40% 
;
background-color: #ffffff59;
border-radius: 20px;
border: 1px solid #8d8b8b5f;
height: 30vh;
border-radius: 20px;
margin: 10px;
position: relative;
z-index: 2;
cursor: pointer;

}

.active_ad{

background-color: #ffffffa6;
}

.ad_name{
position: relative;
z-index: 1;
grid-area: name;
display: flex;
width: 90%;

margin: 5% 5% 0 5%;
border-radius: 20px;
/* background-color: #CA4433; */
background-color: #D8C3A5;
}
.active_ad_name{
animation-name: active_name;
animation-duration: 400ms;
background-color: #E98074;
width: 100%;
margin: 0;
}
@keyframes active_name{
0% {
  background-color: #D8C3A5;
  width: 90%;
  margin: 5% 5% 0 5%;
}
100%{
  background-color: #E98074;
  width: 100%;
  margin: 0;
}
}
.ad_name_text{
margin: auto;
padding: 0 20px 0 20px;
font-size: 0.8em;
font-weight: 500;
color: rgb(0, 0, 0);
text-align: center;
}
.active_name_text{
padding: 0 30px 0 30px;

}

.ad_img{
grid-area: img;
width: 90%;
height: 95%;
margin: 5% 5% 0 5%;
border-radius: 20px;
object-fit: cover;
}
.ad_hint{
display: none;
grid-area: img;
margin: 5% 5% -1.5% 5%;
border-radius: 20px;
padding: 10px;
background-color: #000000a9;
}

.ad_hint_header{
color: #F6F3F3;
text-align: center;
font-weight: bold;
font-size: 0.9em;
padding-bottom: 10px;
}
.ad_hint_text{
color: #F6F3F3;
font-size: 0.9em;
text-align: center;

}
.ad_display{
display:block;
animation-name: active_ad_hint;
animation-duration: 400ms;
}
@keyframes active_ad_hint{
0%{
  opacity: 0;

}
100%{
  opacity: 1;
}
}
.ad_info{
grid-area: date;
display: flex;
margin: 10% 5% 7% 10%;
border-radius: 20px;
background-color: #D8C3A5;
}
/* .active_ad_info{
margin: 10% 20% 7% 10%;
} */
.ad_date{

margin: auto;
color: rgb(0, 0, 0);
font-size: 0.7em;

}
.ad_like{
grid-area: like;
background-color: #D8C3A5;
margin: 15% 15% 10% 20%;
border-radius: 20px;
}
.active_ad_like{
margin: 15% 15% 10% 0;
background-color: #E98074;
animation-name: animation_ad_like;
animation-duration: 400ms;
}
@keyframes animation_ad_like{
0%{
  margin: 15% 15% 10% 20%;
  background-color: #D8C3A5;
}
100%{
  margin: 15% 15% 10% 0;
  background-color: #E98074;
}
}
.ad_like_img{
display: block;
margin: auto;
width: 40%;
}
/* .ad_name{
color: white;
font-weight: bold;
font-size: 0.9em;
padding: 15px;
} */
@media (max-width:1010px){
.grid{
  /* grid-template-rows: 8vh auto; */

}
.menu_search_input{
  height: 55%;
  font-size: 0.7em;
}
.menu_logotype_text{
  font-size: 1.5em;
}
.menu_services, .menu_addServices{
  font-size: 1em;
}
.menu_profile_avatar{
  width: 35px; 
  height: 35px;
  margin-left: 10%;
}
.content_categories{
  width: 80vw
}
.content_categories_el{
  height: 60px
}
.content_categories_el p{
  font-size: 0.9em;
  margin-top: 18%
}
.content_popular{
margin: 50px 10% 0 10%;
}
.content_popular_ads{
grid-template-columns: 50% 50%;
grid-template-rows: auto;

}
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