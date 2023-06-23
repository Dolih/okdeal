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
        <img class="content_categories_el_img" 
        :src=" loaded ? item.image : placeholderURL"
        @load="onImageLoad"
        >
        <p>{{item.title}}</p>
      </div>
    </div>
    <div class="content_popular">
      <div class="content_popular_header">
        🔥 Популярные объявления
      </div>
      
        <div class="content_popular_ads"> 
          <div class="content_popular_ad"
          :item="item"
          v-if="slctCtgry"
          v-for="item in services" :key="item.id"
          v-bind:class="{active_ad: item.isActive, premium_ad: item.premium}"
          @mouseover="select_ad(item)"
          @mouseout="unselect_ad(item)"
          :href="href" @click="openServicePage(item)"
          >
            <div class="ad_name"
            v-bind:class="{active_ad_name: item.isActive, premium_ad_name: item.premium}"
            >
            
              <div class="ad_name_text"
              v-bind:class="{active_name_text: item.isActive}"
              > {{ item.title }}</div>

            </div>
            <img class="ad_img" 
            :src="item.image" 
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
            <div class="ad_city"
            v-bind:class="{premium_ad_city: item.premium}">
              г. {{ item.city }}
            </div>
            <div class="ad_info"
            v-bind:class="{active_ad_info: item.isActive}"
            >
              <div class="ad_date"
              v-bind:class="{premium_ad_date: item.premium}"> {{ item.createdAt }} </div>
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
          v-bind:class="{active_ad: item.isActive, premium_ad: item.premium}"
          @mouseover="select_ad(item)"
          @mouseout="unselect_ad(item)"
          :href="href" @click="openServicePage(item)"
          >
            <div class="ad_name"
            v-bind:class="{active_ad_name: item.isActive, premium_ad_name: item.premium}"
            >
              <div class="ad_name_text"
              v-bind:class="{active_name_text: item.isActive}"
              >{{ item.title }}</div>
            </div>
            <img class="ad_img" 
            :src="item.image"
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
            <div class="ad_city"
            v-bind:class="{premium_ad_city: item.premium}"
            >
              г. {{ item.city }}
            </div>
            <div class="ad_info"
            v-bind:class="{active_ad_info: item.isActive}"
            >
              <div class="ad_date"
              v-bind:class="{premium_ad_date: item.premium}"> {{ item.createdAt }} </div>
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
  loaded: true,
  placeholderURL: '',

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
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных:', error);
        this.isLoading = false; 
      });


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

   allCategories() {
    for(let i = 0; this.$store.getters.categories.length> i; i++){
      const imageName = this.$store.getters.categories[i].image;
      const imageUrl = `http://localhost:5050/${imageName}`;
      this.$store.getters.categories[i].image = imageUrl

    }
    return this.$store.getters.categories
  },
  
  
},

