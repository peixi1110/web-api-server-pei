import{b0 as a,j as P,i as g,k as e,l as f,a$ as j,aQ as n,B as d,bL as x,b7 as i,bM as b}from"./index-CmMWvdQH.js";import{B as y}from"./Breadcrumb-CkaaNLCX.js";const v=()=>{const[o]=a.useForm(),l=P(),t=g(r=>r.user.userInfo.data),w=t==null?void 0:t.id,c=async r=>{const s={id:w,newPwd:r.newPwd,oldPwd:r.oldPwd};(await x(s)).data.status===1?i.error("Wrong old Password!"):(i.success("Your password has been changed. Please log in again."),b())},m=/^[\S]{4,16}$/,u=(r,s)=>s&&!m.test(s)?Promise.reject(new Error("The password format you entered is not allowed. Please enter 4 to 16 non-blank characters.")):s&&s===o.getFieldValue("oldPwd")?Promise.reject(new Error("New password cannot same with old password!")):Promise.resolve(),p=(r,s)=>!s||o.getFieldValue("newPwd")===s?Promise.resolve():Promise.reject(new Error("The two passwords do not match!")),h=()=>{o.validateFields(["confirmPsw"])};return e.jsx(f,{title:e.jsx(y,{items:[{title:e.jsx(j,{to:"/",children:"Home"})},{title:"Change Password"}]}),style:{marginBottom:20},children:e.jsxs(a,{style:{marginTop:10,marginLeft:30,width:350},form:o,layout:"vertical",onFinish:c,validateTrigger:"onBlur",children:[e.jsx(a.Item,{label:"Old password: ",name:"oldPwd",rules:[{required:!0,message:"Please input old password!"}],children:e.jsx(n,{placeholder:"Please enter your old password"})}),e.jsx(a.Item,{label:"New password: ",name:"newPwd",rules:[{required:!0,message:"Please input new password!"},{validator:u}],hasFeedback:!0,children:e.jsx(n,{placeholder:"Please enter a new password of 4-16 digits"})}),e.jsx(a.Item,{label:"Confirm password: ",name:"confirmPsw",dependencies:["newPwd"],rules:[{required:!0,message:"Please confirm your password!"},{validator:p}],hasFeedback:!0,children:e.jsx(n,{onChange:h,placeholder:"Please confirm your new password"})}),e.jsxs(a.Item,{children:[e.jsx(d,{type:"primary",htmlType:"submit",children:"Save"}),e.jsx(d,{style:{marginLeft:8},onClick:()=>l("/"),children:"Cancel"})]})]})})};export{v as default};
//# sourceMappingURL=index-DY-4eQZt.js.map
