(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,t,a){},39:function(e,t,a){},47:function(e,t,a){e.exports=a(98)},52:function(e,t,a){},54:function(e,t,a){},77:function(e,t,a){},88:function(e,t,a){},90:function(e,t,a){},93:function(e,t,a){},96:function(e,t,a){},98:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(25),s=a.n(c),o=a(10),l=a(4),i=a(16),u=a(2),m=(a(52),a(54),a(6)),p=a(3),d=a.n(p),f=a(5),h=a(7),E=a.n(h),g=a(45),b=(a(77),a(21)),v=(a(20),a(111));function N(e){var t=e.submit,a=e.register,c=e.title,s=r.a.useState(""),o=Object(l.a)(s,2),i=o[0],u=o[1],m=r.a.useState(""),p=Object(l.a)(m,2),d=p[0],f=p[1];return Object(n.useEffect)(function(){if(i){var e=new FileReader;e.onload=function(){f(e.result)},e.readAsDataURL(i)}},[i]),r.a.createElement("form",{className:"user-action",encType:"multipart/form-data",onSubmit:t},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"user-pic"},c||"Selectioner une photo de profil",r.a.createElement(v.a,{htmlColor:"tomato",className:"shareIcon shareOption"})),r.a.createElement("input",{type:"file",id:"user-pic",style:{display:"none"},name:"image",accept:".jpeg, .png, .jpg, .gif",onChange:function(e){if(e.target.files){var t=e.target.files[0];u(t),console.log("PREVIEW",t)}},ref:a}),d&&r.a.createElement("div",{className:"profile-image-div "},r.a.createElement("img",{src:d,alt:""}))),r.a.createElement("button",{type:"submit"},"Mettre \xe0 jour"))}var O=a(114),j=a(115),S=a(113),w=function(e){var t=r.a.useContext($),a=t.state,c=t.dispatch,s=Object(n.useState)(!1),o=Object(l.a)(s,2),i=o[0],u=o[1],m=Object(n.useRef)(null),p=function(e){m.current&&!m.current.contains(e.target)&&u(!1)};return Object(n.useEffect)(function(){return document.addEventListener("mousedown",p),function(){document.removeEventListener("mousedown",p)}}),r.a.createElement("div",{className:"dropdownwrapper",ref:m},r.a.createElement(S.a,Object.assign({onClick:function(){return u(!i)}},e)),i&&r.a.createElement("div",null,r.a.createElement("div",{className:"dropdown-wrapper"},r.a.createElement("ul",{className:"dropdown-menu"},r.a.createElement("li",null,r.a.createElement("a",{className:"dropdown-menu__item",href:"/"}," Home")),r.a.createElement("li",null," ",r.a.createElement("a",{className:"dropdown-menu__item",href:"/admin/"+a.user.id},"admin")," "),r.a.createElement("li",{className:"dropdown-menu__item"},"Hi ",a.user.username," (X) "),r.a.createElement("li",{className:"dropdown-menu__item",onClick:function(){return c({type:"X"})}},"Deconexion")))))},y="http://localhost:8800/api/users/",k="http://localhost:8800/images/";function C(e){var t=e.post,a=Object(b.a)(),c=a.handleSubmit,s=a.register,o=Object(n.useState)(""),i=Object(l.a)(o,2),p=i[0],h=i[1],v=Object(n.useState)(!1),S=Object(l.a)(v,2),C=S[0],x=S[1],I=Object(n.useState)(!1),A=Object(l.a)(I,2),T=A[0],P=A[1],B=Object(n.useState)([]),F=Object(l.a)(B,2),J=F[0],R=F[1],L=Object(n.useState)(""),z=Object(l.a)(L,2),U=z[0],_=z[1],D=Object(n.useState)([]),q=Object(l.a)(D,2),H=q[0],M=q[1],G=(Object(n.useContext)($).user,Object(n.useState)(null)),W=Object(l.a)(G,2),X=W[0],V=W[1],Z=Object(n.useState)(!1),Q=Object(l.a)(Z,2),K=(Q[0],Q[1]),Y=JSON.parse(localStorage.getItem("user")),ee=Object(u.g)(),te="Bearer "+JSON.parse(localStorage.getItem("token")),ae=Object(n.useState)([]),ne=Object(l.a)(ae,2),re=ne[0],ce=ne[1];Object(n.useEffect)(function(){(function(){var e=Object(f.a)(d.a.mark(function e(){var t;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.a.get("http://localhost:8800/api/users",{headers:{Authorization:te}});case 2:t=e.sent,M(t.data),localStorage.setItem("userAount",JSON.stringify(t.data)),console.log(t.data);case 6:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}})()()},[te]);var se=function(){E.a.post("/likes",{postId:t.id,userId:Y.id,like:1},{headers:{Authorization:te}}).then(function(e){ce(e.data.like),localStorage.setItem("like",JSON.stringify(e.data)),console.log(re)})};Object(n.useEffect)(function(){E.a.get("http://localhost:8800/api/posts/byId/".concat(t.id),{headers:{Authorization:te}}).then(function(e){localStorage.setItem("post",JSON.stringify(e.data))})},[t.id,te]),console.log(t),Object(n.useEffect)(function(){E.a.get("http://localhost:8800/api/posts/".concat(t.id,"/comments"),{headers:{Authorization:te}}).then(function(e){R(e.data),console.log(e.data),localStorage.setItem("comments",JSON.stringify(e.data))})},[t.id,te]);var oe;function le(e){return ie.apply(this,arguments)}function ie(){return(ie=Object(f.a)(d.a.mark(function e(a){var n,r,c;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new FormData).append("image",a.image[0]),console.log(a.image[0]),e.next=5,fetch("http://localhost:8800/api/posts/upimg/"+t.id,{method:"PUT",headers:{Authorization:"Bearer "+te},body:n});case 5:return r=e.sent,e.next=8,r.json();case 8:c=e.sent,console.log(c),ue(),x(!0),r.ok&&(console.log(c),setTimeout(function(){ee.push(window.location.reload())},300));case 13:case"end":return e.stop()}},e)}))).apply(this,arguments)}function ue(){return me.apply(this,arguments)}function me(){return(me=Object(f.a)(d.a.mark(function e(){var t,a,n;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t="".concat(y).concat(Y.id),e.next=3,fetch(t,{headers:{Authorization:"Bearer "+te}});case 3:return a=e.sent,e.next=6,a.json();case 6:n=e.sent,h(n),K(!0),V(X),console.log(n);case 11:case"end":return e.stop()}},e)}))).apply(this,arguments)}function pe(e){P(!T)}return Object(n.useEffect)(function(){ue()},[]),t.userId===Y.id?oe=r.a.createElement("div",{className:"post-button"},r.a.createElement("i",{className:"fas fa-portrait white fa-2x",onClick:function(){x(!C)}}),C&&r.a.createElement(N,{submit:c(le),register:s({required:!0})}),r.a.createElement("div",{className:"postBottom"},r.a.createElement("div",{className:"postBottomLeft"}),r.a.createElement("div",{className:"postBottomRight"},r.a.createElement("span",{className:"postCommentText"},"Supprimer le post"),r.a.createElement(O.a,{className:"shareIcon",onClick:function(){var e;e=t.id,E.a.delete("http://localhost:8800/api/posts/".concat(e),{headers:{Authorization:te}}).then(function(){window.confirm("Etes vous sur de vouloir Supprimer definitivement votre POST ?"),window.location.reload(),ee.push("/")})}})))):!0===!!Y.isAdmin&&(oe=r.a.createElement("div",{className:"post-button"},r.a.createElement("i",{className:"fas fa-portrait white fa-2x",onClick:function(){x(!C)}}),C&&r.a.createElement(N,{submit:c(le),register:s({required:!0})}))),r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"post"},r.a.createElement("div",{className:"postWrapper"},r.a.createElement("div",{className:"postTop"},r.a.createElement("div",{className:"postTopLeft"},r.a.createElement("span",{className:"postUsername"}),H.map(function(e){return t.userId===e.id?r.a.createElement("div",{key:e.id+t.id},r.a.createElement("img",{className:"postProfileImg",src:e.profilePicture?k+e.profilePicture:"/assets/person/noAvatar.png",alt:"center"}),e.username):null})),r.a.createElement("div",{className:"postTopRight"},r.a.createElement("span",{className:"postDate"},Object(g.a)(t.createdAt)),r.a.createElement("p",{className:"postDate"}," ","Post\xe9 le"," ",t.createdAt.split("T").join(" \xe0 ").split(".000Z").join(""))),r.a.createElement(w,null)),r.a.createElement("div",{className:"detail"},r.a.createElement("div",{className:""},r.a.createElement("h3",null,"Title:",t.title," "),r.a.createElement("img",{className:"postImg",src:t.img?k+t.img:"/assets/icon/gallery.png",alt:"center"})),oe,r.a.createElement("hr",null),r.a.createElement("h3",null,"Description:",t.desc,p.like),r.a.createElement("hr",null)),r.a.createElement("div",{className:"postBottomLeft"},r.a.createElement("img",{className:"likeIcon",src:"/assets/icon/like.png",onClick:se,alt:""}),r.a.createElement("img",{className:"likeIcon",src:"/assets/icon/heart.png",onClick:se,alt:""}),r.a.createElement("span",{className:"postLikeCounter"}," ",re," people like it")),T.shown?r.a.createElement("div",{className:"listOfComments"},r.a.createElement("div",{className:"card-comment"},r.a.createElement("form",null,r.a.createElement("input",{className:"",id:"comm",type:"text",name:"comment",placeholder:"Laisser un commentaire ",autoComplete:"off",value:U,onChange:function(e){_(e.target.value)}})),r.a.createElement("div",{className:"card-reaction"},r.a.createElement("button",{id:"comm",onClick:function(){E.a.post("/comments",{content:U,postId:t.id,userId:Y.id},{headers:{Authorization:te}}).then(function(e){if(e.data.error)console.log(e.data.error);else{var t={content:U,username:e.data.username};R([].concat(Object(m.a)(J),[t])),_("")}})}}," ","Add Comment"))),r.a.createElement("ul",{className:"comments"},J.map(function(e,t){return r.a.createElement("li",{key:t,className:"comment"},e.content,T&&Y.id===r.a.createElement("div",{className:"listOfComments"})&&r.a.createElement("div",{className:"update__container",key:e.id}),r.a.createElement(O.a,{className:"shareIcon",onClick:function(){var t;t=e.id,E.a.delete("/comments/".concat(t),{headers:{Authorization:te}}).then(function(){R(J.filter(function(e){return e.id!==t}))})}}),r.a.createElement(j.a,{title:"Modification",onClick:pe,"data-id":e.id}))}))):"")),r.a.createElement("div",{className:"topbarIcon"},r.a.createElement("div",{className:"topbarIconItem"},r.a.createElement(j.a,{onClick:function(){return P({shown:!T.shown})}}),r.a.createElement("span",{className:"topbarIconBadge"},J.length))))}a(88);var x="http://localhost:8800/images/";function I(){var e=JSON.parse(localStorage.getItem("user")),t=Object(n.useRef)(),a=Object(n.useRef)(),c=Object(n.useState)(null),s=Object(l.a)(c,2),o=s[0],i=s[1],u=function(){var e=Object(f.a)(d.a.mark(function e(n){var r,c,s,l,i;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),r=JSON.parse(localStorage.getItem("user")),c="Bearer "+r.token,s={userId:r.id,desc:t.current.value,title:a.current.value},!o){e.next=18;break}return l=new FormData,i=Date.now()+o.name,l.append("name",i),l.append("file",o),s.img=i,console.log(s),e.prev=11,e.next=14,E.a.post("http://localhost:8800/upload",l);case 14:e.next=18;break;case 16:e.prev=16,e.t0=e.catch(11);case 18:return e.prev=18,e.next=21,E.a.post("/posts",s,{headers:{Authorization:c}});case 21:window.location.reload(),e.next=26;break;case 24:e.prev=24,e.t1=e.catch(18);case 26:case"end":return e.stop()}},e,null,[[11,16],[18,24]])}));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"share"},r.a.createElement("div",{className:"shareWrapper"},r.a.createElement("div",{className:"shareTop"},r.a.createElement("img",{className:"shareProfileImg",src:e.profilePicture?x+e.profilePicture:"/assets/person/noAvatar.png",alt:"profilePicture"}),r.a.createElement("input",{placeholder:e.username+": Create Post : Title ?",className:"shareInput",ref:a}),r.a.createElement("input",{placeholder:"Description ?",className:"shareInput",ref:t})),r.a.createElement("hr",{className:"shareHr"}),o&&r.a.createElement("div",{className:"shareImgContainer"},r.a.createElement("img",{className:"shareImg",src:URL.createObjectURL(o),alt:""}),r.a.createElement(O.a,{className:"shareCancelImg",onClick:function(){return i(null)}})),r.a.createElement("form",{className:"shareBottom",onSubmit:u},r.a.createElement("div",{className:"shareOptions"},r.a.createElement("label",{htmlFor:"file",className:"shareOption"},r.a.createElement(v.a,{htmlColor:"tomato",className:"shareIcon"}),r.a.createElement("span",{className:"shareOptionText"},"Multimedia"),r.a.createElement("input",{style:{display:"none"},type:"file",id:"file",accept:".png,.jpeg,.jpg",onChange:function(e){return i(e.target.files[0])}}))),r.a.createElement("button",{className:"shareButton",type:"submit"},"Share"))))}var A={posts:[],isFetching:!1,hasError:!1},T=function(e,t){switch(t.type){case"FETCH_POSTS_REQUEST":return Object(i.a)({},e,{isFetching:!0,hasError:!1});case"FETCH_POSTS_SUCCESS":return Object(i.a)({},e,{isFetching:!1,posts:t.payload});case"FETCH_POSTS_FAILURE":return Object(i.a)({},e,{hasError:!0,isFetching:!1});default:return e}},P=function(){var e=r.a.useContext($).state,t=r.a.useReducer(T,A),a=Object(l.a)(t,2),n=a[0],c=a[1];return r.a.useEffect(function(){c({type:"FETCH_POSTS_REQUEST"}),fetch("http://localhost:8800/api/posts",{headers:{Authorization:"Bearer ".concat(e.token)}}).then(function(e){if(e.ok)return e.json();throw e}).then(function(e){c({type:"FETCH_POSTS_SUCCESS",payload:e})}).catch(function(e){console.log(e),c({type:"FETCH_POSTS_FAILURE"})})},[e.token]),r.a.createElement("div",{className:"homeContainer"},r.a.createElement("div",{className:"feed"},r.a.createElement("div",{className:"feedWrapper"},r.a.createElement(I,null)),n.isFetching?r.a.createElement("span",{className:"loader"},"LOADING..."):n.hasError?r.a.createElement("span",{className:"error"},"AN ERROR HAS OCCURED"):r.a.createElement(r.a.Fragment,null,n.posts.map(function(e){return r.a.createElement(C,{key:e.id.toString(),post:e})}))))},B=a(116);a(90);function F(e){var t=e.username,a=Object(n.useContext)($).user,c=Object(n.useState)([]),s=Object(l.a)(c,2),o=s[0],i=s[1],u="Bearer "+JSON.parse(localStorage.getItem("user")).token;return Object(n.useEffect)(function(){(function(){var e=Object(f.a)(d.a.mark(function e(){return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:E.a.get("http://localhost:8800/api/posts",{headers:{Authorization:"Bearer"+u}}).then(function(e){i(e.data),localStorage.setItem(" setLtOfPtsbyuserId",JSON.stringify(e.data))});case 1:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}})()()},[]),r.a.createElement("div",{className:"feed"},r.a.createElement("div",{className:"feedWrapper"},(!t||t===a.username)&&r.a.createElement(I,null),o.map(function(e){return r.a.createElement(C,{key:e.id,post:e})})))}function J(e){var t=e.submit,a=e.register,n=e.content;return r.a.createElement("form",{className:"card-input",onSubmit:t},r.a.createElement("div",{className:"form-group "},r.a.createElement("label",{htmlFor:"Noveau Username"}," ",n||"Username"),r.a.createElement("input",{className:"card-edit",type:"text",name:"username",id:"username",placeholder:void 0===n?"Username...":n,ref:a})))}function R(e){var t=e.submit,a=e.register,n=e.content;return r.a.createElement("form",{className:"card-input",onSubmit:t},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"email"}," ",n||"Email"),r.a.createElement("input",{className:"add-input",type:"text",name:"email",id:"email",placeholder:void 0===n?"E-mail...":n,ref:a})))}function L(){var e=Object(u.h)().id,t=Object(u.g)(),a=r.a.useContext($).state,c=JSON.parse(localStorage.getItem("user")),s=c.id,o="Bearer "+c.token,i=Object(n.useState)(""),m=Object(l.a)(i,2),p=m[0],h=m[1],E=Object(b.a)(),g=E.handleSubmit,v=E.register,O=Object(n.useState)(!1),j=Object(l.a)(O,2),S=j[0],w=j[1],y=Object(n.useState)(!1),k=Object(l.a)(y,2),C=k[0],x=k[1],I=Object(n.useState)(!1),A=Object(l.a)(I,2),T=A[0],P=A[1];function L(){return(L=Object(f.a)(d.a.mark(function e(t){var a,n,r;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(a=new FormData).append("image",t.image[0]),e.next=4,fetch("http://localhost:8800/api/profile".concat("/",c.id),{method:"put",headers:{Authorization:"Bearer "+o},body:a});case 4:return n=e.sent,e.next=7,n.json();case 7:r=e.sent,console.log(r),window.location.reload(),w(!1);case 11:case"end":return e.stop()}},e)}))).apply(this,arguments)}function z(){return(z=Object(f.a)(d.a.mark(function e(t){return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:console.log(t),_(),x(!1);case 3:case"end":return e.stop()}},e)}))).apply(this,arguments)}function U(){return(U=Object(f.a)(d.a.mark(function e(t){var a,n;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://localhost:8800/api/profile".concat("/",c.id),{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+o},body:JSON.stringify(t)});case 2:return a=e.sent,console.log(t),e.next=6,a.json();case 6:n=e.sent,_(),P(!1),console.log(n);case 10:case"end":return e.stop()}},e)}))).apply(this,arguments)}function _(){return D.apply(this,arguments)}function D(){return(D=Object(f.a)(d.a.mark(function e(){var t,a,n;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t="http://localhost:8800/api/profile/".concat(s),e.next=3,fetch(t,{headers:{Authorization:"Bearer "+o}});case 3:return a=e.sent,e.next=6,a.json();case 6:n=e.sent,h(n),console.log(n);case 9:case"end":return e.stop()}},e)}))).apply(this,arguments)}return Object(n.useEffect)(function(){_(),console.log(p.username)},[]),r.a.createElement("div",{className:"profilePageContainer"},r.a.createElement("div",{className:"profile"},r.a.createElement("div",{className:"profileRight"},r.a.createElement("div",{className:"profileRightTop"},r.a.createElement("div",{className:"profileCover"},r.a.createElement("img",{className:"profileCoverImg",src:"/assets/groupomania.jpg ",alt:""}),r.a.createElement("img",{className:"profileUserImg",src:p.profilePicture?"http://localhost:8800/images/"+p.profilePicture:"/assets/person/noAvatar.png ",alt:""}),r.a.createElement("div",{className:"profileUserImgChange"},r.a.createElement(B.a,{onClick:function(){w(!S),x(!1),P(!1)}}))),r.a.createElement("div",null,r.a.createElement(n.Fragment,null,r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"profileInfo"},r.a.createElement("h4",{className:"profileInfoName"},"Username : ",p.username),r.a.createElement("p",null,"Email : ",p.email),r.a.createElement("p",null,"Profil cr\xe9e le :"," ",a.user.createdAt.split("T").join(" \xe0 ").split(".000Z")),r.a.createElement("p",null,"Profil Modifi\xe9 le :"," ",a.user.updatedAt.split("T").join(" \xe0 ").split(".000Z"))),r.a.createElement("div",{className:"user-action"},r.a.createElement("i",{className:"fas fa-user white fa-2x",onClick:function(){P(!T),x(!1),w(!1)}}," "),r.a.createElement("i",{className:"fas fa-envelope-open white fa-2x",onClick:function(){x(!C),w(!1),P(!1)}}),r.a.createElement("i",{className:"fas fa-portrait white fa-2x",onClick:function(){w(!S),x(!1),P(!1)}}),r.a.createElement("i",{className:"fas fa-user-slash white fa-2x",onClick:function(){t.push("/deleteuser/"+e)}})),S&&r.a.createElement(N,{submit:g(function(e){return L.apply(this,arguments)}),register:v({required:!0})}),T&&r.a.createElement(J,{submit:g(function(e){return U.apply(this,arguments)}),register:v({required:!0})}),C&&r.a.createElement(R,{submit:g(function(e){return z.apply(this,arguments)}),register:v({required:!0})}))))),r.a.createElement("div",{className:"profileRightBottom"},r.a.createElement(F,null)))))}a(39);var z=a(44),U=a.n(z),_=(a(93),a(43)),D=a.n(_),q=function(e){var t=r.a.useContext($),a=t.state,c=t.dispatch,s=Object(n.useState)(!1),o=Object(l.a)(s,2),i=o[0],u=o[1],m=Object(n.useRef)(null),p=function(e){m.current&&!m.current.contains(e.target)&&u(!1)};return Object(n.useEffect)(function(){return document.addEventListener("mousedown",p),function(){document.removeEventListener("mousedown",p)}}),r.a.createElement("div",{className:"dropdownwrapper",ref:m},r.a.createElement(D.a,Object.assign({onClick:function(){return u(!i)}},e)),i&&r.a.createElement("div",null,r.a.createElement("div",{className:"dropdpper"},r.a.createElement("ul",{className:"modal"},r.a.createElement("a",{className:"menu-item",href:"/"},"Home"),r.a.createElement("a",{className:"menu-item",href:"/profile/"+a.user.id},"Profile de ",a.user.username),r.a.createElement("a",{className:"menu-item",href:"/admin/"+a.user.id},"admin"),r.a.createElement("a",{className:"menu-item",href:"/",onClick:function(){return c({type:"X"})}},"deconexion")))))};function H(){var e=Object(u.g)(),t=r.a.useContext($).state;return r.a.createElement(o.a,null,r.a.createElement("nav",null,t.isAuthenticated&&r.a.createElement("div",null,r.a.createElement("div",{className:"topbarContainer"},r.a.createElement("div",{className:"topbarLeft"},r.a.createElement("h1",null,"G"),r.a.createElement("img",{className:"topbarIco",src:"/assets/icon/icon-left-font-monochrome-black.png",alt:"icon",onClick:function(){e.push("/")}}),r.a.createElement("div",{className:"searchbar"})),r.a.createElement("div",{className:"topbarCenter"})," ",r.a.createElement("div",{className:"topbarIcons"},r.a.createElement("div",{className:"topbarIcon"},r.a.createElement(U.a,{onClick:function(){e.push("/")}})),r.a.createElement("div",{className:"topbarIconItem"}))," ",r.a.createElement("div",{className:"topbarIcons"}),r.a.createElement("div",{className:"topbarIconItem"},r.a.createElement(q,null))))))}var M=a(11),G=(a(96),function(){var e=r.a.useContext($).dispatch,t=r.a.useState({email:"",password:"",isSubmitting:!1,errorMessage:null}),a=Object(l.a)(t,2),n=a[0],c=a[1],s=function(e){c(Object(i.a)({},n,Object(M.a)({},e.target.name,e.target.value)))};return r.a.createElement("div",{className:"login-container"},r.a.createElement("div",{className:"cardlogin"},r.a.createElement("div",{className:"container"},r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),c(Object(i.a)({},n,{isSubmitting:!0,errorMessage:null})),fetch("".concat("http://localhost:8800/api","/auth/login"),{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n.email,password:n.password})}).then(function(e){var t=e.headers.get("content-type");if(!t||!t.includes("application/json"))throw new TypeError("Oops, we haven't got JSON!");return e.json()}).then(function(t){e({type:"LOGIN",payload:t})}).catch(function(e){c(Object(i.a)({},n,{isSubmitting:!1,errorMessage:e.message||e.statusText}))})}},r.a.createElement("h1",null,"Login"),r.a.createElement("label",{htmlFor:"email"},"Email Address",r.a.createElement("input",{type:"email",value:n.email,onChange:s,name:"email",id:"email"})),r.a.createElement("label",{htmlFor:"password"},"Password",r.a.createElement("input",{type:"password",value:n.password,onChange:s,name:"password",id:"password"})),n.errorMessage&&r.a.createElement("span",{className:"form-error"},n.errorMessage),r.a.createElement("button",{disabled:n.isSubmitting},n.isSubmitting?"Loading...":"Login")))))});function W(){var e=Object(n.useRef)(),t=Object(n.useRef)(),a=Object(n.useRef)(),c=Object(n.useRef)(),s=Object(u.g)(),o=function(){var n=Object(f.a)(d.a.mark(function n(r){var o;return d.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(r.preventDefault(),c.current.value===a.current.value){n.next=5;break}c.current.setCustomValidity("Passwords don't match!"),n.next=16;break;case 5:return o={username:e.current.value,email:t.current.value,password:a.current.value},n.prev=6,n.next=9,E.a.post("http://localhost:8800/api/auth/signup",o);case 9:s.push("/login"),n.next=16;break;case 12:n.prev=12,n.t0=n.catch(6),console.log(n.t0),window.location.reload();case 16:case"end":return n.stop()}},n,null,[[6,12]])}));return function(e){return n.apply(this,arguments)}}();return r.a.createElement("div",{className:"login-container"},r.a.createElement("div",{className:"cardlogin"},r.a.createElement("div",{className:"container"},r.a.createElement("form",{onSubmit:o},r.a.createElement("h1",null,"Register"),r.a.createElement("label",{htmlFor:"Username"},"Username",r.a.createElement("input",{type:"username",minLength:"3",placeholder:"Username",autoComplete:"off",required:!0,ref:e,className:"loginInput"})),r.a.createElement("label",{htmlFor:"email"},"Email Address",r.a.createElement("input",{placeholder:"Email",required:!0,ref:t,className:"loginInput",type:"email",autoComplete:"off"})),r.a.createElement("label",{htmlFor:"password"},"Password",r.a.createElement("input",{placeholder:"Password",required:!0,ref:a,className:"loginInput",type:"password",minLength:"6"})),r.a.createElement("label",{htmlFor:"Password Again"},"Password Again",r.a.createElement("input",{placeholder:"Password Again",required:!0,ref:c,className:"loginInput",type:"password"})),r.a.createElement("button",{className:"loginRegisterButton",type:"submit"},"Sign Up"),r.a.createElement("button",{className:"btn btn-outline-danger btn-sm",onClick:function(){s.push("/login")}},"Login")))))}var X="/posts/",V="http://localhost:8800/images/";function Z(e){var t,a=e.user,c=Object(n.useState)(null),s=Object(l.a)(c,2),o=s[0],i=s[1],m=Object(n.useState)(!1),p=Object(l.a)(m,2),h=p[0],E=p[1],g=Object(n.useState)(""),v=Object(l.a)(g,2),O=(v[0],v[1]),j=Object(b.a)(),S=j.handleSubmit,w=j.register,y=Object(n.useState)(!1),k=Object(l.a)(y,2),C=k[0],x=k[1],I=Object(n.useState)(!1),A=Object(l.a)(I,2),T=A[0],P=A[1],B=Object(n.useState)(!1),F=Object(l.a)(B,2),L=F[0],z=F[1],U=r.a.useContext($).state,_=Object(u.g)(),D=Object(u.h)().id,q=JSON.parse(localStorage.getItem("user")),H="Bearer "+JSON.parse(localStorage.getItem("token")),M=U.user.id;function G(){return(G=Object(f.a)(d.a.mark(function e(t){var a,n,r;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(a=new FormData).append("image",t.image[0]),e.next=4,fetch("/users".concat("/",q.id),{method:"put",headers:{Authorization:"Bearer "+H},body:a});case 4:return n=e.sent,e.next=7,n.json();case 7:r=e.sent,console.log(r),Y(),x(!1);case 11:case"end":return e.stop()}},e)}))).apply(this,arguments)}function W(){return(W=Object(f.a)(d.a.mark(function e(t){var n,r;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://localhost:8800/api/users/"+a.id,{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+H},body:JSON.stringify(t)});case 2:return n=e.sent,e.next=5,n.json();case 5:r=e.sent,console.log(r),Q(),z(!1);case 9:case"end":return e.stop()}},e)}))).apply(this,arguments)}function Z(){return(Z=Object(f.a)(d.a.mark(function e(t){var n,r;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://localhost:8800/api/users/"+a.id,{method:"put",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:"Bearer "+H},body:JSON.stringify(t)});case 2:return n=e.sent,e.next=5,n.json();case 5:r=e.sent,console.log(r),Q(),P(!1);case 9:case"end":return e.stop()}},e)}))).apply(this,arguments)}function Q(){return K.apply(this,arguments)}function K(){return(K=Object(f.a)(d.a.mark(function e(){var t,a,n;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t="/users/".concat("/",M),e.next=3,fetch(t,{headers:{Authorization:"Bearer "+H}});case 3:return a=e.sent,e.next=6,a.json();case 6:n=e.sent,O(n),console.log(n),E(!0),i(o);case 11:case"end":return e.stop()}},e)}))).apply(this,arguments)}function Y(){return ee.apply(this,arguments)}function ee(){return(ee=Object(f.a)(d.a.mark(function e(){var t,a,n;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t="".concat(X),e.next=3,fetch(t,{headers:{Authorization:"Bearer "+H}});case 3:return a=e.sent,e.next=6,a.json();case 6:n=e.sent,O(n),console.log(n),E(!0),i(o);case 11:case"end":return e.stop()}},e)}))).apply(this,arguments)}return Object(n.useEffect)(function(){Q()},[]),Object(n.useEffect)(function(){Y()},[]),Object(n.useEffect)(function(){Q()},[]),o?r.a.createElement("div",null,"Erreur : ",o.message):h?(U.user.id!==D&&!0!==U.user.isAdmin||(t=r.a.createElement("div",{className:"user-button"},r.a.createElement(n.Fragment,null,r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"user-action"},r.a.createElement("i",{className:"fas fa-user white fa-3x",onClick:function(){z(!L),P(!1),x(!1)}},"  "),r.a.createElement("i",{className:"fas fa-envelope-open white fa-3x",onClick:function(){P(!T),x(!1),z(!1)}}),r.a.createElement("i",{className:"fas fa-portrait white fa-3x",onClick:function(){x(!C),P(!1),z(!1)}}),r.a.createElement("i",{className:"fas fa-user-slash white fa-3x",onClick:function(){_.push("/deleteuser/"+D)}}))),C&&r.a.createElement(N,{submit:S(function(e){return G.apply(this,arguments)}),register:w({required:!0})}),L&&r.a.createElement(J,{submit:S(function(e){return W.apply(this,arguments)}),register:w({required:!0})}),T&&r.a.createElement(R,{submit:S(function(e){return Z.apply(this,arguments)}),register:w({required:!0})})))),r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"detail"},r.a.createElement("div",{className:"postTopRight"},r.a.createElement("h4",{className:"postDate"},"Compte Cr\xe9e le : ",a.createdAt.split("T").join(" \xe0 ").split(".000Z").join(""))),r.a.createElement("h3",null," Username:",a.username," "),r.a.createElement("h3",null," Email:",a.email," "),r.a.createElement("img",{className:"postProfileImg",src:a.profilePicture?V+a.profilePicture:"/assets/person/noAvatar.png",alt:"user"}),r.a.createElement("div",{className:"postsAdmin"},r.a.createElement("div",null,t))))):r.a.createElement("div",null,"Chargement...")}var Q="/posts/";function K(){var e=Object(u.h)().id,t=Object(n.useState)([]),a=Object(l.a)(t,2),c=a[0],s=a[1],o=Object(n.useState)([]),i=Object(l.a)(o,2),m=(i[0],i[1]),p=JSON.parse(localStorage.getItem("user")),h="Bearer "+JSON.parse(localStorage.getItem("token")),g=p.id,b=Object(n.useState)(""),v=Object(l.a)(b,2),N=(v[0],v[1]);function O(){return(O=Object(f.a)(d.a.mark(function e(){var t,a,n;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t="/users/".concat("/",g),e.next=3,fetch(t,{headers:{Authorization:"Bearer "+h}});case 3:return a=e.sent,e.next=6,a.json();case 6:n=e.sent,N(n),console.log(n);case 9:case"end":return e.stop()}},e)}))).apply(this,arguments)}function j(){return(j=Object(f.a)(d.a.mark(function e(){var t,a,n;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t="".concat(Q),e.next=3,fetch(t,{headers:{Authorization:"Bearer "+h}});case 3:return a=e.sent,e.next=6,a.json();case 6:n=e.sent,N(n),console.log(n);case 9:case"end":return e.stop()}},e)}))).apply(this,arguments)}return Object(n.useEffect)(function(){!function(){O.apply(this,arguments)}()},[]),Object(n.useEffect)(function(){!function(){j.apply(this,arguments)}()},[]),Object(n.useEffect)(function(){E.a.get("/users/".concat(e),{headers:{Authorization:h}}).then(function(e){m(e.data),console.log(e.data),localStorage.setItem(" setLisuserIdX",JSON.stringify(e.data))})},[e,h]),Object(n.useEffect)(function(){(function(){var e=Object(f.a)(d.a.mark(function e(){var t;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.a.get("/users",{headers:{Authorization:h}});case 2:t=e.sent,s(t.data),localStorage.setItem("userAount",JSON.stringify(t.data)),console.log(t.data);case 6:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}})()()},[h]),r.a.createElement("div",{className:"profilePageContainer"},r.a.createElement("div",{className:"profile"},r.a.createElement("div",{className:"card"},r.a.createElement("h4",{className:"profile-title"},"Admin"))),c.map(function(e){return r.a.createElement(Z,{key:e.id,user:e})}))}function Y(){var e=Object(u.g)(),t=r.a.useContext($),a=JSON.parse(localStorage.getItem("user")),c=a.id,s="Bearer "+a.token,l=Object(n.useCallback)(function(t){window.confirm("Etes vous sur de vouloir Supprimer definitivement votre compte ?")&&fetch("/users/"+c,{method:"delete",headers:{"Content-type":"application/json",Authorization:s},body:JSON.stringify({id:t.id,userId:c})}).then(function(e){return e.json()}).then(function(t){t.error?alert("Votre compte n'a pas pu \xeatre supprim\xe9."):(alert("Compte supprim\xe9 !"),e.push("/"),window.location.reload(),localStorage.clear())}).catch(function(e){alert("Votre compte n'a pas pu \xeatre supprim\xe9 !"),console.error("There was an error!",e)})},[t,c,s]);return r.a.createElement("div",{className:"card"},r.a.createElement("h1",null,"Souhaitez vous vraiment supprimer votre compte ?"),r.a.createElement("div",{className:"form-submit"},r.a.createElement(o.c,{to:"/",className:"btn btn-outline-info btn-sm"},"Home"),r.a.createElement("button",{className:"btn btn-outline-danger btn-sm",onClick:l},"Supprimer mon compte")))}var $=r.a.createContext(),ee={isAuthenticated:!1,isAdmin:!1,user:JSON.parse(localStorage.getItem("user"))||null,token:null},te=function(e,t){switch(t.type){case"LOGIN":return localStorage.setItem("user",JSON.stringify(t.payload.user)),localStorage.setItem("token",JSON.stringify(t.payload.token)),Object(i.a)({},e,{isAdmin:!0,isAuthenticated:!0,user:t.payload.user,token:t.payload.token});case"X":return localStorage.clear(),Object(i.a)({},e,{isAuthenticated:!1,user:null});default:return e}};var ae=function(){var e=r.a.useReducer(te,ee),t=Object(l.a)(e,2),a=t[0],n=t[1];return r.a.useEffect(function(){var e=JSON.parse(localStorage.getItem("user")||null),t=JSON.parse(localStorage.getItem("token")||null);e&&t&&n({type:"LOGIN",payload:{user:e,token:t}})},[]),r.a.createElement(o.b,{basename:"/"},r.a.createElement($.Provider,{value:{state:a,dispatch:n}},r.a.createElement(H,null),r.a.createElement(u.d,null,r.a.createElement(u.b,{exact:!0,path:"/"},a.isAuthenticated?r.a.createElement(P,null):r.a.createElement(W,null)),r.a.createElement(u.b,{path:"/login"},a.isAuthenticated?r.a.createElement(u.a,{to:"/"}):r.a.createElement(G,null)),r.a.createElement(u.b,{path:"/register"},a.isAuthenticated?r.a.createElement(u.a,{to:"/"}):r.a.createElement(W,null)),r.a.createElement(u.b,{path:"/profile/:username"},r.a.createElement(L,null)),r.a.createElement(u.b,{path:"/admin/:id"},a.isAuthenticated?r.a.createElement(K,null):r.a.createElement(u.a,{to:"/"})),r.a.createElement(u.b,{path:"/deleteuser/:id"},r.a.createElement(Y,null)),r.a.createElement(u.b,{path:"/updateprofilephoto"},r.a.createElement(N,null)))))};s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(o.b,null,r.a.createElement(ae,null))),document.getElementById("root"))}},[[47,2,1]]]);