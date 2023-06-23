<template>
    <div class="container">
        <div class="UV_content">
            <div class="content_userInfo">
                <div class="userInfo_avatar">
                    <div class="avatar_photo"> <img class="avatar_photo_img" src="../img/groot.png"></div>
                </div>
                <div class="userInfo_name">
                    <div class="userInfo_name_name">{{ user.name }}</div>
                    <div class="userInfo_name_links">Контактные данные:</div>
                </div>
                <div class="userInfo_links">

                    <div class="links_phone" @click="generateQRCode">+{{user.phone}}
                        <transition name="fade">
                        <div class="qr-code" v-if="showQRCode" @click.stop="hideQRCode">
                            <div class="qr-code_container">
                                <p class="qr-code_title">Мобильный телефон исполнителя<br><p class="qr-code_title_name">{{user.name}}</p></p>
                                <img class="qr-code_img" :src="qrCodeImage" alt="QR Code" @click.stop>
                            </div>
                        </div>
                    </transition>
                    </div>
                    <div class="links_vk">
                        <a class="links_a" :href="'https://www.' + this.user.vk">
                        <div class="links_img_container">
                            <img class="links_img" src="../img/vk.svg" alt="" v-if="this.user.vk">
                        </div>
                        </a>
                    </div>
                    <div class="links_tg">
                        <a class="links_a" :href="'https://www.' + this.user.telegram">
                        <div class="links_img_container">
                            <img class="links_img" src="../img/tg.svg" alt="" v-if="this.user.telegram">
                        </div>
                        </a>
                    </div>
                    <div class="links_wt">
                        <a class="links_a" :href="'https://www.' + this.user.whatsapp">
                        <div class="links_img_container">
                            <img class="links_img" src="../img/wt.svg" alt="" v-if="this.user.whatsapp">
                        </div>
                        </a>
                    </div>
                </div>
                <div class="userInfo_city">
                    г. Архангельск
                </div>
                <div class="userInfo_description">
                    <div class="userInfo_description_label">Обо мне:</div>
                    <div class="userInfo_description_text"> {{ user.description }}</div>
                </div>
            </div>
            <div class="content_servicesInfo">
                <div class="content_popular">
                    <div class="content_popular_header">
                        ❤️ Мои объявления
                    </div>
                        <div class="content_popular_ads"> 
                            <div class="content_popular_ad"
                            :item="item"
                            v-for="item in user.posts"
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
                                >
                                г. {{ item.city }}
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
    </div>
</template>

<script>
import QRCode from 'qrcode';

    export default{

        data(){
            return {
                showQRCode: false,
                qrCodeImage: ''
            }
        },

        async mounted() {
            await this.$store.dispatch('fetchInfo');
        },
        computed: {
        user() {
            const info = this.$store.getters.info;
            const posts = info && info.posts ? info.posts : [];
            const services = posts.filter(post => post.approved).map(post => ({
            ...post,
            image: `http://localhost:5050/${post.image}`
            }));
            console.log(info)
            return { ...info, posts: services };
        }
        },
        methods:{
            hideQRCode() {
                this.showQRCode = false;
            },
            generateQRCode() {
      const canvas = document.createElement('canvas');
      QRCode.toCanvas(canvas, this.user.phone, (error) => {
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
body{
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
}
.container{
  margin: 12vh auto 0 auto;
  padding: 0;
}
.UV_content{
    display: grid;
    grid-template-rows: auto auto;
}
.content_userInfo{
    display: grid;
    grid-template: 
        [start] 'avatar  name         ' 25% [row2   ]
        [row2 ] 'avatar  links        ' 20% [row3   ]
        [row3 ] 'avatar  city         ' 15% [row4   ]
        [row4]  'avatar  description  ' auto [row-end]/30% 40% 
        ;
        margin-bottom: 100px;

}
.userInfo_avatar{
    grid-area: avatar;
    
}
.avatar_photo{
    border-radius: 50%;
    height: 300px;
    width: 300px;
    overflow: hidden;
    border: 2px solid #3b80b8;
    background-color: #2a2a2a;
}
.avatar_photo_img{
    width: 100%;
    height: auto;
    object-fit: cover;
}
.userInfo_links{
  grid-area: links;
  display: grid;
  grid-gap: 1%;
  margin-top: -10%;
  grid-template-columns: 47% 12% 12% 12%;
  margin-bottom: 5%;
  padding: 10% 0 10% 0;

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
  /* padding: 5px 5px; */
  border: 2px solid #2a2a2a;
  text-align: center;
  /* width: 150px; */
  font-size: 1.4em;
  display: flex;
  align-items: center;
  justify-content: center;

}
.links_vk, .links_tg, .links_wt{
  border-radius: 20px;
  padding: 5px 10px;
  /* border: 2px solid #2a2a2a; */
  text-align: center;
  /* width: 200px; */
  font-size: 1.2em;

}
.userInfo_name{
    grid-area: name;
    padding-top: 10px;
    font-size: 2em;
    color: #2a2a2a;
    font-weight: bold;
}
.userInfo_name_links{
    font-weight:400;
    font-size: 0.7em;
    padding-top: 20px;
}
.userInfo_links{
    grid-area: links;

}
.userInfo_city{
    grid-area: city;
    font-size: 1.2em;
    margin-top: -5%;

}
.userInfo_description{
    grid-area: description;
    margin-top: -5%;

}
.userInfo_description_label{
    font-size: 1.6em;
    color: #2a2a2a;
    font-weight: bold;
}
.userInfo_description_text{
    color: #2a2a2a;
    font-size: 1.1em;
    padding-top: 10px;

}
.content_servicesInfo{
    
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
/* border: 1px solid #2a2a2ab9; */
height: 30vh;
border-radius: 20px;
margin: 10px;
position: relative;
z-index: 2;
cursor: pointer;

/* box-shadow: 0 0 5px #151515;
  box-shadow: 0 0 5px #151515; */

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
border-radius: 20px;
}

.ad_like_img{
display: block;
margin: auto;
width: 40%;
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
</style>