(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-00a343b1"],{"39b3":function(e,t,a){"use strict";a("cc58")},cc58:function(e,t,a){},e607:function(e,t,a){},ed50:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("Layout",[a("PageHeader",{attrs:{title:e.title,items:e.items}}),a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("form",{on:{submit:function(t){return t.preventDefault(),e.handleSubmit(t)}}},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"row justify-content-between"},[a("div",{staticClass:"col-sm-6"},[a("button",{staticClass:"btn btn-success waves-effect waves-light uil-export",on:{click:function(t){return e.getrpt()}}},[e._v(" Export to CSV ")])]),a("div",{staticClass:"col-sm-2"},[a("button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-Print",modifiers:{"modal-Print":!0}}],staticClass:"btn btn-success waves-effect waves-light mdi-file-pdf",on:{click:function(t){return e.printpdf("p")}}},[e._v(" Print PDF ")])]),a("div",{staticClass:"col-sm-2"},[a("button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-Add",modifiers:{"modal-Add":!0}}],staticClass:"btn btn-success waves-effect waves-light uil-focus-add",on:{click:function(t){return e.clearvalues()}}},[e._v(" Add Supplier ")])])])])]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-12"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body changebg"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("div",[a("div",{staticClass:"float-end"},[a("form",{staticClass:"d-inline-flex mb-3"})])]),a("div",{staticClass:"table table-centered datatable dt-responsive nowrap table-card-list dataTable no-footer dtr-inline"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-12 col-md-6"},[a("div",{staticClass:"dataTables_length",attrs:{id:"tickets-table_length"}},[a("label",{staticClass:"d-inline-flex align-items-center fw-normal"},[e._v(" Show "),a("b-form-select",{attrs:{size:"sm",options:e.pageOptions},on:{input:function(t){return e.updatearray()}},model:{value:e.perPage,callback:function(t){e.perPage=t},expression:"perPage"}}),e._v(" entries ")],1)])]),a("div",{staticClass:"col-sm-12 col-md-6"},[a("div",{staticClass:"dataTables_filter text-md-end",attrs:{id:"tickets-table_filter"}},[a("label",{staticClass:"d-inline-flex align-items-center fw-normal"},[e._v(" Search: "),a("b-form-input",{staticClass:"form-control form-control-sm ms-2",attrs:{type:"search",placeholder:"Search..."},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})],1)])])]),a("b-table",{attrs:{"table-class":"table table-centered datatable table-card-list","thead-tr-class":"bg-transparent",items:e.orderData,fields:e.fields,responsive:"sm","per-page":e.perPage,"current-page":e.currentPage,"sort-by":e.sortBy,"sort-desc":e.sortDesc,filter:e.filter,"filter-included-fields":e.filterOn},on:{"update:sortBy":function(t){e.sortBy=t},"update:sort-by":function(t){e.sortBy=t},"update:sortDesc":function(t){e.sortDesc=t},"update:sort-desc":function(t){e.sortDesc=t},filtered:e.onFiltered},scopedSlots:e._u([{key:"cell(id)",fn:function(t){return[a("a",{staticClass:"text-dark fw-bold",attrs:{href:"javascript: void(0);"}},[e._v(" "+e._s(t.item.id)+" ")])]}},{key:"cell(addresses)",fn:function(t){return e._l(t.item.address,(function(t){return a("p",{key:t.id,staticClass:"d-inline"},[e._v(" "+e._s(t.city)+"-"+e._s(t.box)+", ")])}))}},{key:"cell(Subcategories)",fn:function(t){return[a("div",{staticClass:"m-auto overflow-auto"},e._l(t.item.Subcategories,(function(t){return a("li",{key:t.id,staticClass:"d-inline overflow-auto"},[e._v(" "+e._s(t.name)+", ")])})),0)]}},{key:"cell(action)",fn:function(t){return[a("ul",{staticClass:"list-inline mb-0"},[a("li",{staticClass:"list-inline-item"},[a("a",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}},{name:"b-modal",rawName:"v-b-modal.modal-Add",modifiers:{"modal-Add":!0}}],staticClass:"px-2 text-success",attrs:{href:"javascript:void(0);",title:"Edit"},on:{click:function(a){return e.edit(t.index,t.item.id,t.item.name,t.item.addresses)}}},[a("i",{staticClass:"uil uil-pen font-size-18"})])]),a("li",{staticClass:"list-inline-item"},[a("a",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"px-2 text-danger",attrs:{href:"javascript:void(0);",title:"Delete"},on:{click:function(a){return e.deleterec(t.index,t.item.id,t.item.name)}}},[a("i",{staticClass:"uil uil-trash-alt font-size-18"})])])])]}}])})],1),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{staticClass:"dataTables_paginate paging_simple_numbers float-end"},[a("ul",{staticClass:"pagination pagination-rounded"},[a("b-pagination",{attrs:{"total-rows":e.rows,"per-page":e.perPage},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1)])])])])])])])])])])])]),a("b-modal",{attrs:{id:"modal-Print",title:"Print PDF","hide-footer":"",size:"bg",centered:""}},[a("reportdet",{directives:[{name:"show",rawName:"v-show",value:e.showme,expression:"showme"}],attrs:{title:e.title,orderData:e.orderData,pl:e.pl,headers:e.headers,uniqueCars:e.uniqueCars,shome:e.showme}})],1),a("b-modal",{attrs:{id:"modal-Add",title:e.modaltitle,"hide-footer":"",size:"xl",centered:""}},[a("addSupplier",{attrs:{name:e.name,id:e.myid,address:e.address,myindex:e.myindex,editmode:e.editmode,modaltitle:e.modaltitle,orderData:e.orderData}})],1)],1)},i=[],r=(a("a4d3"),a("e01a"),a("99af"),a("4160"),a("a630"),a("a15b"),a("d81d"),a("a434"),a("b0c0"),a("4fad"),a("b64b"),a("d3b7"),a("07ac"),a("ac1f"),a("6062"),a("3ca3"),a("5319"),a("159b"),a("ddb0"),a("2b3d"),a("b85c")),n=a("3835"),o=a("5658"),d=a("2579"),l=a("c2a4"),c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container-fluid p-4 m-4"},[a("form",{on:{submit:function(t){return t.preventDefault(),e.handleSubmit(t)}}},[a("div",{staticClass:"row  align-items-center justify-content-center"},[a("div",{staticClass:"col-sm-6"},[a("div",{staticClass:"input-group"},[a("div",{staticClass:"input-group-text col-sm-4"},[e._v("Name:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Enter Supplier Name"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}})])]),a("div",{staticClass:"col-sm-6"},[a("div",{staticClass:"mb-3"},[a("label",{attrs:{for:"suppliername"}},[e._v("Address"),a("button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-address",modifiers:{"modal-address":!0}}],staticClass:"badge badge-pill bg-primary"},[a("i",{staticClass:"fa fa-plus"}),e._v(" Add New")])]),a("multiselect",{attrs:{options:e.addresses,"option-label":function(e){return e.city},placeholder:"Search an address",label:"city","track-by":"id",multiple:!0,editable:!0},model:{value:e.address,callback:function(t){e.address=t},expression:"address"}})],1)])])]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-10"}),a("div",{staticClass:"col-sm-2"},[a("b-button",{directives:[{name:"show",rawName:"v-show",value:!e.editmode,expression:"!editmode"}],attrs:{variant:"success"},on:{click:function(t){return e.addRec()}}},[e._v("Add Supplier")]),a("b-button",{directives:[{name:"show",rawName:"v-show",value:e.editmode,expression:"editmode"}],attrs:{variant:"success"},on:{click:function(t){return e.editRec()}}},[e._v("Edit Supplier")])],1)]),a("div",{staticClass:"card"},[a("b-modal",{attrs:{title:e.modaltitle,size:"lg",id:"modal-address"}},[a("addAddress",{attrs:{editmode:!1,selectmode:!1,modaltitle:"",id:0,selectedCity:null,selectedTown:e.selectedTown,address_label:e.address_label,phone_number:e.phone_number,other_phone:e.other_phone,default_address:e.default_address},on:{getuserAddress:function(t){return e.updatearray()}}})],1)],1)])},u=[],m=(a("a9e3"),a("498a"),a("e607"),a("8e5f")),p=a.n(m),f=a("2e9e"),h=a("3d20"),v=a.n(h),b=a("9227"),g=b["a"].defaults.headers;g["Content-Type"]="multipart/form-data",b["a"].defaults.headers=g;var w={props:{orderData:Array,name:String,address:Array,modaltitle:String,editmode:Boolean,id:Number,myindex:Number},components:{Multiselect:p.a,addAddress:f["default"]},data:function(){return{dropzoneOptions:{url:window.$http+"/category/images/",autoProcessQueue:!1,uploadMultiple:!0,maxFilesize:2,acceptedFiles:"image/*",addRemoveLinks:!0,dictDefaultMessage:"Drop Category display image here or click to upload",maxFiles:10,headers:window.$headers},title:"Add Categories",items:[{text:"USER: Admin"},{text:"Add Category",active:!0}],selectedCity:null,selectedTown:null,address_label:"",phone_number:"",other_phone:"",default_address:!1,addresses:[]}},mounted:function(){this.updatearray()},methods:{updatearray:function(){var e=this;b["a"].get("businessaddress").then((function(t){e.addresses=t.data["results"]})).catch((function(t){e.errors.push(t)}))},addRec:function(){var e=this;if(""!=this.name.trim()){var t=new FormData;this.address.forEach((function(e){t.append("addresses",e.id)})),t.append("name",this.name);var a=this.orderData.length+1;this.orderData.push({id:a,name:this.name,addresses:this.address}),b["a"].post("suppliers/",t).then((function(){v.a.fire({position:"center",icon:"success",title:"Your work has been saved. Supplier "+e.name+" Added",showConfirmButton:!1,timer:3e3}).then((function(t){e.clearvalues()}))})).catch((function(t){e.errors.push(t)}))}else v.a.fire("Please enter Supplier Name!")},handleSubmit:function(){console.log("Error on submit")},editRec:function(){var e=this;if(""!=this.name.trim()){var t=new FormData;this.address.forEach((function(e){t.append("addresses",e.id)})),t.append("name",this.name),t.append("id",this.id),b["a"].put("suppliers/"+this.id+"/",t).then((function(){v.a.fire({position:"center",icon:"success",title:"Your work has been saved. Supplier "+e.name,showConfirmButton:!1,timer:1500}).then((function(t){e.orderData[e.myindex].name=e.name,e.orderData[e.myindex].addresses=e.address}))})).catch((function(t){e.errors.push(t)}))}else v.a.fire("Please enter Supplier Name")}}},C=w,y=a("2877"),_=Object(y["a"])(C,c,u,!1,null,null,null),x=_.exports,D=a("a36c"),S={name:"Suppliers",page:{title:"Suppliers",meta:[{name:"description",content:l.description}]},components:{Layout:o["a"],PageHeader:d["a"],addSupplier:x,reportdet:D["a"]},data:function(){return{name:"",headers:null,uniqueCars:null,showme:!0,pl:"",editmode:!1,title:"Suppliers",items:[{text:"USER:"+JSON.parse(sessionStorage.user).username},{text:"Suppliers",active:!0}],myid:0,myindex:0,address:[],totalRows:1,currentPage:1,perPage:10,pageOptions:[1,10,25,50,100],filter:null,filterOn:[],sortBy:"id",sortDesc:!1,fields:[{key:"id",label:"#",sortable:!0},{key:"name",sortable:!0},{key:"addresses",sortable:!0},"action"],orderData:[]}},computed:{rows:function(){return this.orderData.length}},mounted:function(){this.updatearray(),console.log(this.orderData.length)},methods:{updatearray:function(){var e=this;v.a.fire({title:"Please Wait !",html:"Loading data...",allowOutsideClick:!1,showConfirmButton:!1,willOpen:function(){v.a.showLoading()}}),b["a"].get("suppliers/?limit=".concat(this.perPage,"&offset=").concat((this.currentPage-1)*this.perPage)).then((function(t){console.log(t.data),e.orderData=t.data,e.totalRows=e.orderData.length,v.a.close()})).catch((function(e){v.a.fire({position:"center",icon:"error",title:""+e,showConfirmButton:!0}).then((function(e){v.a.close(e)}))}))},printpdf:function(e){this.pl=e;var t=this.orderData.map((function(e){return{ID:e.id,Name:e.name}})),a=Object.keys(t[0]),s=[];Object.entries(t).forEach((function(e){var a=Object(n["a"])(e,2),i=a[0],r=a[1];console.log(i,r),s.push(Object.values(t[i]))}));var i=Array.from(new Set(s));this.headers=a,this.uniqueCars=i},getrpt:function(){var e=new Date,t=e.getFullYear(),a=e.getMonth(),s=e.getDate(),i=e.getHours(),n=e.getMinutes(),o=e.getSeconds(),d=e.getMilliseconds(),l=t+"-"+a+"-"+s+"-"+i+"-"+n+"-"+o+"-"+d,c=this.orderData.map((function(e){return{ID:e.id,Cargo_Name:e.name}})),u=[],m=Object.keys(c[0]);u.push(m.join(","));var p,f=Object(r["a"])(c);try{var h=function(){var e=p.value,t=m.map((function(t){var a=(""+e[t]).replace(/"/g,'\\"');return'"'+a+'"'}));u.push(t.join(","))};for(f.s();!(p=f.n()).done;)h()}catch(C){f.e(C)}finally{f.f()}var v=u.join("\n"),b=new Blob([v],{type:"textcsv"}),g=window.URL.createObjectURL(b),w=document.createElement("a");w.setAttribute("hidden",""),w.setAttribute("href",g),w.setAttribute("download",this.title+l+".csv"),document.body.appendChild(w),w.click(),document.body.removeChild(w)},onFiltered:function(e){this.totalRows=e.length,this.currentPage=1},handleSubmit:function(){console.log("Error on submit")},edit:function(e,t,a,s){console.log(t),this.editmode=!0,this.modaltitle="Edit Supplier",this.myid=t,this.myindex=e,this.name=a,this.address=s},deleterec:function(e,t,a){var s=this;this.myid=t,this.name=a,v.a.fire({title:"Are you sure, you want to delete? "+this.name,text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#34c38f",cancelButtonColor:"#f46a6a",confirmButtonText:"Yes, delete it!"}).then((function(a){a.value&&b["a"].delete("suppliers/"+t+"/").then((function(){s.orderData.splice(e,1),v.a.fire(s.name+" Deleted!","Your record has been deleted.","success"),v.a.close()})).catch((function(e){v.a.fire({position:"center",icon:"error",title:""+e,showConfirmButton:!0}).then((function(e){v.a.close(e)}))}))}))},clearvalues:function(){this.id="",this.name="",this.editmode=!1,this.modaltitle="Add Supplier"}}},k=S,P=(a("39b3"),Object(y["a"])(k,s,i,!1,null,null,null));t["default"]=P.exports}}]);
//# sourceMappingURL=chunk-00a343b1.2f0f2024.js.map