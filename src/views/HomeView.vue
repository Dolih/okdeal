<template>
  <div v-if="isLoading" id="preloader">
    <div id="loader"></div>
  </div>
  <div v-else>
    <div class="container_hm">
      <div class="title_hm"><h1 class="title_hm_text">Спасибо.</h1></div>
      <div class="dscrp_hm"><p class="dscrp_hm_text"><b>Выбирайте</b> подходящие услуги <br/> <b>Предлагайте</b> свои взамен</p></div>
      
      <div class="invite_hm" >
        <div class="menu_addServices"><router-link to="/RegisterView"
                    custom
                    v-slot="{href, navigate}"
                    ><button :href="href" @click="navigate" class="invite_hm_btn">Присоединиться</button></router-link></div></div>
      <div class="about_hm"><a href="#down"><button class="about_hm_btn">Подробнее</button></a></div>
      <div class="img_hm"><img class="img_hm_img" src="../img/logo.svg"></div>
    </div>
    <div class="arrow bounce"></div>
    <div>
      
  </div>
    <div class="container_dscrp_hm">
      <div class="title_dscrp_hm">
        <h2 class="title_dscrp_hm_text"><a name="down"></a>Как <br/> присоединиться?</h2>
      </div>
      <div class="img_dsc img_dsc_1"><img class="img_dsc_img" src="../img/reg.svg"></div>
      <div class="dsc dsc_1">
          <p class="num_txt">1</p>
          <p class="dscrp_txt" >Зарегистрируйтесь на сайте. Введите свои настоящее имя и фамилию и укажите контакты для связи с Вами</p>

      </div>
      <div class="img_dsc img_dsc_2"><img class="img_dsc_img" src="../img/crt.svg"></div>
      <div class="dsc dsc_2">
          <p class="num_txt">2</p>
          <p class="dscrp_txt">Создайте объявление и укажите, что вы можете предложить и что хотите получить взамен.
          Или просто выберите любое подходящее объявление и свяжитесь с участником</p>
      </div>
      <div class="img_dsc img_dsc_3"><img class="img_dsc_img" src="../img/logo.svg"></div>
      <div class="dsc dsc_3">
          <p class="num_txt">3</p>
          <p class="dscrp_txt">Договоритесь с участником любым удобным способом и не забудьте поставить оценку!</p>
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
  // items: [
  //       { image: allCategories.image},
  //       { image: 'slide2.jpg' },
  //       { image: 'slide3.jpg' }
  //     ],
      currentIndex: 0,

  services: [
    
  ],
  isLoading: true
  
  
  
  }

},

async mounted (){
  setInterval(this.slideNext, 3000)
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
  containerStyles() {
      return {
        transform: `translateX(-${this.currentIndex * 100}%)`
      };
    },
    
  // service(){
  //   const months = [
  //       "января",
  //       "февраля",
  //       "марта",
  //       "апреля",
  //       "мая",
  //       "июня",
  //       "июля",
  //       "августа",
  //       "сентября",
  //       "октября",
  //       "ноября",
  //       "декабря"
  //     ];
  //   for(let i = 0; this.$store.getters.serviceInfo.length>i; i++){
  //     if (this.$store.getters.serviceInfo[i].addDate) {
  //   const dateParts = this.$store.getters.serviceInfo[i].addDate.split('.');
  //   const day = dateParts[0];
  //   const month = months[Number(dateParts[1]) - 1];
  //   this.$store.getters.serviceInfo[i].addDate = `${day} ${month}`
  
  // }}
  //   return this.$store.getters.serviceInfo
    
  // },

 
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
        services.push(service)
      }
    }
    console.log(services[1].premium)
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
  slideNext() {
      // this.currentIndex = (this.currentIndex + 1) % this.item.length;
    },
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
      phone: item.author.phone
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
  /* background: linear-gradient(-45deg, #5DE6DE, #B58ECC, #5DE6DE, #B58ECC);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
	height: 100vh; */
}
.carousel {
  width: 100%;
  overflow: hidden;
}

