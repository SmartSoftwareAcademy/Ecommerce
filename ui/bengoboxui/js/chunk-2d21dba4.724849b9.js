(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21dba4"],{d310:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Layout",[a("PageHeader",{attrs:{title:t.title,items:t.items}}),a("div",{staticClass:"row justify-content-between"},[a("div",{staticClass:"col-sm-6"},[a("div",{staticClass:"row justify-content-between"},[a("div",{staticClass:"col-sm-3"},[a("button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-Transaction",modifiers:{"modal-Transaction":!0}}],staticClass:"btn btn-warning mb-3",attrs:{type:"button"}},[a("i",{staticClass:"mdi mdi-plus me-1"}),t._v(" Record Transaction ")])]),a("div",{staticClass:"col-sm-3"},[a("button",{staticClass:"btn btn-secondary waves-effect waves-light uil-export",on:{click:function(e){return t.getrpt()}}},[t._v(" Export to CSV ")])]),a("div",{staticClass:"col-sm-3"},[a("button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-Print",modifiers:{"modal-Print":!0}}],staticClass:"btn btn-secondary waves-effect waves-light uil-file",on:{click:function(e){return t.printpdf("p")}}},[t._v(" Print PDF ")])])])]),a("div",{staticClass:"col-sm-6"},[a("div",{staticClass:"float-end"},[a("div",{staticClass:"form-inline mb-3"},[a("div",{staticClass:"input-daterange input-group",attrs:{"data-provide":"datepicker","data-date-format":"dd M, yyyy","data-date-autoclose":"true"}},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"transactionType"}},[t._v("Transaction Type")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.transactionType,expression:"transactionType"}],staticClass:"form-control",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.transactionType=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"withdrawal"}},[t._v("Withdrawal")]),a("option",{attrs:{value:"deposit"}},[t._v("Deposit")])])]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.fromdate,expression:"fromdate"}],staticClass:"form-control text-left",attrs:{type:"date",placeholder:"11/13/2023",name:"From"},domProps:{value:t.fromdate},on:{input:function(e){e.target.composing||(t.fromdate=e.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.todate,expression:"todate"}],staticClass:"form-control text-left",attrs:{type:"date",placeholder:"11/13/2023",name:"To"},domProps:{value:t.todate},on:{input:function(e){e.target.composing||(t.todate=e.target.value)}}}),a("div",{staticClass:"input-group-append"},[a("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return t.updatearray()}}},[a("i",{staticClass:"mdi mdi-filter-variant"})])])])])])])]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-12 col-md-6"},[a("div",{staticClass:"dataTables_length",attrs:{id:"tickets-table_length"}},[a("label",{staticClass:"d-inline-flex align-items-center fw-normal"},[t._v(" Show "),a("b-form-select",{attrs:{size:"sm",options:t.pageOptions},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}}),t._v(" entries ")],1)])]),a("div",{staticClass:"col-sm-12 col-md-6"},[a("div",{staticClass:"dataTables_filter text-md-end",attrs:{id:"tickets-table_filter"}},[a("label",{staticClass:"d-inline-flex align-items-center fw-normal"},[t._v(" Search: "),a("b-form-input",{staticClass:"form-control form-control-sm ms-2",attrs:{type:"search"},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}})],1)])])]),a("div",{staticClass:"table-responsive mb-0"},[a("b-table",{attrs:{"table-class":"table table-centered datatable table-card-list","thead-tr-class":"bg-transparent",items:t.transactions,fields:t.fields,responsive:"sm","per-page":t.perPage,"current-page":t.currentPage,"sort-by":t.sortBy,"sort-desc":t.sortDesc,filter:t.filter,"filter-included-fields":t.filterOn},on:{"update:sortBy":function(e){t.sortBy=e},"update:sort-by":function(e){t.sortBy=e},"update:sortDesc":function(e){t.sortDesc=e},"update:sort-desc":function(e){t.sortDesc=e},filtered:t.onFiltered},scopedSlots:t._u([{key:"cell(check)",fn:function(t){return[a("div",{staticClass:"custom-control custom-checkbox text-center"},[a("input",{staticClass:"custom-control-input",attrs:{type:"checkbox",id:"contacusercheck"+t.item.id}}),a("label",{staticClass:"custom-control-label",attrs:{for:"contacusercheck"+t.item.id}})])]}},{key:"cell:(invoice_id)",fn:function(t){return[a("router-link",{attrs:{to:{name:"Transaction Detail",params:{transaction:t.item}}}})]}},{key:"cell(id)",fn:function(e){return[a("a",{staticClass:"text-dark fw-bold",attrs:{href:"javascript: void(0);"}},[t._v(" "+t._s(e.item.id)+" ")])]}},{key:"cell(created_at)",fn:function(e){return[a("a",{staticClass:"text-dark fw-bold",attrs:{href:"javascript: void(0);"}},[t._v(" "+t._s(new Date(e.item.created_at).toDateString())+" ")])]}},{key:"cell(status)",fn:function(e){return[a("div",{staticClass:"badge rounded-pill bg-soft-success font-size-12",class:{"bg-soft-warning":"Pending"===e.item.status}},[t._v(" "+t._s(e.item.status)+" ")])]}},{key:"cell(billing_name)",fn:function(e){return[a("a",{staticClass:"text-body",attrs:{href:"#"}},[t._v(t._s(e.item.customer.user.first_name)+" "+t._s(e.item.customer.user.last_name))])]}},{key:"cell(download)",fn:function(){return[a("div",[a("button",{staticClass:"btn btn-light btn-sm w-xs"},[t._v(" Pdf "),a("i",{staticClass:"uil uil-download-alt ms-2"})])])]},proxy:!0},{key:"cell(action)",fn:function(){return[a("ul",{staticClass:"list-inline mb-0"},[a("li",{staticClass:"list-inline-item"},[a("a",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"px-2 text-primary",attrs:{href:"javascript:void(0);",title:"Edit"}},[a("i",{staticClass:"uil uil-pen font-size-18"})])]),a("li",{staticClass:"list-inline-item"},[a("a",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"px-2 text-danger",attrs:{href:"javascript:void(0);",title:"Delete"}},[a("i",{staticClass:"uil uil-trash-alt font-size-18"})])])])]},proxy:!0}])})],1),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{staticClass:"dataTables_paginate paging_simple_numbers float-end"},[a("ul",{staticClass:"pagination pagination-rounded"},[a("b-pagination",{attrs:{"total-rows":t.rows,"per-page":t.perPage},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)])]),a("b-modal",{attrs:{id:"modal-Print",title:"Print PDF","hide-footer":"",size:"bg",centered:""}},[a("reportdet",{directives:[{name:"show",rawName:"v-show",value:t.showme,expression:"showme"}],attrs:{title:t.title,orderData:t.orderData,pl:t.pl,headers:t.headers,uniqueCars:t.uniqueCars,shome:t.showme}})],1),a("b-modal",{attrs:{id:"modal-Transaction",title:t.modaltitle,"hide-footer":"",size:"xl",centered:""}},[a("addTransaction",{attrs:{id:t.myid,myindex:t.myindex,editmode:t.editmode,modaltitle:t.modaltitle,transactions:t.transactions}})],1)],1),a("div",{staticClass:"row bg-light mt-4"},[a("div",{staticClass:"col-sm-6"},[a("v-card",[a("v-card-title",{staticClass:"bg-light",attrs:{outlined:""}},[a("h3",{staticClass:"m-4"},[t._v("General Summary")])]),a("v-card-text",[a("p",[t._v("Total Deposits: "+t._s(t.totalDeposits))]),a("p",[t._v("Total Withdrawals: "+t._s(t.totalWithdrawals))])])],1)],1),a("div",{staticClass:"col-sm-6"},[a("v-card",[a("v-card-title",{staticClass:"bg-light text-white-50",attrs:{outlined:""}},[a("h3",{staticClass:"m-4"},[t._v("Daily Summary")]),a("h5",{staticClass:"m-4 float-end"},[t._v(" Date:"+t._s(t.fromdate||(new Date).toDateString())+" ")])]),a("v-card-text",[a("p",[t._v("Total Deposits: "+t._s(t.daily_summary.deposits))]),a("p",[t._v("Total Withdrawals: "+t._s(t.daily_summary.withdrawals))])])],1)],1)])],1)},n=[],s=(a("a4d3"),a("e01a"),a("99af"),a("4160"),a("a630"),a("a15b"),a("d81d"),a("a434"),a("b0c0"),a("4fad"),a("b64b"),a("d3b7"),a("07ac"),a("ac1f"),a("6062"),a("3ca3"),a("5319"),a("159b"),a("ddb0"),a("2b3d"),a("b85c")),o=a("3835"),r=a("5658"),l=a("2579"),c=a("c2a4"),d=a("a36c"),u=a("3d20"),m=a.n(u),p=a("9227"),f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("form",{on:{submit:function(e){return e.preventDefault(),t.addTransaction(e)}}},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"transactionType"}},[t._v("Transaction Type")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.transactionType,expression:"transactionType"}],staticClass:"form-control",attrs:{required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.transactionType=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"withdrawal"}},[t._v("Withdrawal")]),a("option",{attrs:{value:"deposit"}},[t._v("Deposit")])])]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"transactionRef"}},[t._v("Transaction Reference")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.transactionRef,expression:"transactionRef"}],staticClass:"form-control",attrs:{type:"text",required:""},domProps:{value:t.transactionRef},on:{input:function(e){e.target.composing||(t.transactionRef=e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"clientName"}},[t._v("Client Name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.clientName,expression:"clientName"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.clientName},on:{input:function(e){e.target.composing||(t.clientName=e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"clientId"}},[t._v("Client ID")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.clientId,expression:"clientId"}],staticClass:"form-control",attrs:{type:"text",required:""},domProps:{value:t.clientId},on:{input:function(e){e.target.composing||(t.clientId=e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"amount"}},[t._v("Amount")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.amount,expression:"amount"}],staticClass:"form-control",attrs:{type:"number",required:""},domProps:{value:t.amount},on:{input:function(e){e.target.composing||(t.amount=e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"date"}},[t._v("Date")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.date,expression:"date"}],staticClass:"form-control",attrs:{type:"date",required:""},domProps:{value:t.date},on:{input:function(e){e.target.composing||(t.date=e.target.value)}}})]),a("button",{staticClass:"btn btn-secondary mt-2",attrs:{type:"submit"}},[t._v(t._s(t.modaltitle))])])])},v=[],h=(a("a9e3"),a("498a"),p["a"].defaults.headers);h["Content-Type"]="multipart/form-data",p["a"].defaults.headers=h;var b={props:{transactions:Array,modaltitle:String,editmode:Boolean,id:Number,myindex:Number},components:{},data:function(){return{transactionType:"deposit",transactionRef:"HX56474Y8",clientName:"Jane Doe",clientId:"6473738",amount:1e3,date:new Date("11-13-2023")}},mounted:function(){},methods:{handleSubmit:function(){console.log("Error on submit")},addTransaction:function(){var t=this;if(""!=this.transactionType.trim())if(""!=this.transactionRef.trim()){var e={clientName:this.clientName,clientId:this.clientId,transactionType:this.transactionType,transactionRef:this.transactionRef,amount:this.amount,date:this.date},a=this.transactions.length+1;this.transactions.push({id:a,clientName:this.clientName,clientId:this.clientId,transactionType:this.transactionType,transactionRef:this.transactionRef,amount:this.amount,date:this.date}),p["a"].post("transactions/",e).then((function(e){console.log(e.data),m.a.fire({position:"center",icon:"success",title:"Your work has been saved. Transaction "+t.transactionRef+" Added",showConfirmButton:!1,timer:3e3}).then((function(e){t.clearvalues()}))})).catch((function(e){t.errors.push(e)}))}else m.a.fire("Please enter Transaction Ref!");else m.a.fire("Please enter Transaction Type!")},editRec:function(){var t=this;if(""!=this.transactionType.trim())if(""!=this.transactionRef.trim()){var e={clientName:this.clientName,clientId:this.clientId,transactionType:this.transactionType,transactionRef:this.transactionRef,amount:this.amount,date:this.date};p["a"].put("transactions/"+this.id+"/",e).then((function(){m.a.fire({position:"center",icon:"success",title:"Your work has been saved. Transaction "+t.transactionRef,showConfirmButton:!1,timer:1500}).then((function(e){t.transactions[t.myindex].clientName=t.clientName,t.transactions[t.myindex].transactionRef=t.transactionRef,t.transactions[t.myindex].transactionType=t.transactionType,t.transactions[t.myindex].clientId=t.clientId,t.transactions[t.myindex].amount=t.amount,t.transactions[t.myindex].date=t.date}))})).catch((function(e){t.errors.push(e)}))}else m.a.fire("Please enter Transaction Ref!");else m.a.fire("Please enter Transaction Type!")}}},y=b,g=a("2877"),w=Object(g["a"])(y,f,v,!1,null,null,null),C=w.exports,_={name:"transactions",page:{title:"Invoice List",meta:[{name:"description",content:c.description}]},components:{Layout:r["a"],PageHeader:l["a"],reportdet:d["a"],addTransaction:C},data:function(){return{items:[{text:"USER:"+JSON.parse(sessionStorage.user).name},{text:"Transactions",active:!0}],modaltitle:"Record New Transaction",transactionType:"deposit",transactionTypes:["deposit","withdrawal"],transactionRef:"",clientName:"",clientId:"",amount:0,date:"",headers:null,uniqueCars:null,showme:!0,pl:"",editmode:!1,title:"Transaction List",transactions:[],myid:0,myindex:0,totalRows:1,currentPage:1,perPage:10,pageOptions:[1,10,25,50,100],filter:null,filterOn:[],sortBy:"id",sortDesc:!1,daily_summary:null,totalDeposits:0,totalWithdrawals:0,fromdate:"",todate:"",fields:[{key:"check",label:"#",sortable:!0},{key:"date"},{key:"transactionRef",sortable:!0},{key:"transactionType",sortable:!0},{key:"clientName",sortable:!0},{key:"clientId",sortable:!0},{key:"amount",sortable:!0},{key:"download",sortable:!0},"action"]}},computed:{rows:function(){return this.transactions.length}},mounted:function(){this.updatearray(),this.totalRows=this.transactions.length},methods:{updatearray:function(){var t=this;m.a.fire({title:"Please Wait !",html:"Loading data...",allowOutsideClick:!1,showConfirmButton:!1,willOpen:function(){m.a.showLoading()}}),p["a"].get("transactions/?type=".concat(this.transactionType,"&fromdate=").concat(this.fromdate,"&todate=").concat(this.todate)).then((function(e){t.transactions=e.data["transactions"],t.totalDeposits=e.data["total_deposit"],t.totalWithdrawals=e.data["total_withdrawal"],t.daily_summary=e.data.daily_summary,m.a.close()})).catch((function(t){m.a.fire({position:"center",icon:"error",title:""+t,showConfirmButton:!0}).then((function(t){m.a.close(t)}))}))},printpdf:function(t){this.pl=t;var e=this.transactions.map((function(t){return{ID:t.id,Type:t.transactionType,Ref:t.transactionRef,"Amount(KES)":t.amount,"Client Name":t.clientName,"Client ID":t.clientId,"Transaction Date":t.date}})),a=Object.keys(e[0]),i=[];Object.entries(e).forEach((function(t){var a=Object(o["a"])(t,2),n=a[0],s=a[1];console.log(n,s),i.push(Object.values(e[n]))}));var n=Array.from(new Set(i));this.headers=a,this.uniqueCars=n},getrpt:function(){var t=new Date,e=t.getFullYear(),a=t.getMonth(),i=t.getDate(),n=t.getHours(),o=t.getMinutes(),r=t.getSeconds(),l=t.getMilliseconds(),c=e+"-"+a+"-"+i+"-"+n+"-"+o+"-"+r+"-"+l,d=this.transactions.map((function(t){return{ID:t.id,Type:t.transactionType,Ref:t.transactionRef,"Amount(KES)":t.amount,"Client Name":t.clientName,"Client ID":t.clientId,"Transaction Date":t.date}})),u=[],m=Object.keys(d[0]);u.push(m.join(","));var p,f=Object(s["a"])(d);try{var v=function(){var t=p.value,e=m.map((function(e){var a=(""+t[e]).replace(/"/g,'\\"');return'"'+a+'"'}));u.push(e.join(","))};for(f.s();!(p=f.n()).done;)v()}catch(w){f.e(w)}finally{f.f()}var h=u.join("\n"),b=new Blob([h],{type:"textcsv"}),y=window.URL.createObjectURL(b),g=document.createElement("a");g.setAttribute("hidden",""),g.setAttribute("href",y),g.setAttribute("download",this.title+c+".csv"),document.body.appendChild(g),g.click(),document.body.removeChild(g)},onFiltered:function(t){this.totalRows=t.length,this.currentPage=1},handleSubmit:function(){console.log("Error on submit")},deleterec:function(t,e,a){var i=this;this.myid=e,this.invoiced_id=a,m.a.fire({title:"Are you sure, you want to delete? "+a,text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#34c38f",cancelButtonColor:"#f46a6a",confirmButtonText:"Yes, delete it!"}).then((function(n){n.value&&p["a"].delete("invoices/"+e+"/").then((function(){i.orderData.splice(t,1),m.a.fire(a+" Deleted!","Your record has been deleted.","success"),m.a.close()})).catch((function(t){m.a.fire({position:"center",icon:"error",title:""+t,showConfirmButton:!0}).then((function(t){m.a.close(t)}))}))}))},clearvalues:function(){this.id="",this.invoiced_id=""},addTransaction:function(){this.transactions.push({type:this.transactionType,reference:this.transactionRef,name:this.name,amount:this.amount,date:this.date}),this.transactionType="deposit",this.transactionRef="",this.name="",this.amount=0,this.date=""}}},T=_,x=Object(g["a"])(T,i,n,!1,null,null,null);e["default"]=x.exports}}]);
//# sourceMappingURL=chunk-2d21dba4.724849b9.js.map