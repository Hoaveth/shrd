"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[723],{4796:(e,t,n)=>{n.d(t,{Z:()=>d});var o=n(3645),r=n.n(o),l=n(1667),a=n.n(l),s=n(7726),c=r()((function(e){return e[1]})),u=a()(s.Z);c.push([e.id,".decorative-bg[data-v-3e76d8e4]{background:url("+u+")}",""]);const d=c},7726:(e,t,n)=>{n.d(t,{Z:()=>o});const o="/images/embossed-diamond.png?c38d143931d4445848804d28c6b97bf0"},4078:(e,t,n)=>{n.d(t,{Z:()=>l});var o=n(821),r=["type"];const l={__name:"Button",props:{type:{type:String,default:"submit"}},setup:function(e){return function(t,n){return(0,o.openBlock)(),(0,o.createElementBlock)("button",{type:e.type,class:"inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"},[(0,o.renderSlot)(t.$slots,"default")],8,r)}}}},9576:(e,t,n)=>{n.d(t,{Z:()=>l});var o=n(821),r=["value"];const l={__name:"Input",props:["modelValue"],emits:["update:modelValue"],setup:function(e){var t=(0,o.ref)(null);return(0,o.onMounted)((function(){t.value.hasAttribute("autofocus")&&t.value.focus()})),function(n,l){return(0,o.openBlock)(),(0,o.createElementBlock)("input",{class:"form-control",value:e.modelValue,onInput:l[0]||(l[0]=function(e){return n.$emit("update:modelValue",e.target.value)}),ref_key:"input",ref:t},null,40,r)}}}},3302:(e,t,n)=>{n.d(t,{Z:()=>a});var o=n(821),r={key:0,class:"form-label"},l={key:1,class:"form-label"};const a={__name:"Label",props:["value"],setup:function(e){return function(t,n){return e.value?((0,o.openBlock)(),(0,o.createElementBlock)("label",r,(0,o.toDisplayString)(e.value),1)):((0,o.openBlock)(),(0,o.createElementBlock)("label",l,[(0,o.renderSlot)(t.$slots,"default")]))}}}},7211:(e,t,n)=>{n.d(t,{Z:()=>c});var o=n(821),r=n(9038),l={key:0},a=(0,o.createElementVNode)("div",{class:"font-medium text-danger"},"Whoops! Something went wrong.",-1),s={class:"mt-3 text-sm text-danger"};const c={__name:"ValidationErrors",setup:function(e){var t=(0,o.computed)((function(){return(0,r.qt)().props.value.errors})),n=(0,o.computed)((function(){return Object.keys(t.value).length>0}));return function(e,r){return n.value?((0,o.openBlock)(),(0,o.createElementBlock)("div",l,[a,(0,o.createElementVNode)("ul",s,[((0,o.openBlock)(!0),(0,o.createElementBlock)(o.Fragment,null,(0,o.renderList)(t.value,(function(e,t){return(0,o.openBlock)(),(0,o.createElementBlock)("li",{key:t},(0,o.toDisplayString)(e),1)})),128))])])):(0,o.createCommentVNode)("",!0)}}}},288:(e,t,n)=>{n.d(t,{Z:()=>Z});var o=n(821),r=n(1607),l=function(e){return(0,o.pushScopeId)("data-v-3e76d8e4"),e=e(),(0,o.popScopeId)(),e},a=r.Z,s=r.Z,c={class:"nk-app-root"},u={class:"nk-main"},d={class:"nk-wrap nk-wrap-nosidebar"},i={class:"nk-content"},m={class:"nk-split nk-split-page nk-split-md"},p={class:"nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white"},f={class:"nk-block nk-block-middle nk-auth-body"},k={class:"brand-logo pb-5"},g=l((function(){return(0,o.createElementVNode)("img",{class:"logo-light logo-img logo-img-lg",src:r.Z,srcset:a,alt:"logo"},null,-1)})),v=l((function(){return(0,o.createElementVNode)("img",{class:"logo-dark logo-img logo-img-lg",src:r.Z,srcset:s,alt:"logo-dark"},null,-1)})),b=l((function(){return(0,o.createElementVNode)("div",{class:"nk-block nk-auth-footer"},[(0,o.createElementVNode)("div",{class:"mt-3"},[(0,o.createElementVNode)("p",null,"© 2023 Getlive.help")])],-1)})),V=l((function(){return(0,o.createElementVNode)("div",{class:"nk-split-content nk-split-stretch bg-abstract decorative-bg"},null,-1)}));var h=n(3379),E=n.n(h),w=n(4796),N={insert:"head",singleton:!1};E()(w.Z,N);w.Z.locals;const y={},Z=(0,n(3744).Z)(y,[["render",function(e,t){var n=(0,o.resolveComponent)("Link");return(0,o.openBlock)(),(0,o.createElementBlock)("div",c,[(0,o.createElementVNode)("div",u,[(0,o.createElementVNode)("div",d,[(0,o.createElementVNode)("div",i,[(0,o.createElementVNode)("div",m,[(0,o.createElementVNode)("div",p,[(0,o.createElementVNode)("div",f,[(0,o.createElementVNode)("div",k,[(0,o.createVNode)(n,{href:e.route("login"),class:"logo-link"},{default:(0,o.withCtx)((function(){return[g,v]})),_:1},8,["href"])]),(0,o.renderSlot)(e.$slots,"default",{},void 0,!0)]),b]),V])])])])])}],["__scopeId","data-v-3e76d8e4"]])},5723:(e,t,n)=>{n.r(t),n.d(t,{default:()=>p});var o=n(821),r=n(4078),l=n(288),a=n(9576),s=n(3302),c=n(7211),u=n(9038),d=(0,o.createElementVNode)("div",{class:"mb-4 text-sm text-gray-600"}," This is a secure area of the application. Please confirm your password before continuing. ",-1),i=["onSubmit"],m={class:"flex justify-end mt-4"};const p={__name:"ConfirmPassword",setup:function(e){var t=(0,u.cI)({password:""}),n=function(){t.post(route("password.confirm"),{onFinish:function(){return t.reset()}})};return function(e,p){return(0,o.openBlock)(),(0,o.createBlock)(l.Z,null,{default:(0,o.withCtx)((function(){return[(0,o.createVNode)((0,o.unref)(u.Fb),{title:"Confirm Password"}),d,(0,o.createVNode)(c.Z,{class:"mb-4"}),(0,o.createElementVNode)("form",{onSubmit:(0,o.withModifiers)(n,["prevent"])},[(0,o.createElementVNode)("div",null,[(0,o.createVNode)(s.Z,{for:"password",value:"Password"}),(0,o.createVNode)(a.Z,{id:"password",type:"password",class:"mt-1 block w-full",modelValue:(0,o.unref)(t).password,"onUpdate:modelValue":p[0]||(p[0]=function(e){return(0,o.unref)(t).password=e}),required:"",autocomplete:"current-password",autofocus:""},null,8,["modelValue"])]),(0,o.createElementVNode)("div",m,[(0,o.createVNode)(r.Z,{class:(0,o.normalizeClass)(["ml-4",{"opacity-25":(0,o.unref)(t).processing}]),disabled:(0,o.unref)(t).processing},{default:(0,o.withCtx)((function(){return[(0,o.createTextVNode)(" Confirm ")]})),_:1},8,["class","disabled"])])],40,i)]})),_:1})}}}}}]);