.carousel-container {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-item {
  flex: 0 0 100%;
  width: 100%;
}
a{
  text-decoration: none;
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
.container_hm{
  margin: 15vh auto 0 auto;
  /* border: 2px solid #2a2a2a; */
  padding: 20px 40px;
  border-radius: 20px;
  background: linear-gradient(-45deg, #F9D976, #F39F86, #F9D976, #F39F86);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
  
	height: 100vh;
  display: grid;
  height: auto;
  width: 70vw;
  grid-template: 
  [start] 'title  title img  '  auto  [row2   ]
  [row2 ] 'dscrp  dscrp img  '  auto  [row3   ]
  [row3 ] 'invite about img  '  auto  [row-end] /23% 37% 40% 
  ;
}

.title_hm{
  grid-area: title;
}
.title_hm_text{
  color: #2a2a2a;
  font-size: 4em;
  /* text-shadow:  3px 3px 1px rgba(0, 0, 0, 0.144); */
}
.dscrp_hm{
  grid-area: dscrp;
}
.dscrp_hm_text{
  font-size: 1.8em;
  padding: 10px 0 10px 0;
  color: #2a2a2a;
}
.invite_hm{
  grid-area: invite;
}
.invite_hm_btn{
  margin-top: 20px;
  font-size: 1.5em;
  color: #f3f3f3;
  background-color: #3b80b8;
  border: 2px solid #3b80b8;
  border-radius: 20px;
  padding: 10px 15px;
  margin-right: 20px;
  transition: border-color 0.6s ease;

}
.invite_hm_btn:hover{
  border-color: #2a2a2a;
}
.about_hm{
  grid-area: about;
}
.about_hm_btn{
  margin-top: 20px;
  font-size: 1.5em;
  color: #2a2a2a;
  background-color: #f3f3f300;
  border: 2px solid #2a2a2a;
  border-radius: 20px;
  padding: 10px 15px;
  transition: background-color 0.6s ease;
  transition: border-color 0.6s ease;


}
.about_hm_btn:hover{
  background-color: #3b80b8;
  border-color: #3b80b8;
  color: #f3f3f3;
}
.img_hm{
  grid-area: img;
  
}
.img_hm_img{
 width: 100%;
}

.arrow
{
  position: relative;
  bottom: -3rem;
  left: 50%;
  margin-left:-20px;
  width: 40px;
  height: 40px;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSI1MTIiIGlkPSJzdmcyIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzIGlkPSJkZWZzNCIvPjxnIGlkPSJsYXllcjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTU0MC4zNjIyKSI+PHBhdGggZD0ibSAxMjcuNDA2MjUsNjU3Ljc4MTI1IGMgLTQuOTg1MywwLjA3ODQgLTkuOTEwNzcsMi4xNjMwOCAtMTMuNDM3NSw1LjY4NzUgbCAtNTUsNTUgYyAtMy42MDA1NjUsMy41OTkyNyAtNS42OTY4ODMsOC42NTg5NSAtNS42OTY4ODMsMTMuNzUgMCw1LjA5MTA1IDIuMDk2MzE4LDEwLjE1MDczIDUuNjk2ODgzLDEzLjc1IEwgMjQyLjI1LDkyOS4yNSBjIDMuNTk5MjcsMy42MDA1NiA4LjY1ODk1LDUuNjk2ODggMTMuNzUsNS42OTY4OCA1LjA5MTA1LDAgMTAuMTUwNzMsLTIuMDk2MzIgMTMuNzUsLTUuNjk2ODggTCA0NTMuMDMxMjUsNzQ1Ljk2ODc1IGMgMy42MDA1NiwtMy41OTkyNyA1LjY5Njg4LC04LjY1ODk1IDUuNjk2ODgsLTEzLjc1IDAsLTUuMDkxMDUgLTIuMDk2MzIsLTEwLjE1MDczIC01LjY5Njg4LC0xMy43NSBsIC01NSwtNTUgYyAtMy41OTgxNSwtMy41OTEyNyAtOC42NTA2OCwtNS42ODEyNyAtMTMuNzM0MzgsLTUuNjgxMjcgLTUuMDgzNjksMCAtMTAuMTM2MjIsMi4wOSAtMTMuNzM0MzcsNS42ODEyNyBMIDI1Niw3NzguMDMxMjUgMTQxLjQzNzUsNjYzLjQ2ODc1IGMgLTMuNjY2NzgsLTMuNjY0MjMgLTguODQ4MDEsLTUuNzY0NDIgLTE0LjAzMTI1LC01LjY4NzUgeiIgaWQ9InBhdGgzNzY2LTEiIHN0eWxlPSJmb250LXNpemU6bWVkaXVtO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtdmFyaWFudDpub3JtYWw7Zm9udC13ZWlnaHQ6bm9ybWFsO2ZvbnQtc3RyZXRjaDpub3JtYWw7dGV4dC1pbmRlbnQ6MDt0ZXh0LWFsaWduOnN0YXJ0O3RleHQtZGVjb3JhdGlvbjpub25lO2xpbmUtaGVpZ2h0Om5vcm1hbDtsZXR0ZXItc3BhY2luZzpub3JtYWw7d29yZC1zcGFjaW5nOm5vcm1hbDt0ZXh0LXRyYW5zZm9ybTpub25lO2RpcmVjdGlvbjpsdHI7YmxvY2stcHJvZ3Jlc3Npb246dGI7d3JpdGluZy1tb2RlOmxyLXRiO3RleHQtYW5jaG9yOnN0YXJ0O2Jhc2VsaW5lLXNoaWZ0OmJhc2VsaW5lO2NvbG9yOiMwMDAwMDA7ZmlsbDojMjIyMjIyO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDozOC44ODAwMDEwNzttYXJrZXI6bm9uZTt2aXNpYmlsaXR5OnZpc2libGU7ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlO2ZvbnQtZmFtaWx5OlNhbnM7LWlua3NjYXBlLWZvbnQtc3BlY2lmaWNhdGlvbjpTYW5zIi8+PC9nPjwvc3ZnPg==);
  background-size: contain;
}

.bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

.container_dscrp_hm{
  margin: 8vh auto 0 auto;
  /* padding: 20px 40px; */
  
  display: grid;
  height: auto;
  width: 60vw;
  grid-template: 
  [start] 'title_d title_d'    auto  [row2   ]
  [row2 ] 'img_dsc_1 dsc_1'    auto  [row3   ]
  [row3 ] 'img_dsc_2 dsc_2'    auto  [row4   ] 
  [row4]  'img_dsc_3 dsc_3'    auto  [row-end] /30% 70%
  ;
}

.title_dscrp_hm{
  grid-area: title_d;
  padding-bottom: 40px;
}
.title_dscrp_hm_text{
  color: #2a2a2a;
  font-size: 2em;
  /* text-shadow:  3px 3px 1px rgba(0, 0, 0, 0.144); */
}
.img_dsc{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;

}
.img_dsc_1{
  grid-area: img_dsc_1;
}
.img_dsc_2{
  grid-area: img_dsc_2;
}
.img_dsc_3{
  grid-area: img_dsc_3;
}
.img_dsc_img{
  width: 50%;
}
.dsc_1{
  grid-area: dsc_1;
}
.dsc_2{
  grid-area: dsc_2;
}
.dsc_3{
  grid-area: dsc_3;
}
.dsc{
  border-radius: 20px;
  /* border: 2px solid #2a2a2a; */
  margin-bottom: 50px;
  background: linear-gradient(-45deg, #F9D976, #F39F86, #F9D976, #F39F86);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
}
.num_txt{
  display: inline-block;
  font-weight: bold;
  font-size: 1.4em;
  border-radius: 20px;
  padding: 10px 20px;
  
}
.dscrp_txt{
  font-size: 1.4em;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
  margin-bottom: 50px;
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