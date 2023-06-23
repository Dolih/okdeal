<template>
  
    <div v-if="isLoading" id="preloader">
      <div id="loader"></div>
    </div>
    <div v-else>
      <div class="container_service">
      <div class="grid_service">
        <div class="back"><button class="btn_back" @click="goBack">← Назад</button></div>
        <div class="name"><p>{{$route.query.title}}</p></div>
        <div class="category"><p>Категория: {{$route.query.selectedCategory}}</p></div>
        <div class="name_about"><p>Об услуге:</p></div>
        <div class="about"><p>{{$route.query.description}}</p></div>
        <div class="info">
          <p class="service_info_date">{{$route.query.createdAt}}</p>
          <p class="service_info_city">г. {{$route.query.city}}</p>
          <div class="add_like"><img class="add_like_img" src="../img/like1.svg"></div>
        </div>  
        <div class="img">
          <img 
          class="image_service" 
          :src="loaded ? $route.query.image : placeholderURL"
          @load="onImageLoad"
          >
        </div>
        <div class="nameUser"><p class="nameUser_title">Связаться с:</p> <p class="nameUser_name">{{$route.query.name}}</p></div>
        <div class="links">
          <div class="links_phone" @click="generateQRCode">+{{$route.query.phone}}
            <transition name="fade">
            <div class="qr-code" v-if="showQRCode" @click.stop="hideQRCode">
              <div class="qr-code_container">
              <p class="qr-code_title">Мобильный телефон исполнителя<br><p class="qr-code_title_name">{{$route.query.name}}</p></p>
              <img class="qr-code_img" :src="qrCodeImage" alt="QR Code" @click.stop>
            </div>
            </div>
          </transition>
          </div>
          <div class="links_vk" >
            <a class="links_a" :href="'https://www.' + getLinks.vk" target="_blank">
              <div class="links_img_container">
                <img class="links_img" src="../img/vk.svg" alt="" v-if="getLinks.vk">
                <div class="links_empty" v-else></div>
              </div>
            </a>
          </div>
          <div class="links_tg" >
            <a class="links_a" :href="'https://www.' + getLinks.tg" target="_blank">
              <div class="links_img_container">
                <img class="links_img" src="../img/tg.svg" alt="" v-if="getLinks.tg">
                <div class="links_empty" v-else></div>
              </div>
            </a>
          </div>
          <div class="links_wt" >
            <a class="links_a" :href="'https://www.' + getLinks.wt" target="_blank">
              <div class="links_img_container">
                <img class="links_img" src="../img/wt.svg" alt="" v-if="getLinks.wt">
                <div class="links_empty" v-else></div>
              </div>
            </a>
          </div>
        </div>
        <div class="trade"><p class="trade_title">Услуги взамен:</p> <p class="trade_name"> {{$route.query.trade}}</p></div>
      </div>
      </div>
    </div>
  
</template>
<script>
import QRCode from 'qrcode';

export default{
  computed:{
    serviceInfo(){
      
    },
    getLinks(){
      console.log(this.$route.query.tg)
      return {
      vk: this.$route.query.vk,
      tg: this.$route.query.telegram,
      wt: this.$route.query.wt
    };

    }
    
  },
  data(){
      return {
        isLoading: true,
        loaded: true,
        placeholderURL: '../img/ads.jpeg',
        showQRCode: false,
        qrCodeImage: ''


      }
    },
  mounted() {

    setTimeout(() => {
      this.isLoading = false; // Устанавливаем флаг isLoading в false после задержки, чтобы имитировать получение данных
    }, 1000);
    const relativeImagePath = '../img/vk.svg';
const absoluteImagePath = new URL(relativeImagePath, document.baseURI).href;
console.log(absoluteImagePath);
  },
  methods:{
    hideQRCode() {
    this.showQRCode = false;
  },
    goBack() {
        window.history.back();
      },
      onImageLoad() {
      this.loaded = true;
    },
    generateQRCode() {
      const canvas = document.createElement('canvas');
      QRCode.toCanvas(canvas, this.$route.query.phone, (error) => {
        if (error) {
          console.error('Failed to generate QR Code', error);
        } else {
          this.qrCodeImage = canvas.toDataURL();
          this.showQRCode = true;
        }
      });
    }
  }
  
}
</script>
<style>
 .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
 body{
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
}
.links_empty {
  background-color: #000000;
  z-index: 999; /* Пример цвета с полупрозрачностью */
}
.container_service{
  margin: 9vh 15vw 0 15vw;
  padding: 0;
}

