<template>
  <div
  class="adm_pn_services"
  :item="item"
  v-for="item in service" :key="item.id"
  >
    <div class="adm_pn_service">
      <img class="adm_pn_img" :src="item.image">
      <p><strong>Название: </strong> {{ item.title }}</p>
      <p><strong>Описание: </strong>{{ item.description }}</p>
      <p><strong>Город: </strong>{{ item.city }}</p>
      <p><strong>Категория: </strong>{{ item.category.title }}</p>
      <p><strong>Автор: </strong>{{ item.author.name }}</p>
      <p><strong>Взамен: </strong>{{ item.trade }}</p>
      
      <button class="btn_non_approve" v-if="!item.approved" @click="approve(item)">Отклонить</button>
      <button class="btn_approve" v-if="!item.approved" @click="approve(item)">Одобрить</button>
      <button v-else class="btn_approved">Одобрено</button>

    </div>
  </div>
 
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
export default{
    data(){
        return{

        }
    },

    async mounted (){
        this.$store.dispatch('adminAllServices')
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
            if(!this.$store.getters.serviceInfo[i].approved){
                const service = this.$store.getters.serviceInfo[i]
                services.push(service)
            }
            }
            console.log(services)
            return services.reverse()
        }
    },
    methods:{
        approve(item){
            console.log(item.id)
            axios.post(`http://localhost:5050/posts/${item.id}/approve`)
        }
    }
}

</script>

<style>
body{
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
}
.adm_pn_services{
margin: 12vh;
}
.adm_pn_service{
  border-radius: 20px;
  border: 1px solid #2a2a2a;
  padding: 20px;
}
.adm_pn_img{
  height: 20%;
  width: 20%;
}
.container_adm{
  margin: 12vh auto 0 auto;
  padding: 0;
}
.ad_name_img{
  display: block;
  width: 10%;
}

.ad_img{
grid-area: img;
width: 100%;
height: 95%;
/* margin: 5% 5% 0 5%; */
border-radius: 20px 20px 3px 3px;
object-fit: cover;
}

.content_popular_ads_adm{
display: grid;
grid-template-columns: 50% 50%;
grid-template-rows: auto;
margin-top: 12vh;
height: 100%;

}
.content_popular_ad{
display: grid;
grid-template: 
[start] 'name name  ' 20% [row2   ]
[row2 ] 'dscrpt img ' 40% [row3   ]
[row3 ] 'city btn_n ' 10% [row4   ]
[row4 ] 'date btn_a ' 10% [row-end] /80% 20% 
;
background-color: #2a2a2a;
border-radius: 20px;
/* border: 1px solid #2a2a2ab9; */
height: 50vh;
border-radius: 20px;
margin: 10px;
position: relative;
z-index: 2;
cursor: pointer;

/* box-shadow: 0 0 5px #151515;
  box-shadow: 0 0 5px #151515; */

}
.dscrpt{
  grid-area: dscrpt;
}
.btn_non_approve{
  grid-area: btn_n;
  border: none;
  text-decoration:none;
  padding: 10px;
  border-radius: 20px;
  background-color: #c27070;
  margin: 5px;
}
.btn_approve{
  border: none;
  grid-area: btn_a;
  width: 120px;
  text-decoration:none;
  padding: 10px;
  border-radius: 20px;
  background-color: #62945f;
  margin: 5px;

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
/* width: 90%; */

margin: -15% 0 10% 0;
border-radius: 20px;
/* background-color: #CA4433; */
background-color: #f3f3f3;
border: 4px solid #2a2a2a;
/* box-shadow: 0 0 5px #090A0A;
box-shadow: 0 0 5px #090A0A; */

}

.ad_name_text{
margin: auto; 
padding: 0 20px 0 20px;
font-size: 0.9em;
font-weight: 500;
color: #2a2a2a; 
text-align: center;
}
/* .active_name_text{
padding: 0 30px 0 30px;

} */
.ad_name_img{
  display: block;
  width: 10%;
}

.ad_img{
grid-area: img;
width: 100%;
height: 95%;
/* margin: 5% 5% 0 5%; */
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
  /* margin: 0 0 -20% 0; */
/* padding-left: 17%; */
  margin-top: -7%;
  padding-left: 20px;

  color: #f3f3f3;
  font-size: 0.8em;

}
.ad_info{
grid-area: date;
display: flex;
margin-top: -7%;
padding-left: 20px;

/* margin: 10% 5% 7% 10%; */
border-radius: 20px;
/* background-color: #437FB1; */
}
/* .active_ad_info{
margin: 10% 20% 7% 10%;
} */
.ad_date{

/* margin: -15% auto auto auto; */
color: #f3f3f3;
font-size: 0.8em;

}
.ad_like{
  
grid-area: like;
/* background-color: #437FB1; */
border-radius: 20px;
}
</style>