(this["webpackJsonptodo-app"]=this["webpackJsonptodo-app"]||[]).push([[0],{23:function(e,t,a){},33:function(e,t,a){"use strict";a.r(t);var n,r=a(1),c=a.n(r),s=a(11),o=a.n(s),i=(a(23),a(24),a(2)),l=a(8),d=a(4),u=a(7),j=a(5),b=a.n(j),m=a(10),f=a(6),p=Object(f.b)("todos/getTodosAsync",Object(m.a)(b.a.mark((function e(){var t,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://backend-flask-todo.onrender.com/api");case 2:if(!(t=e.sent).ok){e.next=8;break}return e.next=6,t.json();case 6:return a=e.sent,e.abrupt("return",{todos:a});case 8:case"end":return e.stop()}}),e)})))),O=Object(f.b)("todos/addTodoAsync",function(){var e=Object(m.a)(b.a.mark((function e(t){var a,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://backend-flask-todo.onrender.com/api",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t.username,email:t.email,task_text:t.task_text,status:!1})});case 2:if(!(a=e.sent).ok){e.next=8;break}return e.next=6,a.json();case 6:return n=e.sent,e.abrupt("return",{todo:n});case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),x=Object(f.b)("todos/completeTodoAsync",function(){var e=Object(m.a)(b.a.mark((function e(t){var a,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://backend-flask-todo.onrender.com/api/${payload.id}",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({completed:t.completed})});case 2:if(!(a=e.sent).ok){e.next=8;break}return e.next=6,a.json();case 6:return n=e.sent,e.abrupt("return",{todo:n});case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),h=Object(f.b)("todos/deleteTodoAsync",function(){var e=Object(m.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://backend-flask-todo.onrender.com/api/${payload.id}",{method:"DELETE"});case 2:if(!e.sent.ok){e.next=5;break}return e.abrupt("return",{id:t.id});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),v=Object(f.c)({name:"todos",initialState:[],reducers:{addTodo:function(e,t){var a={username:t.payload.username,email:t.payload.email,task_text:t.payload.task_text,status:!1};e.push(a)},toggleComplete:function(e,t){var a=e.findIndex((function(e){return e.id===t.payload.id}));e[a].status=t.payload.status},deleteTodo:function(e,t){return e.filter((function(e){return e.id!==t.payload.id}))}},extraReducers:(n={},Object(u.a)(n,p.fulfilled,(function(e,t){return t.payload.todos})),Object(u.a)(n,O.fulfilled,(function(e,t){e.push(t.payload.todo)})),Object(u.a)(n,x.fulfilled,(function(e,t){var a=e.findIndex((function(e){return e.id===t.payload.todo.id}));e[a].completed=t.payload.todo.completed})),Object(u.a)(n,h.fulfilled,(function(e,t){return e.filter((function(e){return e.id!==t.payload.id}))})),n)}),k=v.actions,y=(k.addTodo,k.toggleComplete,k.deleteTodo,v.reducer),g=a(0),N=function(){var e=Object(r.useState)({username:"",email:"",task_text:""}),t=Object(l.a)(e,2),a=t[0],n=t[1],c=Object(r.useState)(""),s=Object(l.a)(c,2),o=s[0],u=s[1],j=Object(d.b)();return Object(g.jsxs)("form",{onSubmit:function(e){var t;e.preventDefault(),a.username&&(t=a.email,/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))&&a.task_text?j(O(a)):u("Invalid email format")},className:"form-inline mt-3 mb-3",children:[Object(g.jsx)("input",{type:"text",className:"form-control mb-2 mr-sm-2",placeholder:"Username",value:a.username,onChange:function(e){return n(Object(i.a)(Object(i.a)({},a),{},{username:e.target.value}))}}),Object(g.jsx)("input",{type:"email",className:"form-control mb-2 mr-sm-2",placeholder:"Email",value:a.email,onChange:function(e){n(Object(i.a)(Object(i.a)({},a),{},{email:e.target.value})),u("")}}),o&&Object(g.jsx)("div",{className:"invalid-feedback",children:o}),Object(g.jsx)("input",{type:"text",className:"form-control mb-2 mr-sm-2",placeholder:"Task Text",value:a.task_text,onChange:function(e){return n(Object(i.a)(Object(i.a)({},a),{},{task_text:e.target.value}))}}),Object(g.jsx)("button",{type:"submit",className:"btn btn-primary mb-2",children:"Submit"}),Object(g.jsx)("button",{type:"button",className:"btn btn-primary mb-2 ml-4",children:"Login"})]})},T=a(18),_=function(e){var t=e.username,a=e.email,n=e.task_text,r=e.status;return Object(g.jsxs)("tr",{children:[Object(g.jsx)("td",{children:t}),Object(g.jsx)("td",{children:a}),Object(g.jsx)("td",{children:n}),Object(g.jsx)("td",{children:Object(g.jsx)("input",{type:"checkbox",className:"mr-3",checked:r})})]})},w=function(){var e=Object(d.b)(),t=Object(d.c)((function(e){return e.todos}));Object(r.useEffect)((function(){e(p())}),[e]);var a=Object(r.useState)({username:"",task_text:"",email:""}),n=Object(l.a)(a,2),c=n[0],s=n[1],o=Object(r.useState)({field:"username",order:"asc"}),u=Object(l.a)(o,2),j=u[0],b=u[1],m=t.filter((function(e){var t=!c.username||e.username.includes(c.username),a=!c.task_text||e.task_text.includes(c.task_text),n=!c.email||e.email.includes(c.email);return t&&a&&n})),f=Object(T.a)(m).sort((function(e,t){var a,n,r=(null===(a=e[j.field])||void 0===a?void 0:a.toLowerCase())||"",c=(null===(n=t[j.field])||void 0===n?void 0:n.toLowerCase())||"";return r<c?"asc"===j.order?-1:1:r>c?"asc"===j.order?1:-1:0}));return Object(r.useEffect)((function(){e(p())}),[e]),Object(g.jsxs)("div",{className:"container",children:[Object(g.jsx)("div",{className:"row my-4",children:Object(g.jsx)("div",{className:"col-md-12",children:Object(g.jsxs)("div",{className:"filters",children:[Object(g.jsx)("input",{type:"text",className:"form-control mb-2",placeholder:"Filter by Username",value:c.username,onChange:function(e){return s(Object(i.a)(Object(i.a)({},c),{},{username:e.target.value}))}}),Object(g.jsx)("input",{type:"text",className:"form-control mb-2",placeholder:"Filter by Task Text",value:c.task_text,onChange:function(e){return s(Object(i.a)(Object(i.a)({},c),{},{task_text:e.target.value}))}}),Object(g.jsx)("input",{type:"text",className:"form-control mb-2",placeholder:"Filter by Email",value:c.email,onChange:function(e){return s(Object(i.a)(Object(i.a)({},c),{},{email:e.target.value}))}})]})})}),Object(g.jsx)("div",{className:"row",children:Object(g.jsx)("div",{className:"col-md-12",children:Object(g.jsxs)("table",{className:"table",children:[Object(g.jsx)("thead",{children:Object(g.jsxs)("tr",{children:[Object(g.jsx)("th",{children:"Username"}),Object(g.jsx)("th",{children:"Email"}),Object(g.jsx)("th",{children:"Task Text"}),Object(g.jsx)("th",{children:"Completed"})]})}),Object(g.jsx)("tbody",{children:f.map((function(e){return Object(g.jsx)(_,{id:e.id,username:e.username,task_text:e.task_text,email:e.email,status:e.status},e.id)}))})]})})}),Object(g.jsx)("div",{className:"row my-4",children:Object(g.jsx)("div",{className:"col-md-12",children:Object(g.jsxs)("div",{className:"sort-options",children:[Object(g.jsxs)("label",{className:"mr-2",children:["Sort by:",Object(g.jsxs)("select",{className:"form-control-sm ml-1",value:j.field,onChange:function(e){return b(Object(i.a)(Object(i.a)({},j),{},{field:e.target.value}))},children:[Object(g.jsx)("option",{value:"username",children:"Username"}),Object(g.jsx)("option",{value:"email",children:"Email"}),Object(g.jsx)("option",{value:"task_text",children:"Task Text"})]})]}),Object(g.jsxs)("label",{children:["Order:",Object(g.jsxs)("select",{className:"form-control-sm ml-1",value:j.order,onChange:function(e){return b(Object(i.a)(Object(i.a)({},j),{},{order:e.target.value}))},children:[Object(g.jsx)("option",{value:"asc",children:"Ascending"}),Object(g.jsx)("option",{value:"desc",children:"Descending"})]})]})]})})})]})},C=function(){var e=Object(d.c)((function(e){return e.todos.filter((function(e){return!0===e.status}))}));return Object(g.jsxs)("h4",{className:"mt-3",children:["Total complete items: ",e.length]})},S=function(){return Object(g.jsxs)("div",{className:"container bg-white p-4 mt-5",children:[Object(g.jsx)("h1",{children:"My Todo List"}),Object(g.jsx)(N,{}),Object(g.jsx)(w,{}),Object(g.jsx)(C,{})]})},E=Object(f.a)({reducer:{todos:y}});o.a.render(Object(g.jsx)(c.a.StrictMode,{children:Object(g.jsx)(d.a,{store:E,children:Object(g.jsx)(S,{})})}),document.getElementById("root"))}},[[33,1,2]]]);
//# sourceMappingURL=main.618bd131.chunk.js.map