.grid_service{
  display: grid;
  grid-template: 
  [start] ' back      back          ' 50px [row2   ]
  [row2 ] ' name      category      ' auto [row3   ]
  [row3 ] ' info      name_about    ' auto [row4   ]
  [row4 ] ' img       about         ' auto [row5   ]
  [row5 ] ' nameUser  about         ' auto [row6   ] 
  [row6 ] ' links     about         ' auto [row7   ] 
  [row7 ] ' trade     about         ' auto [row-end] /40vw 30vw
  ;
  
}
.back{
  grid-area: back;
}
.qr-code{
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #2a2a2a95;
  display: flex;
  align-items: center;
  justify-content: center;
  
}
.qr-code_container{
  background-color: #2a2a2a;
  padding: 20px;
  border-radius: 20px;
}
.qr-code_title{
  color: #f3f3f3;
  font-size: 1.4em;
  padding: 20px;
  background-color: #3b80b8;
  border-radius: 20px;
  margin-bottom: 20px;
}
.qr-code_title_name{
  color: #2a2a2a;
  font-weight: bold;
}
.qr-code_img{
  display: inline-block;

  height: 30vh;
  border-radius: 20px;
}
.btn_back{
  font-size: 1.2em;
  padding: 10px;
  background-color: #f3f3f3;
  border: none;
  cursor: pointer;
}
.name{
  grid-area: name;
  background-color: #3b80b8;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 21px;
  text-align: center;
  border-radius: 20px;
  font-size: 1.6em;
  color: #f3f3f3;
  font-weight: bold;

}
.category{
  grid-area: category;
  padding: 25px;
  margin-left: 20px;
  margin-bottom: 21px;
  background-color: #f3f3f3;
  border-radius: 20px;
  border: 2px solid #2a2a2a;
  text-align: center;
  color: #2a2a2a;
  font-size: 1em;
  font-weight: bold;

}
/* .add_like{
  height: 100%;
  width: 100%;
}
.add_like_img{
  height: 20%;
  width: 20%;
} */
.name_about{
  grid-area: name_about;
  margin-left: 20px;
  margin-bottom: 21px;
  font-size: 1.5em;
  font-weight: bold;
}
.about{
  grid-area: about;
  margin-left: 20px;
  margin-bottom: 21px;
  font-size: 1.2em;
}
.info{
  grid-area: info;
  grid-template-columns: 30% 60% 10%;
  margin-bottom: 21px;
  margin-right: 20px;
  flex-direction: column;

}
.service_info_date, .service_info_city{
  display: inline-block;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-right: 20px;
  background-color: #f3f3f3;
  border: 2px solid #2a2a2a;
  border-radius: 20px;
}
.service_info_date{
  padding-left: 45px;
  padding-right: 45px;

}
.service_info_city{
  padding-left: 85px;
  padding-right: 85px;
  
}
.add_like{
  display: inline-block;
  /* padding-top: 5px;
  padding-bottom: 5px; */
  vertical-align: middle; /* Добавляем вертикальное выравнивание */

}
.add_like_img{
  height: 50px;
  /* width: 40px; */
  vertical-align: middle; /* Добавляем вертикальное выравнивание */

}
.img{
  grid-area: img;
  margin-right: 20px;
  border-radius: 20px;
  height: 70%;


}
.image_service{
  height: 100%;
  width: 100%;
  border-radius: 20px;
  object-fit: cover;

 }
.nameUser{
  grid-area: nameUser;
  margin-right: 20px;
  margin-top: -22%;
  margin-bottom: 10%;
  
  

}
.nameUser_title{
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 5px;
}
.nameUser_name{
  font-size: 1.4em;
  margin-bottom: 15px;

}
.links{
  grid-area: links;
  display: grid;
  grid-gap: 1%;
  margin-top: -10%;
  grid-template-columns: 47% 12% 12% 12%;
  margin-bottom: 5%;

}
.links_img{
  width: 100%;
  height: 100%;
}
.links_img_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.links_img:hover{
  width: 90%;
}
.links_phone{
  border-radius: 20px;
  padding: 5px 10px;
  border: 2px solid #2a2a2a;
  text-align: center;
  /* width: 150px; */
  font-size: 1.4em;
  display: flex;
  align-items: center;
  justify-content: center;

}
.links_a{
 
}
.links_vk, .links_tg, .links_wt{
  border-radius: 20px;
  padding: 5px 10px;
  /* border: 2px solid #2a2a2a; */
  text-align: center;
  /* width: 200px; */
  font-size: 1.2em;

}
.trade{
  grid-area: trade;
  

}
.trade_title{
  color: #2a2a2a;
  font-size: 1.5em;
  font-weight: bold;
}
.trade_name{
  color: #2a2a2a;
  font-size: 1.2em;

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