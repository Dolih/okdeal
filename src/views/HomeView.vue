<template>
<div  class="content_categories">
        <div class="content_categories_el"
        v-bind:class="{active_categories: item.isActive}"
        @mouseover="select_ad(item)"
        @mouseout="unselect_ad(item)"
        :item="item"
        v-for="item in categories" :key="item.id"
        >
          <img class="content_categories_el_img" :src="item.image">
          <p>{{item.name}}</p>
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
            v-for="item in popular_ads" :key="item.id"
            v-bind:class="{active_ad: item.isActive}"
            @mouseover="select_ad(item)"
            @mouseout="unselect_ad(item)"
            >
              <div class="ad_name"
              v-bind:class="{active_ad_name: item.isActive}"
              >
                <div class="ad_name_text"
                v-bind:class="{active_name_text: item.isActive}"
                > {{ item.name }}</div>
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
                :item='i' v-for='i in item.return_services ' :key="i"
                > 
                  {{i}} 
                </div>
              </div>
              <div class="ad_info"
              v-bind:class="{active_ad_info: item.isActive}"
              >
                <div class="ad_date"> {{ item.time }} </div>
              </div> 
              <div class="ad_like"
              v-bind:class="{active_ad_like: item.isActive}"
              >
                <img class="ad_like_img" src="../img/like.svg">
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
      categories: [
        {
          id: 1,
          image: require('../img/education.svg'),
          isActive: false,
          name: "Обучение"
        },
        {
          id: 2,
          image: require('../img/household.svg'),

          isActive: false,
          name: "Бытовые"
        },
        {
          id: 3,
          image: require('../img/health.svg'),

          isActive: false,
          name: "Здоровье"
        },
        {
          id: 4,
          image: require('../img/art.svg'),

          isActive: false,
          name: "Искусство"
        },
        {
          id: 5,
          image: require('../img/repair.svg'),

          isActive: false,
          name: "Ремонт"
        },
        {
          id: 6,
          image: require('../img/dating.svg'),

          isActive: false,
          name: "ИТ-услуги"
        },
        {
          id: 7,
          image: require('../img/art.svg'),

          isActive: false,
          name: "Одежда"
        },
        {
          id: 8,
          image: require('../img/household.svg'),

          isActive: false,
          name: "Что то еще"
        },
        {
          id: 9,
          image: require('../img/health.svg'),

          isActive: false,
          name: "И еще"
        },
      ],
      popular_ads:[
        {
          id: 1,
          isActive:false,
          time: '4 дня назад',
          image: require('../img/clothes.jpeg'),
          name: 'Роспись одежды',
          return_services: ['Бытовые услуги', 'Логопед', 'Стрижка']
        },
        {
          id: 2,
          isActive:false,
          time: '2 недели назад',
          image: require('../img/chemical.jpeg'),
          name: 'Консультации по химии',
          return_services: ['Бытовые услуги', 'Логопед', 'Стрижка']
        },
        {
          id: 3,
          isActive:false,
          time: '1 месяц назад',
          image: require('../img/psychology.jpeg'),
          name: 'Психолог',
          return_services: ['Бытовые услуги', 'Логопед', 'Стрижка']
        },
        {
          id: 4,
          isActive:false,
          time: '12 дней назад',
          image: require('../img/logoped.jpeg'),
          name: 'Логопед',
          return_services: ['Бытовые услуги', 'Логопед', 'Стрижка']
        },
        {
          id: 5,
          isActive:false,
          time: '1 неделю назад',
          image: require('../img/fitness.jpeg'),
          name: 'Фитнесс-инструктор',
          return_services: ['Бытовые услуги', 'Логопед', 'Стрижка']
        },
        {
          id: 6,
          isActive:false,
          time: '2 месяца назад',
          image: require('../img/hair.jpeg'),
          name: 'Стрижка',
          return_services: ['Бытовые услуги', 'Логопед', 'Стрижка']
        },
        {
          id: 7,
          isActive:false,
          time: '1 день назад',
          image: require('../img/ads.jpeg'),
          name: 'Юридические услуги',
          return_services: ['Бытовые услуги', 'Логопед', 'Стрижка']
        },
        {
          id: 8,
          isActive:false,
          time: '5 часов назад',
          image: require('../img/photo.jpeg'),
          name: 'Фотосессия',
          return_services: ['Бытовые услуги', 'Логопед', 'Стрижка']
        },
      ]
      }
    
    },
    
  
  methods: {
    select_ad(item) {
      item.isActive = true
    },
    unselect_ad(item) {
      item.isActive = false
    }
  }
}

</script>


<style>
::-webkit-scrollbar {
    display: none;
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
    /* border: 1px solid black; */
    width: 165px;
    height: 73px;
    border-radius: 20px;
  }
  .active_categories{
    background-color: #E98074;
    animation-name: animation_active_categories;
    animation-duration: 400ms;
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
    /* font-weight:600; */
  }
  .content_categories_el_img{
    display: block;
    margin: 5px auto 5px auto;
    width: 40px;
  }
  .content_popular{
    margin: 30px 17% 0 17%;
  }
  .content_popular_header{
    color: #000000;
      font-size: 1.5em;
      /* font-weight: bold; */
  }
  .content_popular_ads{
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    grid-template-rows: 50% 50%;
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
    font-size: 0.9em;
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
      grid-template-rows: 6vh 94vh;

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
    grid-template-rows: 25% 25% 25% 25% ;

  }
  } 


 
  
  
</style>