(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d9512ef","chunk-2d0b295b"],{2579:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[e("div",{staticClass:"page-title-box d-flex align-items-center justify-content-between"},[e("h4",{staticClass:"mb-0"},[t._v(t._s(t.title))]),e("div",{staticClass:"page-title-right"},[e("b-breadcrumb",{staticClass:"m-0",attrs:{items:t.items}})],1)])])])},i=[],r={props:{title:{type:String,default:""},items:{type:Array,default:function(){return[]}}}},n=r,o=e("2877"),l=Object(o["a"])(n,s,i,!1,null,null,null);a["a"]=l.exports},"60cb":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("Layout",[e("PageHeader",{attrs:{title:t.title,items:t.items}}),e("Stat"),e("div",{staticClass:"row"},[e("SalesAnalytics"),e("div",{staticClass:"col-xl-4 col-md-6 col-sm-12"},[e("SellingProduct")],1)],1)],1)},i=[],r=(e("a4d3"),e("e01a"),e("5658")),n=e("2579"),o=e("c2a4"),l=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6 col-xl-3"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("div",{staticClass:"float-end mt-2"},[e("apexchart",{staticClass:"apex-charts",attrs:{dir:"ltr",width:"70",height:"40",options:t.chartOptions,series:t.series}})],1),e("div",[e("h4",{staticClass:"mb-1 mt-1"},[t._v(" KShs. "),e("span",{attrs:{"data-plugin":"counterup"}},[e("countTo",{attrs:{startVal:100,endVal:t.income,duration:2e3}})],1)]),e("p",{staticClass:"text-muted mb-0"},[t._v("Total Profit")])]),e("p",{staticClass:"text-muted mt-3 mb-0"},[e("span",{staticClass:"text-success me-1"},[e("i",{staticClass:"mdi mdi-arrow-up-bold me-1"}),t._v(t._s(100*t.growth_rate)+"% ")]),t._v(" since last week ")])])])]),e("div",{staticClass:"col-md-6 col-xl-3"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("div",{staticClass:"float-end mt-2"},[e("apexchart",{staticClass:"apex-charts",attrs:{type:"radialBar",dir:"ltr",width:"45",height:"45",options:t.orderRadial,series:t.orderseries}})],1),e("div",[e("h4",{staticClass:"mb-1 mt-1"},[e("span",{attrs:{"data-plugin":"counterup"}},[e("countTo",{attrs:{startVal:100,endVal:t.orders,duration:2e3}})],1)]),e("p",{staticClass:"text-muted mb-0"},[t._v("Products")])]),e("p",{staticClass:"text-muted mt-3 mb-0"},[e("span",{staticClass:"text-danger me-1",class:{"text-success":Number(t.order_changes[t.orders-1])>=Number(t.order_changes[t.orders-2])}},[e("i",{staticClass:"mdi mdi-arrow-down-bold me-1",class:{"mdi mdi-arrow-up-bold":Number(t.order_changes[t.orders-1])>=Number(t.order_changes[t.orders-2])}}),t._v(t._s((Number(t.order_changes[t.orders-1])/Number(t.orders)*100).toFixed(2))+"% ")]),t._v(" since last week ")])])])]),e("div",{staticClass:"col-md-6 col-xl-3"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("div",{staticClass:"float-end mt-2"},[e("apexchart",{staticClass:"apex-charts",attrs:{type:"radialBar",dir:"ltr",width:"45",height:"45",options:t.customerRadial,series:t.customerseries}})],1),e("div",[e("h4",{staticClass:"mb-1 mt-1"},[e("span",{attrs:{"data-plugin":"counterup"}},[e("countTo",{attrs:{startVal:1e3,endVal:t.customers,duration:2e3}})],1)]),e("p",{staticClass:"text-muted mb-0"},[t._v("System Users")])]),e("p",{staticClass:"text-muted mt-3 mb-0"},[e("span",{staticClass:"text-danger me-1",class:{"text-success":Number(t.customer_changes[t.customers-1])>=Number(t.customer_changes[t.customers-2])}},[e("i",{staticClass:"mdi mdi-arrow-down-bold me-1",class:{"mdi mdi-arrow-up-bold":Number(t.customer_changes[t.customers-1])>=Number(t.customer_changes[t.customers-2])}}),t._v(t._s((Number(t.customer_changes[t.customers-1])/Number(t.customers)*100).toFixed(2))+"% ")]),t._v(" since last week ")])])])]),e("div",{staticClass:"col-md-6 col-xl-3"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("div",{staticClass:"float-end mt-2"},[e("apexchart",{staticClass:"apex-charts",attrs:{dir:"ltr",width:"70",height:"40",options:t.growthChartOptions,series:t.series}})],1),e("div",[e("h4",{staticClass:"mb-1 mt-1"},[t._v(" + "),e("span",{attrs:{"data-plugin":"counterup"}},[t._v(t._s(100*t.growth_rate))]),t._v("% ")]),e("p",{staticClass:"text-muted mb-0"},[t._v("Stock Turn Over")])]),e("p",{staticClass:"text-muted mt-3 mb-0"},[e("span",{staticClass:"text-success me-1"},[e("i",{staticClass:"mdi mdi-arrow-up-bold me-1"}),t._v(t._s(100*t.growth_rate)+"% ")]),t._v(" since last week ")])])])]),e("div",{staticClass:"col-md-6 col-xl-3"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("div",{staticClass:"float-end mt-2"},[e("apexchart",{staticClass:"apex-charts",attrs:{dir:"ltr",width:"70",height:"40",options:t.chartOptions,series:t.series}})],1),e("div",[e("h4",{staticClass:"mb-1 mt-1"},[t._v(" KShs. "),e("span",{attrs:{"data-plugin":"counterup"}},[e("countTo",{attrs:{startVal:100,endVal:t.income,duration:2e3}})],1)]),e("p",{staticClass:"text-muted mb-0"},[t._v("Total Revenue")])]),e("p",{staticClass:"text-muted mt-3 mb-0"},[e("span",{staticClass:"text-success me-1"},[e("i",{staticClass:"mdi mdi-arrow-up-bold me-1"}),t._v(t._s(100*t.growth_rate)+"% ")]),t._v(" since last week ")])])])]),e("div",{staticClass:"col-md-6 col-xl-3"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("div",{staticClass:"float-end mt-2"},[e("apexchart",{staticClass:"apex-charts",attrs:{type:"radialBar",dir:"ltr",width:"45",height:"45",options:t.orderRadial,series:t.orderseries}})],1),e("div",[e("h4",{staticClass:"mb-1 mt-1"},[e("span",{attrs:{"data-plugin":"counterup"}},[e("countTo",{attrs:{startVal:100,endVal:t.orders,duration:2e3}})],1)]),e("p",{staticClass:"text-muted mb-0"},[t._v("Orders")])]),e("p",{staticClass:"text-muted mt-3 mb-0"},[e("span",{staticClass:"text-danger me-1",class:{"text-success":Number(t.order_changes[t.orders-1])>=Number(t.order_changes[t.orders-2])}},[e("i",{staticClass:"mdi mdi-arrow-down-bold me-1",class:{"mdi mdi-arrow-up-bold":Number(t.order_changes[t.orders-1])>=Number(t.order_changes[t.orders-2])}}),t._v(t._s((Number(t.order_changes[t.orders-1])/Number(t.orders)*100).toFixed(2))+"% ")]),t._v(" since last week ")])])])]),e("div",{staticClass:"col-md-6 col-xl-3"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("div",{staticClass:"float-end mt-2"},[e("apexchart",{staticClass:"apex-charts",attrs:{type:"radialBar",dir:"ltr",width:"45",height:"45",options:t.customerRadial,series:t.customerseries}})],1),e("div",[e("h4",{staticClass:"mb-1 mt-1"},[e("span",{attrs:{"data-plugin":"counterup"}},[e("countTo",{attrs:{startVal:1e3,endVal:t.customers,duration:2e3}})],1)]),e("p",{staticClass:"text-muted mb-0"},[t._v("Customers")])]),e("p",{staticClass:"text-muted mt-3 mb-0"},[e("span",{staticClass:"text-danger me-1",class:{"text-success":Number(t.customer_changes[t.customers-1])>=Number(t.customer_changes[t.customers-2])}},[e("i",{staticClass:"mdi mdi-arrow-down-bold me-1",class:{"mdi mdi-arrow-up-bold":Number(t.customer_changes[t.customers-1])>=Number(t.customer_changes[t.customers-2])}}),t._v(t._s((Number(t.customer_changes[t.customers-1])/Number(t.customers)*100).toFixed(2))+"% ")]),t._v(" since last week ")])])])]),e("div",{staticClass:"col-md-6 col-xl-3"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("div",{staticClass:"float-end mt-2"},[e("apexchart",{staticClass:"apex-charts",attrs:{dir:"ltr",width:"70",height:"40",options:t.growthChartOptions,series:t.series}})],1),e("div",[e("h4",{staticClass:"mb-1 mt-1"},[t._v(" + "),e("span",{attrs:{"data-plugin":"counterup"}},[t._v(t._s(100*t.growth_rate))]),t._v("% ")]),e("p",{staticClass:"text-muted mb-0"},[t._v("Growth")])]),e("p",{staticClass:"text-muted mt-3 mb-0"},[e("span",{staticClass:"text-success me-1"},[e("i",{staticClass:"mdi mdi-arrow-up-bold me-1"}),t._v(t._s(100*t.growth_rate)+"% ")]),t._v(" since last week ")])])])])])},c=[],d=(e("4160"),e("159b"),e("ec1b")),u=e.n(d),m=e("3d20"),h=e.n(m),p=e("9227"),f={components:{countTo:u.a},data:function(){return{series:[{data:[25,66,41,89,63,25,44,20,36,40,54]}],chartOptions:{fill:{colors:["#5b73e8"]},chart:{type:"bar",sparkline:{enabled:!0}},plotOptions:{bar:{columnWidth:"50%"}},labels:[1,2,3,4,5,6,7,8,9,10,11],xaxis:{crosshairs:{width:1}},tooltip:{fixed:{enabled:!1},x:{show:!1},y:{title:{formatter:function(){return""}}},marker:{show:!1}}},growthChartOptions:{fill:{colors:["#f1b44c"]},chart:{type:"bar",sparkline:{enabled:!0}},plotOptions:{bar:{columnWidth:"50%"}},labels:[1,2,3,4,5,6,7,8,9,10,11],xaxis:{crosshairs:{width:1}},tooltip:{fixed:{enabled:!1},x:{show:!1},y:{title:{formatter:function(){return""}}},marker:{show:!1}}},orderseries:[70],orderRadial:{fill:{colors:["#34c38f"]},chart:{sparkline:{enabled:!0}},dataLabels:{enabled:!1},plotOptions:{radialBar:{hollow:{margin:0,size:"60%"},track:{margin:0},dataLabels:{show:!1}}}},customerseries:[55],customerRadial:{fill:{colors:["#5b73e8"]},chart:{sparkline:{enabled:!0}},dataLabels:{enabled:!1},plotOptions:{radialBar:{hollow:{margin:0,size:"60%"},track:{margin:0},dataLabels:{show:!1}}}},income:0,ration:0,sales_count:0,orders:1,customers:1,growth_rate:1,order_changes:[0,0],customer_changes:[0,0]}},created:function(){this.updateChart()},mounted:function(){this.updateChart()},methods:{updateChart:function(){var t=this;h.a.fire({title:"Please Wait !",html:"Loading data...",allowOutsideClick:!1,showConfirmButton:!1,willOpen:function(){h.a.showLoading()}}),p["a"].get("sales-analytics").then((function(a){a.data.forEach((function(a){t.series=[{data:a.data}],t.income=a.sales_amount,t.ratio=a.conversion_ratio,t.sales_count=a.sales_count,t.orders=a.orders,t.customers=a.customers,t.customerseries=[a.customers],t.orderseries=[a.orders],t.growth_rate=a.growth_rate,t.customer_changes=a.customer_series,t.order_changes=a.order_series})),t.chartOptions.labels=t.labelValues,h.a.close()})).catch((function(t){h.a.fire({position:"center",icon:"error",title:""+t,showConfirmButton:!0}).then((function(t){h.a.close(t)}))}))}}},b=f,v=e("2877"),C=Object(v["a"])(b,l,c,!1,null,null,null),_=C.exports,g=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"col-xl-8 col-md-8 col-sm-12"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("div",{staticClass:"float-end"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedFilter,expression:"selectedFilter"}],staticClass:"uil uil-filter text-dark bg-light",on:{change:[function(a){var e=Array.prototype.filter.call(a.target.options,(function(t){return t.selected})).map((function(t){var a="_value"in t?t._value:t.value;return a}));t.selectedFilter=a.target.multiple?e:e[0]},function(a){return t.updateChart()}]}},[e("option",{attrs:{value:"Yearly"}},[t._v("Yearly")]),e("option",{attrs:{value:"Monthly",selected:""}},[t._v("Monthly")]),e("option",{attrs:{value:"Weekly"}},[t._v("Weekly")])])]),e("h4",{staticClass:"card-title mb-4"},[t._v("Sales Analytics")]),e("div",{staticClass:"mt-1"},[e("ul",{staticClass:"list-inline main-chart mb-0"},[e("li",{staticClass:"list-inline-item chart-border-left me-0 border-0"},[e("h3",{staticClass:"text-primary"},[t._v(" KShs. "),e("span",{attrs:{"data-plugin":"counterup"}},[e("countTo",{attrs:{startVal:1,endVal:t.income,duration:2e3}})],1),e("span",{staticClass:"text-muted d-inline-block font-size-15 ms-3"},[t._v("Income")])])]),e("li",{staticClass:"list-inline-item chart-border-left me-0"},[e("h3",[e("span",{attrs:{"data-plugin":"counterup"}},[e("countTo",{attrs:{startVal:1,endVal:t.sales_count,duration:2e3}})],1),e("span",{staticClass:"text-muted d-inline-block font-size-15 ms-3"},[t._v("Sales")])])]),e("li",{staticClass:"list-inline-item chart-border-left me-0"},[e("h3",[e("span",{attrs:{"data-plugin":"counterup"}},[t._v(t._s(t.ratio.toFixed(2)))]),t._v("% "),e("span",{staticClass:"text-muted d-inline-block font-size-15 ms-3"},[t._v("Conversation Ratio")])])])])]),e("div",{staticClass:"mt-3"},[e("apexchart",{ref:"chart",staticClass:"apex-charts",attrs:{type:"line",dir:"ltr",height:"339",options:t.chartOptions,series:t.series}})],1)])])])},w=[],x=(e("99af"),e("a630"),e("b0c0"),e("3ca3"),{components:{countTo:u.a},data:function(){return{series:[],chartOptions:{chart:{height:350,type:"line"},stroke:{width:[0,4]},title:{text:"Sales Sources"},dataLabels:{enabled:!0,enabledOnSeries:[1]},labels:[],xaxis:{type:"datetime"},yaxis:[{title:{text:"Sales Amount"}},{opposite:!0,title:{text:"Aggregate"}}]},selectedFilter:"Monthly",income:0,ration:0,sales_count:0}},computed:{labelValues:function(){if("Weekly"===this.selectedFilter){for(var t=new Date,a=[],e=0;e<7;e++){var s=new Date(t.getTime()-24*e*60*60*1e3);a.unshift("".concat(s.getMonth()+1,"/").concat(s.getDate(),"/").concat(s.getFullYear()))}return a}if("Monthly"===this.selectedFilter){for(var i=new Date,r=i.getFullYear(),n=i.getMonth(),o=new Date(r,n+1,0).getDate(),l=[],c=0;c<o;c++)l.push("".concat(n+1,"/").concat(c+1,"/").concat(r));return l}if("Yearly"===this.selectedFilter){var d=[],u=new Date,m=u.getFullYear();return d=Array.from({length:12},(function(t,a){return"".concat(a+1,"/01/").concat(m)})),d}return[]}},created:function(){this.updateChart()},mounted:function(){this.updateChart()},methods:{updateChart:function(){var t=this;h.a.fire({title:"Please Wait !",html:"Loading data...",allowOutsideClick:!1,showConfirmButton:!1,willOpen:function(){h.a.showLoading()}}),p["a"].get("sales-analytics").then((function(a){a.data.forEach((function(a,e){0===e&&(t.series[0]={name:a.name,type:"column",data:a.data}),1===e&&(t.series[1]={name:a.name,type:"line",data:a.data}),2===e&&(t.series[2]={name:a.name,type:"column",data:a.data}),t.income=a.sales_amount,t.ratio=a.conversion_ratio,t.sales_count=a.sales_count})),t.chartOptions.labels=t.labelValues,h.a.close()})).catch((function(t){h.a.fire({position:"center",icon:"error",title:""+t,showConfirmButton:!0}).then((function(t){h.a.close(t)}))}))}}}),y=x,V=Object(v["a"])(y,g,w,!1,null,null,null),F=V.exports,k=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("div",{staticClass:"row align-items-center"},[e("div",{staticClass:"col-sm-12"},[e("b-carousel",{staticStyle:{"text-shadow":"1px 1px 2px #333"},attrs:{id:"carousel-1",interval:4e3,controls:"",indicators:"",background:"#ababab","img-width":"1024","img-height":"480"},on:{"sliding-start":t.onSlideStart,"sliding-end":t.onSlideEnd},model:{value:t.slide,callback:function(a){t.slide=a},expression:"slide"}},t._l(t.orderData,(function(t){return e("b-carousel-slide",{key:t.id,attrs:{caption:t.product__title,text:"Nulla vitae elit libero, a pharetra augue mollis interdum.","img-src":"https://picsum.photos/1024/480/?image=52"}})})),1)],1)]),e("div",{staticClass:"float-end"},[e("b-dropdown",{attrs:{right:"","toggle-class":"text-reset p-0",variant:"white","menu-class":"dropdown-menu-end"},scopedSlots:t._u([{key:"button-content",fn:function(){return[e("span",{staticClass:"fw-semibold"},[t._v("Sort By:")]),e("span",{staticClass:"text-muted"},[t._v(" Yearly "),e("i",{staticClass:"mdi mdi-chevron-down ms-1"})])]},proxy:!0}])},[e("a",{staticClass:"dropdown-item",attrs:{href:"#"}},[t._v("Monthly")]),e("a",{staticClass:"dropdown-item",attrs:{href:"#"}},[t._v("Yearly")]),e("a",{staticClass:"dropdown-item",attrs:{href:"#"}},[t._v("Weekly")])])],1),e("h4",{staticClass:"card-title mb-4 mt-2"},[t._v("Top Selling Products")]),t._l(t.orderData,(function(a){return e("div",{key:a.index,staticClass:"row align-items-center no-gutters mt-3"},[e("div",{staticClass:"col-sm-12"},[e("p",{staticClass:"text-truncate mt-1 mb-0"},[e("i",{staticClass:"mdi mdi-circle-medium text-secondary me-2"}),t._v(" "+t._s(a.product__title)+" ")])]),e("div",{staticClass:"col-sm-12"},[e("b-progress",{staticClass:"mt-1",attrs:{value:a.total_sales,variant:"warning",height:"6px"}})],1)])}))],2)])},S=[],N=(e("a15b"),e("fb6a"),e("ac1f"),e("1276"),{data:function(){return{orderData:[],baseurl:""}},mounted:function(){this.updatearray(),this.baseurl=window.ref},methods:{updatearray:function(){var t=this;h.a.fire({title:"Please Wait !",html:"Loading data...",allowOutsideClick:!1,showConfirmButton:!1,willOpen:function(){h.a.showLoading()}}),p["a"].get("top-products").then((function(a){t.orderData=a.data,h.a.close()})).catch((function(t){h.a.fire({position:"center",icon:"error",title:""+t,showConfirmButton:!0}).then((function(t){h.a.close(t)}))}))},getFirstTwoWords:function(t){var a=t.split(" "),e=a.slice(0,2).join(" ");return e}}}),O=N,A=Object(v["a"])(O,k,S,!1,null,null,null),D=A.exports,T={page:{title:"Dashboard",meta:[{name:"description",content:o.description}]},components:{Layout:r["a"],PageHeader:n["a"],Stat:_,SalesAnalytics:F,SellingProduct:D},data:function(){return{title:"Dashboard",items:[{text:"Minible"},{text:"Dashboard",active:!0}]}}},q=T,j=Object(v["a"])(q,s,i,!1,null,null,null);a["default"]=j.exports},a15b:function(t,a,e){"use strict";var s=e("23e7"),i=e("44ad"),r=e("fc6a"),n=e("a640"),o=[].join,l=i!=Object,c=n("join",",");s({target:"Array",proto:!0,forced:l||!c},{join:function(t){return o.call(r(this),void 0===t?",":t)}})},ec1b:function(t,a,e){!function(a,e){t.exports=e()}(0,(function(){return function(t){function a(s){if(e[s])return e[s].exports;var i=e[s]={i:s,l:!1,exports:{}};return t[s].call(i.exports,i,i.exports,a),i.l=!0,i.exports}var e={};return a.m=t,a.c=e,a.i=function(t){return t},a.d=function(t,e,s){a.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:s})},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)},a.p="/dist/",a(a.s=2)}([function(t,a,e){var s=e(4)(e(1),e(5),null,null);t.exports=s.exports},function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e(3);a.default={props:{startVal:{type:Number,required:!1,default:0},endVal:{type:Number,required:!1,default:2017},duration:{type:Number,required:!1,default:3e3},autoplay:{type:Boolean,required:!1,default:!0},decimals:{type:Number,required:!1,default:0,validator:function(t){return t>=0}},decimal:{type:String,required:!1,default:"."},separator:{type:String,required:!1,default:","},prefix:{type:String,required:!1,default:""},suffix:{type:String,required:!1,default:""},useEasing:{type:Boolean,required:!1,default:!0},easingFn:{type:Function,default:function(t,a,e,s){return e*(1-Math.pow(2,-10*t/s))*1024/1023+a}}},data:function(){return{localStartVal:this.startVal,displayValue:this.formatNumber(this.startVal),printVal:null,paused:!1,localDuration:this.duration,startTime:null,timestamp:null,remaining:null,rAF:null}},computed:{countDown:function(){return this.startVal>this.endVal}},watch:{startVal:function(){this.autoplay&&this.start()},endVal:function(){this.autoplay&&this.start()}},mounted:function(){this.autoplay&&this.start(),this.$emit("mountedCallback")},methods:{start:function(){this.localStartVal=this.startVal,this.startTime=null,this.localDuration=this.duration,this.paused=!1,this.rAF=(0,s.requestAnimationFrame)(this.count)},pauseResume:function(){this.paused?(this.resume(),this.paused=!1):(this.pause(),this.paused=!0)},pause:function(){(0,s.cancelAnimationFrame)(this.rAF)},resume:function(){this.startTime=null,this.localDuration=+this.remaining,this.localStartVal=+this.printVal,(0,s.requestAnimationFrame)(this.count)},reset:function(){this.startTime=null,(0,s.cancelAnimationFrame)(this.rAF),this.displayValue=this.formatNumber(this.startVal)},count:function(t){this.startTime||(this.startTime=t),this.timestamp=t;var a=t-this.startTime;this.remaining=this.localDuration-a,this.useEasing?this.countDown?this.printVal=this.localStartVal-this.easingFn(a,0,this.localStartVal-this.endVal,this.localDuration):this.printVal=this.easingFn(a,this.localStartVal,this.endVal-this.localStartVal,this.localDuration):this.countDown?this.printVal=this.localStartVal-(this.localStartVal-this.endVal)*(a/this.localDuration):this.printVal=this.localStartVal+(this.localStartVal-this.startVal)*(a/this.localDuration),this.countDown?this.printVal=this.printVal<this.endVal?this.endVal:this.printVal:this.printVal=this.printVal>this.endVal?this.endVal:this.printVal,this.displayValue=this.formatNumber(this.printVal),a<this.localDuration?this.rAF=(0,s.requestAnimationFrame)(this.count):this.$emit("callback")},isNumber:function(t){return!isNaN(parseFloat(t))},formatNumber:function(t){t=t.toFixed(this.decimals),t+="";var a=t.split("."),e=a[0],s=a.length>1?this.decimal+a[1]:"",i=/(\d+)(\d{3})/;if(this.separator&&!this.isNumber(this.separator))for(;i.test(e);)e=e.replace(i,"$1"+this.separator+"$2");return this.prefix+e+s+this.suffix}},destroyed:function(){(0,s.cancelAnimationFrame)(this.rAF)}}},function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e(0),i=function(t){return t&&t.__esModule?t:{default:t}}(s);a.default=i.default,"undefined"!=typeof window&&window.Vue&&window.Vue.component("count-to",i.default)},function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=0,i="webkit moz ms o".split(" "),r=void 0,n=void 0;if("undefined"==typeof window)a.requestAnimationFrame=r=function(){},a.cancelAnimationFrame=n=function(){};else{a.requestAnimationFrame=r=window.requestAnimationFrame,a.cancelAnimationFrame=n=window.cancelAnimationFrame;for(var o=void 0,l=0;l<i.length&&(!r||!n);l++)o=i[l],a.requestAnimationFrame=r=r||window[o+"RequestAnimationFrame"],a.cancelAnimationFrame=n=n||window[o+"CancelAnimationFrame"]||window[o+"CancelRequestAnimationFrame"];r&&n||(a.requestAnimationFrame=r=function(t){var a=(new Date).getTime(),e=Math.max(0,16-(a-s)),i=window.setTimeout((function(){t(a+e)}),e);return s=a+e,i},a.cancelAnimationFrame=n=function(t){window.clearTimeout(t)})}a.requestAnimationFrame=r,a.cancelAnimationFrame=n},function(t,a){t.exports=function(t,a,e,s){var i,r=t=t||{},n=typeof t.default;"object"!==n&&"function"!==n||(i=t,r=t.default);var o="function"==typeof r?r.options:r;if(a&&(o.render=a.render,o.staticRenderFns=a.staticRenderFns),e&&(o._scopeId=e),s){var l=Object.create(o.computed||null);Object.keys(s).forEach((function(t){var a=s[t];l[t]=function(){return a}})),o.computed=l}return{esModule:i,exports:r,options:o}}},function(t,a){t.exports={render:function(){var t=this,a=t.$createElement;return(t._self._c||a)("span",[t._v("\n  "+t._s(t.displayValue)+"\n")])},staticRenderFns:[]}}])}))}}]);
//# sourceMappingURL=chunk-4d9512ef.6a4be1ad.js.map