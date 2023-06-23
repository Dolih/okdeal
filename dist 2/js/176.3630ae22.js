"use strict";(self["webpackChunkokdeal"]=self["webpackChunkokdeal"]||[]).push([[176],{5176:function(e,t,a){a.r(t),a.d(t,{default:function(){return B}});var i=a(3396),l=a(9242),s=a(7139);const d={class:"container_add"},n={class:"grid_add"},o=(0,i._)("div",{class:"title_addView"},[(0,i._)("p",{class:"title_addView_txt"},"Создать новое предложение")],-1),r={class:"name_addView"},c={class:"category_add"},p=(0,i._)("option",{class:"categories_el",disabled:"",value:""},"Выберите категорию",-1),u=["item"],g={class:"description"},h=(0,i._)("p",{class:"description_label"},"💬 Добавьте описание:",-1),_={class:"links_add"},m=(0,i._)("p",{class:"links_txt"},"📞 Ваши контакты для связи:",-1),y=["value"],b={class:"trade"},f=(0,i._)("p",{class:"trade_txt"},"⚙️ Какие услуги хотите получить взамен?",-1),v={class:"city"},w=(0,i._)("p",{class:"city_txt"},"🏠 Укажите Ваш город:",-1),k=(0,i._)("br",null,null,-1),C=(0,i._)("label",{class:"img",for:"image"},"📷 Теперь добавьте изображение:",-1),I=(0,i._)("button",{class:"add_btn",type:"submit"},"Опубликовать объявление",-1);function V(e,t,a,V,x,$){return(0,i.wg)(),(0,i.iD)("div",d,[(0,i._)("button",{class:"btn_back",onClick:t[0]||(t[0]=(...e)=>$.goBack&&$.goBack(...e))},"← Назад"),(0,i._)("form",{class:"form_add",onSubmit:t[7]||(t[7]=(0,l.iM)(((...e)=>$.submitHandler&&$.submitHandler(...e)),["prevent"]))},[(0,i._)("div",n,[o,(0,i._)("div",r,[(0,i.wy)((0,i._)("input",{type:"text",id:"service",placeholder:"Введите название услуги","onUpdate:modelValue":t[1]||(t[1]=t=>e.title=t),required:""},null,512),[[l.nr,e.title]])]),(0,i._)("div",c,[(0,i.wy)((0,i._)("select",{id:"categories","onUpdate:modelValue":t[2]||(t[2]=t=>e.selectedCategory=t)},[p,((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)($.allCategories,(e=>((0,i.wg)(),(0,i.iD)("option",{item:e},(0,s.zw)(e.title),9,u)))),256))],512),[[l.bM,e.selectedCategory]])]),(0,i._)("div",g,[h,(0,i.wy)((0,i._)("textarea",{id:"description","onUpdate:modelValue":t[3]||(t[3]=t=>e.description=t),placeholder:"Опишите более подробно, в чем заключается смысл вашей услуги",required:""},null,512),[[l.nr,e.description]])]),(0,i._)("div",_,[m,(0,i._)("input",{type:"tel",id:"phone",value:`+${$.telPhone.phone}`,required:"",readonly:""},null,8,y)]),(0,i._)("div",b,[f,(0,i.wy)((0,i._)("input",{type:"text",placeholder:"Напишите, что нужно Вам",id:"trade","onUpdate:modelValue":t[4]||(t[4]=t=>e.trade=t),required:""},null,512),[[l.nr,e.trade]])]),(0,i._)("div",v,[w,(0,i.wy)((0,i._)("input",{type:"text",id:"city",placeholder:"Напишите город","onUpdate:modelValue":t[5]||(t[5]=t=>e.city=t),required:""},null,512),[[l.nr,e.city]])]),k,C,(0,i._)("input",{class:"img_btn",type:"file",id:"image",name:"image",ref:"image",onInput:t[6]||(t[6]=(...e)=>$.handleImageChange&&$.handleImageChange(...e))},null,544),I])],32)])}var x=a(4161),$=a(680),q={name:"AddView",data:()=>({title:"",description:"",trade:"",city:"",userId:"",image:null}),async mounted(){this.$store.dispatch("allCategories"),this.$store.dispatch("fetchInfo")},computed:{allCategories(){return this.$store.getters.categories},telPhone(){return this.$store.getters.info}},methods:{goBack(){window.history.back()},handleImageChange(e){this.image=e.target.files[0]},test(){for(let e=0;this.allCategories.length>e;e++)if(this.allCategories[e].title===this.selectedCategory)return this.allCategories[e].id},test1(){console.log()},async submitHandler(){event.preventDefault();const e=new FormData;e.append("title",this.title),e.append("description",this.description),e.append("trade",this.trade),e.append("city",this.city),e.append("image",this.image),e.append("userId",this.userId),e.append("categoryId",this.test());const t=$.Z.get("token");console.log(t),x.Z.defaults.headers.common.Authorization=`Bearer ${t}`,x.Z.post("http://localhost:5050/posts",e).then((e=>{console.log(e)})).catch((t=>{console.log(e),console.log(t)}))}}},D=a(89);const U=(0,D.Z)(q,[["render",V]]);var B=U}}]);
//# sourceMappingURL=176.3630ae22.js.map