"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[39],{4796:(e,t,n)=>{n.d(t,{Z:()=>d});var o=n(3645),r=n.n(o),a=n(1667),l=n.n(a),i=n(7726),s=r()((function(e){return e[1]})),c=l()(i.Z);s.push([e.id,".decorative-bg[data-v-3e76d8e4]{background:url("+c+")}",""]);const d=s},7726:(e,t,n)=>{n.d(t,{Z:()=>o});const o="/images/embossed-diamond.png?c38d143931d4445848804d28c6b97bf0"},4078:(e,t,n)=>{n.d(t,{Z:()=>a});var o=n(821),r=["type"];const a={__name:"Button",props:{type:{type:String,default:"submit"}},setup:function(e){return function(t,n){return(0,o.openBlock)(),(0,o.createElementBlock)("button",{type:e.type,class:"inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"},[(0,o.renderSlot)(t.$slots,"default")],8,r)}}}},288:(e,t,n)=>{n.d(t,{Z:()=>w});var o=n(821),r=n(1607),a=function(e){return(0,o.pushScopeId)("data-v-3e76d8e4"),e=e(),(0,o.popScopeId)(),e},l=r.Z,i=r.Z,s={class:"nk-app-root"},c={class:"nk-main"},d={class:"nk-wrap nk-wrap-nosidebar"},u={class:"nk-content"},m={class:"nk-split nk-split-page nk-split-md"},f={class:"nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white"},g={class:"nk-block nk-block-middle nk-auth-body"},p={class:"brand-logo pb-5"},k=a((function(){return(0,o.createElementVNode)("img",{class:"logo-light logo-img logo-img-lg",src:r.Z,srcset:l,alt:"logo"},null,-1)})),b=a((function(){return(0,o.createElementVNode)("img",{class:"logo-dark logo-img logo-img-lg",src:r.Z,srcset:i,alt:"logo-dark"},null,-1)})),v=a((function(){return(0,o.createElementVNode)("div",{class:"nk-block nk-auth-footer"},[(0,o.createElementVNode)("div",{class:"mt-3"},[(0,o.createElementVNode)("p",null,"© 2023 Getlive.help")])],-1)})),h=a((function(){return(0,o.createElementVNode)("div",{class:"nk-split-content nk-split-stretch bg-abstract decorative-bg"},null,-1)}));var y=n(3379),V=n.n(y),N=n(4796),E={insert:"head",singleton:!1};V()(N.Z,E);N.Z.locals;const x={},w=(0,n(3744).Z)(x,[["render",function(e,t){var n=(0,o.resolveComponent)("Link");return(0,o.openBlock)(),(0,o.createElementBlock)("div",s,[(0,o.createElementVNode)("div",c,[(0,o.createElementVNode)("div",d,[(0,o.createElementVNode)("div",u,[(0,o.createElementVNode)("div",m,[(0,o.createElementVNode)("div",f,[(0,o.createElementVNode)("div",g,[(0,o.createElementVNode)("div",p,[(0,o.createVNode)(n,{href:e.route("login"),class:"logo-link"},{default:(0,o.withCtx)((function(){return[k,b]})),_:1},8,["href"])]),(0,o.renderSlot)(e.$slots,"default",{},void 0,!0)]),v]),h])])])])])}],["__scopeId","data-v-3e76d8e4"]])},9039:(e,t,n)=>{n.r(t),n.d(t,{default:()=>u});var o=n(821),r=n(4078),a=n(288),l=n(9038),i=(0,o.createElementVNode)("div",{class:"mb-4 text-sm text-gray-600"}," Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another. ",-1),s={key:0,class:"mb-4 font-medium text-sm text-green-600"},c=["onSubmit"],d={class:"mt-4 flex items-center justify-between"};const u={__name:"VerifyEmail",props:{status:String},setup:function(e){var t=e,n=(0,l.cI)(),u=function(){n.post(route("verification.send"))},m=(0,o.computed)((function(){return"verification-link-sent"===t.status}));return function(e,t){return(0,o.openBlock)(),(0,o.createBlock)(a.Z,null,{default:(0,o.withCtx)((function(){return[(0,o.createVNode)((0,o.unref)(l.Fb),{title:"Email Verification"}),i,m.value?((0,o.openBlock)(),(0,o.createElementBlock)("div",s," A new verification link has been sent to the email address you provided during registration. ")):(0,o.createCommentVNode)("",!0),(0,o.createElementVNode)("form",{onSubmit:(0,o.withModifiers)(u,["prevent"])},[(0,o.createElementVNode)("div",d,[(0,o.createVNode)(r.Z,{class:(0,o.normalizeClass)({"opacity-25":(0,o.unref)(n).processing}),disabled:(0,o.unref)(n).processing},{default:(0,o.withCtx)((function(){return[(0,o.createTextVNode)(" Resend Verification Email ")]})),_:1},8,["class","disabled"]),(0,o.createVNode)((0,o.unref)(l.rU),{href:e.route("logout"),method:"post",as:"button",class:"underline text-sm text-gray-600 hover:text-gray-900"},{default:(0,o.withCtx)((function(){return[(0,o.createTextVNode)("Log Out")]})),_:1},8,["href"])])],40,c)]})),_:1})}}}}}]);