methods: {
select_ad(item) {
  item.isActive = true
},
unselect_ad(item) {
  item.isActive = false
},
onImageLoad() {
      this.loaded = true;
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
    if(item.title == this.service[i].category.title){
      this.isActiveCt = true
      let srv = {
        userId:this.service[i].userId,
        id:this.service[i].id,
        title: this.service[i].title,
        city: this.service[i].city,
        description: this.service[i].description,
        category: this.service[i].category,
        image: this.service[i].image,
        trade: this.service[i].trade,
        author: this.service[i].author,
        createdAt: this.service[i].createdAt,
        premium: this.service[i].premium
      }
      item.isActiveCt = true
      this.services.push(srv)
      console.log(this.services[0].author)
    } else if (item.nameCt=="Все объявления"){
      this.slctCtgry = false
    }
  }
},
openServicePage(item){
  this.$router.push({
    path: `/ServiceView/${item.serviceId}`,
    query:{
      userId:item.userId,
      title: item.title,
      city: item.city,
      description: item.description,
      selectedCategory: item.category.title,
      image: item.image,
      trade: item.trade,
      addDate: item.addDate,
      name: item.author.name,
      phone: item.author.phone,
      vk: item.author.vk,
      telegram: item.author.telegram,
      whatsapp: item.author.whatsapp,
      createdAt: item.createdAt

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
  font-family: 'Open Sans', sans-serif;
}
.container{
  margin: 12vh auto 0 auto;
  padding: 0;
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
background-color: #3b80b8;
cursor: pointer;
width: 180px;
height: 73px;
border-radius: 20px;

}
.active_categories{
background-color: #2a2a2a;
animation-name: animation_active_categories;
animation-duration: 400ms;
}
.no_active_category{
background-color: #3b80b8;
}
.active_category{
background-color: #2a2a2a;
}
@keyframes animation_active_categories{
0%{
  background-color: #3b80b8;
}
100%{
  background-color: #2a2a2a;
}
}
.content_categories_el p{
color: #f3f3f3;
text-align: center;
font-size: 0.8em;
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
color: #030303;
  font-size: 1.5em;
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
[start] 'img  img  ' 65% [row2   ]
[row2 ] 'name name ' 15% [row3   ]
[row3 ] 'city like ' 10% [row4   ]
[row4 ] 'date like ' 10% [row-end] /60% 40% 
;
background-color: #2a2a2a;
border-radius: 20px;
height: 30vh;
border-radius: 20px;
margin: 10px;
position: relative;
z-index: 2;
cursor: pointer;
}
.premium_ad{
  background: linear-gradient(-45deg, #F9D976, #F39F86, #F9D976, #F39F86);
	background-size: 400% 400%;
	animation: gradient 5s ease infinite;
  border: 2px solid #2a2a2a;
}
@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
@keyframes active_ad_bg{
  0%{
    background-color: #2a2a2a;

  }
  100%{
    background-color: #3b80b8;
  }
}
.active_ad{
background-color: #3b80b8;
animation-name: active_ad_bg;
animation-duration: 400ms;
}

.ad_name{
position: relative;
z-index: 1;
grid-area: name;
display: flex;
color: #2a2a2a; 
margin: -15% 0 10% 0;
border-radius: 20px;
background-color: #f3f3f3;
border: 4px solid #2a2a2a;
}

.premium_ad_name{
  color: #2a2a2a;
  border: 2px solid #2a2a2a;
  background-color: #f3f3f3;
	background-size: 400% 400%;
}

.ad_name_text{
margin: auto; 
padding: 0 20px 0 20px;
font-size: 0.9em;
font-weight: 500;
text-align: center;
}

.premium_ad_name_text{
  color: #f3f3f3;
}

.ad_name_img{
  display: block;
  width: 10%;
}
.ad_img{
grid-area: img;
width: 100%;
height: 95%;
border-radius: 20px 20px 3px 3px;
object-fit: cover;
}
.ad_hint{
display: none;
grid-area: img;
margin: 0 0 4% 0;
border-radius: 20px 20px 3px 3px;
padding: 10px;
background-color: #000000a9;
}
.ad_hint_header{
color: #f3f3f3;
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
.ad_city{
  grid-area: city;
  margin-top: -7%;
  padding-left: 20px;
  color: #f3f3f3;
  font-size: 0.8em;
}
.premium_ad_city{
  color: #2a2a2a;
}
.ad_info{
grid-area: date;
display: flex;
margin-top: -7%;
padding-left: 20px;
border-radius: 20px;
}
.ad_date{
color: #f3f3f3;
font-size: 0.8em;
}
.premium_ad_date{
  color: #2a2a2a;
}
.ad_like{
grid-area: like;
border-radius: 20px;
}

.ad_like_img{
display: block;
margin: auto;
width: 40%;
}
@media (min-width:1900px){
  .content_categories{
    margin-left:auto;
    margin-right: auto;
    width: 60vw;
  }
  .content_popular{
    margin-left: 5%;
    margin-right: 5%;
  }
}
@media (max-width:1010px){

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
}
.content_popular{
margin: 50px 10% 0 10%;
}
.content_popular_header{
  margin-left: 10%;
  margin-right: 10%;
}
.content_popular_ads{
grid-template-columns: 50% 50%;
grid-template-rows: auto;
margin-left: 10%;
margin-right: 10%;
}
.content_popular_ad{
  min-height: 300px;
}
.content_categories_el_img{
  height: 50%;
}
} 
@media (max-width:420px){
.content_categories{
  width: 100vw;
  border-radius: 0;
  
}
.content_categories_el{
  margin-left: 2%;
  margin-right: 2%;
}
.content_categories_el p{
  font-size: 0.7em;
}
.content_popular_ads{
grid-template-columns: 50% 50%;
grid-template-rows: auto;
margin-left: 00%;
margin-right: 00%;
}
.content_popular_header{
  margin-left: 10px;
  font-size: 1.2em;
}
.content_popular{
margin: 25px 0% 0 0%;
}
.content_popular_ad{
  min-height: 200px;
  margin: 2%;
}
.ad_name_text{
  font-size: 0.7em;
}
.ad_date, .ad_city{
  font-size: 0.6em;
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
    border-top-color: #2a2a2a;
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
    border-top-color: #2a2a2a;
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
    border-top-color: #2a2a2a;
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