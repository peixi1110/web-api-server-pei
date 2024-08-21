import{r as t,g as re,m as oe,a as ie,u as le,c as ce,C as X,b as de,d as me,e as q,f as T,R as ge,t as ue,h as pe,P as ve,i as he,j as fe,k as o,l as J,B as V,n as Se}from"./index-JF3z_A4z.js";import{u as xe}from"./useBreakpoint-Dxjt2no5.js";import"./useForceUpdate-DHXpXajI.js";const _=t.createContext({}),Ce=e=>{const{antCls:n,componentCls:a,iconCls:s,avatarBg:i,avatarColor:C,containerSize:S,containerSizeLG:g,containerSizeSM:p,textFontSize:m,textFontSizeLG:y,textFontSizeSM:R,borderRadius:v,borderRadiusLG:h,borderRadiusSM:O,lineWidth:k,lineType:w}=e,r=(x,f,E)=>({width:x,height:x,borderRadius:"50%",[`&${a}-square`]:{borderRadius:E},[`&${a}-icon`]:{fontSize:f,[`> ${s}`]:{margin:0}}});return{[a]:Object.assign(Object.assign(Object.assign(Object.assign({},ie(e)),{position:"relative",display:"inline-flex",justifyContent:"center",alignItems:"center",overflow:"hidden",color:C,whiteSpace:"nowrap",textAlign:"center",verticalAlign:"middle",background:i,border:`${le(k)} ${w} transparent`,"&-image":{background:"transparent"},[`${n}-image-img`]:{display:"block"}}),r(S,m,v)),{"&-lg":Object.assign({},r(g,y,h)),"&-sm":Object.assign({},r(p,R,O)),"> img":{display:"block",width:"100%",height:"100%",objectFit:"cover"}})}},ye=e=>{const{componentCls:n,groupBorderColor:a,groupOverlapping:s,groupSpace:i}=e;return{[`${n}-group`]:{display:"inline-flex",[`${n}`]:{borderColor:a},"> *:not(:first-child)":{marginInlineStart:s}},[`${n}-group-popover`]:{[`${n} + ${n}`]:{marginInlineStart:i}}}},be=e=>{const{controlHeight:n,controlHeightLG:a,controlHeightSM:s,fontSize:i,fontSizeLG:C,fontSizeXL:S,fontSizeHeading3:g,marginXS:p,marginXXS:m,colorBorderBg:y}=e;return{containerSize:n,containerSizeLG:a,containerSizeSM:s,textFontSize:Math.round((C+S)/2),textFontSizeLG:g,textFontSizeSM:i,groupSpace:m,groupOverlapping:-p,groupBorderColor:y}},Z=re("Avatar",e=>{const{colorTextLightSolid:n,colorTextPlaceholder:a}=e,s=oe(e,{avatarBg:a,avatarColor:n});return[Ce(s),ye(s)]},be);var je=function(e,n){var a={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&n.indexOf(s)<0&&(a[s]=e[s]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(e);i<s.length;i++)n.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(e,s[i])&&(a[s[i]]=e[s[i]]);return a};const Ne=(e,n)=>{const[a,s]=t.useState(1),[i,C]=t.useState(!1),[S,g]=t.useState(!0),p=t.useRef(null),m=t.useRef(null),y=ce(n,p),{getPrefixCls:R,avatar:v}=t.useContext(X),h=t.useContext(_),O=()=>{if(!m.current||!p.current)return;const l=m.current.offsetWidth,c=p.current.offsetWidth;if(l!==0&&c!==0){const{gap:N=4}=e;N*2<c&&s(c-N*2<l?(c-N*2)/l:1)}};t.useEffect(()=>{C(!0)},[]),t.useEffect(()=>{g(!0),s(1)},[e.src]),t.useEffect(O,[e.gap]);const k=()=>{const{onError:l}=e;(l==null?void 0:l())!==!1&&g(!1)},{prefixCls:w,shape:r,size:x,src:f,srcSet:E,icon:z,className:G,rootClassName:L,alt:B,draggable:$,children:b,crossOrigin:A}=e,j=je(e,["prefixCls","shape","size","src","srcSet","icon","className","rootClassName","alt","draggable","children","crossOrigin"]),d=de(l=>{var c,N;return(N=(c=x??(h==null?void 0:h.size))!==null&&c!==void 0?c:l)!==null&&N!==void 0?N:"default"}),F=Object.keys(typeof d=="object"?d||{}:{}).some(l=>["xs","sm","md","lg","xl","xxl"].includes(l)),M=xe(F),I=t.useMemo(()=>{if(typeof d!="object")return{};const l=me.find(N=>M[N]),c=d[l];return c?{width:c,height:c,fontSize:c&&(z||b)?c/2:18}:{}},[M,d]),u=R("avatar",w),H=q(u),[Q,Y,ee]=Z(u,H),te=T({[`${u}-lg`]:d==="large",[`${u}-sm`]:d==="small"}),U=t.isValidElement(f),se=r||(h==null?void 0:h.shape)||"circle",ae=T(u,te,v==null?void 0:v.className,`${u}-${se}`,{[`${u}-image`]:U||f&&S,[`${u}-icon`]:!!z},ee,H,G,L,Y),ne=typeof d=="number"?{width:d,height:d,fontSize:z?d/2:18}:{};let P;if(typeof f=="string"&&S)P=t.createElement("img",{src:f,draggable:$,srcSet:E,onError:k,alt:B,crossOrigin:A});else if(U)P=f;else if(z)P=z;else if(i||a!==1){const l=`scale(${a})`,c={msTransform:l,WebkitTransform:l,transform:l};P=t.createElement(ge,{onResize:O},t.createElement("span",{className:`${u}-string`,ref:m,style:Object.assign({},c)},b))}else P=t.createElement("span",{className:`${u}-string`,style:{opacity:0},ref:m},b);return delete j.onError,delete j.gap,Q(t.createElement("span",Object.assign({},j,{style:Object.assign(Object.assign(Object.assign(Object.assign({},ne),I),v==null?void 0:v.style),j.style),className:ae,ref:y}),P))},D=t.forwardRef(Ne),W=e=>{const{size:n,shape:a}=t.useContext(_),s=t.useMemo(()=>({size:e.size||n,shape:e.shape||a}),[e.size,e.shape,n,a]);return t.createElement(_.Provider,{value:s},e.children)},ze=e=>{var n,a,s;const{getPrefixCls:i,direction:C}=t.useContext(X),{prefixCls:S,className:g,rootClassName:p,style:m,maxCount:y,maxStyle:R,size:v,shape:h,maxPopoverPlacement:O,maxPopoverTrigger:k,children:w,max:r}=e,x=i("avatar",S),f=`${x}-group`,E=q(x),[z,G,L]=Z(x,E),B=T(f,{[`${f}-rtl`]:C==="rtl"},L,E,g,p,G),$=ue(w).map((j,d)=>pe(j,{key:`avatar-key-${d}`})),b=(r==null?void 0:r.count)||y,A=$.length;if(b&&b<A){const j=$.slice(0,b),d=$.slice(b,A),F=(r==null?void 0:r.style)||R,M=((n=r==null?void 0:r.popover)===null||n===void 0?void 0:n.trigger)||k||"hover",I=((a=r==null?void 0:r.popover)===null||a===void 0?void 0:a.placement)||O||"top",u=Object.assign(Object.assign({content:d},r==null?void 0:r.popover),{overlayClassName:T(`${f}-popover`,(s=r==null?void 0:r.popover)===null||s===void 0?void 0:s.overlayClassName),placement:I,trigger:M});return j.push(t.createElement(ve,Object.assign({key:"avatar-popover-key",destroyTooltipOnHide:!0},u),t.createElement(D,{style:F},`+${A-b}`))),z(t.createElement(W,{shape:h,size:v},t.createElement("div",{className:B,style:m},j)))}return z(t.createElement(W,{shape:h,size:v},t.createElement("div",{className:B,style:m},$)))},K=D;K.Group=ze;const Oe="/assets/error2-gZyTUOyo.png",{Meta:Ee}=J,ke=()=>{const e=he(g=>g.user.userInfo.data),n=e==null?void 0:e.id,[a,s]=t.useState([]);t.useEffect(()=>{async function g(){const p=await Se(),m=JSON.parse(p.data.data.avatar);if(m[0]){const y=m[0].url.replace(/^\//,"");s(`http://127.0.0.1:3007/${y}`)}}g()},[n]);const i=fe(),C=()=>{i("/editinfo")},S=()=>{i("/changepsw")};return o.jsxs(J,{title:"My Information",className:"userInfoCard",children:[o.jsxs("div",{className:"userInfoRow",children:[o.jsx("strong",{className:"label",children:"Avatar:"}),o.jsx("span",{className:"content",children:o.jsx(Ee,{avatar:o.jsx(K,{shape:"square",src:a.length>0?a:Oe,className:"avatar"})})})]}),o.jsxs("p",{className:"userInfoRow",children:[o.jsx("strong",{className:"label",children:"Id:"}),o.jsxs("span",{className:"content",children:["user_",e==null?void 0:e.id]})]}),o.jsxs("p",{className:"userInfoRow",children:[o.jsx("strong",{className:"label",children:"Username:"}),o.jsx("span",{className:"content",children:e==null?void 0:e.username})]}),o.jsxs("p",{className:"userInfoRow",children:[o.jsx("strong",{className:"label",children:"Nickname:"}),o.jsx("span",{className:`content ${e!=null&&e.nickname?"":"default-info"}`,children:e!=null&&e.nickname?e==null?void 0:e.nickname:"User has not set a nickname. "})]}),o.jsxs("p",{className:"userInfoRow",children:[o.jsx("strong",{className:"label",children:"Email:"}),o.jsx("span",{className:`content ${e!=null&&e.email?"":"default-info"}`,children:e!=null&&e.email?e==null?void 0:e.email:"User has not set a email. "})]}),o.jsx(V,{type:"primary",className:"editButton",onClick:C,children:"Edit"}),o.jsx(V,{type:"primary",className:"editButton",onClick:S,children:"Change Password"})]})};export{ke as default};
//# sourceMappingURL=index-TwVisFq5.js.map